/**
 * SanskritNova AI - Enhanced Components JavaScript
 * Advanced features, animations, and interactions
 */

// Enhanced Translations
const TRANSLATIONS = {
  en: {
    welcome:
      'Welcome to SanskritNova. How may I assist you in your journey of Sanskrit wisdom today?',
    learnMode: 'Learn Mode',
    analyzeMode: 'Analyze Mode',
    translateMode: 'Translate Mode',
    groundedMode: 'Grounded Mode',
    devanagari: 'Devanagari',
    iast: 'IAST',
    begin: 'Begin',
    transliterate: 'Transliterate',
    introduction: 'Introduction',
    aboutText:
      'SanskritNova bridges the ancient wisdom of Sanskrit with modern AI technology. Our platform provides intelligent translation, precise transliteration, grammar analysis, and grounded answers from the vast corpus of Sanskrit literature.',
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
    welcome:
      'संस्कृतनोवा में आपका स्वागत है। आज संस्कृत ज्ञान की यात्रा में मैं आपकी कैसे सहायता कर सकता हूँ?',
    learnMode: 'सीखने की विधा',
    analyzeMode: 'विश्लेषण विधा',
    translateMode: 'अनुवाद विधा',
    groundedMode: 'आधारित विधा',
    devanagari: 'देवनागरी',
    iast: 'IAST',
    begin: 'शुरू करें',
    transliterate: 'लिप्यंतरण करें',
    introduction: 'परिचय',
    aboutText:
      'संस्कृतनोवा संस्कृत की प्राचीन बुद्धिमत्ता को आधुनिक AI तकनीक से जोड़ता है। हमारा मंच बुद्धिमान अनुवाद, सटीक लिप्यंतरण, व्याकरण विश्लेषण और संस्कृत साहित्य के विशाल स्रोतों से आधारित उत्तर प्रदान करता है।',
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
    reverseTransliteration: 'उलटी लिप्यंतरण',
    recentTransliterations: 'हाल की लिप्यंतरण',
    dictionaryTitle: 'संस्कृत-अंग्रेजी शब्दकोश',
    grammarTitle: 'संस्कृत व्याकरण',
    resourcesTitle: 'शिक्षण संसाधन',
    demoTitle: 'इंटरैक्टिव डेमो',
    watchDemo: 'संस्कृतनोवा AI डेमो देखें',
    tryFeatures: 'इन सुविधाओं को आज़माएं:',
    tryTransliteration: 'लिप्यंतरण आज़माएं',
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

// Enhanced Configuration
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
  static show(message = t('loading')) {
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

// Enhanced Voice Recognition
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
      ToastManager.error(t('speechUnsupported'));
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

// Enhanced Transliteration Manager
class TransliterationManager {
  constructor() {
    this.history = StorageManager.get('transliterationHistory', []);
    this.maxHistory = 10;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Transliteration button
    const translitBtn = document.getElementById('translit-btn');
    if (translitBtn) {
      translitBtn.addEventListener('click', () => this.transliterate());
    }

    // Reverse transliteration
    const reverseBtn = document.getElementById('reverse-translit-btn');
    if (reverseBtn) {
      reverseBtn.addEventListener('click', () => this.reverseTransliterate());
    }

    // Clear button
    const clearBtn = document.getElementById('clear-translit');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => this.clear());
    }

    // Paste button
    const pasteBtn = document.getElementById('paste-translit');
    if (pasteBtn) {
      pasteBtn.addEventListener('click', () => this.paste());
    }

    // Copy button
    const copyBtn = document.getElementById('copy-translit-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => this.copy());
    }

    // Pronounce button
    const pronounceBtn = document.getElementById('pronounce-btn');
    if (pronounceBtn) {
      pronounceBtn.addEventListener('click', () => this.pronounce());
    }

    // Auto transliteration on input
    const input = document.getElementById('translit-input');
    if (input) {
      let timeout;
      input.addEventListener('input', () => {
        clearTimeout(timeout);
        timeout = setTimeout(() => this.transliterate(), CONFIG.ui.debounceDelay);
      });
    }
  }

  async transliterate() {
    const input = document.getElementById('translit-input');
    const result = document.getElementById('translit-result');

    if (!input || !result) return;

    const text = input.value.trim();
    if (!text) {
      result.value = '';
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
      result.value = data.iast || text;

      // Add to history
      this.addToHistory(text, data.iast);

      ToastManager.success('Transliteration completed');
    } catch (error) {
      console.error('Transliteration error:', error);
      ToastManager.error('Transliteration failed. Please try again.');
    } finally {
      LoadingManager.hide();
    }
  }

  reverseTransliterate() {
    const input = document.getElementById('translit-input');
    const result = document.getElementById('translit-result');

    if (!input || !result) return;

    // Swap input and result
    const temp = input.value;
    input.value = result.value;
    result.value = temp;

    ToastManager.info('Transliteration reversed');
  }

  clear() {
    const input = document.getElementById('translit-input');
    const result = document.getElementById('translit-result');

    if (input) input.value = '';
    if (result) result.value = '';

    ToastManager.info('Text cleared');
  }

  async paste() {
    try {
      const text = await navigator.clipboard.readText();
      const input = document.getElementById('translit-input');
      if (input) {
        input.value = text;
        this.transliterate();
      }
    } catch (error) {
      ToastManager.error('Failed to paste text');
    }
  }

  async copy() {
    const result = document.getElementById('translit-result');
    if (!result) return;

    try {
      await navigator.clipboard.writeText(result.value);
      ToastManager.success('Text copied to clipboard');
    } catch (error) {
      ToastManager.error('Failed to copy text');
    }
  }

  pronounce() {
    const result = document.getElementById('translit-result');
    if (!result) return;

    const text = result.value.trim();
    if (!text) return;

    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      utterance.rate = 0.8;

      speechSynthesis.speak(utterance);
      ToastManager.info('Pronouncing...');
    } else {
      ToastManager.error(t('speechUnsupported'));
    }
  }

  addToHistory(devanagari, iast) {
    const item = { devanagari, iast, timestamp: Date.now() };

    // Remove duplicates
    this.history = this.history.filter((h) => h.devanagari !== devanagari);

    // Add to beginning
    this.history.unshift(item);

    // Limit history size
    if (this.history.length > this.maxHistory) {
      this.history = this.history.slice(0, this.maxHistory);
    }

    // Save to storage
    StorageManager.set('transliterationHistory', this.history);

    // Update UI
    this.updateHistoryUI();
  }

  updateHistoryUI() {
    const historyList = document.getElementById('history-list');
    if (!historyList) return;

    historyList.innerHTML = '';

    this.history.forEach((item) => {
      const historyItem = document.createElement('div');
      historyItem.className = 'history-item';
      historyItem.innerHTML = `
        <span class="devanagari">${item.devanagari}</span>
        <span class="iast">${item.iast}</span>
      `;

      historyItem.addEventListener('click', () => {
        const input = document.getElementById('translit-input');
        const result = document.getElementById('translit-result');
        if (input) input.value = item.devanagari;
        if (result) result.value = item.iast;
      });

      historyList.appendChild(historyItem);
    });
  }
}

// Enhanced Dictionary Manager
class DictionaryManager {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    const searchInput = document.getElementById('dict-input');
    const searchBtn = document.getElementById('dict-search-btn');

    if (searchInput) {
      searchInput.addEventListener('input', () => this.debounceSearch());
      searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.search();
      });
    }

    if (searchBtn) {
      searchBtn.addEventListener('click', () => this.search());
    }
  }

  debounceSearch() {
    clearTimeout(this.searchTimeout);
    this.searchTimeout = setTimeout(() => this.search(), CONFIG.ui.debounceDelay);
  }

  async search() {
    const input = document.getElementById('dict-input');
    const results = document.getElementById('dictionary-results');

    if (!input || !results) return;

    const query = input.value.trim();
    if (!query) {
      results.innerHTML = '<p class="no-results">Enter a word to search</p>';
      return;
    }

    try {
      LoadingManager.show('Searching dictionary...');

      // Mock dictionary data for now
      const mockResults = this.getMockResults(query);
      this.displayResults(mockResults);
    } catch (error) {
      console.error('Dictionary search error:', error);
      ToastManager.error('Dictionary search failed');
    } finally {
      LoadingManager.hide();
    }
  }

  getMockResults(query) {
    const dictionary = {
      dharma: {
        sanskrit: 'धर्मः',
        phonetic: 'dharmáḥ',
        meanings: ['righteousness, duty, moral law', 'virtue, justice, ethics'],
        examples: ['धर्मो रक्षति रक्षितः - Dharma protects the protected'],
      },
      yoga: {
        sanskrit: 'योगः',
        phonetic: 'yogaḥ',
        meanings: ['union, connection', 'discipline, practice', 'meditation'],
        examples: ['योगश्चित्तवृत्तिनिरोधः - Yoga is the restraint of mental modifications'],
      },
      karma: {
        sanskrit: 'कर्मन्',
        phonetic: 'kárman',
        meanings: ['action, deed', 'fate, destiny', 'ritual act'],
        examples: [
          'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन - You have a right to perform your duty, but not to the fruits',
        ],
      },
    };

    const lowerQuery = query.toLowerCase();
    return dictionary[lowerQuery] || null;
  }

  displayResults(results) {
    const resultsContainer = document.getElementById('dictionary-results');
    if (!resultsContainer) return;

    if (!results) {
      resultsContainer.innerHTML = '<p class="no-results">No results found</p>';
      return;
    }

    const meaningsHtml = results.meanings
      .map((meaning) => `<span class="meaning">${meaning}</span>`)
      .join('');

    const examplesHtml = results.examples
      .map((example) => `<div class="example">${example}</div>`)
      .join('');

    resultsContainer.innerHTML = `
      <div class="result-card">
        <div class="result-sanskrit">${results.sanskrit}</div>
        <div class="result-phonetic">${results.phonetic}</div>
        <div class="result-meanings">
          ${meaningsHtml}
        </div>
        <div class="result-examples">
          ${examplesHtml}
        </div>
      </div>
    `;
  }
}

// Enhanced Grammar Manager
class GrammarManager {
  constructor() {
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach((btn) => {
      btn.addEventListener('click', () => this.switchTab(btn.dataset.tab));
    });

    // Analyze button
    const analyzeBtn = document.getElementById('analyze-grammar-btn');
    if (analyzeBtn) {
      analyzeBtn.addEventListener('click', () => this.analyzeGrammar());
    }

    // Lesson buttons
    const lessonBtns = document.querySelectorAll('.lesson-btn');
    lessonBtns.forEach((btn) => {
      btn.addEventListener('click', () => this.startLesson(btn));
    });
  }

  switchTab(tabName) {
    // Update button states
    document.querySelectorAll('.tab-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });

    // Update content visibility
    document.querySelectorAll('.tab-content').forEach((content) => {
      content.classList.toggle('active', content.id === tabName);
    });
  }

  async analyzeGrammar() {
    const input = document.getElementById('grammar-analysis-input');
    const results = document.getElementById('grammar-analysis-results');

    if (!input || !results) return;

    const text = input.value.trim();
    if (!text) {
      ToastManager.error('Please enter Sanskrit text for analysis');
      return;
    }

    try {
      LoadingManager.show('Analyzing grammar...');

      // Mock grammar analysis
      const analysis = this.mockGrammarAnalysis(text);
      this.displayAnalysis(analysis);
    } catch (error) {
      console.error('Grammar analysis error:', error);
      ToastManager.error('Grammar analysis failed');
    } finally {
      LoadingManager.hide();
    }
  }

  mockGrammarAnalysis(text) {
    return {
      words: [
        { word: 'रामः', type: 'Noun', gender: 'Masculine', case: 'Nominative', number: 'Singular' },
        { word: 'गच्छति', type: 'Verb', tense: 'Present', person: '3rd', number: 'Singular' },
        {
          word: 'सीताम्',
          type: 'Noun',
          gender: 'Feminine',
          case: 'Accusative',
          number: 'Singular',
        },
        { word: 'प्रति', type: 'Preposition', meaning: 'towards' },
      ],
      structure: 'Subject-Object-Verb (SOV)',
      sandhi: 'No sandhi rules applied',
      suggestions: ['Consider using proper sandhi rules', 'Check verb conjugation'],
    };
  }

  displayAnalysis(analysis) {
    const resultsContainer = document.getElementById('grammar-analysis-results');
    if (!resultsContainer) return;

    const wordsHtml = analysis.words
      .map(
        (word) => `
      <div class="word-analysis">
        <strong>${word.word}</strong>
        <span class="word-type">${word.type}</span>
        <div class="word-details">
          ${word.gender ? `<span>Gender: ${word.gender}</span>` : ''}
          ${word.case ? `<span>Case: ${word.case}</span>` : ''}
          ${word.number ? `<span>Number: ${word.number}</span>` : ''}
          ${word.tense ? `<span>Tense: ${word.tense}</span>` : ''}
          ${word.person ? `<span>Person: ${word.person}</span>` : ''}
          ${word.meaning ? `<span>Meaning: ${word.meaning}</span>` : ''}
        </div>
      </div>
    `
      )
      .join('');

    resultsContainer.innerHTML = `
      <div class="grammar-analysis-results">
        <h4>Word Analysis</h4>
        <div class="words-analysis">
          ${wordsHtml}
        </div>
        
        <h4>Sentence Structure</h4>
        <p>${analysis.structure}</p>
        
        <h4>Sandhi Analysis</h4>
        <p>${analysis.sandhi}</p>
        
        <h4>Suggestions</h4>
        <ul>
          ${analysis.suggestions.map((s) => `<li>${s}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  startLesson(btn) {
    const lessonCard = btn.closest('.lesson-card');
    const lessonTitle = lessonCard.querySelector('h4').textContent;

    ToastManager.info(`Starting lesson: ${lessonTitle}`, 5000);
    // In a real implementation, this would open the lesson content
  }
}

// Enhanced UI Manager
class UIManager {
  constructor() {
    this.setupEventListeners();
    this.initializeTheme();
    this.setupScrollEffects();
    this.setupProgressIndicator();
  }

  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileNav = document.getElementById('mobile-nav');

    if (mobileMenuToggle && mobileNav) {
      mobileMenuToggle.addEventListener('click', () => {
        const isOpen = mobileNav.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active', isOpen);
        STATE.mobileMenuOpen = isOpen;
      });
    }

    // Close mobile menu on link click
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    mobileNavLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
        STATE.mobileMenuOpen = false;
      });
    });

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }

    // Back to top button
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Demo buttons
    const demoBtns = document.querySelectorAll('.demo-btn');
    demoBtns.forEach((btn) => {
      btn.addEventListener('click', () => this.handleDemoAction(btn.dataset.demo));
    });

    // Suggestion buttons
    const suggestionBtns = document.querySelectorAll('.suggestion-btn');
    suggestionBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
          chatInput.value = btn.dataset.query;
          chatInput.focus();
        }
      });
    });
  }

  initializeTheme() {
    const savedTheme = StorageManager.get('theme', 'light');
    STATE.isDarkMode = savedTheme === 'dark';
    this.updateTheme();
  }

  toggleTheme() {
    STATE.isDarkMode = !STATE.isDarkMode;
    this.updateTheme();
    StorageManager.set('theme', STATE.isDarkMode ? 'dark' : 'light');
  }

  updateTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.innerHTML = STATE.isDarkMode
        ? '<span class="theme-icon">☀️</span>'
        : '<span class="theme-icon">🌙</span>';
    }

    document.body.classList.toggle('dark-theme', STATE.isDarkMode);
  }

  setupScrollEffects() {
    let ticking = false;

    const updateScrollEffects = () => {
      const scrollY = window.scrollY;

      // Update back to top button visibility
      const backToTop = document.getElementById('back-to-top');
      if (backToTop) {
        backToTop.classList.toggle('visible', scrollY > 500);
      }

      // Update header appearance
      const header = document.querySelector('.header');
      if (header) {
        header.classList.toggle('scrolled', scrollY > 100);
      }

      // Parallax effects for hero elements
      if (CONFIG.features.animations) {
        const heroContent = document.querySelector('.hero-content');
        const heroGlyph = document.querySelector('.hero-glyph');

        if (heroContent) {
          heroContent.style.transform = `translateY(${scrollY * 0.5}px)`;
        }

        if (heroGlyph) {
          heroGlyph.style.transform = `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)`;
        }
      }

      ticking = false;
    };

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateScrollEffects);
        ticking = true;
      }
    });
  }

  setupProgressIndicator() {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      const progressIndicator = document.getElementById('progress-indicator');
      if (progressIndicator) {
        progressIndicator.style.transform = `scaleX(${scrollPercent / 100})`;
      }
    };

    window.addEventListener('scroll', updateProgress);
    updateProgress();
  }

  handleDemoAction(action) {
    switch (action) {
      case 'transliterate':
        document.getElementById('translit')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'chat':
        document.getElementById('chat')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'grammar':
        document.getElementById('grammar')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'dictionary':
        document.getElementById('dictionary')?.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        ToastManager.info(`Demo action: ${action}`);
    }
  }
}

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

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize managers
  const uiManager = new UIManager();
  const voiceRecognition = new VoiceRecognition();
  const transliterationManager = new TransliterationManager();
  const dictionaryManager = new DictionaryManager();
  const grammarManager = new GrammarManager();

  // Store in global scope for access from other scripts
  window.SanskritNova = {
    STATE,
    CONFIG,
    TRANSLATIONS,
    StorageManager,
    ToastManager,
    LoadingManager,
    VoiceRecognition,
    TransliterationManager,
    DictionaryManager,
    GrammarManager,
    UIManager,
    t,
    tf,
  };

  // Show welcome message
  setTimeout(() => {
    ToastManager.info('Welcome to SanskritNova AI! 🕉️', 5000);
  }, 1000);

  // Check if service worker is available
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

  // Initialize offline detection
  window.addEventListener('online', () => {
    STATE.isOffline = false;
    ToastManager.success('Back online!');
  });

  window.addEventListener('offline', () => {
    STATE.isOffline = true;
    ToastManager.error('You are offline. Some features may not work.');
  });

  console.log('SanskritNova AI Enhanced Components initialized successfully! 🚀');
});
