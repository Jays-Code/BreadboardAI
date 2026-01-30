---
name: Visual Verification
description: Capture and analyze screenshots of the application to verify visual layout and correctness.
---

# Visual Verification Skill

This skill allows you to "see" the application by capturing screenshots using Playwright. Use this when you need to verify layout, styling, or verify that a fix has actually worked visually.

## Capabilities

1.  **Capture Screenshot**: Take a screenshot of the current state of the application (local dev server).
2.  **Visual Analysis**: (Performed by you) Analyzing the resulting image file.

## Usage

### 1. Capture Screenshot

To capture a screenshot, run the `capture_screenshot.ts` script using `npx tsx`.

**Command:**
```bash
npx tsx .agent/skills/visual_verification/scripts/capture_screenshot.ts [URL] [OUTPUT_PATH]
```

-   **URL** (optional): Defaults to `http://localhost:5173`.
-   **OUTPUT_PATH** (optional): Defaults to `.agent/artifacts/screenshot.png`.

**Example:**
```bash
npx tsx .agent/skills/visual_verification/scripts/capture_screenshot.ts http://localhost:5173 .agent/artifacts/verification.png
```

### 2. Analyze Screenshot

After running the command, use the `view_file` tool to inspect the generated image.

**Example:**
```json
{
  "AbsolutePath": "/workspaces/Connect4/.agent/artifacts/verification.png"
}
```

## When to use this skill
-   User reports a visual bug (e.g., "The board is off-center").
-   Verifying CSS changes (e.g., "Did that centering fix work?").
-   Checking game state visuals (e.g., "Are the pieces the right color?").

## The Visual Debugging Loop
**CRITICAL**: This skill is NOT just for taking pictures. It is for **solving visual problems**.
When using this skill, you must adhere to the following loop:

1.  **Capture**: Take a screenshot of the current state.
2.  **Analyze**: View the image and compare it against the user's requirements or design specs.
3.  **Evaluate**:
    *   **If CORRECT**: Report success to the user.
    *   **If INCORRECT**:
        *   Hypothesize the cause (CSS issue? Logic bug?).
        *   **Apply Fix**: Modify the code to address the visual discrepancy.
        *   **LOOP**: Go back to step 1 (Capture) to verify the fix.

**Do not stop until the visual result matches the requirement.**

## Tips
-   Ensure the dev server is running (`npm run dev`) before capturing.
-   Use descriptive filenames for screenshots if doing multiple captures (e.g., `before_fix.png`, `after_fix.png`).
