#!/bin/bash
# Sync version across all platforms from a single source.
# Usage: ./scripts/sync-version.sh 0.2.0
#
# Updates:
#   - package.json (Node)
#   - android/designsystem/build.gradle.kts (Android)
#   - KhipuDesignSystem.podspec (iOS)

set -euo pipefail

VERSION="${1:?Usage: sync-version.sh <version>}"

echo "Syncing version to $VERSION across all platforms..."

# Node - package.json
sed -i.bak "s/\"version\": \".*\"/\"version\": \"$VERSION\"/" package.json && rm -f package.json.bak
echo "  ✅ package.json -> $VERSION"

# Android - build.gradle.kts
sed -i.bak "s/val libraryVersion = \".*\"/val libraryVersion = \"$VERSION\"/" android/designsystem/build.gradle.kts && rm -f android/designsystem/build.gradle.kts.bak
echo "  ✅ build.gradle.kts -> $VERSION"

# iOS - podspec
sed -i.bak "s/s.version          = '.*'/s.version          = '$VERSION'/" KhipuDesignSystem.podspec && rm -f KhipuDesignSystem.podspec.bak
echo "  ✅ KhipuDesignSystem.podspec -> $VERSION"

echo "✨ Done! Version synced to $VERSION across all platforms."