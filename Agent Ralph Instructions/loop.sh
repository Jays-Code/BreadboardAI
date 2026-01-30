#!/bin/bash

while true; do
  # Run the agent, feeding it the prompt and file context
  echo "Starting agent iteration..."
  # We capture output to check for the completion promise, but also print it for visibility
  # Using tee might be better but capturing into variable is simpler for string check
  result=$(agy run --prompt "@master_prompt.md @task_list.json @progress_log.txt" 2>&1)
  
  echo "$result"

  # Check for the promise
  if [[ "$result" == *"<promise>COMPLETE</promise>"* ]]; then
    echo "Job Done."
    break
  fi

  # Run post-task hook if defined (e.g., for visual verification in Ralph)
  if [[ -n "$RALPH_POST_HOOK" ]]; then
    echo "Running post-task hook: $RALPH_POST_HOOK"
    eval "$RALPH_POST_HOOK"
  fi

  echo "Restarting loop..."
  sleep 2
done
