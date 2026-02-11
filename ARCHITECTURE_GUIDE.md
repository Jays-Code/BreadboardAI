# 🏗️ Hybrid Architecture Guide: Colab + G-Drive + Antigravity

This document preserves the "Cloud Brain, Windows Hands" architecture for the BreadboardAI project. All future expansions (including local models, GPU tasks, or UI changes) must adhere to these principles.

## 🌟 The Core Model
We use a **Hybrid Loop** to combine cloud compute power with local agent intelligence.

- **The Brain (Cloud):** Google Colab handles the execution of servers (`vite`, `node`), Breadboard graphs, and heavy compute.
- **The Hands (Local):** Antigravity operates on the Windows machine, editing code and monitoring the filesystem through the G: Drive sync.
- **The Bridge (Storage):** Google Drive acts as the shared memory between the Cloud and Local environments.

---

## 🛠️ Environment Rules

### 1. The Startup Logic (Detection First)
Every startup script or notebook must include an environment check. Use the `IN_COLAB` flag to branch logic:
```python
try:
    from google.colab import drive
    IN_COLAB = True
except ImportError:
    IN_COLAB = False
```

### 2. Google Colab (Performance & Permissions)
- **Constraint:** Google Drive (G:) has restrictive execution permissions (`EACCES`) and slow I/O for 10k+ files.
- **Rule:** Never run `npm install` directly into the Drive folder in the cloud.
- **Solution:** 
  - Delete `node_modules` on the Drive mount.
  - Install modules to `/content/node_modules` (Internal Cloud Disk).
  - Create a symlink: `!ln -s /content/node_modules node_modules`.
  - This keeps the servers fast and prevents local sync storms.

### 3. Antigravity (Local Optimization)
- **Problem:** Scanning 10,000 files on a G: drive mount can take 20+ minutes and freeze the PC.
- **Rule:** When `IN_COLAB` is False, **SKIP** heavy filesystem scans or dependency installs. 
- **Guideline:** Trust the local `node_modules` already exist.

### 4. Port Exposure
- Use `google.colab.output.serve_kernel_port_as_window(5173)` to expose the UI.
- This provides a persistent tunnel and an "Open in new tab" option.

---

## ⏩ Future Expansion: Local Models & GPU
When adding features like **Self-Hosted Models (Ollama/Local LLMs)**:
1. **Cloud Execution:** The model loader must detect `IN_COLAB` and, if True, handle downloading weights to `/content` (internal cloud disk) for speed.
2. **Local Execution:** If `IN_COLAB` is False, look for models in the local Windows paths or local hardware.
3. **Synchronization:** Only code, weights metadata, and result `.json` files should ever be allowed to sync over Google Drive. Binaries and temporary caches must remain in `/content` (Cloud) or `.cache` (Local).
