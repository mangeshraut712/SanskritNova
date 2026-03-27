/**
 * SanskritNova AI - Apple India Inspired JavaScript
 * Modern, clean interactions with Indian cultural elements
 */

// Enhanced Translations with Apple-style simplicity
const TRANSLATIONS = {
  en: {
    welcome: "Namaste! 🙏 I'm your Sanskrit learning assistant. How can I help you today?",
    learnMode: 'Learn',
    analyzeMode: 'Analyze',
    translateMode: 'Translate',
    groundedMode: 'Grounded',
    devanagari: 'Devanagari',
    iast: 'IAST',
    begin: 'Begin',
    transliterate: 'Transliterate',
    introduction: 'Introduction',
    aboutText:
      'SanskritNova bridges ancient Sanskrit wisdom with modern AI technology, featuring Apple-inspired design and Indian cultural heritage.',
    vedicLiterature: 'Vedic Literature',
    aiPowered: 'AI Powered',
    scriptConversion: 'Script Conversion',
    grammarAnalysis: 'Grammar Analysis',
    audioLearning: 'Audio Learning',
    mobileReady: 'Mobile Ready',
    features: [
      'Vedic Literature',
      'AI Powered',
      'Script Conversion',
      'Grammar Analysis',
      'Audio Learning',
      'Mobile Ready',
    ],
    loadingTracks: 'Loading learning tracks...',
    failedTracks: 'Failed to load learning tracks',
    startTrack: 'Start Track',
    downloadTrack: 'Download',
    downloadedTrack: 'Downloaded',
    downloadSuccess: 'Track "{slug}" downloaded for offline use!',
    downloadFailure: 'Download failed. Please try again.',
    trackComingSoon: 'Starting {slug} track - Feature coming soon!',
    speechUnsupported: 'Speech synthesis not supported in this browser',
    connectingWisdom: 'Connecting ancient wisdom to modern minds',
    searchPlaceholder: 'Search Sanskrit or English...',
    clearText: 'Clear',
    pasteText: 'Paste',
    copyText: 'Copy',
    pronounceText: 'Pronounce',
    reverseTransliteration: 'Reverse Transliteration',
    recentTransliterations: 'Recent Transliterations',
    dictionaryTitle: 'Sanskrit-English Dictionary',
    grammarTitle: 'Sanskrit Grammar',
    resourcesTitle: 'Learning Resources',
    demoTitle: 'Interactive Demo',
    watchDemo: 'Watch SanskritNova AI Demo',
    tryFeatures: 'Try These Features:',
    tryTransliteration: 'Try Transliteration',
    startAIChat: 'Start AI Chat',
    grammarAnalysis: 'Grammar Analysis',
    searchDictionary: 'Search Dictionary',
    voiceInput: 'Voice Input',
    backToTop: 'Back to Top',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    info: 'Info',
  },
  hi: {
    welcome: 'नमस्ते! 🙏 मैं आपका संस्कृत शिक्षण सहायक हूँ। मैं आपकी आज कैसे सहायता कर सकता हूँ?',
    learnMode: 'सीखें',
    analyzeMode: 'विश्लेषण',
    translateMode: 'अनुवाद',
    groundedMode: 'आधारित',
    devanagari: 'देवनागरी',
    iast: 'IAST',
    begin: 'शुरू करें',
    transliterate: 'लिप्यन्तरण',
    introduction: 'परिचय',
    aboutText:
      'संस्कृतनोवा प्राचीन संस्कृत ज्ञान को आधुनिक AI तकनीक से जोड़ता है, जिसमें Apple-प्रेरित डिज़ाइन और भारतीय सांस्कृतिक विरासत है।',
    vedicLiterature: 'वैदिक साहित्य',
    aiPowered: 'AI संचालित',
    scriptConversion: 'लिपि रूपांतरण',
    grammarAnalysis: 'व्याकरण विश्लेषण',
    audioLearning: 'ऑडियो लर्निंग',
    mobileReady: 'मोबाइल तैयार',
    features: [
      'वैदिक साहित्य',
      'AI संचालित',
      'लिपि रूपांतरण',
      'व्याकरण विश्लेषण',
      'ऑडियो लर्निंग',
      'मोबाइल तैयार',
    ],
    loadingTracks: 'शिक्षण ट्रैक लोड हो रहे हैं...',
    failedTracks: 'शिक्षण ट्रैक लोड नहीं हो सके',
    startTrack: 'ट्रैक शुरू करें',
    downloadTrack: 'डाउनलोड',
    downloadedTrack: 'डाउनलोड हो गया',
    downloadSuccess: 'ट्रैक "{slug}" ऑफलाइन उपयोग के लिए डाउनलोड हो गया!',
    downloadFailure: 'डाउनलोड असफल रहा। कृपया पुनः प्रयास करें।',
    trackComingSoon: '{slug} ट्रैक शुरू हो रहा है - यह सुविधा जल्द आएगी!',
    speechUnsupported: 'इस ब्राउज़र में स्पीच सिंथेसिस समर्थित नहीं है',
    connectingWisdom: 'प्राचीन ज्ञान को आधुनिक दिमाग से जोड़ना',
    searchPlaceholder: 'संस्कृत या अंग्रेजी खोजें...',
    clearText: 'साफ़ करें',
    pasteText: 'पेस्ट करें',
    copyText: 'कॉपी करें',
    pronounceText: 'उच्चारण करें',
    reverseTransliteration: 'उलटी लिप्यन्तरण',
    recentTransliterations: 'हाल की लिप्यन्तरण',
    dictionaryTitle: 'संस्कृत-अंग्रेजी शब्दकोश',
    grammarTitle: 'संस्कृत व्याकरण',
    resourcesTitle: 'शिक्षण संसाधन',
    demoTitle: 'इंटरैक्टिव डेमो',
    watchDemo: 'संस्कृतनोवा AI डेमो देखें',
    tryFeatures: 'इन सुविधाओं को आज़माएं:',
    tryTransliteration: 'लिप्यन्तरण आज़माएं',
    startAIChat: 'AI चैट शुरू करें',
    grammarAnalysis: 'व्याकरण विश्लेषण',
    searchDictionary: 'शब्दकोश खोजें',
    voiceInput: 'वॉइस इनपुट',
    backToTop: 'शीर्ष पर वापस',
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    info: 'जानकारी',
  },
};

// Apple-inspired Configuration
const CONFIG = {
  apiBase:
    window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
      ? 'http://localhost:8000'
      : '',
  endpoints: {
    chat: '/api/chat',
    grounded: '/api/grounded-answer',
    translit: '/api/transliterate',
    health: '/api/health',
    tracks: '/api/tracks',
    info: '/api/info',
  },
  features: {
    voiceInput: true,
    darkMode: false,
    animations: true,
    offlineMode: true,
    progressiveWebApp: true,
  },
  ui: {
    toastDuration: 3000,
    loadingDelay: 500,
    animationDuration: 300,
    debounceDelay: 300,
  },
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
  mobileMenuOpen: false,
};

// Apple-style Storage Management
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

// Apple-style Toast Notification System
class ToastManager {
  static show(message, type = 'info', duration = CONFIG.ui.toastDuration) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
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
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
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

// Apple-style Loading Manager
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

// Enhanced Voice Recognition with Apple-style UI
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
const modeBtns = document.querySelectorAll('.mode-btn');
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

// Enhanced Chat Functionality with Apple-style animations
async function handleChatSubmit(e) {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  // Add user message with animation
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
        lang: STATE.currentLang,
      }),
    });

    if (!response.ok) {
      throw new Error('Chat request failed');
    }

    const data = await response.json();

    // Remove typing indicator
    removeTypingIndicator();

    // Add bot response with animation
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
    <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
    <div class="message-content">
      <p>${text}</p>
      <div class="message-time">${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
    </div>
  `;

  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;

  // Add Apple-style animation
  messageDiv.style.opacity = '0';
  messageDiv.style.transform = 'translateY(20px)';
  messageDiv.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

  requestAnimationFrame(() => {
    messageDiv.style.opacity = '1';
    messageDiv.style.transform = 'translateY(0)';
  });
}

function addTypingIndicator() {
  const typingDiv = document.createElement('div');
  typingDiv.className = 'message bot typing';
  typingDiv.innerHTML = `
    <div class="message-avatar">🤖</div>
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

// Enhanced Mode Selection with Apple-style transitions
function handleModeSelection(e) {
  const selectedMode = e.currentTarget.dataset.mode;

  // Update button states with smooth transition
  modeBtns.forEach((btn) => {
    const isActive = btn.dataset.mode === selectedMode;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-pressed', isActive);

    // Apple-style transition
    btn.style.transform = isActive ? 'scale(0.95)' : 'scale(1)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 100);
  });

  STATE.activeMode = selectedMode;

  // Add mode-specific welcome message
  const modeMessages = {
    learn: "I'm ready to help you learn Sanskrit! What would you like to explore?",
    analyze: "I'll help you analyze Sanskrit texts and concepts. What would you like to analyze?",
    translate:
      'I can help you translate between Sanskrit and other languages. What needs translation?',
    grounded: "I'll provide answers grounded in authentic Sanskrit texts. What is your question?",
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
      body: JSON.stringify({ text }),
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
  history = history.filter((h) => h.devanagari !== devanagari);

  // Add to beginning
  history.unshift(item);

  // Limit history size
  if (history.length > 10) {
    history = history.slice(0, 10);
  }

  // Save to storage
  StorageManager.set('transliterationHistory', history);

  // Update UI
  updateTransliterationHistory();
}

function updateTransliterationHistory() {
  const historyList = document.getElementById('history-list');
  if (!historyList) return;

  const history = StorageManager.get('transliterationHistory', []);

  historyList.innerHTML = history
    .map(
      (item) => `
    <div class="history-item">
      <div class="history-devanagari">${item.devanagari}</div>
      <div class="history-iast">${item.iast}</div>
    </div>
  `
    )
    .join('');
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
        <button onclick="loadLearningTracks()" class="btn btn-secondary">Retry</button>
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

  tracksContainer.innerHTML = tracks
    .map(
      (track) => `
    <div class="card track-card">
      <div class="card-body">
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
          <button class="btn btn-primary" onclick="startTrack('${track.slug}')">
            ${t('startTrack')}
          </button>
          <button class="btn btn-secondary" onclick="downloadTrack('${track.slug}')">
            ${isTrackDownloaded(track.slug) ? t('downloadedTrack') : t('downloadTrack')}
          </button>
        </div>
      </div>
    </div>
  `
    )
    .join('');
}

function startTrack(slug) {
  // Check if track is available
  if (slug === 'sanskrit-foundations' || slug === 'bhagavad-gita' || slug === 'grammar-lab') {
    ToastManager.info(tf('trackComingSoon', { slug }), 5000);
  } else {
    ToastManager.info('Track not available yet', 3000);
  }
}

function downloadTrack(slug) {
  // Simulate download
  ToastManager.info('Downloading track...');

  setTimeout(() => {
    // Mark as downloaded
    const downloadedTracks = StorageManager.get('downloadedTracks', []);
    if (!downloadedTracks.includes(slug)) {
      downloadedTracks.push(slug);
      StorageManager.set('downloadedTracks', downloadedTracks);
    }

    // Update UI
    displayTracks(window.currentTracks || []);

    ToastManager.success(tf('downloadSuccess', { slug }));
  }, 2000);
}

function isTrackDownloaded(slug) {
  const downloadedTracks = StorageManager.get('downloadedTracks', []);
  return downloadedTracks.includes(slug);
}

// Language Switching with Apple-style transitions
function handleLanguageSwitch(e) {
  const lang = e.target.dataset.lang;

  // Update button states with smooth transition
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    const isActive = btn.dataset.lang === lang;
    btn.classList.toggle('active', isActive);

    // Apple-style transition
    btn.style.transform = isActive ? 'scale(0.95)' : 'scale(1)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 100);
  });

  STATE.currentLang = lang;
  StorageManager.set('preferredLanguage', lang);

  // Update UI text
  updateUIText();

  ToastManager.info(`Language switched to ${lang === 'en' ? 'English' : 'हिन्दी'}`);
}

function updateUIText() {
  // Update all translatable text elements
  document.querySelectorAll('[data-translate]').forEach((element) => {
    const key = element.dataset.translate;
    element.textContent = t(key);
  });
}

// Theme Toggle with Apple-style animation
function toggleTheme() {
  STATE.isDarkMode = !STATE.isDarkMode;

  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');

  if (themeToggle && themeIcon) {
    themeIcon.textContent = STATE.isDarkMode ? '☀️' : '🌙';

    // Apple-style rotation animation
    themeToggle.style.transform = 'rotate(360deg)';
    themeToggle.style.transition = 'transform 0.3s ease';

    setTimeout(() => {
      themeToggle.style.transform = 'rotate(0deg)';
    }, 300);
  }

  document.body.classList.toggle('dark-theme', STATE.isDarkMode);
  StorageManager.set('theme', STATE.isDarkMode ? 'dark' : 'light');
}

// Mobile Menu with Apple-style slide animation
function toggleMobileMenu() {
  const mobileNav = document.getElementById('mobile-nav');
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');

  if (!mobileNav || !mobileMenuToggle) return;

  const isOpen = mobileNav.classList.toggle('active');
  mobileMenuToggle.classList.toggle('active', isOpen);
  STATE.mobileMenuOpen = isOpen;

  // Apple-style animation
  if (isOpen) {
    mobileNav.style.transform = 'translateX(0)';
  } else {
    mobileNav.style.transform = 'translateX(-100%)';
  }
}

// Enhanced UI Interactions
function setupEventListeners() {
  // Chat form
  if (chatForm) {
    chatForm.addEventListener('submit', handleChatSubmit);
  }

  // Mode selection
  modeBtns.forEach((btn) => {
    btn.addEventListener('click', handleModeSelection);
  });

  // Transliteration
  if (translitBtn) {
    translitBtn.addEventListener('click', handleTransliteration);
  }

  if (pronounceBtn) {
    pronounceBtn.addEventListener('click', handlePronunciation);
  }

  // Voice input
  if (voiceBtn) {
    voiceBtn.addEventListener('click', () => voiceRecognition.start());
  }

  // Language switcher
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', handleLanguageSwitch);
  });

  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Mobile menu toggle
  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  }

  // Auto-transliteration on input
  if (translitInput) {
    let timeout;
    translitInput.addEventListener('input', () => {
      clearTimeout(timeout);
      timeout = setTimeout(handleTransliteration, CONFIG.ui.debounceDelay);
    });
  }

  // Keyboard shortcuts
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + K for quick chat focus
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault();
      if (chatInput) chatInput.focus();
    }

    // Escape to close mobile menu
    if (e.key === 'Escape') {
      const mobileNav = document.getElementById('mobile-nav');
      if (mobileNav && mobileNav.classList.contains('active')) {
        toggleMobileMenu();
      }
    }
  });

  // Smooth scroll for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Tab switching for grammar section
  document.querySelectorAll('.tab-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabName = btn.dataset.tab;

      // Update button states
      document.querySelectorAll('.tab-btn').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      // Update content
      document.querySelectorAll('.tab-pane').forEach((pane) => {
        pane.classList.remove('active');
      });

      const targetPane = document.getElementById(tabName);
      if (targetPane) {
        targetPane.classList.add('active');
      }
    });
  });

  // Suggestion chips
  document.querySelectorAll('.suggestion-chip').forEach((chip) => {
    chip.addEventListener('click', () => {
      const query = chip.dataset.query;
      if (chatInput) {
        chatInput.value = query;
        chatInput.focus();
      }
    });
  });

  // Demo buttons
  document.querySelectorAll('[data-demo]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const demo = btn.dataset.demo;
      const targetSection = document.getElementById(demo);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// Initialize application
function initializeApp() {
  // Load saved preferences
  const savedLang = StorageManager.get('preferredLanguage', 'en');
  const savedTheme = StorageManager.get('theme', 'light');

  STATE.currentLang = savedLang;
  STATE.isDarkMode = savedTheme === 'dark';

  // Update language buttons
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === savedLang);
  });

  // Update theme
  if (STATE.isDarkMode) {
    document.body.classList.add('dark-theme');
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) themeIcon.textContent = '☀️';
  }

  // Setup event listeners
  setupEventListeners();

  // Load learning tracks
  loadLearningTracks();

  // Initialize transliteration history
  updateTransliterationHistory();

  // Show welcome message
  setTimeout(() => {
    ToastManager.info('Welcome to SanskritNova AI! 🙏', 5000);
  }, 1000);

  // Check online/offline status
  window.addEventListener('online', () => {
    STATE.isOffline = false;
    ToastManager.success('Back online!');
  });

  window.addEventListener('offline', () => {
    STATE.isOffline = true;
    ToastManager.error('You are offline. Some features may not work.');
  });

  // Initialize service worker for PWA
  if ('serviceWorker' in navigator && CONFIG.features.progressiveWebApp) {
    navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log('Service Worker registered:', registration);
      })
      .catch((error) => {
        console.log('Service Worker registration failed:', error);
      });
  }

  console.log('SanskritNova AI Apple India Edition initialized successfully! 🚀');
}

// Start the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}

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
  handlePronunciation,
  toggleTheme,
  toggleMobileMenu,
};
