#!/bin/bash

API_URL="${API_URL:-http://127.0.0.1:8000}"
FRONTEND_URL="${FRONTEND_URL:-http://127.0.0.1:3000}"

echo "🧪 SanskritNova Website Testing Suite"
echo "=================================="

# Test 1: API Health Check
echo "📡 Testing API Health..."
API_HEALTH=$(curl -s "$API_URL/api/health")
if [[ $API_HEALTH == *"ok"* ]]; then
    echo "✅ API Health: PASSED"
else
    echo "❌ API Health: FAILED"
    echo "Response: $API_HEALTH"
fi

# Test 2: API Tracks Endpoint
echo ""
echo "📚 Testing API Tracks..."
TRACKS_RESPONSE=$(curl -s "$API_URL/api/tracks")
if [[ $TRACKS_RESPONSE == *"sanskrit-foundations"* ]]; then
    echo "✅ API Tracks: PASSED"
    echo "   Found $(echo $TRACKS_RESPONSE | grep -o '"slug"' | wc -l) learning tracks"
else
    echo "❌ API Tracks: FAILED"
fi

# Test 3: API Transliteration
echo ""
echo "🔤 Testing API Transliteration..."
TRANSLIT_RESPONSE=$(curl -s -X POST "$API_URL/api/transliterate" -H "Content-Type: application/json" -d '{"text":"नमस्ते"}')
if [[ $TRANSLIT_RESPONSE == *"namaste"* ]]; then
    echo "✅ API Transliteration: PASSED"
    echo "   नमस्ते → namaste"
else
    echo "❌ API Transliteration: FAILED"
    echo "Response: $TRANSLIT_RESPONSE"
fi

# Test 4: API Chat
echo ""
echo "🤖 Testing API Chat..."
CHAT_RESPONSE=$(curl -s -X POST "$API_URL/api/chat" -H "Content-Type: application/json" -d '{"message":"Hello","mode":"learn"}')
if [[ $CHAT_RESPONSE == *"reply"* ]]; then
    echo "✅ API Chat: PASSED"
    echo "   Chat endpoint responding"
else
    echo "❌ API Chat: FAILED"
    echo "Response: $CHAT_RESPONSE"
fi

# Test 5: Static Website
echo ""
echo "🌐 Testing Static Website..."
WEBSITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/")
if [[ $WEBSITE_STATUS == "200" ]]; then
    echo "✅ Static Website: PASSED"
else
    echo "❌ Static Website: FAILED"
    echo "Status Code: $WEBSITE_STATUS"
fi

# Test 6: CSS Files Loading
echo ""
echo "🎨 Testing CSS Files..."
CSS_FILES=("styles/shared-variables.css" "styles/luxury-styles.css" "styles/luxury-components.css")
for css_file in "${CSS_FILES[@]}"; do
    CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/$css_file")
    if [[ $CSS_STATUS == "200" ]]; then
        echo "✅ $css_file: PASSED"
    else
        echo "❌ $css_file: FAILED (Status: $CSS_STATUS)"
    fi
done

# Test 7: JavaScript Files Loading
echo ""
echo "📜 Testing JavaScript Files..."
JS_FILES=("scripts/luxury-app.js" "scripts/utils.js")
for js_file in "${JS_FILES[@]}"; do
    JS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/$js_file")
    if [[ $JS_STATUS == "200" ]]; then
        echo "✅ $js_file: PASSED"
    else
        echo "❌ $js_file: FAILED (Status: $JS_STATUS)"
    fi
done

# Test 8: PWA Assets
echo ""
echo "📱 Testing PWA Assets..."
PWA_FILES=("manifest.json" "sw.js" "icon-192.svg" "icon-512.svg")
for pwa_file in "${PWA_FILES[@]}"; do
    PWA_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL/$pwa_file")
    if [[ $PWA_STATUS == "200" ]]; then
        echo "✅ $pwa_file: PASSED"
    else
        echo "❌ $pwa_file: FAILED (Status: $PWA_STATUS)"
    fi
done

# Test 9: HTML Structure
echo ""
echo "🏗️ Testing HTML Structure..."
HTML_CONTENT=$(curl -s "$FRONTEND_URL/")
if [[ $HTML_CONTENT == *"luxury-nav"* ]] && [[ $HTML_CONTENT == *"luxury-hero"* ]] && [[ $HTML_CONTENT == *"id=\"tracks\""* ]]; then
    echo "✅ HTML Structure: PASSED"
    echo "   Found navigation, hero, and track sections"
else
    echo "❌ HTML Structure: FAILED"
fi

# Test 10: Product Site Content
echo ""
echo "📖 Testing Product Site Content..."
if [[ $HTML_CONTENT == *"id=\"features\""* ]] && [[ $HTML_CONTENT == *"id=\"chat\""* ]] && [[ $HTML_CONTENT == *"id=\"translit\""* ]] && [[ $HTML_CONTENT == *"id=\"tracks\""* ]]; then
    echo "✅ Product Content: PASSED"
    echo "   Found highlights, tutor, transliteration, and tracks sections"
else
    echo "❌ Product Content: FAILED"
fi

# Test 11: CORS Headers
echo ""
echo "🔐 Testing CORS Headers..."
CORS_HEADERS=$(curl -s -I -H "Origin: $FRONTEND_URL" "$API_URL/api/health" | grep -i "access-control-allow-origin")
if [[ -n $CORS_HEADERS ]]; then
    echo "✅ CORS Headers: PASSED"
else
    echo "❌ CORS Headers: FAILED"
fi

# Test 12: JSON Response Format
echo ""
echo "📋 Testing JSON Response Format..."
JSON_VALID=$(curl -s "$API_URL/api/health" | python3 -m json.tool 2>/dev/null)
if [[ $? -eq 0 ]]; then
    echo "✅ JSON Format: PASSED"
    echo "   API returns valid JSON"
else
    echo "❌ JSON Format: FAILED"
fi

echo ""
echo "=================================="
echo "🎯 Testing Complete!"
echo ""
echo "📊 Test Summary:"
echo "   API Backend: $API_URL"
echo "   Frontend: $FRONTEND_URL"
echo ""
echo "🌐 Open in Browser:"
echo "   Main Site: $FRONTEND_URL"
echo ""
echo "📱 Testing URLs:"
echo "   API Health: $API_URL/api/health"
echo "   API Tracks: $API_URL/api/tracks"
echo "   API Transliterate: $API_URL/api/transliterate"
echo "   API Chat: $API_URL/api/chat"
