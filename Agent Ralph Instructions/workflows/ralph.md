---
description: Start the Ralph autonomous loop for task execution and visual verification.
---

# Ralph Autonomous Loop Workflow

Use this workflow when the user says "Ralph" or asks to start the autonomous task execution flow.

1.  **Warm Boot (Activation)**
    *   Ensure agent skills and workflows are present in the `.agent/` directory. If not, copy them from `Agent Ralph Instructions/`.

2.  **Initialize Memory**
    *   Read `Agent Ralph Instructions/progress_log.txt` and `Agent Ralph Instructions/task_list.json`.

3.  **Execute Cycle**
    *   **Find Task**: Identify the next 'pending' task in `task_list.json`.
    *   **Implement**: Perform the necessary code changes or research to complete the task.
    *   **Verification**: 
        *   Run existing tests if applicable.
        *   **CRITICAL**: Run the visual verification capture script: `npx tsx .agent/skills/visual_verification/scripts/capture_screenshot.ts`.
    *   **Log**: Append an entry to `progress_log.txt` including the task ID, actions taken, and the path to the verification screenshot.
    *   **Update State**: Mark the task as 'complete' in `task_list.json`.

4.  **Loop or Exit**
    *   If more tasks are pending, repeat Step 3.
    *   If all tasks are done, output `<promise>COMPLETE</promise>`.
