const tracks = [
  {
    slug: "sanskrit-foundations",
    title: "Sanskrit Foundations",
    title_hi: "संस्कृत आधार",
    level: "Beginner",
    level_hi: "शुरुआती",
    duration: "2 weeks",
    duration_hi: "2 सप्ताह",
    focus: "Script basics, pronunciation, and essential vocabulary.",
    focus_hi: "लिपि मूल बातें, उच्चारण, और आवश्यक शब्दावली।",
  },
  {
    slug: "gita-guided-reading",
    title: "Bhagavad Gita Guided Reading",
    title_hi: "भगवद् गीता निर्देशित पठन",
    level: "Intermediate",
    level_hi: "मध्यवर्ती",
    duration: "4 weeks",
    duration_hi: "4 सप्ताह",
    focus: "Verse-by-verse study with transliteration and explanation.",
    focus_hi: "लिप्यंतरण और व्याख्या के साथ श्लोक-दर-श्लोक अध्ययन।",
  },
  {
    slug: "grammar-lab",
    title: "Grammar Lab",
    title_hi: "व्याकरण प्रयोगशाला",
    level: "Advanced",
    level_hi: "उन्नत",
    duration: "Ongoing",
    duration_hi: "निरंतर",
    focus: "Sandhi, compounds, morphology, and syntax analysis.",
    focus_hi: "संधि, समास, रूपविज्ञान और वाक्य विश्लेषण।",
  },
];

function transliterateToIAST(text) {
  const independentVowels = {
    "अ": "a", "आ": "ā", "इ": "i", "ी": "ī", "उ": "u", "ऊ": "ū",
    "ऋ": "ṛ", "ॠ": "ṝ", "ऌ": "ḷ", "ॡ": "ḹ", "ए": "e", "ऐ": "ai",
    "ओ": "o", "औ": "au"
  };
  
  const consonants = {
    "क": "k", "ख": "kh", "ग": "g", "घ": "gh", "ङ": "ṅ",
    "च": "c", "छ": "ch", "ज": "j", "झ": "jh", "ञ": "ñ",
    "ट": "ṭ", "ठ": "ṭh", "ड": "ḍ", "ढ": "ḍh", "ण": "ṇ",
    "त": "t", "थ": "th", "द": "d", "ध": "dh", "न": "n",
    "प": "p", "फ": "ph", "ब": "b", "भ": "bh", "म": "m",
    "य": "y", "र": "r", "ल": "l", "व": "v",
    "श": "ś", "ष": "ṣ", "स": "s", "ह": "h"
  };
  
  const vowelSigns = {
    "ा": "ā", "ि": "i", "ी": "ī", "ु": "u", "ू": "ū",
    "ृ": "ṛ", "ॄ": "ṝ", "ॢ": "ḷ", "ॣ": "ḹ",
    "े": "e", "ै": "ai", "ो": "o", "ौ": "au"
  };
  
  const marks = {"ं": "ṃ", "ः": "ḥ", "ँ": "m̐", "ऽ": "'", "।": ".", "॥": ".."};
  const virama = "्";
  
  let output = "";
  let i = 0;
  
  while (i < text.length) {
    const char = text[i];
    
    if (independentVowels[char]) {
      output += independentVowels[char];
      i++;
      continue;
    }
    
    if (consonants[char]) {
      let chunk = consonants[char];
      const nextChar = text[i + 1] || "";
      
      if (nextChar === virama) {
        output += chunk;
        i += 2;
        continue;
      }
      
      if (vowelSigns[nextChar]) {
        output += chunk + vowelSigns[nextChar];
        i += 2;
        continue;
      }
      
      output += chunk + "a";
      i++;
      continue;
    }
    
    if (marks[char]) {
      output += marks[char];
      i++;
      continue;
    }
    
    output += char;
    i++;
  }
  
  return output;
}

exports.handler = async (event, context) => {
  const { httpMethod, path, queryStringParameters, body } = event;
  
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Content-Type': 'application/json'
  };
  
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }
  
  try {
    if (path === '/api/health' && httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ status: 'ok', service: 'sanskritnova-ai-api' })
      };
    }
    
    if (path === '/api/info' && httpMethod === 'GET') {
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          name: 'SanskritNova AI',
          provider: 'openrouter',
          chat_modes: ['learn', 'translate', 'analyze'],
          transliteration: true,
        })
      };
    }
    
    if (path === '/api/tracks' && httpMethod === 'GET') {
      const lang = (queryStringParameters && queryStringParameters.lang) || 'en';
      const tracksData = tracks.map(track => ({
        slug: track.slug,
        title: lang === 'hi' ? track.title_hi : track.title,
        level: lang === 'hi' ? track.level_hi : track.level,
        duration: lang === 'hi' ? track.duration_hi : track.duration,
        focus: lang === 'hi' ? track.focus_hi : track.focus,
      }));
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify(tracksData)
      };
    }
    
    if (path === '/api/transliterate' && httpMethod === 'POST') {
      const { text } = JSON.parse(body || '{}');
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          devanagari: text || '',
          iast: transliterateToIAST(text || ''),
        })
      };
    }
    
    if (path === '/api/chat' && httpMethod === 'POST') {
      const { message, mode = 'learn', lang = 'en' } = JSON.parse(body || '{}');
      
      let reply;
      if (lang === 'hi') {
        reply = `मैं आपकी '${mode}' मोड में सहायता कर रहा हूँ। कृपया OpenRouter API कॉन्फ़िगर करें।`;
      } else {
        reply = `I'm helping you in '${mode}' mode. Please configure OpenRouter API key.`;
      }
      
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          reply,
          model: 'simplified',
          mode,
        })
      };
    }
    
    return {
      statusCode: 404,
      headers,
      body: JSON.stringify({ error: 'Endpoint not found' })
    };
    
  } catch (error) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: error.message })
    };
  }
};
