# Content Guidelines

## General Video Constraints
- **Max Duration:** 30 seconds (900 frames at 30fps)

## Remotion Prompt Engineering Guidelines

When generating prompts for Remotion video creation, follow these best practices to ensure high-quality, executable code.

### 1. Be Specific and Technical
AI agents generate better Remotion code when prompts use framework-specific terminology.
- **Frames vs. Seconds**: Specify duration in frames where possible (e.g., "30 frames" instead of "1 second" at 30fps), or explicitly state the frame rate.
- **Layout**: Mention components like `AbsoluteFill` for full-screen layers.
- **Timing**: Use `Sequence` for timing segments.
- **Animation**: keyterms like "spring animations", "interpolate", and "linear" help define motion style.

### 2. Prompt Structure
For complex videos, use a multi-step prompting strategy:
1.  **Structure/Storyboard**: Define the sequence of scenes, their order, and approximate duration.
2.  **Code Generation**: Instruct the AI to write the code based on the established structure, providing design constraints (colors, fonts).

### 3. Essential Constraints
- **Deterministic Rendering**: Explicitly forbid `Math.random()`. Use `remotion`'s `random()` with a seed if randomness is needed.
- **Asset Handling**: Be clear about where assets (images, fonts) are located or if they should be placeholders.

## Modern Aesthetics Framework (Gen Z Styles)

To achieve "Highly Engaging" content, the Visual Architect must use the following style modules:

### 1. Layout Styles (`layout_style`)
-   **`fullscreen`**: Classic focused subject. Best for high-impact hooks.
-   **`split_vertical`**: Top/Bottom split. Perfect for "Expectation vs Reality" or "Problem/Solution". Provide 2 images.
-   **`montage_grid`**: A fast-paced 3-image arrangement. Good for "The Journey" phases.
-   **`polaroid_scatter`**: Images appear as physical photos with white borders and random rotations. Best for "Outro" or nostalgia.

## Social Media Retention & Aesthetics (2025 Standards)

To ensure high engagement on TikTok, Reels, and Shorts, all content must adhere to these **Retention Editing** principles:

### 1. The 3-Second Hook
- **Visuals**: Must start with high-energy movement or a striking image. No fade-ins from black.
- **Audio**: Immediate sound effect or provocative statement.
- **Text**: Huge, bold headline in the center or upper thread.

### 2. Kinetic Engagement (No Static Frames)
- **Constant Motion**: Every asset must move. Use `scale` (zoom), `pan`, or `shake` on every single image.
- **Pacing**: Cuts should generally happen every 2-4 seconds.
- **Transition**: Use 'glitch', 'whip', or 'flash' transitions to keep energy high.

### 3. Typography & Captions
- **Style**: Use "Neo-Grotesque" or "Impact" style fonts. Thick weights (800-900).
- **Placement**: Central for hooks, lower-third for captions (avoiding UI zones).
- **Effects**: High contrast (White text, Black stroke, colourful neo-shadows).
- **Animation**: Words should 'pop' in or use 'karaoke' style highlighting.

### 4. Layouts
- **Full Screen**: 9:16 vertical dominance. Avoid heavy borders.
- **Montages**: fast-paced grids for "journey" sections, not static sideshows.

<!-- LEGACY VISUAL STYLE (PRE-2025 UPGRADE)
## Visual Style
- **Imagery**: Cinematic, high contrast, vibrant colors.
- **Pacing**: Fast cuts for "Hook" and "Climax", slower for "Journey".
-->

### 2. Kinetic Typography (`typography_style`)
-   **`word_pop`**: Words appear individually with a bouncy scale effect. High energy.
-   **`karaoke`**: The full sentence is visible but dims; the active word is highlighted. Best for clarity.
-   **`box_highlight`**: Text sits inside a high-contrast rotating box. Use for the "Climax" scene.

### 3. Camera Rig (`camera_motion`)
-   **`none`**: Static frame. Use only if scene itself is extremely busy.
-   **`zoom_in`**: Slow steady creep. Builds tension.
-   **`snap_zoom`**: Violent, fast zoom-in at the start of a scene. High impact.
-   **`pan_left`**: Smooth movement. Suggests scale or travel.
-   **`handheld`**: Adds "organic" shake. Use for more personal, vlog-style vibes.

### 4. Visual Polish & SFX
-   **`energy_level`**: `high` (fast animations, more shake) vs `chill` (slow drifts).
-   **`particles`**: `sparks`, `dust`, `bubbles`, `none`.
-   **`transition_style`**: `fade`, `glitch`, `slide_up`. (Specify between scenes).

<!-- 
## Narrative & Storytelling Theory
... (rest of the file remains same or slightly condensed) 
-->
