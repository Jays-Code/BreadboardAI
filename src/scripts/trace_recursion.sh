#!/bin/bash
echo "[Diag] SHLVL: $SHLVL"
pstree -s $$
if [ "$SHLVL" -lt 5 ]; then
    bash $0
fi
