#!/bin/bash
# .devcontainer/memory_guard.sh
# Background monitor to prevent 10GB container crashes

THRESHOLD=8500000 # 8.5GB in KB
LOG="/tmp/memory_guard.log"

echo "[$(date)] Memory guard started (Threshold: 8.5GB)" >> "$LOG"

# Auto-terminate after 2 hours to avoid zombie accumulation
START_TIME=$(date +%s)
TIMEOUT=7200

while true; do
    CURRENT_TIME=$(date +%s)
    ELAPSED=$((CURRENT_TIME - START_TIME))
    if [ "$ELAPSED" -gt "$TIMEOUT" ]; then
        echo "[$(date)] Memory guard timeout reach. Exiting." >> "$LOG"
        exit 0
    fi

    # Check available memory
    AVAILABLE=$(grep MemAvailable /proc/meminfo | awk '{print $2}')
    TOTAL=$(grep MemTotal /proc/meminfo | awk '{print $2}')
    USED=$((TOTAL - AVAILABLE))

    if [ "$USED" -gt "$THRESHOLD" ]; then
        echo "[$(date)] CRITICAL: Memory usage at ${USED}KB. Triggering emergency cleanup." >> "$LOG"
        
        # Kill heaviest Node/Vite processes first, but EXCLUDE the Antigravity server itself
        # Also exclude the memory guard script itself
        # Sort by RSS (column 6 in ps aux)
        HEAVIEST_INFO=$(ps aux --sort=-rss | grep -E "node|vite|tsx" | grep -v "grep\|antigravity-server\|memory_guard.sh" | head -n 5)
        HEAVIEST=$(echo "$HEAVIEST_INFO" | awk '{print $2}')
        
        if [ -n "$HEAVIEST" ]; then
            echo "[$(date)] Found heavy processes:" >> "$LOG"
            echo "$HEAVIEST_INFO" >> "$LOG"
            echo "[$(date)] Killing pids: $HEAVIEST" >> "$LOG"
            kill -9 $HEAVIEST >> "$LOG" 2>&1
        else
            echo "[$(date)] No eligible processes to kill (others might be system/antigravity)." >> "$LOG"
        fi
        
        # Clear some page cache if possible (needs root)
        sync && echo 3 > /proc/sys/vm/drop_caches 2>/dev/null || true
    fi
    
    sleep 30
done
