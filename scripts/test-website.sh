#!/bin/bash

echo "🧪 SanskritNova Website Testing Suite"
echo "=================================="

# Test 1: API Health Check
echo "📡 Testing API Health..."
API_HEALTH=$(curl -s http://localhost:8000/api/health)
if [[ $API_HEALTH == *"ok"* ]]; then
    echo "✅ API Health: PASSED"
else
    echo "❌ API Health: FAILED"
    echo "Response: $API_HEALTH"
fi

# Test 2: API Tracks Endpoint
echo ""
echo "📚 Testing API Tracks..."
TRACKS_RESPONSE=$(curl -s http://localhost:8000/api/tracks)
if [[ $TRACKS_RESPONSE == *"sanskrit-foundations"* ]]; then
    echo "✅ API Tracks: PASSED"
    echo "   Found $(echo $TRACKS_RESPONSE | grep -o '"slug"' | wc -l) learning tracks"
else
    echo "❌ API Tracks: FAILED"
fi

# Test 3: API Transliteration
echo ""
echo "🔤 Testing API Transliteration..."
TRANSLIT_RESPONSE=$(curl -s -X POST http://localhost:8000/api/transliterate -H "Content-Type: application/json" -d '{"text":"नमस्ते"}')
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
CHAT_RESPONSE=$(curl -s -X POST http://localhost:8000/api/chat -H "Content-Type: application/json" -d '{"message":"Hello","mode":"learn"}')
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
WEBSITE_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/)
if [[ $WEBSITE_STATUS == "200" ]]; then
    echo "✅ Static Website: PASSED"
else
    echo "❌ Static Website: FAILED"
    echo "Status Code: $WEBSITE_STATUS"
fi

# Test 6: Knowledge Base Page
echo ""
echo "📚 Testing Knowledge Base Page..."
KB_STATUS=$(curl -s -o /dev/null -w "%{http_code}" http://localhost:9000/knowledge-base.html)
if [[ $KB_STATUS == "200" ]]; then
    echo "✅ Knowledge Base Page: PASSED"
else
    echo "❌ Knowledge Base Page: FAILED"
    echo "Status Code: $KB_STATUS"
fi

# Test 7: CSS Files Loading
echo ""
echo "🎨 Testing CSS Files..."
CSS_FILES=("luxury-styles.css" "luxury-components.css" "knowledge-base-styles.css")
for css_file in "${CSS_FILES[@]}"; do
    CSS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:9000/$css_file")
    if [[ $CSS_STATUS == "200" ]]; then
        echo "✅ $css_file: PASSED"
    else
        echo "❌ $css_file: FAILED (Status: $CSS_STATUS)"
    fi
done

# Test 8: JavaScript Files Loading
echo ""
echo "📜 Testing JavaScript Files..."
JS_FILES=("luxury-app.js" "knowledge-base-app.js")
for js_file in "${JS_FILES[@]}"; do
    JS_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "http://localhost:9000/$js_file")
    if [[ $JS_STATUS == "200" ]]; then
        echo "✅ $js_file: PASSED"
    else
        echo "❌ $js_file: FAILED (Status: $JS_STATUS)"
    fi
done

# Test 9: HTML Structure
echo ""
echo "🏗️ Testing HTML Structure..."
HTML_CONTENT=$(curl -s http://localhost:9000/)
if [[ $HTML_CONTENT == *"luxury-nav"* ]] && [[ $HTML_CONTENT == *"luxury-hero"* ]]; then
    echo "✅ HTML Structure: PASSED"
    echo "   Found luxury navigation and hero sections"
else
    echo "❌ HTML Structure: FAILED"
fi

# Test 10: Knowledge Base Content
echo ""
echo "📖 Testing Knowledge Base Content..."
KB_CONTENT=$(curl -s http://localhost:9000/knowledge-base.html)
if [[ $KB_CONTENT == *"kb-hero"* ]] && [[ $KB_CONTENT == *"kb-search"* ]]; then
    echo "✅ Knowledge Base Content: PASSED"
    echo "   Found knowledge base hero and search sections"
else
    echo "❌ Knowledge Base Content: FAILED"
fi

# Test 11: CORS Headers
echo ""
echo "🔐 Testing CORS Headers..."
CORS_HEADERS=$(curl -s -I http://localhost:8000/api/health | grep -i "access-control")
if [[ $CORS_HEADERS == *"Access-Control-Allow-Origin"* ]]; then
    echo "✅ CORS Headers: PASSED"
else
    echo "❌ CORS Headers: FAILED"
fi

# Test 12: JSON Response Format
echo ""
echo "📋 Testing JSON Response Format..."
JSON_VALID=$(curl -s http://localhost:8000/api/health | python3 -m json.tool 2>/dev/null)
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
echo "   API Backend: http://localhost:8000"
echo "   Frontend: http://localhost:9000"
echo "   Knowledge Base: http://localhost:9000/knowledge-base.html"
echo ""
echo "🌐 Open in Browser:"
echo "   Main Site: http://localhost:9000"
echo "   Knowledge Base: http://localhost:9000/knowledge-base.html"
echo ""
echo "📱 Testing URLs:"
echo "   API Health: http://localhost:8000/api/health"
echo "   API Tracks: http://localhost:8000/api/tracks"
echo "   API Transliterate: http://localhost:8000/api/transliterate"
echo "   API Chat: http://localhost:8000/api/chat"
