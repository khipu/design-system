#!/bin/bash

# Sync BRAND_GUIDE_FOR_AI.md to public/ directory
# This ensures Storybook always serves the latest version

set -e

SOURCE="BRAND_GUIDE_FOR_AI.md"
TARGET="public/BRAND_GUIDE_FOR_AI.md"

if [ ! -f "$SOURCE" ]; then
  echo "❌ Error: $SOURCE not found in project root"
  exit 1
fi

# Copy file
cp "$SOURCE" "$TARGET"

# Verify sync
if cmp -s "$SOURCE" "$TARGET"; then
  echo "✅ Synced: $SOURCE → $TARGET"
else
  echo "❌ Error: Sync failed"
  exit 1
fi
