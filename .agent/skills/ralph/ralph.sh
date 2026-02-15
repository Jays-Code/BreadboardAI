# Determine the workspace root (parent of .agent)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
WORKSPACE_ROOT="$(cd "$SCRIPT_DIR/../../../" && pwd)"

# Directory for visual verification artifacts
ARTIFACT_DIR="$WORKSPACE_ROOT/.agent/skills/ralph/artifacts"
mkdir -p "$ARTIFACT_DIR"

# Define post‑task hook to capture a screenshot after each task iteration.
export RALPH_POST_HOOK="npx tsx $WORKSPACE_ROOT/.agent/skills/visual_verification/scripts/capture_screenshot.ts http://localhost:5173 $ARTIFACT_DIR/\$(date +%s).png"

# Execute the existing agent loop.
bash "$WORKSPACE_ROOT/Agent Ralph Instructions/loop.sh"
