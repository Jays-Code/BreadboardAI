---
description: Restore the workspace to a previous safety snapshot.
---

1.  List the available snapshots to the user.
    ```bash
    cat .agent/skills/snapshot/snapshots.log
    ```
2.  Ask the user for the `SNAPSHOT_ID` (the 7-character hash or the tag name) they want to restore to.
3.  Run the restore script with the user's chosen ID.
    ```bash
    bash .agent/skills/snapshot/scripts/restore.sh <SNAPSHOT_ID>