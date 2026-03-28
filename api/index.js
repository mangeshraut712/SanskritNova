const OPENROUTER_URL =
  process.env.OPENROUTER_BASE_URL || 'https://openrouter.ai/api/v1/chat/completions';

const SYSTEM_PROMPT = `You are SanskritNova AI, an expert Sanskrit learning guide.

Rules:
- Teach with clarity and cultural respect.
- Default to concise explanations unless the learner asks for depth.
- Use Sanskrit examples when helpful and explain them in accessible English.
- When asked to transliterate, provide both Devanagari and Roman transliteration.
- If a claim is uncertain, say so directly instead of inventing details.`;

const tracks = [
  {
    slug: 'sanskrit-foundations',
    title: 'Sanskrit Foundations',
    title_hi: 'संस्कृत आधार',
    level: 'Beginner',
    level_hi: 'शुरुआती',
    duration: '2 weeks',
    duration_hi: '2 सप्ताह',
    focus: 'Script basics, pronunciation, and essential vocabulary.',
    focus_hi: 'लिपि मूल बातें, उच्चारण, और आवश्यक शब्दावली।',
  },
  {
    slug: 'gita-guided-reading',
    title: 'Bhagavad Gita Guided Reading',
    title_hi: 'भगवद् गीता निर्देशित पठन',
    level: 'Intermediate',
    level_hi: 'मध्यवर्ती',
    duration: '4 weeks',
    duration_hi: '4 सप्ताह',
    focus: 'Verse-by-verse study with transliteration and explanation.',
    focus_hi: 'लिप्यंतरण और व्याख्या के साथ श्लोक-दर-श्लोक अध्ययन।',
  },
  {
    slug: 'grammar-lab',
    title: 'Grammar Lab',
    title_hi: 'व्याकरण प्रयोगशाला',
    level: 'Advanced',
    level_hi: 'उन्नत',
    duration: 'Ongoing',
    duration_hi: 'निरंतर',
    focus: 'Sandhi, compounds, morphology, and syntax analysis.',
    focus_hi: 'संधि, समास, रूपविज्ञान और वाक्य विश्लेषण।',
  },
];

function transliterateToIAST(text) {
  const independentVowels = {
    अ: 'a',
    आ: 'ā',
    इ: 'i',
    ई: 'ī',
    उ: 'u',
    ऊ: 'ū',
    ऋ: 'ṛ',
    ॠ: 'ṝ',
    ऌ: 'ḷ',
    ॡ: 'ḹ',
    ए: 'e',
    ऐ: 'ai',
    ओ: 'o',
    औ: 'au',
  };

  const consonants = {
    क: 'k',
    ख: 'kh',
    ग: 'g',
    घ: 'gh',
    ङ: 'ṅ',
    च: 'c',
    छ: 'ch',
    ज: 'j',
    झ: 'jh',
    ञ: 'ñ',
    ट: 'ṭ',
    ठ: 'ṭh',
    ड: 'ḍ',
    ढ: 'ḍh',
    ण: 'ṇ',
    त: 't',
    थ: 'th',
    द: 'd',
    ध: 'dh',
    न: 'n',
    प: 'p',
    फ: 'ph',
    ब: 'b',
    भ: 'bh',
    म: 'm',
    य: 'y',
    र: 'r',
    ल: 'l',
    व: 'v',
    श: 'ś',
    ष: 'ṣ',
    स: 's',
    ह: 'h',
  };

  const vowelSigns = {
    'ा': 'ā',
    'ि': 'i',
    'ी': 'ī',
    'ु': 'u',
    'ू': 'ū',
    'ृ': 'ṛ',
    'ॄ': 'ṝ',
    'ॢ': 'ḷ',
    'ॣ': 'ḹ',
    'े': 'e',
    'ै': 'ai',
    'ो': 'o',
    'ौ': 'au',
  };

  const marks = { 'ं': 'ṃ', 'ः': 'ḥ', 'ँ': 'm̐', ऽ: "'", '।': '.', '॥': '..' };
  const digits = {
    '०': '0',
    '१': '1',
    '२': '2',
    '३': '3',
    '४': '4',
    '५': '5',
    '६': '6',
    '७': '7',
    '८': '8',
    '९': '9',
  };
  const virama = '्';

  let output = '';
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
      const nextChar = text[i + 1] || '';

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

      output += chunk + 'a';
      i++;
      continue;
    }

    if (marks[char]) {
      output += marks[char];
      i++;
      continue;
    }

    if (digits[char]) {
      output += digits[char];
      i++;
      continue;
    }

    if (vowelSigns[char] || char === virama) {
      i++;
      continue;
    }

    output += char;
    i++;
  }

  return output;
}

function modeInstruction(mode, lang = 'en') {
  if (lang === 'hi') {
    if (mode === 'translate') {
      return 'इनपुट को स्पष्ट रूप से अनुवाद करें। बारीकियों को बनाए रखें और लिप्यंतरण शामिल करें।';
    }
    if (mode === 'analyze') {
      return 'संस्कृत व्याकरण, अर्थ और संदर्भ का विश्लेषण करें। इसे पठनीय रखें।';
    }
    return 'उपयोगकर्ता को संस्कृत शिक्षक के रूप में सिखाएं। उदाहरणों का उपयोग करें।';
  }

  if (mode === 'translate') {
    return 'Translate the input clearly. Preserve nuance and include transliteration.';
  }
  if (mode === 'analyze') {
    return 'Analyze the Sanskrit grammar, meaning, and context. Keep it readable.';
  }
  return 'Teach the user as a Sanskrit tutor. Use examples.';
}

function openRouterConfig() {
  return {
    apiKey: (process.env.OPENROUTER_API_KEY || '').trim(),
    model: (process.env.OPENROUTER_MODEL || 'openai/gpt-4.1-mini').trim(),
    referer: (process.env.OPENROUTER_APP_URL || 'https://sanskrit-nova.vercel.app').trim(),
    title: (process.env.OPENROUTER_APP_NAME || 'SanskritNova AI').trim(),
  };
}

function defaultChatReply(mode, lang) {
  if (lang === 'hi') {
    return `मैं आपकी '${mode}' मोड में सहायता कर रहा हूँ। कृपया OpenRouter API कॉन्फ़िगर करें।`;
  }
  return `I'm helping you in '${mode}' mode. Please configure OpenRouter API key.`;
}

function applyCommonHeaders(res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'same-origin');
}

function getPathInfo(req) {
  const parsed = new URL(req.url || '/', 'http://localhost');
  return {
    pathname: parsed.pathname,
    searchParams: parsed.searchParams,
  };
}

async function parseJsonBody(req) {
  if (req.body && typeof req.body === 'object') {
    return req.body;
  }

  if (typeof req.body === 'string') {
    return req.body ? JSON.parse(req.body) : {};
  }

  return await new Promise((resolve, reject) => {
    let raw = '';
    req.on('data', (chunk) => {
      raw += chunk;
    });
    req.on('end', () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

async function openRouterReply({ message, mode, lang }) {
  const config = openRouterConfig();
  if (!config.apiKey) {
    return null;
  }

  const response = await fetch(OPENROUTER_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      'Content-Type': 'application/json',
      'HTTP-Referer': config.referer,
      'X-Title': config.title,
    },
    body: JSON.stringify({
      model: config.model,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'system', content: modeInstruction(mode, lang) },
        { role: 'user', content: message },
      ],
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenRouter request failed with status ${response.status}`);
  }

  const body = await response.json();
  return body?.choices?.[0]?.message?.content?.trim() || null;
}

export default async function handler(req, res) {
  const { method } = req;
  const { pathname, searchParams } = getPathInfo(req);

  applyCommonHeaders(res);

  if (method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (pathname === '/api/health' && method === 'GET') {
    res.status(200).json({ status: 'ok', service: 'sanskritnova-ai-api' });
    return;
  }

  if (pathname === '/api/info' && method === 'GET') {
    res.status(200).json({
      name: 'SanskritNova AI',
      provider: 'openrouter',
      chat_modes: ['learn', 'translate', 'analyze'],
      chat_configured: Boolean(openRouterConfig().apiKey),
      transliteration: true,
    });
    return;
  }

  if (pathname === '/api/tracks' && method === 'GET') {
    const lang = searchParams.get('lang') || 'en';
    const tracksData = tracks.map((track) => ({
      slug: track.slug,
      title: lang === 'hi' ? track.title_hi : track.title,
      level: lang === 'hi' ? track.level_hi : track.level,
      duration: lang === 'hi' ? track.duration_hi : track.duration,
      focus: lang === 'hi' ? track.focus_hi : track.focus,
    }));
    res.status(200).json(tracksData);
    return;
  }

  if (pathname === '/api/transliterate' && method === 'POST') {
    let payload;
    try {
      payload = await parseJsonBody(req);
    } catch {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }

    const text = typeof payload.text === 'string' ? payload.text : '';
    res.status(200).json({
      devanagari: text,
      iast: transliterateToIAST(text),
    });
    return;
  }

  if (pathname === '/api/chat' && method === 'POST') {
    let payload;
    try {
      payload = await parseJsonBody(req);
    } catch {
      res.status(400).json({ error: 'Invalid JSON body' });
      return;
    }

    const message = typeof payload.message === 'string' ? payload.message : '';
    const mode = payload.mode || 'learn';
    const lang = payload.lang || 'en';

    if (!message.trim()) {
      res.status(400).json({ error: 'Message is required' });
      return;
    }

    const config = openRouterConfig();
    if (config.apiKey) {
      try {
        const reply = await openRouterReply({ message, mode, lang });
        res.status(200).json({
          reply: reply || defaultChatReply(mode, lang),
          model: config.model,
          mode,
        });
        return;
      } catch (error) {
        console.error('OpenRouter request failed:', error);
        res.status(502).json({ error: 'OpenRouter request failed' });
        return;
      }
    }

    res.status(200).json({
      reply: defaultChatReply(mode, lang),
      model: 'simplified',
      mode,
    });
    return;
  }

  res.status(404).json({ error: 'Endpoint not found' });
}
