# Ralph Skill

The **Ralph** skill orchestrates the autonomous execution of tasks defined in `task_list.json` using the existing agent loop (`loop.sh`). After each task iteration, it invokes the **Visual Verification** skill to capture a screenshot of the running application, ensuring that visual changes are verified automatically.

## How It Works
1. **Ralph sets a post‑task hook** (`RALPH_POST_HOOK`) that runs the visual verification capture script.
2. **Ralph runs the existing `loop.sh`** script. The loop executes a task, updates `progress_log.txt`, and checks for the `<promise>COMPLETE</promise>` marker.
3. After each successful task (i.e., when `loop.sh` prints its result and does not exit), the post‑task hook captures a screenshot and logs the artifact path.
4. The process repeats until all tasks are completed.

## Usage
```bash
bash .agent/skills/ralph/ralph.sh
```
Make sure the development server is running (`npm run dev`).

## Files
- `ralph.sh` – orchestrates the loop and visual verification.
- `README.md` – this documentation.
- `artifacts/` – directory where screenshots are stored.
