---
description: How to debug and fix visual issues or verify UI changes.
---

# Visual Debugging Workflow

Follow this workflow whenever the user reports a visual bug (e.g., "misaligned", "wrong color", "broken layout") or asks for visual verification.

1.  **Read Skill Instructions**
    *   Read `.agent/skills/visual_verification/SKILL.md` to understand the available tools.

2.  **Establish Baseline (Capture)**
    *   Run `npx tsx .agent/skills/visual_verification/scripts/capture_screenshot.ts` to capture the current state.
    *   Save it as `.agent/artifacts/before_fix.png`.
    *   **Analyze**: View the screenshot to confirm you can reproduce the visual issue.

3.  **Implement Fix**
    *   Modify the code (CSS, React components, etc.) to address the issue.

4.  **Verify Fix (Capture & Compare)**
    *   Run the capture script again.
    *   Save it as `.agent/artifacts/after_fix.png`.
    *   **Analyze**: View the new screenshot.
    *   **Loop**: If the issue persists, repeat Step 3 and 4 until resolved.

5.  **Report**
    *   Inform the user of the fix.
