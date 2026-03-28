/* SanskritNova AI - Luxury JavaScript Application */
/* Premium interactions with royal elegance and smooth animations */

import {
  ThemeManager,
  LanguageManager,
  ToastManager,
  ApiManager,
  PerformanceManager,
  ErrorManager,
} from './utils.js';

// ============================================
// TRANSLATIONS DATABASE
// ============================================
const TRANSLATIONS = {
  en: {
    // Navigation
    nav: {
      features: 'Highlights',
      tutor: 'Tutor',
      translit: 'Transliteration',
      tracks: 'Tracks',
    },
    // Hero Section
    hero: {
      badge: 'Focused Sanskrit Learning Experience',
      title: ['Learn Sanskrit', 'संस्कृतम् सरलम् सुन्दरम्', 'with Calm, Precise AI Guidance'],
      subtitle:
        'SanskritNova presents the actual product and only the product: tutor, transliteration, and guided learning paths in a polished single-page experience.',
      stats: {
        heritage: 'Personal Tutor',
        words: 'Script Bridge',
        accuracy: 'API-Backed',
        support: 'Mobile Ready',
      },
      actions: {
        startJourney: ['✦', 'Try the Tutor'],
        exploreFeatures: ['◌', 'See the Highlights'],
      },
    },
    // Features Section
    features: {
      title: 'What Matters Here',
      subtitle: 'A shorter, clearer showcase of the core SanskritNova experience.',
      items: {
        ai: {
          title: 'Personal Sanskrit Tutor',
          description:
            'Ask questions in English or Sanskrit and get study-focused responses for learning, translation, and explanation.',
        },
        library: {
          title: 'Fast Transliteration',
          description:
            'Convert between Devanagari and IAST in a workflow built for repetition, correction, and quick copy/paste study.',
        },
        transliteration: {
          title: 'Guided Learning Paths',
          description:
            'Move from foundations to reading practice through curated tracks instead of scrolling through documentation-heavy pages.',
        },
        design: {
          title: 'Luxury Design',
          description:
            'Immerse yourself in an interface that combines modern luxury with traditional Indian aesthetics for an unparalleled user experience.',
        },
        pronunciation: {
          title: 'Authentic Pronunciation',
          description:
            'Learn proper Sanskrit pronunciation with native speaker audio recordings and phonetic analysis powered by advanced speech technology.',
        },
        mobile: {
          title: 'Premium Mobile',
          description:
            'Seamless mobile experience with progressive web app technology, ensuring luxury learning on any device, anywhere, anytime.',
        },
      },
    },
    // Chat Section
    chat: {
      title: 'Tutor Studio',
      subtitle: 'Ask for meaning, phrasing, or explanation without leaving the page.',
      modes: {
        learn: ['📖', 'Learn'],
        translate: ['🔄', 'Translate'],
        analyze: ['🔍', 'Analyze'],
        grounded: ['🧭', 'Grounded'],
        agentic: ['🧠', 'Agentic'],
      },
      placeholder: 'Type your message in Sanskrit or English...',
      suggestions: [
        'What is yoga in Sanskrit?',
        'Translate: रामो गच्छति',
        'Explain dharma',
        'Basic Sanskrit greetings',
      ],
      welcome:
        'नमस्ते. Ask for a phrase, translation, or grammar hint and the tutor will respond in a focused study mode.',
      modeMessages: {
        learn: 'Switched to Learning mode. I will help you learn Sanskrit concepts.',
        translate: 'Switched to Translation mode. I can translate between Sanskrit and English.',
        analyze: 'Switched to Analysis mode. I can analyze Sanskrit grammar and structure.',
        grounded:
          'Switched to Grounded mode. I will answer from source-backed references when available.',
        agentic:
          'Switched to Agentic mode. I will try the deeper reasoning pipeline and fall back safely if needed.',
      },
    },
    // Transliteration Section
    transliteration: {
      title: 'Transliteration Lab',
      subtitle: 'One clear tool, refined for fast Sanskrit script conversion.',
      label: 'Input',
      outputLabel: 'Output',
      placeholder: 'रामो गच्छति / rāmo gacchati',
      outputPlaceholder: 'Transliterated text will appear here',
      actions: {
        transliterate: ['🔄', 'Transliterate'],
        swapScript: ['⇄', 'Swap Script'],
        copy: ['📋', 'Copy'],
        speak: ['🔊', 'Speak'],
        clear: ['🗑️', 'Clear'],
      },
      historyTitle: 'Recent Examples',
      emptyMessage: 'Please enter text to transliterate',
      successMessage: 'Transliteration completed',
      warningMessage: 'Please enter text to transliterate',
    },
    // Learning Tracks Section
    tracks: {
      title: 'Guided Tracks',
      subtitle: 'Three compact paths that cover the practical starting points.',
      items: {
        foundations: {
          title: 'Sanskrit Foundations',
          subtitle: 'संस्कृत आधार',
          description:
            'Learn the script, basic sounds, and core sentence patterns before moving into reading or tutoring flows.',
          level: 'Beginner',
          duration: '2 weeks',
          detailsHeading: 'Track Outline',
          plan: [
            'Learn the Devanagari basics and core sounds.',
            'Practice short Sanskrit words in the transliteration lab.',
            'Build enough confidence to move into tutor-led study.',
          ],
          actions: ['Start Track', 'Details'],
        },
        gita: {
          title: 'Spoken Sanskrit',
          subtitle: 'संवाद अभ्यास',
          description:
            'Practice greetings, prompts, and study dialogue in a track aligned with the tutor interface.',
          level: 'Practice',
          duration: '3 weeks',
          detailsHeading: 'Track Outline',
          plan: [
            'Start with greetings and short exchanges.',
            'Use the tutor for guided phrasing practice.',
            'Repeat common prompts until they feel natural.',
          ],
          actions: ['Start Track', 'Details'],
        },
        advanced: {
          title: 'Gita Reading',
          subtitle: 'गीता पठन',
          description:
            'Move from transliteration into guided verse reading and explanation with a more literary focus.',
          level: 'Intermediate',
          duration: '4 weeks',
          detailsHeading: 'Track Outline',
          plan: [
            'Read a short verse with transliteration support.',
            'Switch to analysis mode for meaning and grammar.',
            'Use the tutor to unpack context and vocabulary.',
          ],
          actions: ['Start Track', 'Details'],
        },
      },
    },
    // Footer
    footer: {
      learning: 'Learning',
      resources: 'Resources',
      connect: 'Connect',
      copyright: '© 2026 SanskritNova AI. Product showcase only, trimmed to the essentials.',
    },
    // General
    general: {
      loading: 'Loading...',
      offlineMode: 'Using offline mode',
      apiError: 'API request failed',
      chatError: 'Failed to send message. Please try again.',
      transliterationError: 'Transliteration failed. Please try again.',
      voiceStarted: 'Voice recognition started',
      voiceCaptured: 'Voice input captured',
      themeChanged: 'Theme changed to {theme}',
      languageChanged: 'Language switched to {language}',
    },
  },
  hi: {
    // Navigation
    nav: {
      features: 'मुख्य बिंदु',
      tutor: 'मार्गदर्शक',
      translit: 'लिप्यंतरण',
      tracks: 'पाठ्यक्रम',
    },
    // Hero Section
    hero: {
      badge: 'केंद्रित संस्कृत अध्ययन अनुभव',
      title: ['संस्कृत सीखें', 'संस्कृतम् सरलम् सुन्दरम्', 'AI मार्गदर्शन के साथ'],
      subtitle:
        'SanskritNova केवल आवश्यक उत्पाद अनुभव दिखाता है: मार्गदर्शक, लिप्यंतरण, और निर्देशित अध्ययन पथ एक ही सुंदर पेज पर।',
      stats: {
        heritage: 'व्यक्तिगत मार्गदर्शक',
        words: 'लिपि सेतु',
        accuracy: 'API समर्थित',
        support: 'मोबाइल तैयार',
      },
      actions: {
        startJourney: ['✦', 'मार्गदर्शक खोलें'],
        exploreFeatures: ['◌', 'मुख्य बिंदु देखें'],
      },
    },
    // Features Section
    features: {
      title: 'मुख्य अनुभव',
      subtitle: 'SanskritNova का संक्षिप्त और स्पष्ट उत्पाद प्रदर्शन।',
      items: {
        ai: {
          title: 'व्यक्तिगत संस्कृत मार्गदर्शक',
          description:
            'अंग्रेज़ी या संस्कृत में पूछें और अध्ययन, अनुवाद, तथा व्याख्या के लिए केंद्रित उत्तर पाएँ।',
        },
        library: {
          title: 'तेज़ लिप्यंतरण',
          description:
            'देवनागरी और IAST के बीच बदलें, और अभ्यास के लिए तेज़ कॉपी-पेस्ट प्रवाह बनाए रखें।',
        },
        transliteration: {
          title: 'निर्देशित अध्ययन पथ',
          description:
            'फाउंडेशन से पढ़ने के अभ्यास तक जाएँ, बिना अतिरिक्त डॉक्युमेंटेशन जैसे लंबे पेजों के।',
        },
        design: {
          title: 'लक्ज़री डिज़ाइन',
          description:
            'एक ऐसे इंटरफ़ेस में खुद को डुबोएं जो आधुनिक लक्ज़री को पारंपरिक भारतीय सौंदर्यशास्त्र के साथ जोड़ता है।',
        },
        pronunciation: {
          title: 'प्रामाणिक उच्चारण',
          description:
            'देशी वक्ता ऑडियो रिकॉर्डिंग और उन्नत स्पीच तकनीक द्वारा संचालित फोनेटिक विश्लेषण के साथ उचित संस्कृत उच्चारण सीखें।',
        },
        mobile: {
          title: 'प्रीमियम मोबाइल',
          description:
            'प्रगतिशील वेब ऐप तकनीक के साथ निर्बाध अनुभव, जो किसी भी डिवाइस पर, कहीं भी, कभी भी लक्ज़री अध्ययन सुनिश्चित करता है।',
        },
      },
    },
    // Chat Section
    chat: {
      title: 'मार्गदर्शक स्टूडियो',
      subtitle: 'अर्थ, वाक्य-विन्यास, या व्याख्या पूछें और उसी पेज पर रहें।',
      modes: {
        learn: ['📖', 'सीखें'],
        translate: ['🔄', 'अनुवाद'],
        analyze: ['🔍', 'विश्लेषण'],
        grounded: ['🧭', 'संदर्भित'],
        agentic: ['🧠', 'एजेंटिक'],
      },
      placeholder: 'संस्कृत या अंग्रेजी में अपना संदेश टाइप करें...',
      suggestions: [
        'योग संस्कृत में क्या है?',
        'अनुवाद: रामो गच्छति',
        'धर्म समझाएं',
        'बुनियादी संस्कृत अभिवादन',
      ],
      welcome:
        'नमस्ते। कोई वाक्य, अनुवाद, या व्याकरण संकेत पूछें और मार्गदर्शक केंद्रित उत्तर देगा।',
      modeMessages: {
        learn: 'अध्ययन मोड में स्विच किया गया। मैं आपको संस्कृत अवधारण सिखाने में मदद करूंगा।',
        translate:
          'अनुवाद मोड में स्विच किया गया। मैं संस्कृत और अंग्रेजी के बीच अनुवाद कर सकता हूं।',
        analyze:
          'विश्लेषण मोड में स्विच किया गया। मैं संस्कृत व्याकरण और संरचना का विश्लेषण कर सकता हूं।',
        grounded: 'संदर्भित मोड में स्विच किया गया। उपलब्ध होने पर मैं स्रोत-आधारित उत्तर दूंगा।',
        agentic:
          'एजेंटिक मोड में स्विच किया गया। मैं गहरे तर्क पथ का उपयोग करूंगा और आवश्यकता होने पर सुरक्षित फॉलबैक दूंगा।',
      },
    },
    // Transliteration Section
    transliteration: {
      title: 'लिप्यंतरण प्रयोगशाला',
      subtitle: 'तेज़ संस्कृत लिपि रूपांतरण के लिए एक स्पष्ट उपकरण।',
      label: 'इनपुट',
      outputLabel: 'आउटपुट',
      placeholder: 'रामो गच्छति / rāmo gacchati',
      outputPlaceholder: 'लिप्यंतरित पाठ यहां दिखाई देगा',
      actions: {
        transliterate: ['🔄', 'लिप्यंतरित करें'],
        swapScript: ['⇄', 'लिपि बदलें'],
        copy: ['📋', 'कॉपी करें'],
        speak: ['🔊', 'बोलें'],
        clear: ['🗑️', 'साफ करें'],
      },
      historyTitle: 'हाल के उदाहरण',
      emptyMessage: 'कृपया लिप्यंतरण के लिए पाठ दर्ज करें',
      successMessage: 'लिप्यंतरण पूर्ण',
      warningMessage: 'कृपया लिप्यंतरण के लिए पाठ दर्ज करें',
    },
    // Learning Tracks Section
    tracks: {
      title: 'निर्देशित पाठ्यक्रम',
      subtitle: 'व्यावहारिक शुरुआत के लिए तीन संक्षिप्त अध्ययन पथ।',
      items: {
        foundations: {
          title: 'संस्कृत आधार',
          subtitle: 'संस्कृत आधार',
          description: 'पठन या मार्गदर्शक उपयोग से पहले लिपि, ध्वनियाँ, और मूल वाक्य संरचना सीखें।',
          level: 'शुरुआती',
          duration: '2 सप्ताह',
          detailsHeading: 'पाठ्यक्रम रूपरेखा',
          plan: [
            'देवनागरी की मूल आकृतियाँ और ध्वनियाँ सीखें।',
            'लिप्यंतरण प्रयोगशाला में छोटे शब्दों का अभ्यास करें।',
            'फिर मार्गदर्शक आधारित अध्ययन के लिए आधार तैयार करें।',
          ],
          actions: ['पथ शुरू करें', 'विवरण'],
        },
        gita: {
          title: 'संवाद अभ्यास',
          subtitle: 'संवाद अभ्यास',
          description:
            'अभिवादन, छोटे प्रश्न, और अध्ययन संवाद का अभ्यास करें जो मार्गदर्शक अनुभाग से मेल खाते हों।',
          level: 'अभ्यास',
          duration: '3 सप्ताह',
          detailsHeading: 'पाठ्यक्रम रूपरेखा',
          plan: [
            'अभिवादन और छोटे संवाद से शुरुआत करें।',
            'मार्गदर्शक की मदद से वाक्य विन्यास का अभ्यास करें।',
            'बार-बार प्रयोग करके बोलचाल में सहजता लाएँ।',
          ],
          actions: ['पथ शुरू करें', 'विवरण'],
        },
        advanced: {
          title: 'गीता पठन',
          subtitle: 'गीता पठन',
          description:
            'लिप्यंतरण से आगे बढ़कर श्लोक पठन, अर्थ, और व्याख्या के साथ साहित्यिक अध्ययन करें।',
          level: 'मध्यवर्ती',
          duration: '4 सप्ताह',
          detailsHeading: 'पाठ्यक्रम रूपरेखा',
          plan: [
            'छोटे श्लोक को लिप्यंतरण के साथ पढ़ें।',
            'विश्लेषण मोड से अर्थ और व्याकरण देखें।',
            'मार्गदर्शक के साथ संदर्भ और शब्दावली समझें।',
          ],
          actions: ['पथ शुरू करें', 'विवरण'],
        },
      },
    },
    // Footer
    footer: {
      learning: 'अध्ययन',
      resources: 'संसाधन',
      connect: 'जुड़ें',
      copyright: '© 2026 SanskritNova AI. केवल आवश्यक उत्पाद प्रदर्शन।',
    },
    // General
    general: {
      loading: 'लोड हो रहा है...',
      offlineMode: 'ऑफ़लाइन मोड का उपयोग',
      apiError: 'API अनुरोध विफल',
      chatError: 'संदेश भेजने में विफल। कृपया फिर से प्रयास करें।',
      transliterationError: 'लिप्यंतरण विफल। कृपया फिर से प्रयास करें।',
      voiceStarted: 'आवाज पहचान शुरू',
      voiceCaptured: 'आवाज इनपुट कैप्चर किया गया',
      themeChanged: 'थीम बदलकर {theme}',
      languageChanged: 'भाषा बदलकर {language}',
    },
  },
};

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
    translations: TRANSLATIONS,
    chatHistory: [],
    transliterationHistory: [],
    currentChatMode: 'learn',
    voiceRecognition: null,
    speechSynthesis: null,
    autoTransliterationRequestId: 0,
    apiInfo: null,
  },

  // DOM element references
  elements: {},

  // Initialize application
  init() {
    this.cacheElements();
    this.initializeEventListeners();
    this.initializeTheme();
    this.initializeLanguage();
    this.startAnimations();
    this.runNonCriticalWork(() => {
      this.initializeSpeechAPI();
      this.loadApiCapabilities();
    });
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
      chatCapabilities: document.getElementById('chat-capabilities'),
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

      // Tracks
      trackCards: document.querySelectorAll('.luxury-track-card'),
      trackActionButtons: document.querySelectorAll('[data-track-action]'),

      // Loading and Toasts
      loadingOverlay: document.getElementById('loading-overlay'),
      toastContainer: document.getElementById('toast-container'),
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
    this.elements.langButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => this.switchLanguage(e.currentTarget.dataset.lang));
    });

    // Navigation smooth scroll
    this.elements.navLinks.forEach((link) => {
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
    this.elements.modeButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => this.switchChatMode(e.currentTarget.dataset.mode));
    });

    // Suggestion chips
    this.elements.suggestionChips.forEach((chip) => {
      chip.addEventListener('click', (e) => this.useSuggestion(e.currentTarget.textContent));
    });

    // Track actions
    this.elements.trackActionButtons.forEach((button) => {
      button.addEventListener('click', (e) => this.handleTrackAction(e.currentTarget));
    });

    // Transliteration
    this.elements.transliterateBtn?.addEventListener('click', () => this.transliterate());
    this.elements.swapScriptBtn?.addEventListener('click', () => this.swapScript());
    this.elements.copyOutputBtn?.addEventListener('click', () => this.copyOutput());
    this.elements.speakOutputBtn?.addEventListener('click', () => this.speakText());
    this.elements.clearOutputBtn?.addEventListener('click', () => this.clearTransliteration());

    // Auto-transliteration on input
    this.elements.inputText?.addEventListener(
      'input',
      this.debounce(() => this.autoTransliterate(), 500)
    );

    // Intersection Observer for animations
    this.initializeIntersectionObserver();
  },

  // ============================================
  // NAVIGATION & MOBILE MENU
  // ============================================
  toggleMobileMenu() {
    this.state.isMobileMenuOpen = !this.state.isMobileMenuOpen;
    this.elements.mobileNav.classList.toggle('active', this.state.isMobileMenuOpen);
    this.elements.mobileNav.hidden = !this.state.isMobileMenuOpen;
    this.elements.mobileMenuToggle.classList.toggle('active', this.state.isMobileMenuOpen);
    this.elements.mobileMenuToggle.setAttribute(
      'aria-expanded',
      String(this.state.isMobileMenuOpen)
    );

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
        block: 'start',
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
    ThemeManager.initializeTheme();
  },

  toggleTheme() {
    const { preference, resolvedTheme } = ThemeManager.toggleTheme();
    const themeName = preference === 'system' ? `system (${resolvedTheme})` : resolvedTheme;
    ToastManager.show(this.getTranslation('general.themeChanged', { theme: themeName }), 'success');
  },

  // ============================================
  // LANGUAGE MANAGEMENT
  // ============================================
  switchLanguage(lang) {
    if (this.state.currentLanguage === lang) return;

    this.state.currentLanguage = LanguageManager.switchLanguage(lang);
    document.documentElement.lang = lang;
    this.updateContentLanguage(lang);
    this.updateSpeechLanguage();

    const langName = lang === 'en' ? 'English' : 'हिन्दी';
    ToastManager.show(
      this.getTranslation('general.languageChanged', { language: langName }),
      'success'
    );
  },

  getTranslation(key, params = {}) {
    const keys = key.split('.');
    let translation = this.state.translations[this.state.currentLanguage];

    // Navigate through nested keys
    for (const k of keys) {
      if (translation && translation[k]) {
        translation = translation[k];
      } else {
        // Fallback to English if translation not found
        translation = this.state.translations.en;
        for (const fallbackKey of keys) {
          if (translation && translation[fallbackKey]) {
            translation = translation[fallbackKey];
          } else {
            translation = key; // Fallback to key name
            break;
          }
        }
        break;
      }
    }

    // Handle parameter substitution
    if (typeof translation === 'string' && Object.keys(params).length > 0) {
      let result = translation;
      for (const [param, value] of Object.entries(params)) {
        result = result.replace(new RegExp(`{${param}}`, 'g'), value);
      }
      return result;
    }

    return translation || key;
  },

  updateContentLanguage(lang) {
    // Update navigation
    this.updateNavigation(lang);

    // Update hero section
    this.updateHeroSection(lang);

    // Update features section
    this.updateFeaturesSection(lang);

    // Update chat section
    this.updateChatSection(lang);

    // Update transliteration section
    this.updateTransliterationSection(lang);

    // Update other sections
    this.updateOtherSections(lang);
  },

  updateNavigation(lang) {
    const navTranslations = this.getTranslation('nav');
    document.querySelectorAll('[data-nav]').forEach((link) => {
      const key = link.dataset.nav;
      if (key && navTranslations[key]) {
        link.textContent = navTranslations[key];
      }
    });
  },

  updateHeroSection(lang) {
    const heroData = this.getTranslation('hero');

    // Update badge
    const badge = document.querySelector('.luxury-hero-badge span:last-child');
    if (badge) badge.textContent = heroData.badge;

    // Update title
    const titleLines = document.querySelectorAll('.luxury-title-line');
    const sanskritText = document.querySelector('.luxury-sanskrit-text');
    if (titleLines.length >= 2 && sanskritText) {
      titleLines[0].textContent = heroData.title[0];
      sanskritText.textContent = heroData.title[1];
      titleLines[1].textContent = heroData.title[2];
    }

    // Update subtitle
    const subtitle = document.querySelector('.luxury-hero-subtitle');
    if (subtitle) subtitle.textContent = heroData.subtitle;

    // Update stats
    const statLabels = document.querySelectorAll('.luxury-stat-label');
    if (statLabels.length >= 4) {
      statLabels[0].textContent = heroData.stats.heritage;
      statLabels[1].textContent = heroData.stats.words;
      statLabels[2].textContent = heroData.stats.accuracy;
      statLabels[3].textContent = heroData.stats.support;
    }

    // Update action buttons
    const startJourney = document.querySelector('#start-journey span:last-child');
    const exploreFeatures = document.querySelector('#explore-features span:last-child');
    if (startJourney) startJourney.textContent = heroData.actions.startJourney[1];
    if (exploreFeatures) exploreFeatures.textContent = heroData.actions.exploreFeatures[1];
  },

  updateFeaturesSection(lang) {
    const featuresData = this.getTranslation('features');

    // Update section title and subtitle
    const featuresTitle = document.querySelector('#features .luxury-section-title');
    const featuresSubtitle = document.querySelector('#features .luxury-section-subtitle');
    if (featuresTitle) featuresTitle.textContent = featuresData.title;
    if (featuresSubtitle) featuresSubtitle.textContent = featuresData.subtitle;

    // Update feature cards
    const featureCards = document.querySelectorAll('.luxury-feature-card');
    const featureItems = Object.values(featuresData.items);

    featureCards.forEach((card, index) => {
      if (featureItems[index]) {
        const title = card.querySelector('.luxury-feature-title');
        const description = card.querySelector('.luxury-feature-description');
        if (title) title.textContent = featureItems[index].title;
        if (description) description.textContent = featureItems[index].description;
      }
    });
  },

  updateChatSection(lang) {
    const chatData = this.getTranslation('chat');
    const sectionTitle = document.querySelector('#chat .luxury-section-title');
    const sectionSubtitle = document.querySelector('#chat .luxury-section-subtitle');
    const header = document.querySelector('.luxury-chat-header span');
    const modeMap = {
      learn: chatData.modes.learn,
      translate: chatData.modes.translate,
      analyze: chatData.modes.analyze,
      grounded: chatData.modes.grounded,
      agentic: chatData.modes.agentic,
    };

    if (sectionTitle) sectionTitle.textContent = chatData.title;
    if (sectionSubtitle) sectionSubtitle.textContent = chatData.subtitle;
    if (header) header.textContent = `🤖 ${chatData.title}`;
    if (this.elements.chatInput) this.elements.chatInput.placeholder = chatData.placeholder;

    this.elements.modeButtons.forEach((button) => {
      const content = modeMap[button.dataset.mode];
      const spans = button.querySelectorAll('span');
      if (!content || spans.length < 2) return;

      spans[0].textContent = content[0];
      spans[1].textContent = content[1];
    });

    const sendLabel = this.elements.sendBtn?.querySelector('span');
    if (sendLabel) sendLabel.textContent = lang === 'hi' ? 'भेजें' : 'Send';

    const initialMessage = this.elements.chatContainer?.querySelector(
      '.luxury-message.ai .luxury-message-content'
    );
    if (initialMessage && this.elements.chatContainer.children.length === 1) {
      initialMessage.textContent = chatData.welcome;
    }

    this.elements.suggestionChips.forEach((chip, index) => {
      if (chatData.suggestions[index]) {
        chip.textContent = chatData.suggestions[index];
      }
    });

    this.updateCapabilityChips();
  },

  updateTransliterationSection() {
    const transliterationData = this.getTranslation('transliteration');
    const sectionTitle = document.querySelector('#translit .luxury-section-title');
    const sectionSubtitle = document.querySelector('#translit .luxury-section-subtitle');
    const labels = document.querySelectorAll('#translit .luxury-form-label');
    const actionMap = {
      'transliterate-btn': transliterationData.actions.transliterate,
      'swap-script': transliterationData.actions.swapScript,
      'copy-output': transliterationData.actions.copy,
      'speak-output': transliterationData.actions.speak,
      'clear-output': transliterationData.actions.clear,
    };

    if (sectionTitle) sectionTitle.textContent = transliterationData.title;
    if (sectionSubtitle) sectionSubtitle.textContent = transliterationData.subtitle;
    if (labels.length >= 2) {
      labels[0].textContent = transliterationData.label;
      labels[1].textContent = transliterationData.outputLabel;
    }
    if (this.elements.inputText)
      this.elements.inputText.placeholder = transliterationData.placeholder;
    if (this.elements.outputText) {
      this.elements.outputText.placeholder = transliterationData.outputPlaceholder;
    }

    Object.entries(actionMap).forEach(([id, content]) => {
      const button = document.getElementById(id);
      const spans = button?.querySelectorAll('span');
      if (!button || !spans || spans.length < 2) return;

      spans[0].textContent = content[0];
      spans[1].textContent = content[1];
    });

    const historyTitle = document.querySelector('.luxury-history-title');
    if (historyTitle) historyTitle.textContent = transliterationData.historyTitle;
  },

  updateOtherSections(lang) {
    const tracksData = this.getTranslation('tracks');
    const footerData = this.getTranslation('footer');

    const tracksTitle = document.querySelector('#tracks .luxury-section-title');
    const tracksSubtitle = document.querySelector('#tracks .luxury-section-subtitle');
    if (tracksTitle) tracksTitle.textContent = tracksData.title;
    if (tracksSubtitle) tracksSubtitle.textContent = tracksData.subtitle;

    this.elements.trackCards.forEach((card) => {
      const track = this.getTrackContent(card.dataset.track);
      if (!track) return;

      const title = card.querySelector('.luxury-track-title');
      const subtitle = card.querySelector('.luxury-track-subtitle');
      const description = card.querySelector('.luxury-track-description');
      const level = card.querySelector('.luxury-track-level');
      const duration = card.querySelector('.luxury-track-duration');
      const buttons = card.querySelectorAll('.luxury-track-actions .luxury-btn');
      const detailsTitle = card.querySelector('.luxury-track-details-title');
      const detailsList = card.querySelector('.luxury-track-details-list');

      if (title) title.textContent = track.title;
      if (subtitle) subtitle.textContent = track.subtitle;
      if (description) description.textContent = track.description;
      if (level) level.textContent = track.level;
      if (duration) duration.textContent = track.duration;
      if (detailsTitle) detailsTitle.textContent = track.detailsHeading;
      if (detailsList) {
        detailsList.innerHTML = track.plan.map((item) => `<li>${item}</li>`).join('');
      }
      if (buttons.length >= 2) {
        buttons[0].textContent = track.actions[0];
        buttons[1].textContent = track.actions[1];
      }
    });

    document.querySelectorAll('.luxury-footer').forEach((footer) => {
      const copyright = footer.querySelector('.luxury-footer-copyright');
      if (copyright) {
        copyright.textContent = footerData.copyright;
      }
    });
  },

  // ============================================
  // LANGUAGE INITIALIZATION
  // ============================================
  initializeLanguage() {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && ['en', 'hi'].includes(savedLanguage)) {
      this.state.currentLanguage = savedLanguage;
    } else {
      // Detect browser language
      const browserLang = navigator.language.split('-')[0];
      this.state.currentLanguage = browserLang === 'hi' ? 'hi' : 'en';
    }

    // Update language buttons
    this.elements.langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === this.state.currentLanguage);
      btn.setAttribute('aria-pressed', btn.dataset.lang === this.state.currentLanguage);
    });

    document.documentElement.lang = this.state.currentLanguage;

    // Update content
    this.updateContentLanguage(this.state.currentLanguage);
  },

  // ============================================
  // CHAT FUNCTIONALITY
  // ============================================
  switchChatMode(mode) {
    if (!mode) return;

    this.state.currentChatMode = mode;

    // Update active button
    this.elements.modeButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.mode === mode);
    });

    // Add mode message
    const modeMessages = this.getTranslation('chat.modeMessages');
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
      this.addMessage(response.reply, 'ai', response);
    } catch (error) {
      this.hideTypingIndicator();
      // Fallback to simulated response if API fails
      const fallbackResponse = this.generateAIResponse(message);
      if (typeof fallbackResponse === 'string') {
        this.addMessage(fallbackResponse, 'ai');
      } else {
        this.addMessage(fallbackResponse.reply, 'ai', fallbackResponse);
      }
      this.showToast('Using offline mode', 'warning');
    }
  },

  addMessage(message, sender, metadata = {}) {
    const messageElement = document.createElement('div');
    messageElement.className = `luxury-message ${sender}`;

    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const contentElement = document.createElement('div');
    contentElement.className = 'luxury-message-content';
    contentElement.textContent = message;
    messageElement.appendChild(contentElement);

    if (metadata.quality || metadata.model || metadata.sources || metadata.steps) {
      const metaElement = document.createElement('div');
      metaElement.className = 'luxury-message-meta';
      const labels =
        this.state.currentLanguage === 'hi'
          ? { quality: 'गुणवत्ता', model: 'मॉडल', sources: 'स्रोत', pipeline: 'पाइपलाइन' }
          : { quality: 'Quality', model: 'Model', sources: 'Sources', pipeline: 'Pipeline' };

      if (metadata.quality) {
        const qualityBadge = document.createElement('span');
        qualityBadge.className = 'luxury-message-badge';
        qualityBadge.textContent = `${labels.quality}: ${metadata.quality}`;
        metaElement.appendChild(qualityBadge);
      }

      if (metadata.model) {
        const modelBadge = document.createElement('span');
        modelBadge.className = 'luxury-message-badge';
        modelBadge.textContent = `${labels.model}: ${metadata.model}`;
        metaElement.appendChild(modelBadge);
      }

      if (Array.isArray(metadata.sources) && metadata.sources.length > 0) {
        const sourcesBlock = document.createElement('div');
        sourcesBlock.className = 'luxury-message-block';

        const title = document.createElement('div');
        title.className = 'luxury-message-block-title';
        title.textContent = labels.sources;
        sourcesBlock.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'luxury-message-list';
        metadata.sources.forEach((source) => {
          const item = document.createElement('li');
          item.textContent = `${source.source} · ${source.chunk_id}`;
          list.appendChild(item);
        });
        sourcesBlock.appendChild(list);
        metaElement.appendChild(sourcesBlock);
      }

      if (Array.isArray(metadata.steps) && metadata.steps.length > 0) {
        const stepsBlock = document.createElement('div');
        stepsBlock.className = 'luxury-message-block';

        const title = document.createElement('div');
        title.className = 'luxury-message-block-title';
        title.textContent = labels.pipeline;
        stepsBlock.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'luxury-message-list';
        metadata.steps.forEach((step) => {
          const item = document.createElement('li');
          item.textContent = step;
          list.appendChild(item);
        });
        stepsBlock.appendChild(list);
        metaElement.appendChild(stepsBlock);
      }

      messageElement.appendChild(metaElement);
    }

    const timeElement = document.createElement('div');
    timeElement.className = 'luxury-message-time';
    timeElement.textContent = time;
    messageElement.appendChild(timeElement);

    this.elements.chatContainer.appendChild(messageElement);
    this.elements.chatContainer.scrollTop = this.elements.chatContainer.scrollHeight;

    // Add to history
    this.state.chatHistory.push({ message, sender, time, metadata });

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
    const trimmed = message.trim();
    const hasDevanagari = /[\u0900-\u097F]/.test(trimmed);
    const transliteration = hasDevanagari ? this.performTransliteration(trimmed) : trimmed;
    const lowerMessage = trimmed.toLowerCase();

    const fallbackEntries = [
      {
        id: 'yoga',
        matches: ['yoga', 'योग'],
        summary:
          'Yoga (योग) is commonly explained as union, disciplined practice, and inward integration of body, mind, and awareness.',
      },
      {
        id: 'dharma',
        matches: ['dharma', 'धर्म'],
        summary:
          'Dharma (धर्म) can refer to duty, right conduct, sustaining order, and what is fitting in context.',
      },
      {
        id: 'namaste',
        matches: ['namaste', 'नमस्ते'],
        summary:
          'Namaste (नमस्ते) is a respectful greeting derived from नमः, often understood as “I bow to you” or “respectful greetings.”',
      },
      {
        id: 'sanskrit',
        matches: ['sanskrit', 'संस्कृत'],
        summary:
          'Sanskrit (संस्कृत) is a classical language known for precise grammar, a long literary tradition, and major influence on philosophy and ritual.',
      },
      {
        id: 'iast',
        matches: ['iast', 'transliteration', 'devanagari', 'देवनागरी'],
        summary:
          'IAST is the International Alphabet of Sanskrit Transliteration, a Roman-script standard used to represent Sanskrit sounds precisely.',
      },
      {
        id: 'gita',
        matches: ['gita', 'गीता'],
        summary:
          'The Gita is a practical Sanskrit study text because it combines memorable verse, philosophical vocabulary, and rich grammatical examples.',
      },
    ];

    const matchedEntry = fallbackEntries.find((entry) =>
      entry.matches.some((term) => lowerMessage.includes(term) || trimmed.includes(term))
    );
    const fallbackSource = matchedEntry
      ? [
          {
            source: 'SanskritReference',
            chunk_id: matchedEntry.id,
            text: matchedEntry.summary,
          },
        ]
      : [];

    if (this.state.currentChatMode === 'translate') {
      if (hasDevanagari) {
        return {
          reply: `Offline translation mode: IAST transliteration is "${transliteration}". I can provide a fuller translation once the live tutor is available.`,
          model: 'offline-fallback',
          quality: 'fallback',
          sources: fallbackSource,
        };
      }
      return {
        reply:
          'Offline translation mode is limited right now. Try a short Sanskrit phrase and I can still help with transliteration and basic phrasing.',
        model: 'offline-fallback',
        quality: 'fallback',
        sources: fallbackSource,
      };
    }

    if (this.state.currentChatMode === 'analyze') {
      if (hasDevanagari) {
        return {
          reply: `Offline analysis mode: I detect Devanagari text and can read it as "${transliteration}". For a deeper grammatical breakdown, reconnect the live tutor.`,
          model: 'offline-fallback',
          quality: 'fallback',
          sources: fallbackSource,
        };
      }
      return {
        reply:
          'Offline analysis mode is available for quick guidance, but detailed grammatical parsing needs the live tutor.',
        model: 'offline-fallback',
        quality: 'fallback',
        sources: fallbackSource,
      };
    }

    if (this.state.currentChatMode === 'grounded') {
      return {
        reply: matchedEntry
          ? `Offline grounded mode: ${matchedEntry.summary}`
          : 'Offline grounded mode is available with local reference notes, but the live retrieval service is currently unavailable.',
        model: 'offline-fallback',
        quality: 'fallback',
        sources: fallbackSource,
      };
    }

    if (this.state.currentChatMode === 'agentic') {
      return {
        reply: matchedEntry
          ? `Offline agentic mode: ${matchedEntry.summary}`
          : 'Offline agentic mode is using the simpler local fallback because the live reasoning pipeline is unavailable.',
        model: 'offline-fallback',
        quality: 'fallback',
        sources: fallbackSource,
        steps: ['Agentic pipeline unavailable, used local structured fallback.'],
      };
    }

    if (matchedEntry) {
      return {
        reply: `Offline tutor note: ${matchedEntry.summary}`,
        model: 'offline-fallback',
        quality: 'fallback',
        sources: fallbackSource,
      };
    }

    if (hasDevanagari) {
      return {
        reply: `Offline tutor note: I can still read your Sanskrit as "${transliteration}" and help with basic phrasing while the live tutor is unavailable.`,
        model: 'offline-fallback',
        quality: 'fallback',
      };
    }

    return {
      reply:
        'Offline tutor note: the live model is unavailable, but you can still use transliteration, grounded mode, and guided tracks while reconnecting.',
      model: 'offline-fallback',
      quality: 'fallback',
    };
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

  getTrackContent(trackId) {
    const trackKeyMap = {
      foundations: 'foundations',
      spoken: 'gita',
      gita: 'advanced',
    };

    const trackKey = trackKeyMap[trackId];
    if (!trackKey) return null;

    return this.getTranslation(`tracks.items.${trackKey}`);
  },

  handleTrackAction(button) {
    const card = button.closest('.luxury-track-card');
    const trackId = card?.dataset.track;
    const action = button.dataset.trackAction;

    if (!card || !trackId || !action) return;

    if (action === 'details') {
      this.toggleTrackDetails(card, button);
      return;
    }

    this.startTrack(trackId);
  },

  toggleTrackDetails(card, button) {
    const details = card.querySelector('.luxury-track-details');
    if (!details) return;

    const shouldOpen = details.hidden;
    details.hidden = !shouldOpen;
    button.setAttribute('aria-expanded', String(shouldOpen));
  },

  startTrack(trackId) {
    const track = this.getTrackContent(trackId);
    if (!track) return;

    const trackActions = {
      foundations: () => {
        this.scrollToSection('translit');
        this.elements.inputText.value = 'नमस्ते';
        this.autoTransliterate();
        this.elements.inputText.focus();
      },
      spoken: () => {
        this.scrollToSection('chat');
        this.switchChatMode('learn');
        this.elements.chatInput.value =
          this.state.currentLanguage === 'hi'
            ? 'संस्कृत में अभिवादन कैसे करें?'
            : 'How do I greet in Sanskrit?';
        this.elements.chatInput.focus();
      },
      gita: () => {
        this.scrollToSection('chat');
        this.switchChatMode('analyze');
        this.elements.chatInput.value =
          this.state.currentLanguage === 'hi'
            ? 'इस वाक्यांश का विश्लेषण करें: योगः चित्तवृत्तिनिरोधः'
            : 'Analyze this phrase: योगः चित्तवृत्तिनिरोधः';
        this.elements.chatInput.focus();
      },
    };

    trackActions[trackId]?.();
    this.showToast(track.title, 'success');
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

    this.updateSpeechLanguage();
  },

  setupVoiceRecognition() {
    const recognition = this.state.voiceRecognition;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = this.getPreferredSpeechLanguage();

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

    this.updateSpeechLanguage();

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
      'ं': 'ṃ',
      'ः': 'ḥ',
      क: 'ka',
      ख: 'kha',
      ग: 'ga',
      घ: 'gha',
      ङ: 'ṅa',
      च: 'ca',
      छ: 'cha',
      ज: 'ja',
      झ: 'jha',
      ञ: 'ña',
      ट: 'ṭa',
      ठ: 'ṭha',
      ड: 'ḍa',
      ढ: 'ḍha',
      ण: 'ṇa',
      त: 'ta',
      थ: 'tha',
      द: 'da',
      ध: 'dha',
      न: 'na',
      प: 'pa',
      फ: 'pha',
      ब: 'ba',
      भ: 'bha',
      म: 'ma',
      य: 'ya',
      र: 'ra',
      ल: 'la',
      व: 'va',
      श: 'śa',
      ष: 'ṣa',
      स: 'sa',
      ह: 'ha',
    };

    let result = text;
    for (const [devanagari, iast] of Object.entries(transliterationMap)) {
      result = result.replace(new RegExp(devanagari, 'g'), iast);
    }

    return result;
  },

  async autoTransliterate() {
    const input = this.elements.inputText.value.trim();
    const requestId = ++this.state.autoTransliterationRequestId;

    if (!input) {
      this.elements.outputText.value = '';
      return;
    }

    try {
      const response = await this.transliterateText(input);
      if (requestId === this.state.autoTransliterationRequestId) {
        this.elements.outputText.value = response.iast;
      }
    } catch (error) {
      if (requestId === this.state.autoTransliterationRequestId) {
        this.elements.outputText.value = this.performTransliteration(input);
      }
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

    navigator.clipboard
      .writeText(output)
      .then(() => {
        this.showToast('Text copied to clipboard', 'success');
      })
      .catch(() => {
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
    utterance.lang = this.getPreferredSpeechLanguage(text);
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
    this.elements.translitHistory.innerHTML = '';
    this.state.transliterationHistory.forEach((item) => {
      const row = document.createElement('div');
      row.className = 'luxury-history-item';

      const input = document.createElement('div');
      input.className = 'luxury-history-devanagari';
      input.textContent = item.input;

      const output = document.createElement('div');
      output.className = 'luxury-history-iast';
      output.textContent = item.output;

      row.appendChild(input);
      row.appendChild(output);
      this.elements.translitHistory.appendChild(row);
    });
  },

  // ============================================
  // API INTEGRATION METHODS
  // ============================================
  async sendChatMessageApi(message, mode = 'learn') {
    try {
      this.showLoading();
      let response;
      if (mode === 'grounded') {
        response = await ApiManager.post('/api/grounded-answer', {
          message,
          k: 3,
          lang: this.state.currentLanguage,
        });
      } else if (mode === 'agentic') {
        response = await ApiManager.post('/api/agentic-answer', {
          message,
        });
      } else {
        response = await ApiManager.post('/api/chat', {
          message,
          mode,
          lang: this.state.currentLanguage,
        });
      }
      return response;
    } catch (error) {
      ErrorManager.handleApiError(error, 'Failed to send message. Please try again.');
      throw error;
    } finally {
      this.hideLoading();
    }
  },

  async transliterateText(text) {
    try {
      this.showLoading();
      const response = await ApiManager.post('/api/transliterate', {
        text,
      });
      return response;
    } catch (error) {
      ErrorManager.handleApiError(error, 'Transliteration failed. Please try again.');
      throw error;
    } finally {
      this.hideLoading();
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
    ToastManager.show(message, type);
  },

  async loadApiCapabilities() {
    try {
      this.state.apiInfo = await ApiManager.get('/api/info');
    } catch (error) {
      this.state.apiInfo = null;
    }

    this.updateCapabilityChips();
  },

  updateCapabilityChips() {
    if (!this.elements.chatCapabilities) return;

    const info = this.state.apiInfo || {};
    const labels =
      this.state.currentLanguage === 'hi'
        ? {
            runtime: 'रनटाइम',
            groundedReady: 'संदर्भ तैयार',
            groundedFallback: 'संदर्भ फॉलबैक',
            agenticReady: 'एजेंटिक तैयार',
            agenticFallback: 'एजेंटिक फॉलबैक',
          }
        : {
            runtime: 'Runtime',
            groundedReady: 'Grounded ready',
            groundedFallback: 'Grounded fallback',
            agenticReady: 'Agentic ready',
            agenticFallback: 'Agentic fallback',
          };
    const runtimeChip = this.elements.chatCapabilities.querySelector('[data-capability="runtime"]');
    const groundedChip = this.elements.chatCapabilities.querySelector(
      '[data-capability="grounded"]'
    );
    const agenticChip = this.elements.chatCapabilities.querySelector('[data-capability="agentic"]');

    if (runtimeChip) {
      runtimeChip.textContent = `${labels.runtime}: ${info.runtime || 'local'}`;
    }

    if (groundedChip) {
      groundedChip.textContent = info.grounded_answer
        ? labels.groundedReady
        : labels.groundedFallback;
      groundedChip.classList.toggle('inactive', !info.grounded_answer);
    }

    if (agenticChip) {
      agenticChip.textContent = info.agentic_rag ? labels.agenticReady : labels.agenticFallback;
      agenticChip.classList.toggle('inactive', !info.agentic_rag);
    }
  },

  getPreferredSpeechLanguage(sampleText = '') {
    const text =
      sampleText || this.elements.chatInput?.value || this.elements.inputText?.value || '';
    const hasDevanagari = /[\u0900-\u097F]/.test(text);
    if (this.state.currentLanguage === 'hi' || hasDevanagari) {
      return 'hi-IN';
    }
    return 'en-US';
  },

  updateSpeechLanguage() {
    if (this.state.voiceRecognition) {
      this.state.voiceRecognition.lang = this.getPreferredSpeechLanguage();
    }
  },

  debounce(func, wait) {
    return PerformanceManager.debounce(func, wait);
  },

  runNonCriticalWork(callback) {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout: 1200 });
      return;
    }

    window.setTimeout(callback, 200);
  },

  // ============================================
  // ANIMATIONS
  // ============================================
  startAnimations() {
    this.runNonCriticalWork(() => this.initializeScrollAnimations());
  },

  animateHeroElements() {
    // Intentionally no hero entrance animation: text should paint immediately for LCP.
  },

  initializeScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'luxuryFadeIn 0.8s ease forwards';
        }
      });
    }, observerOptions);

    // Observe elements
    document
      .querySelectorAll('.luxury-feature-card, .luxury-track-card, .luxury-lesson-card')
      .forEach((el) => {
        observer.observe(el);
      });
  },

  initializeIntersectionObserver() {
    // Intentionally no parallax: scrolling should stay stable and predictable.
  },

  // ============================================
  // NAVIGATION ACTIONS
  // ============================================
  startJourney() {
    this.scrollToSection('chat');
    this.showToast('Tutor ready.', 'success');
  },

  scrollToFeatures() {
    this.scrollToSection('features');
  },

  scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  },
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
