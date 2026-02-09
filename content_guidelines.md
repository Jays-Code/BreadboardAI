## Visual Style Profiles

To ensure consistency and high "taste" levels, the Visual Architect must adhere to one of the following style profiles:

### 1. Vibrant Fusion (Default)
- **Vibe**: High energy, modern, neon-influenced, digital-first.
- **Colors**: Cyber-lime, electric purple, high-contrast neons against deep blacks.
- **Typography**: `word_pop`, `box_highlight`. Bold, thick weights.
- **Motion**: `high` energy. **REQUIRES** `snap_zoom` for scene starts, `glitch` transitions.
- **Composition**: Fast-paced montages, heavy particulate effects (`sparks`).

### 2. Minimalist Studio
- **Vibe**: Clean, sophisticated, airy, gallery-focused.
- **Colors**: Soft grays, warm whites, muted accents (sage, terracotta).
- **Typography**: `cinematic_fade`, `karaoke`. Elegant, light to medium weights.
- **Motion**: `chill` energy, `zoom_in` (slow), `fade` transitions.
- **Composition**: Centered subjects, `fullscreen` layouts, minimal clutter, subtle `dust` particles.

### 3. Retro Nostalgia
- **Vibe**: Analog, warm, personal, vintage vlog style.
- **Colors**: Sepia tones, faded blues, warm oranges.
- **Typography**: Simple sans-serif, high contrast.
- **Motion**: `handheld` camera shake, `slide_up` transitions.
- **Composition**: `polaroid_scatter`, grainy textures, "imperfect" framing.

### 4. Futuristic Solarpunk
- **Vibe**: Inspiring, lush, tech-integrated nature, bright.
- **Colors**: Verdant greens, sky blues, bright white sunlight.
- **Typography**: `word_pop` (gentle), clean functional sans.
- **Motion**: `pan_left`, `zoom_in`, `fade` transitions.
- **Composition**: Multi-layered depth with plants/glass, `bubbles` or `dust` particles.

> [!IMPORTANT]
> **STYLE HIERARCHY**: Visual Style Profiles (listed above) ALWAYS override general layout, typography, and camera rules below. If a profile specifies a camera motion (e.g., `snap_zoom` for `Vibrant Fusion`), use it even if the scene seems "busy".

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
-   **`none`**: Static frame. Use only if scene itself is extremely busy AND no Style Profile motion is specified.
-   **`zoom_in`**: Slow steady creep. Builds tension.
-   **`snap_zoom`**: Violent, fast zoom-in at the start of a scene. High impact.
-   **`pan_left`**: Smooth movement. Suggests scale or travel.
-   **`handheld`**: Adds "organic" shake. Use for more personal, vlog-style vibes.

### 4. Visual Polish & SFX
-   **`energy_level`**: `high` (fast animations, more shake) vs `chill` (slow drifts).
-   **`particles`**: `sparks`, `dust`, `bubbles`, `none`.
-   **`transition_style`**: `fade`, `glitch`, `slide_up`. (Specify between scenes).

## Narrative & Storytelling Theory (Retention Storytelling)

To ensure the video is engaging even without visuals, the **Director** and **Copywriter** must follow these "Impact Storytelling" principles:

### 1. The Emotional Hook (The "Why")
- **Don't describe what; describe WHY it matters.**
- Start with a provocative question, a shocking transformation, or a relatable struggle.
- *Example (Generic)*: "How to make coffee." -> *Impact*: "Your morning ritual is actually killing your productivity."

### 2. The Narrative Arc (Punchy Beats)
Every script must follow a tight, 4-stage narrative arc:
1. **The Hook (0-3s)**: Immediate pattern interrupt. A bold claim or emotional "slap".
2. **The Conflict/Context (3-10s)**: The problem, the mystery, or the "before" state. Build tension.
3. **The Insight/Climax (10-22s)**: The breakthrough, the solution, or the "after" reveal. The value drop.
4. **The Resolution/Outro (22-30s)**: The takeaway, the internal "Aha!" moment, or a call to action.

### 3. Storytelling Vocabulary
- Use **high-vibration verbs** (e.g., "shattered", "forged", "unleashed" vs. "changed", "made", "started").
- Focus on **Internal Realizations**: The story should feel like it's happening inside the viewer's head.
- Avoid dry facts; use **Metaphors and Analogies** to make complex topics visceral.

### 4. Audio-First Engagement
- The text/story must be readable as a standalone "speech".
- If you muted the video and just read the words, would it still make you FEEL something? If not, rewrite.
