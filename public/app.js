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
const pronounceBtn = document.getElementById('pronounce-btn');
const tracksContainer = document.getElementById('tracks-container');

// Utility Functions
function t(key) {
  return TRANSLATIONS[currentLang][key] || key;
}

function switchLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('language', lang);
  updateUI();
  loadTracks(); // Reload tracks in new language
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
      ? { message, k: 3, lang: currentLang }
      : { message, mode: activeMode, lang: currentLang };

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

// Pronunciation Handler
function handlePronounce() {
  const text = translitResult.textContent.trim();
  if (!text || text === 'No result' || text.startsWith('Error:')) return;

  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US'; // IAST pronunciation
    utterance.rate = 0.7; // Slower for learning
    utterance.pitch = 1.0;

    // Try to find a good voice
    const voices = speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice =>
      voice.lang.startsWith('en') && voice.name.includes('Female')
    ) || voices.find(voice => voice.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    speechSynthesis.speak(utterance);

    // Visual feedback
    pronounceBtn.style.opacity = '0.7';
    utterance.onend = () => {
      pronounceBtn.style.opacity = '1';
    };
  } else {
    alert('Speech synthesis not supported in this browser');
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

if (pronounceBtn) {
  pronounceBtn.addEventListener('click', handlePronounce);
}

// Learning Tracks
async function loadTracks() {
  if (!tracksContainer) return;

  try {
    const response = await fetch(`${CONFIG.apiBase}/api/tracks?lang=${currentLang}`);
    if (!response.ok) throw new Error('Failed to load tracks');

    const tracks = await response.json();
    renderTracks(tracks);
  } catch (error) {
    tracksContainer.innerHTML = '<div class="loading-tracks">Failed to load learning tracks</div>';
    console.error('Tracks loading error:', error);
  }
}

function renderTracks(tracks) {
  if (!tracksContainer) return;

  const tracksHtml = tracks.map(track => `
    <div class="track-card">
      <h3 class="track-title">${track.title}</h3>
      <div class="track-meta">
        <span class="track-level">${track.level}</span>
        <span class="track-duration">${track.duration}</span>
      </div>
      <p class="track-focus">${track.focus}</p>
      <div class="track-actions">
        <button class="track-btn primary" onclick="startTrack('${track.slug}')">
          Start Track
        </button>
        <button class="track-btn" onclick="downloadTrack('${track.slug}', event)">
          📥 Download
        </button>
      </div>
    </div>
  `).join('');

  tracksContainer.innerHTML = tracksHtml;
}

function startTrack(slug) {
  // Navigate to track or open modal
  console.log('Starting track:', slug);
  alert(`Starting ${slug} track - Feature coming soon!`);
}

async function downloadTrack(slug, event) {
  try {
    // Create offline content for the track
    const trackData = {
      slug,
      downloadedAt: new Date().toISOString(),
      lessons: [] // Would be populated from API
    };

    // Store in IndexedDB or localStorage
    const offlineTracks = JSON.parse(localStorage.getItem('offlineTracks') || '{}');
    offlineTracks[slug] = trackData;
    localStorage.setItem('offlineTracks', JSON.stringify(offlineTracks));

    // Show success message
    alert(`Track "${slug}" downloaded for offline use!`);

    // Update button state
    const btn = event?.currentTarget;
    if (btn) {
      btn.textContent = '✓ Downloaded';
      btn.disabled = true;
    }
  } catch (error) {
    console.error('Download failed:', error);
    alert('Download failed. Please try again.');
  }
}

// Language Switcher
const langBtns = document.querySelectorAll('.lang-btn');
langBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    const lang = e.currentTarget.dataset.lang;
    switchLanguage(lang);
    langBtns.forEach(b => b.classList.remove('active'));
    e.currentTarget.classList.add('active');
  });
});

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

// Initialize language from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('language') || 'en';
  if (savedLang !== 'en') {
    switchLanguage(savedLang);
    const btn = document.querySelector(`.lang-btn[data-lang="${savedLang}"]`);
    if (btn) {
      document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    }
  }

  // Load learning tracks
  loadTracks();
});

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}
