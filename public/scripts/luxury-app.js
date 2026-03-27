/* SanskritNova AI - Luxury JavaScript Application */
/* Premium interactions with royal elegance and smooth animations */

// ============================================
// API CONFIGURATION
// ============================================
const API_BASE_URL = window.location.hostname === 'localhost' ? 
  'http://localhost:8000' : 
  'https://sanskrit-nova.vercel.app';

// ============================================
// LUXURY APPLICATION STATE
// ============================================
const LuxuryApp = {
  // Application state
  state: {
    currentLanguage: 'en',
    currentTheme: 'light',
    isMobileMenuOpen: false,
    isLoading: false,
    translations: {},
    chatHistory: [],
    transliterationHistory: [],
    currentChatMode: 'learn',
    currentGrammarTab: 'basics',
    voiceRecognition: null,
    speechSynthesis: null
  },

  // DOM element references
  elements: {},

  // Initialize application
  init() {
    this.cacheElements();
    this.initializeEventListeners();
    this.initializeSpeechAPI();
    this.loadTranslations();
    this.initializeTheme();
    this.startAnimations();
    console.log('🌟 SanskritNova Luxury App Initialized');
  },

  // Cache DOM elements
  cacheElements() {
    this.elements = {
      // Navigation
      nav: document.querySelector('.luxury-nav'),
      mobileMenuToggle: document.getElementById('mobile-menu-toggle'),
      mobileNav: document.getElementById('mobile-nav'),
      themeToggle: document.getElementById('theme-toggle'),
      themeIcon: document.getElementById('theme-icon'),
      langButtons: document.querySelectorAll('.luxury-lang-btn'),
      navLinks: document.querySelectorAll('.luxury-nav-link, .luxury-mobile-nav-link'),

      // Hero
      startJourneyBtn: document.getElementById('start-journey'),
      exploreFeaturesBtn: document.getElementById('explore-features'),

      // Chat
      chatContainer: document.getElementById('chat-messages'),
      chatInput: document.getElementById('chat-input'),
      sendBtn: document.getElementById('send-btn'),
      voiceBtn: document.getElementById('voice-btn'),
      modeButtons: document.querySelectorAll('.luxury-mode-btn'),
      suggestionChips: document.querySelectorAll('.luxury-suggestion-chip'),

      // Transliteration
      translitForm: document.getElementById('translit-form'),
      inputText: document.getElementById('input-text'),
      outputText: document.getElementById('output-text'),
      transliterateBtn: document.getElementById('transliterate-btn'),
      swapScriptBtn: document.getElementById('swap-script'),
      copyOutputBtn: document.getElementById('copy-output'),
      speakOutputBtn: document.getElementById('speak-output'),
      clearOutputBtn: document.getElementById('clear-output'),
      translitHistory: document.getElementById('translit-history'),

      // Dictionary
      dictSearch: document.getElementById('dict-search'),
      dictSearchBtn: document.getElementById('dict-search-btn'),
      dictResults: document.getElementById('dict-results'),

      // Grammar
      tabButtons: document.querySelectorAll('.luxury-tab-btn'),
      tabPanes: document.querySelectorAll('.luxury-tab-pane'),

      // Loading and Toasts
      loadingOverlay: document.getElementById('loading-overlay'),
      toastContainer: document.getElementById('toast-container')
    };
  },

  // ============================================
  // EVENT LISTENERS
  // ============================================
  initializeEventListeners() {
    // Mobile menu
    this.elements.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());
    
    // Theme toggle
    this.elements.themeToggle?.addEventListener('click', () => this.toggleTheme());
    
    // Language switcher
    this.elements.langButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchLanguage(e.target.dataset.lang));
    });

    // Navigation smooth scroll
    this.elements.navLinks.forEach(link => {
      link.addEventListener('click', (e) => this.handleNavigation(e));
    });

    // Hero actions
    this.elements.startJourneyBtn?.addEventListener('click', () => this.startJourney());
    this.elements.exploreFeaturesBtn?.addEventListener('click', () => this.scrollToFeatures());

    // Chat functionality
    this.elements.sendBtn?.addEventListener('click', () => this.sendChatMessage());
    this.elements.chatInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendChatMessage();
      }
    });

    // Voice input
    this.elements.voiceBtn?.addEventListener('click', () => this.toggleVoiceRecognition());

    // Chat modes
    this.elements.modeButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchChatMode(e.target.dataset.mode));
    });

    // Suggestion chips
    this.elements.suggestionChips.forEach(chip => {
      chip.addEventListener('click', (e) => this.useSuggestion(e.target.textContent));
    });

    // Transliteration
    this.elements.transliterateBtn?.addEventListener('click', () => this.transliterate());
    this.elements.swapScriptBtn?.addEventListener('click', () => this.swapScript());
    this.elements.copyOutputBtn?.addEventListener('click', () => this.copyOutput());
    this.elements.speakOutputBtn?.addEventListener('click', () => this.speakText());
    this.elements.clearOutputBtn?.addEventListener('click', () => this.clearTransliteration());

    // Auto-transliteration on input
    this.elements.inputText?.addEventListener('input', this.debounce(() => this.autoTransliterate(), 500));

    // Dictionary search
    this.elements.dictSearchBtn?.addEventListener('click', () => this.searchDictionary());
    this.elements.dictSearch?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.searchDictionary();
    });

    // Grammar tabs
    this.elements.tabButtons.forEach(btn => {
      btn.addEventListener('click', (e) => this.switchGrammarTab(e.target.dataset.tab));
    });

    // Intersection Observer for animations
    this.initializeIntersectionObserver();
  },

  // ============================================
  // NAVIGATION & MOBILE MENU
  // ============================================
  toggleMobileMenu() {
    this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
    this.elements.mobileNav.classList.toggle('active');
    this.elements.mobileMenuToggle.classList.toggle('active');
    
    // Animate menu items
    if (this.state.isMobileMenuOpen) {
      this.animateMenuItems();
    }
  },

  animateMenuItems() {
    const items = this.elements.mobileNav.querySelectorAll('.luxury-mobile-nav-link');
    items.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'translateX(-20px)';
      setTimeout(() => {
        item.style.transition = 'all 0.3s ease';
        item.style.opacity = '1';
        item.style.transform = 'translateX(0)';
      }, index * 100);
    });
  },

  handleNavigation(e) {
    e.preventDefault();
    const targetId = e.target.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);
    
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Close mobile menu if open
      if (this.state.isMobileMenuOpen) {
        this.toggleMobileMenu();
      }
    }
  },

  // ============================================
  // THEME MANAGEMENT
  // ============================================
  initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.state.currentTheme = savedTheme;
    this.applyTheme(savedTheme);
  },

  toggleTheme() {
    const newTheme = this.state.currentTheme === 'light' ? 'dark' : 'light';
    this.state.currentTheme = newTheme;
    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Animate theme toggle
    this.elements.themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
    setTimeout(() => {
      this.elements.themeToggle.style.transform = 'scale(1) rotate(0deg)';
    }, 300);
  },

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.elements.themeIcon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.elements.themeIcon.textContent = '🌙';
    }
  },

  // ============================================
  // LANGUAGE MANAGEMENT
  // ============================================
  switchLanguage(lang) {
    this.state.currentLanguage = lang;
    
    // Update active button
    this.elements.langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    // Update content
    this.updateContentLanguage(lang);
    
    // Show toast
    this.showToast(`Language switched to ${lang === 'en' ? 'English' : 'हिन्दी'}`, 'success');
  },

  updateContentLanguage(lang) {
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach(element => {
      const key = element.getAttribute('data-translate');
      if (this.state.translations[key] && this.state.translations[key][lang]) {
        element.textContent = this.state.translations[key][lang];
      }
    });
  },

  async loadTranslations() {
    this.state.translations = {
      app_title: {
        en: 'SanskritNova',
        hi: 'संस्कृतनवा'
      },
      chat_placeholder: {
        en: 'Type your message in Sanskrit or English...',
        hi: 'संस्कृत या अंग्रेजी में अपना संदेश टाइप करें...'
      },
      translit_placeholder: {
        en: 'Type or paste Sanskrit text in Devanagari or IAST...',
        hi: 'देवनागरी या IAST में संस्कृत पाठ टाइप करें या पेस्ट करें...'
      },
      dict_placeholder: {
        en: 'Search Sanskrit words...',
        hi: 'संस्कृत शब्द खोजें...'
      }
    };
  },

  // ============================================
  // CHAT FUNCTIONALITY
  // ============================================
  switchChatMode(mode) {
    this.state.currentChatMode = mode;
    
    // Update active button
    this.elements.modeButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });
    
    // Add mode message
    const modeMessages = {
      learn: 'Switched to Learning mode. I will help you learn Sanskrit concepts.',
      translate: 'Switched to Translation mode. I can translate between Sanskrit and English.',
      analyze: 'Switched to Analysis mode. I can analyze Sanskrit grammar and structure.'
    };
    
    this.addMessage(modeMessages[mode], 'ai');
  },

  async sendChatMessage() {
    const message = this.elements.chatInput.value.trim();
    if (!message) return;

    // Add user message
    this.addMessage(message, 'user');
    
    // Clear input
    this.elements.chatInput.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Call real API
      const response = await this.sendChatMessageApi(message, this.state.currentChatMode);
      this.hideTypingIndicator();
      this.addMessage(response.reply, 'ai');
    } catch (error) {
      this.hideTypingIndicator();
      // Fallback to simulated response if API fails
      const fallbackResponse = this.generateAIResponse(message);
      this.addMessage(fallbackResponse, 'ai');
      this.showToast('Using offline mode', 'warning');
    }
  },

  addMessage(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.className = `luxury-message ${sender}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageElement.innerHTML = `
      <div class="luxury-message-content">${message}</div>
      <div class="luxury-message-time">${time}</div>
    `;
    
    this.elements.chatContainer.appendChild(messageElement);
    this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
    
    // Add to history
    this.state.chatHistory.push({ message, sender, time });
    
    // Animate message
    messageElement.style.opacity = '0';
    messageElement.style.transform = 'translateY(20px)';
    setTimeout(() => {
      messageElement.style.transition = 'all 0.3s ease';
      messageElement.style.opacity = '1';
      messageElement.style.transform = 'translateY(0)';
    }, 10);
  },

  generateAIResponse(message) {
    const responses = {
      learn: [
        "That's an excellent question! In Sanskrit, this concept is beautifully expressed through...",
        "Let me explain this fundamental concept in Sanskrit philosophy...",
        "This is one of the most important principles in Sanskrit grammar..."
      ],
      translate: [
        "The translation of this would be: [Translation would appear here]",
        "In Sanskrit, this can be expressed as: [Sanskrit translation]",
        "The most accurate translation would be: [Translation]"
      ],
      analyze: [
        "Grammatically, this follows the pattern of [grammatical analysis]",
        "The structure here shows [structural analysis]",
        "From a linguistic perspective, this demonstrates [analysis]"
      ]
    };
    
    const modeResponses = responses[this.state.currentChatMode] || responses.learn;
    return modeResponses[Math.floor(Math.random() * modeResponses.length)];
  },

  showTypingIndicator() {
    const indicator = document.createElement('div');
    indicator.className = 'luxury-message ai typing-indicator';
    indicator.innerHTML = `
      <div class="luxury-message-content">
        <span class="typing-dots">
          <span>.</span><span>.</span><span>.</span>
        </span>
      </div>
    `;
    
    this.elements.chatContainer.appendChild(indicator);
    this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;
  },

  hideTypingIndicator() {
    const indicator = this.elements.chatContainer.querySelector('.typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  },

  useSuggestion(suggestion) {
    this.elements.chatInput.value = suggestion;
    this.elements.chatInput.focus();
  },

  // ============================================
  // VOICE RECOGNITION
  // ============================================
  initializeSpeechAPI() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.state.voiceRecognition = new SpeechRecognition();
      this.setupVoiceRecognition();
    }

    if ('speechSynthesis' in window) {
      this.state.speechSynthesis = window.speechSynthesis;
    }
  },

  setupVoiceRecognition() {
    const recognition = this.state.voiceRecognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      this.elements.voiceBtn.classList.add('recording');
      this.elements.voiceBtn.innerHTML = '🔴';
      this.showToast('Voice recognition started', 'info');
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.elements.chatInput.value = transcript;
      this.showToast('Voice input captured', 'success');
    };

    recognition.onerror = (event) => {
      console.error('Voice recognition error:', event.error);
      this.showToast('Voice recognition failed', 'error');
      this.elements.voiceBtn.classList.remove('recording');
      this.elements.voiceBtn.innerHTML = '🎤';
    };

    recognition.onend = () => {
      this.elements.voiceBtn.classList.remove('recording');
      this.elements.voiceBtn.innerHTML = '🎤';
    };
  },

  toggleVoiceRecognition() {
    if (!this.state.voiceRecognition) {
      this.showToast('Voice recognition not supported', 'error');
      return;
    }

    if (this.elements.voiceBtn.classList.contains('recording')) {
      this.state.voiceRecognition.stop();
    } else {
      this.state.voiceRecognition.start();
    }
  },

  // ============================================
  // TRANSLITERATION
  // ============================================
  async transliterate() {
    const input = this.elements.inputText.value.trim();
    if (!input) {
      this.showToast('Please enter text to transliterate', 'warning');
      return;
    }

    try {
      // Call real API
      const response = await this.transliterateText(input);
      this.elements.outputText.value = response.iast;
      this.addToTransliterationHistory(input, response.iast);
      this.showToast('Transliteration completed', 'success');
    } catch (error) {
      // Fallback to local transliteration if API fails
      const output = this.performTransliteration(input);
      this.elements.outputText.value = output;
      this.addToTransliterationHistory(input, output);
      this.showToast('Using offline transliteration', 'warning');
    }
  },

  performTransliteration(text) {
    // Simple transliteration logic (in real app, this would call an API)
    const transliterationMap = {
      'अ': 'a', 'आ': 'ā', 'इ': 'i', 'ई': 'ī', 'उ': 'u', 'ऊ': 'ū',
      'ऋ': 'ṛ', 'ॠ': 'ṝ', 'ऌ': 'ḷ', 'ॡ': 'ḹ',
      'ए': 'e', 'ऐ': 'ai', 'ओ': 'o', 'औ': 'au',
      'ं': 'ṃ', 'ः': 'ḥ',
      'क': 'ka', 'ख': 'kha', 'ग': 'ga', 'घ': 'gha', 'ङ': 'ṅa',
      'च': 'ca', 'छ': 'cha', 'ज': 'ja', 'झ': 'jha', 'ञ': 'ña',
      'ट': 'ṭa', 'ठ': 'ṭha', 'ड': 'ḍa', 'ढ': 'ḍha', 'ण': 'ṇa',
      'त': 'ta', 'थ': 'tha', 'द': 'da', 'ध': 'dha', 'न': 'na',
      'प': 'pa', 'फ': 'pha', 'ब': 'ba', 'भ': 'bha', 'म': 'ma',
      'य': 'ya', 'र': 'ra', 'ल': 'la', 'व': 'va',
      'श': 'śa', 'ष': 'ṣa', 'स': 'sa', 'ह': 'ha'
    };

    let result = text;
    for (const [devanagari, iast] of Object.entries(transliterationMap)) {
      result = result.replace(new RegExp(devanagari, 'g'), iast);
    }
    
    return result;
  },

  autoTransliterate() {
    const input = this.elements.inputText.value.trim();
    if (input) {
      const output = this.performTransliteration(input);
      this.elements.outputText.value = output;
    }
  },

  swapScript() {
    const input = this.elements.inputText.value;
    const output = this.elements.outputText.value;
    
    this.elements.inputText.value = output;
    this.elements.outputText.value = input;
    
    // Animate swap
    this.elements.translitForm.style.transform = 'scale(0.98)';
    setTimeout(() => {
      this.elements.translitForm.style.transform = 'scale(1)';
    }, 200);
  },

  copyOutput() {
    const output = this.elements.outputText.value;
    if (!output) {
      this.showToast('No text to copy', 'warning');
      return;
    }

    navigator.clipboard.writeText(output).then(() => {
      this.showToast('Text copied to clipboard', 'success');
    }).catch(() => {
      this.showToast('Failed to copy text', 'error');
    });
  },

  speakText() {
    const text = this.elements.outputText.value;
    if (!text) {
      this.showToast('No text to speak', 'warning');
      return;
    }

    if (!this.state.speechSynthesis) {
      this.showToast('Speech synthesis not supported', 'error');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.8;
    
    this.state.speechSynthesis.speak(utterance);
    this.showToast('Speaking text...', 'info');
  },

  clearTransliteration() {
    this.elements.inputText.value = '';
    this.elements.outputText.value = '';
    this.elements.inputText.focus();
  },

  addToTransliterationHistory(input, output) {
    this.state.transliterationHistory.unshift({ input, output, time: new Date() });
    
    // Keep only last 10 items
    if (this.state.transliterationHistory.length > 10) {
      this.state.transliterationHistory.pop();
    }
    
    this.updateTransliterationHistory();
  },

  updateTransliterationHistory() {
    const historyHTML = this.state.transliterationHistory.map(item => `
      <div class="luxury-history-item">
        <div class="luxury-history-devanagari">${item.input}</div>
        <div class="luxury-history-iast">${item.output}</div>
      </div>
    `).join('');
    
    this.elements.translitHistory.innerHTML = historyHTML;
  },

  // ============================================
  // DICTIONARY FUNCTIONALITY
  // ============================================
  searchDictionary() {
    const query = this.elements.dictSearch.value.trim();
    if (!query) {
      this.showToast('Please enter a word to search', 'warning');
      return;
    }

    this.showLoading();
    
    // Simulate API call
    setTimeout(() => {
      const results = this.performDictionarySearch(query);
      this.displayDictionaryResults(results);
      this.hideLoading();
      this.showToast(`Found ${results.length} results`, 'success');
    }, 500);
  },

  performDictionarySearch(query) {
    // Simulated dictionary results
    const dictionary = [
      {
        sanskrit: 'धर्मः',
        phonetic: '[dharmaḥ]',
        meanings: ['duty', 'righteousness', 'cosmic law', 'virtue'],
        example: {
          sanskrit: 'धर्मो रक्षति रक्षितः',
          translation: 'Dharma protects the protector of dharma'
        }
      },
      {
        sanskrit: 'योगः',
        phonetic: '[yogaḥ]',
        meanings: ['union', 'discipline', 'meditation', 'practice'],
        example: {
          sanskrit: 'योगश्चित्तवृत्तिनिरोधः',
          translation: 'Yoga is the cessation of mental modifications'
        }
      }
    ];

    return dictionary.filter(entry => 
      entry.sanskrit.includes(query) || 
      entry.meanings.some(meaning => meaning.includes(query.toLowerCase()))
    );
  },

  displayDictionaryResults(results) {
    if (results.length === 0) {
      this.elements.dictResults.innerHTML = `
        <div class="luxury-dictionary-entry">
          <div class="luxury-result-header">
            <div class="luxury-result-sanskrit">No results found</div>
          </div>
          <p>Try searching for another word.</p>
        </div>
      `;
      return;
    }

    const resultsHTML = results.map(entry => `
      <div class="luxury-dictionary-entry">
        <div class="luxury-result-header">
          <div class="luxury-result-sanskrit">${entry.sanskrit}</div>
          <div class="luxury-result-phonetic">${entry.phonetic}</div>
        </div>
        <div class="luxury-result-meanings">
          ${entry.meanings.map(meaning => `<span class="luxury-meaning-tag">${meaning}</span>`).join('')}
        </div>
        <div class="luxury-example">
          <div class="luxury-example-sanskrit">${entry.example.sanskrit}</div>
          <div class="luxury-example-translation">${entry.example.translation}</div>
        </div>
      </div>
    `).join('');

    this.elements.dictResults.innerHTML = resultsHTML;
  },

  // ============================================
  // GRAMMAR TABS
  // ============================================
  switchGrammarTab(tabName) {
    this.state.currentGrammarTab = tabName;
    
    // Update active button
    this.elements.tabButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tab === tabName);
    });
    
    // Update active pane
    this.elements.tabPanes.forEach(pane => {
      pane.classList.toggle('active', pane.id === tabName);
    });
  },

  // ============================================
  // API INTEGRATION METHODS
  // ============================================
  async apiCall(endpoint, options = {}) {
    try {
      this.showLoading();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        ...options
      });
      
      if (!response.ok) {
        throw new Error(`API Error: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      this.hideLoading();
      return data;
    } catch (error) {
      this.hideLoading();
      console.error('API Error:', error);
      this.showToast(error.message || 'API request failed', 'error');
      throw error;
    }
  },

  async sendChatMessageApi(message, mode = 'learn') {
    try {
      this.showLoading();
      const response = await fetch(`${API_BASE_URL}/api/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: message,
          mode: mode,
          lang: this.state.currentLanguage
        })
      });
      
      if (!response.ok) {
        throw new Error(`Chat API Error: ${response.status}`);
      }
      
      const data = await response.json();
      this.hideLoading();
      return data;
    } catch (error) {
      this.hideLoading();
      console.error('Chat API Error:', error);
      this.showToast('Failed to send message. Please try again.', 'error');
      throw error;
    }
  },

  async transliterateText(text) {
    try {
      this.showLoading();
      const response = await fetch(`${API_BASE_URL}/api/transliterate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: text
        })
      });
      
      if (!response.ok) {
        throw new Error(`Transliteration API Error: ${response.status}`);
      }
      
      const data = await response.json();
      this.hideLoading();
      return data;
    } catch (error) {
      this.hideLoading();
      console.error('Transliteration API Error:', error);
      this.showToast('Transliteration failed. Please try again.', 'error');
      throw error;
    }
  },

  async getLearningTracks() {
    try {
      return await this.apiCall('/api/tracks');
    } catch (error) {
      console.error('Learning tracks API Error:', error);
      return [];
    }
  },

  async getHealthStatus() {
    try {
      return await this.apiCall('/api/health');
    } catch (error) {
      console.error('Health API Error:', error);
      return null;
    }
  },

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  showLoading() {
    this.state.isLoading = true;
    this.elements.loadingOverlay.classList.add('active');
  },

  hideLoading() {
    this.state.isLoading = false;
    this.elements.loadingOverlay.classList.remove('active');
  },

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `luxury-toast ${type}`;
    
    const icon = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    }[type];

    toast.innerHTML = `
      <div class="luxury-toast-content">
        <div class="luxury-toast-message">${icon} ${message}</div>
        <button class="luxury-toast-close">×</button>
      </div>
    `;

    this.elements.toastContainer.appendChild(toast);

    // Auto remove after 3 seconds
    setTimeout(() => {
      toast.style.animation = 'luxurySlideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);

    // Manual close
    toast.querySelector('.luxury-toast-close').addEventListener('click', () => {
      toast.style.animation = 'luxurySlideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    });
  },

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  // ============================================
  // ANIMATIONS
  // ============================================
  startAnimations() {
    // Animate hero elements on load
    this.animateHeroElements();
    
    // Initialize scroll animations
    this.initializeScrollAnimations();
  },

  animateHeroElements() {
    const elements = [
      '.luxury-hero-badge',
      '.luxury-hero-title',
      '.luxury-hero-subtitle',
      '.luxury-hero-stats',
      '.luxury-hero-actions'
    ];

    elements.forEach((selector, index) => {
      const element = document.querySelector(selector);
      if (element) {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
          element.style.transition = 'all 0.8s ease';
          element.style.opacity = '1';
          element.style.transform = 'translateY(0)';
        }, index * 200);
      }
    });
  },

  initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'luxuryFadeIn 0.8s ease forwards';
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.luxury-feature-card, .luxury-track-card, .luxury-lesson-card').forEach(el => {
      observer.observe(el);
    });
  },

  initializeIntersectionObserver() {
    // Parallax effect for hero section
    const hero = document.querySelector('.luxury-hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
      });
    }
  },

  // ============================================
  // NAVIGATION ACTIONS
  // ============================================
  startJourney() {
    this.scrollToSection('chat');
    this.showToast('Welcome to your Sanskrit journey!', 'success');
  },

  scrollToFeatures() {
    this.scrollToSection('features');
  },

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
};

// ============================================
  // INITIALIZATION
  // ============================================
document.addEventListener('DOMContentLoaded', () => {
  LuxuryApp.init();
});

// ============================================
  // GLOBAL EXPOSURE (for debugging)
  // ============================================
window.LuxuryApp = LuxuryApp;
