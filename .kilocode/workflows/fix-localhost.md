---
description: Diagnose and repair the development server on localhost:5173.
---

1.  Run the health check to see if the server is down.
    ```bash
    bash .agent/skills/localhost_repair/scripts/check_health.sh
    ```
2.  If the health check fails, run the repair script.
    ```bash
    bash .agent/skills/localhost_repair/scripts/repair.sh
    ```
3.  Confirm the server is back up by running the health check again.
    ```bash
    bash .agent/skills/localhost_repair/scripts/check_health.sh