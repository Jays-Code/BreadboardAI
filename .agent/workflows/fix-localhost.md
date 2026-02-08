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
    ```
4.  **Note on Cloud/IDE Port Mapping**:
    *   In cloud environments, the internal port (e.g., 5173) is often mapped to a random public port (e.g., 50217).
    *   **Always check the IDE's "Ports" tab** for the actual public link.
    *   If the port isn't showing, try adding it manually via the "Add Port" button.

5.  **Best Practices**:
    *   **Force IPv4**: Set `host: '0.0.0.0'` in your server config for better IDE proxy detection.
    *   **Strict Port**: Use `strictPort: true` to prevent the server from drifting to random ports if a conflict occurs.
