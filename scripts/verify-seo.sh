#!/bin/bash

# SEO Verification Script for cemuener.de
# Run this after deployment to verify all SEO elements are working

echo "🔍 SEO Verification Test for cemuener.de"
echo "=========================================="
echo ""

SITE_URL="https://cemuener.de"
LOCAL_URL="http://localhost:4321"

# Check if testing local or production
if [ "$1" == "local" ]; then
    BASE_URL=$LOCAL_URL
    echo "Testing LOCAL build at: $LOCAL_URL"
    echo "Make sure 'npm run preview' is running!"
else
    BASE_URL=$SITE_URL
    echo "Testing PRODUCTION site at: $SITE_URL"
fi

# Primary content page to check meta/SEO elements (not the redirect root)
CONTENT_URL="$BASE_URL/de/dj/"

echo ""
echo "=================================="
echo ""

# Function to check URL status
check_url() {
    local url=$1
    local name=$2

    echo -n "Checking $name... "

    status_code=$(curl -o /dev/null -s -w "%{http_code}" "$url")

    if [ "$status_code" == "200" ]; then
        echo "✅ OK ($status_code)"
        return 0
    else
        echo "❌ FAILED ($status_code)"
        return 1
    fi
}

# Counter for failed tests
failed=0

# Test 1: Core Pages
echo "1. Core Pages"
echo "-------------"
check_url "$BASE_URL" "Homepage (root redirect)" || ((failed++))
check_url "$BASE_URL/de/dj/" "DJ German" || ((failed++))
check_url "$BASE_URL/en/dj/" "DJ English" || ((failed++))
check_url "$BASE_URL/de/developer/" "Developer German" || ((failed++))
check_url "$BASE_URL/en/developer/" "Developer English" || ((failed++))
check_url "$BASE_URL/de/impressum" "Impressum DE" || ((failed++))
check_url "$BASE_URL/en/impressum" "Impressum EN" || ((failed++))
echo ""

# Test 2: SEO Files
echo "2. SEO Files"
echo "-------------"
check_url "$BASE_URL/robots.txt" "robots.txt" || ((failed++))
# Sitemap: preview server doesn't serve XML, so check dist/ when local
echo -n "Checking Sitemap... "
if [ "$1" == "local" ]; then
    if ls dist/sitemap*.xml > /dev/null 2>&1; then
        echo "✅ OK (found in dist/)"
    else
        echo "❌ Not found in dist/"
        ((failed++))
    fi
else
    check_url "$BASE_URL/sitemap-index.xml" "Sitemap" || ((failed++))
fi
check_url "$BASE_URL/humans.txt" "humans.txt" || ((failed++))
check_url "$BASE_URL/.well-known/ai-metadata.json" "AI Metadata" || ((failed++))
echo ""

# Test 3: Assets
echo "3. Assets"
echo "-------------"
check_url "$BASE_URL/assets/images/og-image.jpg" "OG Image" || ((failed++))
check_url "$BASE_URL/favicon.svg" "Favicon SVG" || ((failed++))
check_url "$BASE_URL/favicon.ico" "Favicon ICO" || ((failed++))
echo ""

# Test 4: Check for structured data on actual content page
echo "4. Structured Data (checking $CONTENT_URL)"
echo "-------------"
echo -n "Checking for JSON-LD... "
if curl -s "$CONTENT_URL" | grep -q "application/ld+json"; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi

echo -n "Checking for Person schema... "
if curl -s "$CONTENT_URL" | grep -q '"@type":"Person"'; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi

echo -n "Checking for WebSite schema... "
if curl -s "$CONTENT_URL" | grep -q '"@type":"WebSite"'; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi
echo ""

# Test 5: Meta Tags on actual content page
echo "5. Meta Tags (checking $CONTENT_URL)"
echo "-------------"
echo -n "Checking for OG tags... "
if curl -s "$CONTENT_URL" | grep -q "og:title"; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi

echo -n "Checking for Twitter cards... "
if curl -s "$CONTENT_URL" | grep -q "twitter:card"; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi

echo -n "Checking for hreflang... "
if curl -s "$CONTENT_URL" | grep -q "hreflang"; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi
echo ""

# Test 6: Language Support
echo "6. Language Support"
echo "-------------"
echo -n "Checking html lang=de on /de/dj/... "
if curl -s "$BASE_URL/de/dj/" | grep -q 'lang="de"'; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi
echo -n "Checking html lang=en on /en/dj/... "
if curl -s "$BASE_URL/en/dj/" | grep -q 'lang="en"'; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi
echo ""

# Test 7: Performance Hints
echo "7. Performance"
echo "-------------"
echo -n "Checking for preconnect on $CONTENT_URL... "
if curl -s "$CONTENT_URL" | grep -q "preconnect"; then
    echo "✅ Found"
else
    echo "⚠️  No preconnect found"
fi
echo ""

# Test 8: Hreflang correctness
echo "8. Hreflang Verification"
echo "-------------"
echo -n "Checking /de/dj/ hreflang points to /de/dj/... "
if curl -s "$BASE_URL/de/dj/" | grep -q 'hreflang="de"'; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi
echo -n "Checking /de/dj/ hreflang points to /en/dj/... "
if curl -s "$BASE_URL/de/dj/" | grep -q 'hreflang="en"'; then
    echo "✅ Found"
else
    echo "❌ Not found"
    ((failed++))
fi
echo ""

# Test 9: AI Metadata JSON Validity
echo "9. AI Metadata Validation"
echo "-------------"
echo -n "Checking AI metadata JSON... "
ai_metadata=$(curl -s "$BASE_URL/.well-known/ai-metadata.json")
if echo "$ai_metadata" | python3 -m json.tool > /dev/null 2>&1; then
    echo "✅ Valid JSON"
else
    echo "❌ Invalid JSON"
    ((failed++))
fi
echo ""

# Summary
echo "=================================="
echo ""
if [ $failed -eq 0 ]; then
    echo "✅ ALL TESTS PASSED!"
    echo "Your SEO is perfectly configured."
else
    echo "❌ $failed test(s) failed"
    echo "Please review the failures above."
    exit 1
fi

echo ""
echo "=================================="
echo ""
echo "Next Steps:"
echo "1. Submit sitemap to Google Search Console"
echo "2. Test with Google Rich Results: https://search.google.com/test/rich-results?url=$(echo $BASE_URL/de/dj/ | sed 's|http://localhost:4321|https://cemuener.de|')"
echo "3. Test social previews:"
echo "   - Facebook: https://developers.facebook.com/tools/debug/"
echo "   - Twitter: https://cards-dev.twitter.com/validator"
echo "4. Run PageSpeed: https://pagespeed.web.dev/"
echo ""
echo "See SEO_SUBMISSION_GUIDE.md for full instructions."
echo ""
