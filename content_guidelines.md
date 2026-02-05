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

## Narrative & Storytelling Theory
To improve engagement, all videos must follow a structured Narrative Arc rather than a disconnected list of scenes.

### 1. The Story Arc
- **The Hook (Scene 1)**: Grab attention immediately. Present a problem or a striking fact.
- **The Journey (Middle Scenes)**: Evidence, history, or development. Build tension or curiosity.
- **The Climax/Payload (Penultimate Scene)**: The core insight or "Big Reveal."
- **The Outro (Final Scene)**: Summarize and conclude.

### 2. Multi-Layer Visual Composition
Each scene should be thought of in layers to avoid "floating image" syndrome:
- **Layer 1: Environment (Background)**: Solid color, gradient, or wide landscape images. Defines the mood.
- **Layer 2: Subject (Midground)**: The primary image or icon generated for this specific scene.
- **Layer 3: UI/Overlay (Foreground)**: Captions, progress bars, or "floating" decorative particles.

### 3. Motion Direction
Avoid static displays. Every subject must have a direction:
- **Zoom In**: Focus on a detail.
- **Pan Left/Right**: Suggest travel or time passing.
- **Float**: Use for ethereal or abstract subjects.

### 4. Example Prompts
> "Create a 6-second intro (180 frames @ 30fps) with the text 'STARTUP' in bold white Montserrat font. The text should fade in from opacity 0 to 1 and scale from 0.5 to 1.0 using a spring animation over the first 45 frames. Background should be a dark navy (#0f172a) `AbsoluteFill`."

> "Create a lower-third animation using a `Sequence`. It should slide in from the left using `interpolate` with spring physics, hold for 3 seconds, and then slide out. Use the `Layout` component for consistent padding."
