#!/bin/bash
# Khipu Design System - Token Synchronization Verifier
# Verifies that all token files are synchronized

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# File paths
INDEX_TS="src/tokens/index.ts"
TOKENS_JSON="src/tokens/tokens.json"
CSS_VARS="src/tokens/css-variables.css"
GRAILS_CSS="grails/src/main/resources/css/kds-tokens.css"

echo "🔍 Verifying token file synchronization..."
echo ""

# Check if files exist
FILES=("$INDEX_TS" "$TOKENS_JSON" "$CSS_VARS" "$GRAILS_CSS")
MISSING=0

for FILE in "${FILES[@]}"; do
    if [ ! -f "$FILE" ]; then
        echo -e "${RED}❌ Missing file: $FILE${NC}"
        MISSING=1
    fi
done

if [ $MISSING -eq 1 ]; then
    echo ""
    echo -e "${RED}Error: Missing required files${NC}"
    echo "Run 'npm run tokens:generate' to generate all files"
    exit 1
fi

# Get timestamps
INDEX_TS_TIME=$(stat -f %m "$INDEX_TS" 2>/dev/null || stat -c %Y "$INDEX_TS")
TOKENS_JSON_TIME=$(stat -f %m "$TOKENS_JSON" 2>/dev/null || stat -c %Y "$TOKENS_JSON")
CSS_VARS_TIME=$(stat -f %m "$CSS_VARS" 2>/dev/null || stat -c %Y "$CSS_VARS")
GRAILS_CSS_TIME=$(stat -f %m "$GRAILS_CSS" 2>/dev/null || stat -c %Y "$GRAILS_CSS")

# Status flags
WARNINGS=0
ERRORS=0

# Check 1: tokens.json should be newer than or equal to index.ts
echo "📋 Checking tokens.json synchronization..."
if [ $TOKENS_JSON_TIME -lt $INDEX_TS_TIME ]; then
    echo -e "${YELLOW}⚠️  Warning: tokens.json is older than index.ts${NC}"
    echo "   Run: npm run tokens:export"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ tokens.json is up to date${NC}"
fi
echo ""

# Check 2: css-variables.css should be newer than or equal to tokens.json
echo "🎨 Checking css-variables.css synchronization..."
if [ $CSS_VARS_TIME -lt $TOKENS_JSON_TIME ]; then
    echo -e "${RED}❌ Error: css-variables.css is older than tokens.json${NC}"
    echo "   Run: node scripts/generate-css-variables.js"
    ERRORS=$((ERRORS + 1))
else
    echo -e "${GREEN}✅ css-variables.css is up to date${NC}"
fi
echo ""

# Check 3: grails CSS should match css-variables.css content
echo "🏗️  Checking Grails CSS synchronization..."
if ! diff -q "$CSS_VARS" "$GRAILS_CSS" > /dev/null 2>&1; then
    echo -e "${YELLOW}⚠️  Warning: Grails CSS differs from css-variables.css${NC}"
    echo "   Run: cd grails && ../android/gradlew copyTokensCSS"
    WARNINGS=$((WARNINGS + 1))
else
    echo -e "${GREEN}✅ Grails CSS is synchronized${NC}"
fi
echo ""

# Summary
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $ERRORS -gt 0 ]; then
    echo -e "${RED}❌ Synchronization check FAILED${NC}"
    echo "   Errors: $ERRORS"
    echo "   Warnings: $WARNINGS"
    echo ""
    echo "Fix errors by running:"
    echo "  npm run tokens:generate"
    exit 1
elif [ $WARNINGS -gt 0 ]; then
    echo -e "${YELLOW}⚠️  Synchronization check completed with warnings${NC}"
    echo "   Warnings: $WARNINGS"
    echo ""
    echo "To fix warnings, run the suggested commands above"
    exit 0
else
    echo -e "${GREEN}✅ All token files are synchronized!${NC}"
    exit 0
fi
