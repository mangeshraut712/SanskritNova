/**
 * SanskritNova AI - Luxury Indian Ancient Inspired Frontend
 */

// Translations
const TRANSLATIONS = {
  en: {
    welcome: "स्वागतं भवतः। SanskritNova awaits your inquiry. How shall we explore the depths of Sanskrit wisdom together?",
    learnMode: "Learn Mode",
    analyzeMode: "Analyze Mode",
    translateMode: "Translate Mode",
    groundedMode: "Grounded Mode",
    devanagari: "Devanagari",
    iast: "IAST",
    begin: "Begin",
    transliterate: "Transliterate",
    introduction: "Introduction",
    vedicLiterature: "Vedic Literature",
    aiPowered: "AI Powered",
    scriptConversion: "Script Conversion",
    connectingWisdom: "Connecting ancient wisdom to modern minds"
  },
  hi: {
    welcome: "स्वागत है। संस्कृतनोवा आपके प्रश्न का इंतजार कर रहा है। आइए हम साथ मिलकर संस्कृत ज्ञान की गहराइयों का अन्वेषण करें।",
    learnMode: "सीखने की विधा",
    analyzeMode: "विश्लेषण विधा",
    translateMode: "अनुवाद विधा",
    groundedMode: "आधारित विधा",
    devanagari: "देवनागरी",
    iast: "IAST",
    begin: "शुरू करें",
    transliterate: "लिप्यंतरण करें",
    introduction: "परिचय",
    vedicLiterature: "वैदिक साहित्य",
    aiPowered: "AI संचालित",
    scriptConversion: "लिपि रूपांतरण",
    connectingWisdom: "प्राचीन ज्ञान को आधुनिक दिमाग से जोड़ना"
  }
};

// Configuration
const CONFIG = {
  apiBase: window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : '',
  endpoints: {
    chat: '/api/chat',
    grounded: '/api/grounded-answer',
    translit: '/api/transliterate',
    health: '/api/health'
  }
};

// State
let activeMode = 'learn';
let currentLang = 'en';

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const modeCards = document.querySelectorAll('.mode-card');
const translitInput = document.getElementById('translit-input');
const translitBtn = document.getElementById('translit-btn');
const translitResult = document.getElementById('translit-result');

// Utility Functions
function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  updateUI();
}

function updateUI() {
  // Update welcome message
  const welcomeMsg = document.querySelector('.message.bot p');
  if (welcomeMsg) {
    welcomeMsg.textContent = t('welcome');
  }

  // Update mode cards
  const modes = [
    { id: 'learn', key: 'learnMode' },
    { id: 'analyze', key: 'analyzeMode' },
    { id: 'translate', key: 'translateMode' },
    { id: 'grounded', key: 'groundedMode' }
  ];
  modes.forEach(mode => {
    const card = document.querySelector(`.mode-card[data-mode="${mode.id}"] .mode-info h3`);
    if (card) card.textContent = t(mode.key);
  });

  // Update transliteration labels
  const devLabel = document.querySelector('.translit-input-group label');
  if (devLabel) devLabel.textContent = t('devanagari');

  const iastLabel = document.querySelector('.translit-output-group label');
  if (iastLabel) iastLabel.textContent = t('iast');

  // Update buttons
  const beginBtn = document.querySelector('.btn-primary span:first-child');
  if (beginBtn) beginBtn.textContent = t('begin');

  const translitBtnText = document.querySelector('.translit-btn span:first-child');
  if (translitBtnText) translitBtnText.textContent = t('transliterate');

  // Update about section
  const aboutTitle = document.querySelector('.about-title');
  if (aboutTitle) aboutTitle.textContent = t('introduction');

  const aboutText = document.querySelector('.about-text');
  if (aboutText) {
    aboutText.innerHTML = `SanskritNova bridges the ancient wisdom of Sanskrit with modern AI technology.
    Our platform provides intelligent translation, precise transliteration, and
    grounded answers from the vast corpus of Sanskrit literature.`;
  }

  const features = document.querySelectorAll('.feature-text');
  features.forEach(feature => {
    if (feature.textContent.includes('Vedic Literature')) feature.textContent = t('vedicLiterature');
    if (feature.textContent.includes('AI Powered')) feature.textContent = t('aiPowered');
    if (feature.textContent.includes('Script Conversion')) feature.textContent = t('scriptConversion');
  });

  const footerSub = document.querySelector('.footer-sub');
  if (footerSub) footerSub.textContent = t('connectingWisdom');
}

// Utility Functions
function showTyping() {
  const typingEl = document.createElement('div');
  typingEl.className = 'message bot typing';
  typingEl.innerHTML = `
    <div class="message-avatar">🕉️</div>
    <div class="message-content">
      <p class="typing-dots"><span>.</span><span>.</span><span>.</span></p>
    </div>
  `;
  chatMessages.appendChild(typingEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingEl;
}

function hideTyping(typingEl) {
  if (typingEl && typingEl.parentNode) {
    typingEl.parentNode.removeChild(typingEl);
  }
}

function addMessage(content, role) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${role}`;

  const avatar = role === 'bot' ? '🕉️' : '🙏';
  messageEl.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <p>${escapeHtml(content)}</p>
    </div>
  `;

  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function apiCall(endpoint, data) {
  const response = await fetch(`${CONFIG.apiBase}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const body = await response.text();
    let errorMessage = 'Request failed';
    if (body) {
      try {
        const error = JSON.parse(body);
        errorMessage = error.detail || error.message || errorMessage;
      } catch {
        errorMessage = body;
      }
    }
    throw new Error(errorMessage);
  }

  return response.json();
}

// Chat Handlers
async function handleChatSubmit(e) {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');

  const typingEl = showTyping();

  try {
    const endpoint = activeMode === 'grounded' ? CONFIG.endpoints.grounded : CONFIG.endpoints.chat;
    const payload = activeMode === 'grounded'
      ? { message, k: 3 }
      : { message, mode: activeMode };

    const response = await apiCall(endpoint, payload);
    chatInput.value = '';
    hideTyping(typingEl);

    addMessage(response.reply, 'bot');

    if (activeMode === 'grounded' && response.sources?.length) {
      const sources = response.sources.map(s => `${s.source}#${s.chunk_id}`).join(', ');
      addMessage(`Sources: ${sources}`, 'bot');
    }
  } catch (error) {
    hideTyping(typingEl);
    addMessage(`Error: ${error.message}`, 'bot');
  }
}

// Mode Selection
function handleModeChange(e) {
  const card = e.currentTarget;
  const mode = card.dataset.mode;
  if (!mode) return;

  activeMode = mode;
  modeCards.forEach((modeCard) => {
    const isActive = modeCard === card;
    modeCard.classList.toggle('active', isActive);
    modeCard.setAttribute('aria-pressed', String(isActive));
  });
}

// Transliteration Handler
async function handleTranslit() {
  const text = translitInput.value.trim();
  if (!text) return;

  translitResult.classList.add('loading');

  try {
    const response = await apiCall(CONFIG.endpoints.translit, { text });
    translitResult.textContent = response.iast || 'No result';
  } catch (error) {
    translitResult.textContent = `Error: ${error.message}`;
  } finally {
    translitResult.classList.remove('loading');
  }
}

// Event Listeners
if (chatForm) {
  chatForm.addEventListener('submit', handleChatSubmit);
}

modeCards.forEach(card => {
  card.addEventListener('click', handleModeChange);
});

if (translitBtn) {
  translitBtn.addEventListener('click', handleTranslit);
}

if (translitInput) {
  translitInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleTranslit();
    }
  });
}

// Check API health on load
fetch(`${CONFIG.apiBase}${CONFIG.endpoints.health}`)
  .then(res => {
    if (res.ok) {
      console.log('✓ API Connected');
    }
  })
  .catch(() => console.log('Running in offline mode'));

// Add smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
