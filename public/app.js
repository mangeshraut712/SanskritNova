/**
 * SanskritNova AI - Enhanced Frontend Application
 * Premium interactions and comprehensive features
 */

// Enhanced Translations
const TRANSLATIONS = {
  en: {
    welcome: "Welcome to SanskritNova. How may I assist you in your journey of Sanskrit wisdom today?",
    learnMode: "Learn Mode",
    analyzeMode: "Analyze Mode", 
    translateMode: "Translate Mode",
    groundedMode: "Grounded Mode",
    devanagari: "Devanagari",
    iast: "IAST",
    begin: "Begin",
    transliterate: "Transliterate",
    introduction: "Introduction",
    aboutText: "SanskritNova bridges the ancient wisdom of Sanskrit with modern AI technology. Our platform provides intelligent translation, precise transliteration, grammar analysis, and grounded answers from the vast corpus of Sanskrit literature.",
    vedicLiterature: "Vedic Literature",
    aiPowered: "AI Powered",
    scriptConversion: "Script Conversion",
    grammarAnalysis: "Grammar Analysis",
    audioLearning: "Audio Learning",
    mobileReady: "Mobile Ready",
    features: ["Vedic Literature", "AI Powered", "Script Conversion", "Grammar Analysis", "Audio Learning", "Mobile Ready"],
    loadingTracks: "Loading learning tracks...",
    failedTracks: "Failed to load learning tracks",
    startTrack: "Start Track",
    downloadTrack: "Download",
    downloadedTrack: "Downloaded",
    downloadSuccess: "Track \"{slug}\" downloaded for offline use!",
    downloadFailure: "Download failed. Please try again.",
    trackComingSoon: "Starting {slug} track - Feature coming soon!",
    speechUnsupported: "Speech synthesis not supported in this browser",
    connectingWisdom: "Connecting ancient wisdom to modern minds",
    searchPlaceholder: "Search Sanskrit or English...",
    clearText: "Clear",
    pasteText: "Paste",
    copyText: "Copy",
    pronounceText: "Pronounce",
    reverseTransliteration: "Reverse Transliteration",
    recentTransliterations: "Recent Transliterations",
    dictionaryTitle: "Sanskrit-English Dictionary",
    grammarTitle: "Sanskrit Grammar",
    resourcesTitle: "Learning Resources",
    demoTitle: "Interactive Demo",
    watchDemo: "Watch SanskritNova AI Demo",
    tryFeatures: "Try These Features:",
    tryTransliteration: "Try Transliteration",
    startAIChat: "Start AI Chat",
    grammarAnalysis: "Grammar Analysis",
    searchDictionary: "Search Dictionary",
    voiceInput: "Voice Input",
    backToTop: "Back to Top",
    loading: "Loading...",
    error: "Error",
    success: "Success",
    info: "Info"
  },
  hi: {
    welcome: "संस्कृतनोवा में आपका स्वागत है। आज संस्कृत ज्ञान की यात्रा में मैं आपकी कैसे सहायता कर सकता हूँ?",
    learnMode: "सीखने की विधा",
    analyzeMode: "विश्लेषण विधा",
    translateMode: "अनुवाद विधा",
    groundedMode: "आधारित विधा",
    devanagari: "देवनागरी",
    iast: "IAST",
    begin: "शुरू करें",
    transliterate: "लिप्यंतरण करें",
    introduction: "परिचय",
    aboutText: "संस्कृतनोवा संस्कृत की प्राचीन बुद्धिमत्ता को आधुनिक AI तकनीक से जोड़ता है। हमारा मंच बुद्धिमान अनुवाद, सटीक लिप्यंतरण, व्याकरण विश्लेषण और संस्कृत साहित्य के विशाल स्रोतों से आधारित उत्तर प्रदान करता है।",
    vedicLiterature: "वैदिक साहित्य",
    aiPowered: "AI संचालित",
    scriptConversion: "लिपि रूपांतरण",
    grammarAnalysis: "व्याकरण विश्लेषण",
    audioLearning: "ऑडियो लर्निंग",
    mobileReady: "मोबाइल तैयार",
    features: ["वैदिक साहित्य", "AI संचालित", "लिपि रूपांतरण", "व्याकरण विश्लेषण", "ऑडियो लर्निंग", "मोबाइल तैयार"],
    loadingTracks: "शिक्षण ट्रैक लोड हो रहे हैं...",
    failedTracks: "शिक्षण ट्रैक लोड नहीं हो सके",
    startTrack: "ट्रैक शुरू करें",
    downloadTrack: "डाउनलोड",
    downloadedTrack: "डाउनलोड हो गया",
    downloadSuccess: "ट्रैक \"{slug}\" ऑफलाइन उपयोग के लिए डाउनलोड हो गया!",
    downloadFailure: "डाउनलोड असफल रहा। कृपया पुनः प्रयास करें।",
    trackComingSoon: "{slug} ट्रैक शुरू हो रहा है - यह सुविधा जल्द आएगी!",
    speechUnsupported: "इस ब्राउज़र में स्पीच सिंथेसिस समर्थित नहीं है",
    connectingWisdom: "प्राचीन ज्ञान को आधुनिक दिमाग से जोड़ना",
    searchPlaceholder: "संस्कृत या अंग्रेजी खोजें...",
    clearText: "साफ़ करें",
    pasteText: "पेस्ट करें",
    copyText: "कॉपी करें",
    pronounceText: "उच्चारण करें",
    reverseTransliteration: "उलटी लिप्यंतरण",
    recentTransliterations: "हाल की लिप्यंतरण",
    dictionaryTitle: "संस्कृत-अंग्रेजी शब्दकोश",
    grammarTitle: "संस्कृत व्याकरण",
    resourcesTitle: "शिक्षण संसाधन",
    demoTitle: "इंटरैक्टिव डेमो",
    watchDemo: "संस्कृतनोवा AI डेमो देखें",
    tryFeatures: "इन सुविधाओं को आज़माएं:",
    tryTransliteration: "लिप्यंतरण आज़माएं",
    startAIChat: "AI चैट शुरू करें",
    grammarAnalysis: "व्याकरण विश्लेषण",
    searchDictionary: "शब्दकोश खोजें",
    voiceInput: "वॉइस इनपुट",
    backToTop: "शीर्ष पर वापस",
    loading: "लोड हो रहा है...",
    error: "त्रुटि",
    success: "सफलता",
    info: "जानकारी"
  }
};

// Enhanced Configuration
const CONFIG = {
  apiBase: window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : '',
  endpoints: {
    chat: '/api/chat',
    grounded: '/api/grounded-answer',
    translit: '/api/transliterate',
    health: '/api/health',
    tracks: '/api/tracks',
    info: '/api/info'
  },
  features: {
    voiceInput: true,
    darkMode: false,
    animations: true,
    offlineMode: true,
    progressiveWebApp: true
  },
  ui: {
    toastDuration: 3000,
    loadingDelay: 500,
    animationDuration: 300,
    debounceDelay: 300
  }
};

// Enhanced State Management
const STATE = {
  activeMode: 'learn',
  currentLang: 'en',
  isDarkMode: false,
  isOffline: false,
  isLoading: false,
  voiceRecognition: null,
  transliterationHistory: [],
  dictionaryResults: [],
  grammarAnalysis: null,
  scrollPosition: 0,
  mobileMenuOpen: false
};

// Enhanced Storage Management
class StorageManager {
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }

  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.warn('Failed to read from localStorage:', error);
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove from localStorage:', error);
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.warn('Failed to clear localStorage:', error);
    }
  }
}

// Enhanced Toast Notification System
class ToastManager {
  static show(message, type = 'info', duration = CONFIG.ui.toastDuration) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
      <div class="toast-content">
        <span class="toast-message">${message}</span>
        <button class="toast-close" aria-label="Close notification">×</button>
      </div>
    `;

    container.appendChild(toast);

    // Auto remove
    const timeout = setTimeout(() => {
      this.remove(toast);
    }, duration);

    // Manual close
    const closeBtn = toast.querySelector('.toast-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        clearTimeout(timeout);
        this.remove(toast);
      });
    }

    return toast;
  }

  static remove(toast) {
    if (toast && toast.parentNode) {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => {
        if (toast.parentNode) {
          toast.parentNode.removeChild(toast);
        }
      }, 300);
    }
  }

  static success(message, duration) {
    return this.show(message, 'success', duration);
  }

  static error(message, duration) {
    return this.show(message, 'error', duration);
  }

  static info(message, duration) {
    return this.show(message, 'info', duration);
  }
}

// Enhanced Loading Manager
class LoadingManager {
  static show(message = 'Loading...') {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.add('active');
      const text = overlay.querySelector('p');
      if (text) text.textContent = message;
    }
    STATE.isLoading = true;
  }

  static hide() {
    const overlay = document.getElementById('loading-overlay');
    if (overlay) {
      overlay.classList.remove('active');
    }
    STATE.isLoading = false;
  }

  static async withLoading(asyncFn, message) {
    this.show(message);
    try {
      const result = await asyncFn();
      return result;
    } finally {
      this.hide();
    }
  }
}

// Voice Recognition Handler
class VoiceRecognition {
  constructor() {
    this.recognition = null;
    this.isSupported = 'webkitSpeechRecognition' in window || 'SpeechRecognition' in window;
    this.isListening = false;
    
    if (this.isSupported) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      this.setupRecognition();
    }
  }

  setupRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = STATE.currentLang === 'hi' ? 'hi-IN' : 'en-US';

    this.recognition.onstart = () => {
      this.isListening = true;
      this.updateUI(true);
      ToastManager.info('Listening... Speak now');
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const chatInput = document.getElementById('chat-input');
      if (chatInput) {
        chatInput.value = transcript;
        chatInput.focus();
      }
      this.stop();
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      let message = 'Voice recognition failed';
      if (event.error === 'no-speech') {
        message = 'No speech detected';
      } else if (event.error === 'not-allowed') {
        message = 'Microphone access denied';
      }
      ToastManager.error(message);
      this.stop();
    };

    this.recognition.onend = () => {
      this.isListening = false;
      this.updateUI(false);
    };
  }

  updateUI(isListening) {
    const voiceBtn = document.getElementById('voice-btn');
    if (voiceBtn) {
      if (isListening) {
        voiceBtn.classList.add('recording');
        voiceBtn.innerHTML = '<span>🔴</span>';
      } else {
        voiceBtn.classList.remove('recording');
        voiceBtn.innerHTML = '<span>🎤</span>';
      }
    }
  }

  start() {
    if (!this.isSupported) {
      ToastManager.error('Speech synthesis not supported in this browser');
      return false;
    }

    if (this.isListening) {
      this.stop();
      return false;
    }

    try {
      this.recognition.start();
      return true;
    } catch (error) {
      console.error('Failed to start speech recognition:', error);
      ToastManager.error('Failed to start voice recognition');
      return false;
    }
  }

  stop() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
    }
  }
}

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
const voiceBtn = document.getElementById('voice-btn');

// Initialize voice recognition
const voiceRecognition = new VoiceRecognition();

// Utility Functions
function t(key, values = {}) {
  return Object.entries(values).reduce(
    (text, [name, value]) => text.replace(`{${name}}`, value),
    TRANSLATIONS[STATE.currentLang][key] || key
  );
}

function tf(key, values = {}) {
  return t(key, values);
}

// Enhanced Chat Functionality
async function handleChatSubmit(e) {
  e.preventDefault();
  
  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message
  addMessage(message, 'user');
  chatInput.value = '';

  // Show typing indicator
  addTypingIndicator();

  try {
    const response = await fetch(CONFIG.apiBase + CONFIG.endpoints.chat, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        mode: STATE.activeMode,
        lang: STATE.currentLang
      })
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    const data = await response.json();
    
    // Remove typing indicator
    removeTypingIndicator();
    
    // Add bot response
    addMessage(data.reply || 'I apologize, but I could not process your request.', 'bot');
    
  } catch (error) {
    console.error('Chat error:', error);
    removeTypingIndicator();
    addMessage('I apologize, but I encountered an error. Please try again.', 'bot');
    ToastManager.error('Failed to send message');
  }
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `message ${sender}`;
  messageDiv.innerHTML = `
    <div class="message-avatar">${sender === 'user' ? '👤' : '🕉️'}</div>
    <div class="message-content">
      <p>${text}</p>
      <div class="message-time">${new Date().toLocaleTimeString()}</div>
    </div>
  `;
  
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Add animation
  messageDiv.style.animation = 'fadeIn 0.3s ease';
}

function addTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot typing';
  typingDiv.innerHTML = `
    <div class="message-avatar">🕉️</div>
    <div class="message-content">
      <div class="typing-indicator">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  `;
  typingDiv.id = 'typing-indicator';
  
  chatMessages.appendChild(typingDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTypingIndicator() {
  const typingIndicator = document.getElementById('typing-indicator');
  if (typingIndicator) {
    typingIndicator.remove();
  }
}

// Enhanced Mode Selection
function handleModeSelection(e) {
  const selectedMode = e.currentTarget.dataset.mode;
  
  // Update active state
  modeCards.forEach(card => {
    card.classList.toggle('active', card.dataset.mode === selectedMode);
    card.setAttribute('aria-pressed', card.dataset.mode === selectedMode);
  });
  
  STATE.activeMode = selectedMode;
  
  // Add mode-specific welcome message
  const modeMessages = {
    learn: "I'm ready to help you learn Sanskrit! What would you like to explore?",
    analyze: "I'll help you analyze Sanskrit texts and concepts. What would you like to analyze?",
    translate: "I can help you translate between Sanskrit and other languages. What needs translation?",
    grounded: "I'll provide answers grounded in authentic Sanskrit texts. What is your question?"
  };
  
  addMessage(modeMessages[selectedMode], 'bot');
}

// Enhanced Transliteration Functionality
async function handleTransliteration() {
  const text = translitInput.value.trim();
  if (!text) {
    ToastManager.error('Please enter text to transliterate');
    return;
  }

  try {
    LoadingManager.show('Transliterating...');
    
    const response = await fetch(CONFIG.apiBase + CONFIG.endpoints.translit, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      throw new Error('Transliteration failed');
    }

    const data = await response.json();
    translitResult.value = data.iast || text;
    
    // Add to history
    addToTransliterationHistory(text, data.iast);
    
    ToastManager.success('Transliteration completed');
  } catch (error) {
    console.error('Transliteration error:', error);
    ToastManager.error('Transliteration failed. Please try again.');
  } finally {
    LoadingManager.hide();
  }
}

function addToTransliterationHistory(devanagari, iast) {
  const item = { devanagari, iast, timestamp: Date.now() };
  
  // Get existing history
  let history = StorageManager.get('transliterationHistory', []);
  
  // Remove duplicates
  history = history.filter(h => h.devanagari !== devanagari);
  
  // Add to beginning
  history.unshift(item);
  
  // Limit history size
  if (history.length > 10) {
    history = history.slice(0, 10);
  }
  
  // Save to storage
  StorageManager.set('transliterationHistory', history);
}

function handlePronunciation() {
  const text = translitResult.value.trim();
  if (!text) {
    ToastManager.error('No text to pronounce');
    return;
  }

  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    
    speechSynthesis.speak(utterance);
    ToastManager.info('Pronouncing...');
  } else {
    ToastManager.error('Speech synthesis not supported in this browser');
  }
}

// Enhanced Learning Tracks
async function loadLearningTracks() {
  try {
    LoadingManager.show('Loading learning tracks...');
    
    const response = await fetch(CONFIG.apiBase + CONFIG.endpoints.tracks);
    
    if (!response.ok) {
      throw new Error('Failed to load tracks');
    }

    const tracks = await response.json();
    displayTracks(tracks);
    
  } catch (error) {
    console.error('Error loading tracks:', error);
    tracksContainer.innerHTML = `
      <div class="error-message">
        <p>Failed to load learning tracks</p>
        <button onclick="loadLearningTracks()" class="retry-btn">Retry</button>
      </div>
    `;
  } finally {
    LoadingManager.hide();
  }
}

function displayTracks(tracks) {
  if (!tracks || tracks.length === 0) {
    tracksContainer.innerHTML = '<p>No learning tracks available at the moment.</p>';
    return;
  }

  tracksContainer.innerHTML = tracks.map(track => `
    <div class="track-card">
      <div class="track-header">
        <h3>${track.name}</h3>
        <span class="track-level">${track.level}</span>
      </div>
      <div class="track-content">
        <p>${track.description}</p>
        <div class="track-stats">
          <span class="stat">📚 ${track.lessons || 0} lessons</span>
          <span class="stat">⏱️ ${track.duration || 'Unknown'}</span>
          <span class="stat">👥 ${track.students || 0} students</span>
        </div>
      </div>
      <div class="track-actions">
        <button class="track-btn primary" onclick="startTrack('${track.slug}')">
          ${t('startTrack')}
        </button>
        <button class="track-btn secondary" onclick="downloadTrack('${track.slug}')">
          ${isTrackDownloaded(track.slug) ? t('downloadedTrack') : t('downloadTrack')}
        </button>
      </div>
    </div>
  `).join('');
}

function startTrack(slug) {
  // Check if track is available
  if (slug === 'sanskrit-foundations' || slug === 'bhagavad-gita' || slug === 'grammar-lab') {
    ToastManager.info(tf('trackComingSoon', { slug }), 5000);
  } else {
    ToastManager.info('Track not available yet', 3000);
  // Navigate to track or open modal
  console.log('Starting track:', slug);
  alert(tf('trackComingSoon', { slug }));
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
    alert(tf('downloadSuccess', { slug }));

    // Update button state
    const btn = event?.currentTarget;
    if (btn) {
      btn.textContent = `✓ ${t('downloadedTrack')}`;
      btn.disabled = true;
    }
  } catch (error) {
    console.error('Download failed:', error);
    alert(t('downloadFailure'));
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

// Scroll Reveal Animation
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.section, .track-card, .translit-card');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal');
        entry.target.classList.add('active');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => {
    el.classList.add('reveal');
    revealObserver.observe(el);
  });
}

// Parallax Effect for Mandala
function initParallaxEffect() {
  const mandala = document.querySelector('.mandala');
  if (!mandala) return;

  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.05;
        mandala.style.transform = `translate(-50%, -50%) rotate(${rate}deg)`;
        ticking = false;
      });
      ticking = true;
    }
  });
}

// Language switching function
function switchLanguage(lang) {
  STATE.currentLang = lang;
  localStorage.setItem('language', lang);
  document.documentElement.lang = lang;
  
  // Update all translatable text
  document.querySelectorAll('[data-translate]').forEach(element => {
    const key = element.dataset.translate;
    element.textContent = t(key);
  });
}

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
  loadLearningTracks();

  // Initialize scroll reveal animations
  initScrollReveal();

  // Initialize parallax effect for mandala
  initParallaxEffect();
});

// Export for use in other scripts
window.SanskritNova = {
  STATE,
  CONFIG,
  TRANSLATIONS,
  StorageManager,
  ToastManager,
  LoadingManager,
  VoiceRecognition,
  t,
  tf,
  loadLearningTracks,
  startTrack,
  downloadTrack,
  handleChatSubmit,
  handleTransliteration,
  handlePronunciation
};
}
