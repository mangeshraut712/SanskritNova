/* SanskritNova AI - Luxury JavaScript Application */
/* Premium interactions with royal elegance and smooth animations */

// ============================================
// API CONFIGURATION
// ============================================
const API_BASE_URL = window.location.hostname === 'localhost' ? 
  'http://localhost:8000' : 
  'https://sanskrit-nova.vercel.app';

// ============================================
// TRANSLATIONS DATABASE
// ============================================
const TRANSLATIONS = {
  en: {
    // Navigation
    nav: {
      chat: 'चाट',
      translit: 'लिप्यन्तर',
      dictionary: 'शब्दकोश',
      grammar: 'व्याकरण',
      tracks: 'पाठ्यक्रम',
      knowledgeBase: '📚 Knowledge Base'
    },
    // Hero Section
    hero: {
      badge: '🇮🇳 Royal Heritage • Premium Design',
      title: ['Experience the Luxury', 'संस्कृतम् अध्ययनम्', 'of Sanskrit Learning'],
      subtitle: 'Embark on a majestic journey through the timeless wisdom of Sanskrit, enhanced by cutting-edge AI technology and presented with unparalleled luxury.',
      stats: {
        heritage: 'Years of Heritage',
        words: 'Sanskrit Words',
        accuracy: 'AI Accuracy',
        support: 'Premium Support'
      },
      actions: {
        startJourney: ['🚀', 'Begin Your Journey'],
        exploreFeatures: ['✨', 'Explore Features']
      }
    },
    // Features Section
    features: {
      title: 'Premium Features',
      subtitle: 'Experience Sanskrit learning with unparalleled luxury and sophistication',
      items: {
        ai: {
          title: 'AI-Powered Learning',
          description: 'Advanced artificial intelligence provides personalized Sanskrit learning experiences with real-time feedback and adaptive learning paths.'
        },
        library: {
          title: 'Royal Library',
          description: 'Access to an exquisite collection of Sanskrit texts, from ancient Vedas to classical literature, curated with scholarly precision.'
        },
        transliteration: {
          title: 'Precision Transliteration',
          description: 'State-of-the-art transliteration technology ensures accurate conversion between Devanagari and IAST scripts with cultural authenticity.'
        },
        design: {
          title: 'Luxury Design',
          description: 'Immerse yourself in an interface that combines modern luxury with traditional Indian aesthetics for an unparalleled user experience.'
        },
        pronunciation: {
          title: 'Authentic Pronunciation',
          description: 'Learn proper Sanskrit pronunciation with native speaker audio recordings and phonetic analysis powered by advanced speech technology.'
        },
        mobile: {
          title: 'Premium Mobile',
          description: 'Seamless mobile experience with progressive web app technology, ensuring luxury learning on any device, anywhere, anytime.'
        }
      }
    },
    // Knowledge Base Section
    knowledgeBase: {
      title: 'Research-Grade Knowledge Base',
      subtitle: 'Access the most comprehensive digital library of Sanskrit and Hinduism with verified academic sources',
      items: {
        texts: {
          title: '10,000+ Sanskrit Texts',
          description: 'Complete collection of Vedic, Upanishadic, philosophical, and classical Sanskrit texts with critical editions.',
          action: ['🔍', 'Explore Library']
        },
        manuscripts: {
          title: '5,000+ Manuscripts',
          description: 'Verified manuscript collections from premier institutions including BORI, Cambridge, Oxford, and GRETIL.',
          action: ['📜', 'Browse Manuscripts']
        },
        sources: {
          title: 'Peer-Reviewed Sources',
          description: '500+ academic references with complete bibliographic information and scholarly verification.',
          action: ['📖', 'View Bibliography']
        },
        search: {
          title: 'Advanced Search',
          description: 'Full-text search in Sanskrit, IAST, and English with filtering by period, category, and repository.',
          action: ['🔍', 'Search Database']
        },
        excellence: {
          title: 'Academic Excellence',
          description: 'Research-grade digital knowledge base built exclusively on verified, historically authenticated sources.',
          action: ['🏛️', 'Access Library']
        },
        access: {
          title: 'Open Access',
          description: 'Free access to primary sources, critical editions, and peer-reviewed scholarship for global researchers.',
          action: ['📚', 'Open Library']
        }
      }
    },
    // Chat Section
    chat: {
      title: 'AI Sanskrit Tutor',
      subtitle: 'Engage in sophisticated conversations with our AI tutor for personalized Sanskrit learning',
      modes: {
        learn: ['📖', 'Learn'],
        translate: ['🔄', 'Translate'],
        analyze: ['🔍', 'Analyze']
      },
      placeholder: 'Type your message in Sanskrit or English...',
      suggestions: [
        'What is yoga in Sanskrit?',
        'Translate: रामो गच्छति',
        'Explain dharma',
        'Basic Sanskrit greetings'
      ],
      welcome: 'नमस्ते! I am your premium AI Sanskrit tutor. How may I assist you in your Sanskrit learning journey today?',
      modeMessages: {
        learn: 'Switched to Learning mode. I will help you learn Sanskrit concepts.',
        translate: 'Switched to Translation mode. I can translate between Sanskrit and English.',
        analyze: 'Switched to Analysis mode. I can analyze Sanskrit grammar and structure.'
      }
    },
    // Transliteration Section
    transliteration: {
      title: 'Royal Transliteration',
      subtitle: 'Experience precision transliteration between Devanagari and IAST scripts',
      label: 'Enter Sanskrit Text',
      outputLabel: 'Transliterated Text',
      placeholder: 'Type or paste Sanskrit text in Devanagari or IAST...',
      outputPlaceholder: 'Transliterated text will appear here...',
      actions: {
        transliterate: ['🔄', 'Transliterate'],
        swapScript: ['⇄', 'Swap Script'],
        copy: ['📋', 'Copy'],
        speak: ['🔊', 'Speak'],
        clear: ['🗑️', 'Clear']
      },
      historyTitle: 'Recent Transliterations',
      emptyMessage: 'Please enter text to transliterate',
      successMessage: 'Transliteration completed',
      warningMessage: 'Please enter text to transliterate'
    },
    // Dictionary Section
    dictionary: {
      title: 'Royal Sanskrit Dictionary',
      subtitle: 'Explore the vast ocean of Sanskrit vocabulary with scholarly precision',
      placeholder: 'Search Sanskrit words...',
      meanings: {
        dharma: ['duty', 'righteousness', 'cosmic law', 'virtue'],
        yoga: ['union', 'discipline', 'meditation', 'practice']
      },
      examples: {
        dharma: {
          sanskrit: 'धर्मो रक्षति रक्षितः',
          translation: 'Dharma protects the protector of dharma'
        },
        yoga: {
          sanskrit: 'योगश्चित्तवृत्तिनिरोधः',
          translation: 'Yoga is the cessation of mental modifications'
        }
      }
    },
    // Grammar Section
    grammar: {
      title: 'Master Sanskrit Grammar',
      subtitle: 'Delve into the elegant structure of Sanskrit grammar with expert guidance',
      tabs: {
        basics: 'Basics',
        verbs: 'Verbs',
        nouns: 'Nouns',
        sandhi: 'Sandhi',
        syntax: 'Syntax'
      },
      lessons: {
        alphabet: {
          title: 'Alphabet & Sounds',
          description: 'Master the Sanskrit alphabet with proper pronunciation and phonetic understanding.'
        },
        vowels: {
          title: 'Vowels & Consonants',
          description: 'Understand the classification and properties of Sanskrit vowels and consonants.'
        },
        meter: {
          title: 'Sanskrit Meter',
          description: 'Learn the poetic meters that give Sanskrit literature its musical quality.'
        },
        declensions: {
          title: 'Noun Declensions',
          description: 'Master the eight cases of Sanskrit noun declension with examples.'
        },
        gender: {
          title: 'Gender & Number',
          description: 'Understand the three genders and three numbers in Sanskrit grammar.'
        },
        sandhi: {
          title: 'Sandhi Rules',
          description: 'Learn the euphonic combinations that make Sanskrit poetry flow beautifully.'
        },
        sentence: {
          title: 'Sentence Structure',
          description: 'Understand Sanskrit word order and sentence construction patterns.'
        }
      }
    },
    // Learning Tracks Section
    tracks: {
      title: 'Premium Learning Tracks',
      subtitle: 'Curated learning paths designed for different levels and goals',
      items: {
        foundations: {
          title: 'Sanskrit Foundations',
          subtitle: 'संस्कृत आधार',
          description: 'Begin your Sanskrit journey with the fundamentals. Learn the alphabet, basic grammar, and essential vocabulary.',
          level: 'Beginner',
          duration: '2 weeks',
          actions: ['Start Track', 'Details']
        },
        gita: {
          title: 'Bhagavad Gita Mastery',
          subtitle: 'भगवद् गीता',
          description: 'Dive deep into the Bhagavad Gita with verse-by-verse study, philosophical insights, and practical applications.',
          level: 'Intermediate',
          duration: '4 weeks',
          actions: ['Start Track', 'Details']
        },
        advanced: {
          title: 'Advanced Grammar',
          subtitle: 'व्याकरण प्रयोगशाला',
          description: 'Master advanced Sanskrit grammar including complex constructions, poetic devices, and linguistic analysis.',
          level: 'Advanced',
          duration: '6 weeks',
          actions: ['Start Track', 'Details']
        },
        vedic: {
          title: 'Vedic Wisdom',
          subtitle: 'वैदिक ज्ञानम्',
          description: 'Explore the ancient Vedas with scholarly commentary, ritual understanding, and philosophical depth.',
          level: 'Expert',
          duration: '8 weeks',
          actions: ['Start Track', 'Details']
        }
      }
    },
    // Footer
    footer: {
      learning: 'Learning',
      resources: 'Resources',
      connect: 'Connect',
      copyright: '© 2026 SanskritNova AI. All rights reserved. Premium Sanskrit Learning Platform.'
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
      languageChanged: 'Language switched to {language}'
    }
  },
  hi: {
    // Navigation
    nav: {
      chat: 'Chat',
      translit: 'Transliteration',
      dictionary: 'Dictionary',
      grammar: 'Grammar',
      tracks: 'Tracks',
      knowledgeBase: '📚 ज्ञान संग्रह'
    },
    // Hero Section
    hero: {
      badge: '🇮🇳 शाही विरासत • प्रीमियम डिज़ाइन',
      title: ['संस्कृत अध्ययन का', 'संस्कृतम् अध्ययनम्', 'लक्ज़री अनुभव करें'],
      subtitle: 'संस्कृत की कालातीत ज्ञान की भव्य यात्रा पर जाएं, जो कटिंग-एज AI तकनीक द्वारा बढ़ाई गई है और अतुलनीय लक्ज़री के साथ प्रस्तुत की गई है।',
      stats: {
        heritage: 'वर्षों की विरासत',
        words: 'संस्कृत शब्द',
        accuracy: 'AI सटीकता',
        support: 'प्रीमियम समर्थन'
      },
      actions: {
        startJourney: ['🚀', 'अपनी यात्रा शुरू करें'],
        exploreFeatures: ['✨', 'सुविधाएं देखें']
      }
    },
    // Features Section
    features: {
      title: 'प्रीमियम सुविधाएं',
      subtitle: 'अतुलनीय लक्ज़री और परिष्कार के साथ संस्कृत अध्ययन का अनुभव करें',
      items: {
        ai: {
          title: 'AI-संचालित अध्ययन',
          description: 'उन्नत कृत्रिम बुद्धिमत्ता व्यक्तिगत संस्कृत अध्ययन अनुभव प्रदान करती है, जिसमें रियल-टाइम फीडबैक और अनुकूलनीय अध्ययन पथ हैं।'
        },
        library: {
          title: 'शाही पुस्तकालय',
          description: 'प्राचीन वेदों से लेकर शास्त्रीय साहित्य तक संस्कृत ग्रंथों के अद्भुत संग्रह तक पहुंच, जिसे विद्वानानुदात्त परिशुद्धता के साथ संकलित किया गया है।'
        },
        transliteration: {
          title: 'सटीक लिप्यंतरण',
          description: 'अत्याधुनिक लिप्यंतरण तकनीक देवनागरी और IAST लिपियों के बीच सांस्कृतिक प्रामाणिकता के साथ सटीक रूपांतरण सुनिश्चित करती है।'
        },
        design: {
          title: 'लक्ज़री डिज़ाइन',
          description: 'एक ऐसे इंटरफ़ेस में खुद को डुबोएं जो आधुनिक लक्ज़री को पारंपरिक भारतीय सौंदर्यशास्त्र के साथ जोड़ता है।'
        },
        pronunciation: {
          title: 'प्रामाणिक उच्चारण',
          description: 'देशी वक्ता ऑडियो रिकॉर्डिंग और उन्नत स्पीच तकनीक द्वारा संचालित फोनेटिक विश्लेषण के साथ उचित संस्कृत उच्चारण सीखें।'
        },
        mobile: {
          title: 'प्रीमियम मोबाइल',
          description: 'प्रगतिशील वेब ऐप तकनीक के साथ निर्बाध अनुभव, जो किसी भी डिवाइस पर, कहीं भी, कभी भी लक्ज़री अध्ययन सुनिश्चित करता है।'
        }
      }
    },
    // Knowledge Base Section
    knowledgeBase: {
      title: 'अनुसंधान-ग्रेड ज्ञान संग्रह',
      subtitle: 'सत्यापित अकादमिक स्रोतों के साथ संस्कृत और हिंदू धर्म का सबसेे व्यापक डिजिटल पुस्तकालय तक पहुंच',
      items: {
        texts: {
          title: '10,000+ संस्कृत ग्रंथ',
          description: 'वैदिक, उपनिषदिक, दार्शनिक, और शास्त्रीय संस्कृत ग्रंथों का पूरा संग्रह, जिसमें महत्वपूर्ण संस्करण शामिल हैं।',
          action: ['🔍', 'पुस्तकालय देखें']
        },
        manuscripts: {
          title: '5,000+ पांडुलिपियां',
          description: 'BORI, कैम्ब्रिज, ऑक्सफोर्ड, और GRETIL सहित प्रमुख संस्थानों से सत्यापित पांडुलिपि संग्रह।',
          action: ['📜', 'पांडुलिपियां ब्राउज़ करें']
        },
        sources: {
          title: 'पीर-रिव्यू स्रोत',
          description: '500+ अकादमिक संदर्भ, जिनमें पूरी ग्रंथसूची जानकारी और विद्वान सत्यापन शामिल है।',
          action: ['📖', 'ग्रंथसूची देखें']
        },
        search: {
          title: 'उन्नत खोज',
          description: 'संस्कृत, IAST, और अंग्रेजी में पूर्ण-पाठ खोज, जिसमें अवधि, श्रेणी, और भंडार द्वारा फ़िल्टरिंग है।',
          action: ['🔍', 'डेटाबेस खोजें']
        },
        excellence: {
          title: 'अकादमिक उत्कृष्टि',
          description: 'अनुसंधान-ग्रेड डिजिटल ज्ञान संग्रह, जो विशेष रूप से सत्यापित, ऐतिहासिक रूप से प्रमाणित स्रोतों पर बनाया गया है।',
          action: ['🏛️', 'पुस्तकालय तक पहुंच']
        },
        access: {
          title: 'मुफ्त पहुंच',
          description: 'वैश्विक शोधकर्ताओं के लिए प्राथमिक स्रोत, महत्वपूर्ण संस्करण, और पीर-रिव्यू विद्वानता तक मुफ्त पहुंच।',
          action: ['📚', 'पुस्तकालय खोलें']
        }
      }
    },
    // Chat Section
    chat: {
      title: 'AI संस्कृत ट्यूटर',
      subtitle: 'व्यक्तिगत संस्कृत अध्ययन के लिए हमारे AI ट्यूटर के साथ परिष्कृत वार्तालाप में संलग्न हों',
      modes: {
        learn: ['📖', 'सीखें'],
        translate: ['🔄', 'अनुवाद'],
        analyze: ['🔍', 'विश्लेषण']
      },
      placeholder: 'संस्कृत या अंग्रेजी में अपना संदेश टाइप करें...',
      suggestions: [
        'योग संस्कृत में क्या है?',
        'अनुवाद: रामो गच्छति',
        'धर्म समझाएं',
        'बुनियादी संस्कृत अभिवादन'
      ],
      welcome: 'नमस्ते! मैं आपका प्रीमियम AI संस्कृत ट्यूटर हूं। मैं आपके संस्कृत अध्ययन यात्रा में कैसे सहायता कर सकता हूं?',
      modeMessages: {
        learn: 'अध्ययन मोड में स्विच किया गया। मैं आपको संस्कृत अवधारण सिखाने में मदद करूंगा।',
        translate: 'अनुवाद मोड में स्विच किया गया। मैं संस्कृत और अंग्रेजी के बीच अनुवाद कर सकता हूं।',
        analyze: 'विश्लेषण मोड में स्विच किया गया। मैं संस्कृत व्याकरण और संरचना का विश्लेषण कर सकता हूं।'
      }
    },
    // Transliteration Section
    transliteration: {
      title: 'शाही लिप्यंतरण',
      subtitle: 'देवनागरी और IAST लिपियों के बीच सटीक लिप्यंतरण का अनुभव करें',
      label: 'संस्कृत पाठ दर्ज करें',
      outputLabel: 'लिप्यंतरित पाठ',
      placeholder: 'देवनागरी या IAST में संस्कृत पाठ टाइप या पेस्ट करें...',
      outputPlaceholder: 'लिप्यंतरित पाठ यहां दिखाई देगा...',
      actions: {
        transliterate: ['🔄', 'लिप्यंतरित करें'],
        swapScript: ['⇄', 'लिपि बदलें'],
        copy: ['📋', 'कॉपी करें'],
        speak: ['🔊', 'बोलें'],
        clear: ['🗑️', 'साफ करें']
      },
      historyTitle: 'हाल के लिप्यंतरण',
      emptyMessage: 'कृपया लिप्यंतरण के लिए पाठ दर्ज करें',
      successMessage: 'लिप्यंतरण पूर्ण',
      warningMessage: 'कृपया लिप्यंतरण के लिए पाठ दर्ज करें'
    },
    // Dictionary Section
    dictionary: {
      title: 'शाही संस्कृत शब्दकोश',
      subtitle: 'विद्वानानुदात्त परिशुद्धता के साथ संस्कृत शब्दावली के विशाल सागर का अन्वेषण करें',
      placeholder: 'संस्कृत शब्द खोजें...',
      meanings: {
        dharma: ['कर्तव्य', 'धार्मिकता', 'ब्रह्मांडीय नियम', 'पुण्य'],
        yoga: ['एकता', 'अनुशासन', 'ध्यान', 'अभ्यास']
      },
      examples: {
        dharma: {
          sanskrit: 'धर्मो रक्षति रक्षितः',
          translation: 'धर्म धर्म के रक्षक की रक्षा करता है'
        },
        yoga: {
          sanskrit: 'योगश्चित्तवृत्तिनिरोधः',
          translation: 'योग मानसिक संशोधन का निवारण है'
        }
      }
    },
    // Grammar Section
    grammar: {
      title: 'संस्कृत व्याकरण में महारत',
      subtitle: 'विशेषज्ञ मार्गदर्शन के साथ संस्कृत व्याकरण की सुंदर संरचना में गहराएं',
      tabs: {
        basics: 'बेसिक',
        verbs: 'क्रियाएं',
        nouns: 'संज्ञाएं',
        sandhi: 'संधि',
        syntax: 'वाक्य-विन्यास'
      },
      lessons: {
        alphabet: {
          title: 'वर्णमाला और ध्वनियां',
          description: 'उचित उच्चारण और ध्वन्यात्मक समझ के साथ संस्कृत वर्णमाला में महारत हासिल करें।'
        },
        vowels: {
          title: 'स्वर और व्यंजन',
          description: 'संस्कृत स्वर और व्यंजन की वर्गीकरण और गुणों को समझें।'
        },
        meter: {
          title: 'संस्कृत छंद',
          description: 'वे काव्य छंद सीखें जो संस्कृत साहित्य को संगीतमय गुण देते हैं।'
        },
        declensions: {
          title: 'संज्ञा विभक्तियां',
          description: 'उदाहरणों के साथ संस्कृत संज्ञा विभक्तियों के आठ कारकों में महारत हासिल करें।'
        },
        gender: {
          title: 'लिंग और वचन',
          description: 'संस्कृत व्याकरण में तीन लिंगों और तीन वचनों को समझें।'
        },
        sandhi: {
          title: 'संधि नियम',
          description: 'वे ध्वन्योत्पादक संयोजन सीखें जो संस्कृत काव्य को सुगमत बनाते हैं।'
        },
        sentence: {
          title: 'वाक्य संरचना',
          description: 'संस्कृत शब्द क्रम और वाक्य निर्माण पैटर्न को समझें।'
        }
      }
    },
    // Learning Tracks Section
    tracks: {
      title: 'प्रीमियम अध्ययन पथ',
      subtitle: 'विभिन्न स्तरों और लक्ष्यों के लिए डिज़ाइन किए गए व्यवस्थित अध्ययन पथ',
      items: {
        foundations: {
          title: 'संस्कृत आधार',
          subtitle: 'संस्कृत आधार',
          description: 'मूल बातों के साथ अपनी संस्कृत यात्रा शुरू करें। वर्णमाला, बुनियादी व्याकरण, और आवश्यक शब्दावली सीखें।',
          level: 'शुरुआती',
          duration: '2 सप्ताह',
          actions: ['पथ शुरू करें', 'विवरण']
        },
        gita: {
          title: 'भगवद् गीता महारत',
          subtitle: 'भगवद् गीता',
          description: 'श्लोक-दर-श्लोक अध्ययन, दार्शनिक अंतर्दृष्टि, और व्यावहारिक अनुप्रयोगों के साथ भगवद् गीता में गहराएं।',
          level: 'मध्यवर्ती',
          duration: '4 सप्ताह',
          actions: ['पथ शुरू करें', 'विवरण']
        },
        advanced: {
          title: 'उन्नत व्याकरण',
          subtitle: 'व्याकरण प्रयोगशाला',
          description: 'जटिल निर्माण, काव्य उपकरण, और भाषावैज्ञानिक विश्लेषण सहित उन्नत संस्कृत व्याकरण में महारत हासिल करें।',
          level: 'उन्नत',
          duration: '6 सप्ताह',
          actions: ['पथ शुरू करें', 'विवरण']
        },
        vedic: {
          title: 'वैदिक ज्ञान',
          subtitle: 'वैदिक ज्ञानम्',
          description: 'विद्वानानुदात्त टिप्पणी, अनुष्ठान समझ, और दार्शनिक गहराई के साथ प्राचीन वेदों का अन्वेषण करें।',
          level: 'विशेषज्ञ',
          duration: '8 सप्ताह',
          actions: ['पथ शुरू करें', 'विवरण']
        }
      }
    },
    // Footer
    footer: {
      learning: 'अध्ययन',
      resources: 'संसाधन',
      connect: 'जुड़ें',
      copyright: '© 2026 SanskritNova AI. सभी अधिकार सुरक्षित। प्रीमियम संस्कृत अध्ययन प्लेटफ़ॉर्म।'
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
      languageChanged: 'भाषा बदलकर {language}'
    }
  }
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
    this.initializeTheme();
    this.initializeLanguage();
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
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this.state.currentTheme = savedTheme;
    } else {
      // Check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      this.state.currentTheme = prefersDark ? 'dark' : 'light';
    }
    this.applyTheme(this.state.currentTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.state.currentTheme = e.matches ? 'dark' : 'light';
        this.applyTheme(this.state.currentTheme);
      }
    });
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
    
    // Show theme change notification
    const themeName = newTheme === 'dark' ? 'dark' : 'light';
    this.showToast(this.getTranslation('general.themeChanged', { theme: themeName }), 'success');
  },

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      this.elements.themeIcon.textContent = '☀️';
    } else {
      document.documentElement.removeAttribute('data-theme');
      this.elements.themeIcon.textContent = '🌙';
    }
    
    // Update meta theme-color
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.content = theme === 'dark' ? '#0A0A0A' : '#D4AF37';
    }
  },

  // ============================================
  // LANGUAGE MANAGEMENT
  // ============================================
  switchLanguage(lang) {
    if (this.state.currentLanguage === lang) return;
    
    this.state.currentLanguage = lang;
    
    // Update active button
    this.elements.langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
    });
    
    // Update content
    this.updateContentLanguage(lang);
    
    // Save preference
    localStorage.setItem('language', lang);
    
    // Show notification
    const langName = lang === 'en' ? 'English' : 'हिन्दी';
    this.showToast(this.getTranslation('general.languageChanged', { language: langName }), 'success');
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
    // Update navigation links
    const navLinks = document.querySelectorAll('.luxury-nav-link');
    const navTranslations = this.getTranslation('nav');
    
    if (navLinks.length >= 6) {
      navLinks[0].textContent = navTranslations.chat;
      navLinks[1].textContent = navTranslations.translit;
      navLinks[2].textContent = navTranslations.dictionary;
      navLinks[3].textContent = navTranslations.grammar;
      navLinks[4].textContent = navTranslations.tracks;
      navLinks[5].textContent = navTranslations.knowledgeBase;
    }
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
    this.elements.langButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === this.state.currentLanguage);
      btn.setAttribute('aria-pressed', btn.dataset.lang === this.state.currentLanguage);
    });
    
    // Update content
    this.updateContentLanguage(this.state.currentLanguage);
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
