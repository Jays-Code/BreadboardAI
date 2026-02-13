import os
import shutil

def setup_autosave():
    """
    Sets up a safe symbolic link between the local Colab environment and Google Drive.
    
    Strategy: "Move-then-Link"
    1. Ensures the target Drive directory exists.
    2. If the local directory exists (and contains files), it MOVES them to Drive first.
    3. Deletes the empty local directory.
    4. Creates a symbolic link from Local -> Drive.
    
    This ensures that:
    - No data is lost if the user restarts the runtime (files are backed up).
    - Future writes to 'local_path' go directly to Drive (Live Auto-Save).
    """
    
    # Define paths
    # source: The folder on Google Drive where data should persist
    drive_path = "/content/drive/MyDrive/CodingProjects/BreadboardAI/output"
    
    # target: The local folder where the app/scripts write their output
    local_path = "/content/app/output"

    print(f"[AUTOSAVE] Setting up Live Sync...")
    print(f"   • source (Drive): {drive_path}")
    print(f"   • target (Local): {local_path}")

    # 1. Ensure Drive directory exists
    try:
        os.makedirs(drive_path, exist_ok=True)
        print("[AUTOSAVE] Checked Drive directory.")
    except Exception as e:
        print(f"[ERROR] Could not create Drive directory: {e}")
        return

    # 2. Handle the local path safely
    if os.path.exists(local_path):
        if os.path.islink(local_path):
            # It's already a symlink. 
            # We check if it points to the right place, if so, we're good.
            # If not, we might want to unlink and relink, but for now, just report.
            current_target = os.readlink(local_path)
            if current_target == drive_path:
                print("[AUTOSAVE] ✅ Symlink already active. You are good to go!")
                return
            else:
                print(f"[WARNING] Local path is a symlink to {current_target}, not our target. improving...")
                os.unlink(local_path)
                os.symlink(drive_path, local_path)
                print("[AUTOSAVE] ✅ Fixed symlink.")
        else:
            # It's a real folder. This is the "Danger Zone".
            # We must move any files inside to Drive before deleting the folder.
            print(f"[AUTOSAVE] ⚠️ Found existing local files. Backing up to Drive...")
            
            try:
                # Move content
                files = os.listdir(local_path)
                if not files:
                    print("[AUTOSAVE] Local directory was empty.")
                else:
                    for f in files:
                        src = os.path.join(local_path, f)
                        dst = os.path.join(drive_path, f)
                        
                        # If file exists on Drive, we have a conflict. 
                        # For safety, we prefer the 'new' local file, but maybe we should rename?
                        # Standard 'shutil.move' might overwrite or fail depending on OS.
                        # Let's verify.
                        if os.path.exists(dst):
                            # Conflict: Rename the backup to avoid overwriting existing Drive data? 
                            # Or overwrite? User intent is usually "Save my current work".
                            # Let's overwrite to ensure the latest local run is saved.
                            if os.path.isdir(dst):
                                shutil.rmtree(dst)
                            else:
                                os.remove(dst)
                        
                        shutil.move(src, dst)
                        print(f"   Saved: {f}")
                
                # Now that it is empty/backed-up, remove the directory
                os.rmdir(local_path)
                print("[AUTOSAVE] Local cleanup complete.")
                
            except Exception as e:
                print(f"[ERROR] Failed to backup/move files: {e}")
                print("[ABORT] Checking output safety. Auto-save NOT enabled.")
                return

            # Create the link
            try:
                os.symlink(drive_path, local_path)
                print("[AUTOSAVE] ✅ Live Symlink created successfully.")
            except OSError as e:
                print(f"[ERROR] Failed to create symlink: {e}")

    else:
        # Path doesn't exist, just link it
        try:
            # Ensure parent exists just in case
            parent = os.path.dirname(local_path)
            if not os.path.exists(parent):
                os.makedirs(parent, exist_ok=True)
                
            os.symlink(drive_path, local_path)
            print("[AUTOSAVE] ✅ Live Symlink created from scratch.")
        except OSError as e:
            print(f"[ERROR] Failed to create symlink: {e}")

if __name__ == "__main__":
    setup_autosave()
