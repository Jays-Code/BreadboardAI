# 🛠️ SETUP PHASE (Warm Boot)
- Check if `.agent/skills` and `.agent/workflows` exist in the root workspace.
- If they do NOT exist, check for their counterparts in `Agent Ralph Instructions/`.
- If found, copy them to `.agent/` using `cp -r`. This "activates" your special tools (Ralph, Visual Verification) and workflows.

# 🏃 EXECUTION PHASE
- Read `task_list.json`. Find the first 'pending' task. Implement it. Run tests.

# 3. VERIFICATION & ITERATION PHASE (Self-Correction)
- **CRITICAL:** After implementation, run the Visual QA script: `node trigger_qa.cjs`.
- **Read `qa_report.json`**.
- **Check Score:** If `score < 70` (or `passed` is false), you are **NOT DONE**.
    - Read the `critique` and `improvement_suggestions` from the JSON.
    - **Iterate:** Update the code/assets based on this feedback.
    - **Retry:** Run `node trigger_qa.cjs` again.
- Only update 'status' to 'complete' in `task_list.json` when the QA passes or you have made 3 attempts.

If all tasks are complete, output <promise>COMPLETE</promise>.

The Core Concept: "Disk is State"

# 🧠 MEMORY & PROGRESS LOGGING
**CRITICAL:** You are running in a continuous loop with NO context from previous sessions. 
Your ONLY knowledge of past events comes from `progress_log.txt`.

## 1. READ PHASE (Do this first)
- Read `progress_log.txt` immediately.
- Use it to determine which tasks in `task_list.json` have already been attempted, completed, or failed.
- Do NOT repeat work marked as done in the log.

## 2. WRITE PHASE (Do this before exiting)
- You MUST append a new entry to `progress_log.txt` before outputting <promise>COMPLETE</promise> or exiting.
- **Format for the log entry:**
  ```text
  [Iteration {Timestamp}]
  - Task: {ID of task from task_list.json}
  - Action: {Concise summary of code written or commands run}
  - Files Modified: {List of files}
  - Outcome: {Success/Failure}
  - Next Steps: {What the next agent should focus on}
• Rules for Logging:
    ◦ Be extremely concise. Sacrifice grammar for brevity (e.g., "Fixed auth bug" > "I have successfully resolved the issue in the authentication module").
    ◦ Document decisions, not just actions (e.g., "Chose Axios over Fetch due to timeout handling").
    ◦ If a task failed, explain why so the next agent doesn't try the exact same failing approach.

### Why this specific prompt works
1.  **Prevents "Groundhog Day" Loops:** By explicitly telling the agent to look for *failed* attempts in the log, you prevent it from trying the same broken fix 10 times in a row [2].
2.  **Context Efficiency:** The instruction to "Sacrifice grammar for concision" is vital. As the project grows, `progress_log.txt` will get long. Keeping it dense saves token space for actual code [5].
3.  **Decision Tracking:** Capturing "Key decisions" helps future iterations respect architectural choices (e.g., "We are using Tailwind, do not add vanilla CSS") [4].

### Implementation Tip for `loop.sh`
Ensure your `loop.sh` script actually passes the file content to the agent. While the prompt tells the agent to *use* it, your script must make the file *visible*.

In your `loop.sh` command, ensure `progress_log.txt` is included in the context arguments:

```bash
# In your loop.sh
result=$(agy run --prompt "@master_prompt.md @task_list.json @progress_log.txt") 
This ensures the "Memory" is physically present in the context window when the agent wakes up.