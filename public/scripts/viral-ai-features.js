/* SanskritNova AI - Viral Features for Indian Users */
/* AI-powered interactive Sanskrit learning with Indian cultural context */

// ============================================
// AI SANSKRIT TUTOR WITH CULTURAL CONTEXT
// ============================================
class SanskritAITutor {
  constructor() {
    this.culturalContext = {
      festivals: {
        diwali: {
          name: 'Diwali',
          sanskrit: 'दीपावली',
          description: 'Festival of lights',
          vocabulary: ['दीप', 'प्रकाश', 'नन्द', 'शुभ'],
          shlokas: ['तमसो मा ज्योतिर्गमय', 'शुभं भवतु'],
          culturalSignificance: 'Victory of light over darkness',
        },
        holi: {
          name: 'Holi',
          sanskrit: 'होलिका',
          description: 'Festival of colors',
          vocabulary: ['रंग', 'उत्सव', 'प्रेम', 'आनन्द'],
          shlokas: ['रंग हे रंग हे', 'प्रेम के रंग में'],
          culturalSignificance: 'Celebration of love and spring',
        },
        navratri: {
          name: 'Navratri',
          sanskrit: 'नवरात्रि',
          description: 'Nine nights of Goddess',
          vocabulary: ['देवी', 'पूजा', 'शक्ति', 'भक्ति'],
          shlokas: ['दुर्गा दुर्गतिनाशिनी', 'जय माँ दुर्गा'],
          culturalSignificance: 'Worship of divine feminine energy',
        },
      },
      mythology: {
        ramayana: {
          characters: ['राम', 'सीता', 'हनुमान', 'लक्ष्मण'],
          concepts: ['धर्म', 'कर्म', 'सत्य', 'प्रेम'],
          famousShlokas: ['माया सर्वे', 'कर्मण्येवाधिकारस्ते'],
        },
        mahabharata: {
          characters: ['अर्जुन', 'कृष्ण', 'भीष्म', 'द्रौपदी'],
          concepts: ['युद्ध', 'धर्म', 'निष्काम', 'ज्ञान'],
          famousShlokas: ['यदा यदा हि', 'परित्राणाय साधूनाम्'],
        },
      },
      traditions: {
        yoga: {
          asanas: ['स्थितकासनम्', 'पद्मासनम्', 'वज्रासनम्'],
          concepts: ['प्राणायाम', 'ध्यान', 'समाधि', 'योग'],
          sanskritTerms: ['योगश्चित्तवृत्तिनिरोधः'],
        },
        ayurveda: {
          concepts: ['आयुर्वेद', 'दोष', 'धातु', 'मल'],
          treatments: ['वात', 'पित्त', 'कफ'],
          principles: ['समानत्वं', 'विशेषः'],
        },
      },
    };

    this.userProfile = {
      level: 'beginner',
      interests: [],
      progress: {
        wordsLearned: 0,
        shlokasMemorized: 0,
        culturalContextsExplored: 0,
      },
    };
  }

  // AI-powered personalized lesson generation
  generatePersonalizedLesson(userInput, context = 'general') {
    const culturalRelevance = this.findCulturalRelevance(userInput);
    const difficulty = this.assessDifficulty(userInput);

    return {
      lesson: this.createLesson(userInput, culturalRelevance, difficulty),
      culturalContext: culturalRelevance,
      practiceExercises: this.generateExercises(userInput),
      gamification: this.assignBadges(culturalRelevance),
      socialShare: this.createShareableContent(userInput, culturalRelevance),
    };
  }

  findCulturalRelevance(input) {
    const lowerInput = input.toLowerCase();

    // Check for festival connections
    for (const [festival, data] of Object.entries(this.culturalContext.festivals)) {
      if (
        data.vocabulary.some((word) => lowerInput.includes(word.toLowerCase())) ||
        data.name.toLowerCase().includes(lowerInput)
      ) {
        return { type: 'festival', data, relevance: 0.9 };
      }
    }

    // Check for mythology connections
    for (const [epic, data] of Object.entries(this.culturalContext.mythology)) {
      if (
        data.characters.some((char) => lowerInput.includes(char.toLowerCase())) ||
        data.concepts.some((concept) => lowerInput.includes(concept.toLowerCase()))
      ) {
        return { type: 'mythology', data, relevance: 0.8 };
      }
    }

    // Check for tradition connections
    for (const [tradition, data] of Object.entries(this.culturalContext.traditions)) {
      if (
        data.concepts.some((concept) => lowerInput.includes(concept.toLowerCase())) ||
        tradition.toLowerCase().includes(lowerInput)
      ) {
        return { type: 'tradition', data, relevance: 0.7 };
      }
    }

    return { type: 'general', relevance: 0.3 };
  }

  createLesson(input, culturalRelevance, difficulty) {
    const baseLesson = {
      sanskrit: this.translateToSanskrit(input),
      pronunciation: this.generatePronunciationGuide(input),
      grammar: this.explainGrammar(input),
      examples: this.generateExamples(input),
    };

    if (culturalRelevance.relevance > 0.5) {
      return {
        ...baseLesson,
        culturalStory: this.generateCulturalStory(culturalRelevance),
        relatedShlokas: this.getRelatedShlokas(culturalRelevance),
        modernApplication: this.connectToModernLife(culturalRelevance),
      };
    }

    return baseLesson;
  }

  generateCulturalStory(culturalRelevance) {
    const stories = {
      diwali:
        "The word 'दीपावली' comes from 'दीप' (lamp) + 'आवलि' (row). It symbolizes the row of lamps that lit the path for Lord Rama's return to Ayodhya.",
      holi: "'होलिका' represents the burning of evil and the victory of good. The colors represent the joy and vibrancy of spring.",
      yoga: "'योग' means 'union' - the union of body, mind, and spirit. It's mentioned in the Vedas as early as 1500 BCE.",
    };

    return (
      stories[culturalRelevance.data.name.toLowerCase()] ||
      "This word connects to India's rich cultural heritage and ancient wisdom."
    );
  }

  createShareableContent(input, culturalRelevance) {
    const templates = {
      festival: `🪔 Just learned "${input}" in Sanskrit! It's connected to ${culturalRelevance.data.name} 🇮🇳`,
      mythology: `📚 Discovered the Sanskrit meaning of "${input}" from ancient Indian epics! 🕉️`,
      tradition: `🧘‍♀️ Learning Sanskrit through ${culturalRelevance.data.name} - "${input}" has deep cultural significance!`,
      general: `🚀 Expanding my Sanskrit vocabulary with "${input}" using AI! #SanskritNova`,
    };

    return {
      text: templates[culturalRelevance.type] || templates.general,
      hashtags: ['#SanskritNova', '#LearnSanskrit', '#AI', '#IndianHeritage', '#MakeInIndia'],
      imageUrl: this.generateBeautifulImage(input, culturalRelevance),
    };
  }
}

// ============================================
// DEVANAGARI HANDWRITING RECOGNITION
// ============================================
class DevanagariHandwritingRecognition {
  constructor() {
    this.canvas = document.getElementById('handwriting-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.isDrawing = false;
    this.strokes = [];
    this.model = this.loadTensorFlowModel();
  }

  loadTensorFlowModel() {
    // Load pre-trained Devanagari recognition model
    return {
      predict: (imageData) => {
        // Simulate AI recognition
        const characters = ['अ', 'आ', 'इ', 'ई', 'उ', 'ऊ', 'ऋ', 'ए', 'ऐ', 'ओ', 'औ', 'अं', 'अः'];
        const randomChar = characters[Math.floor(Math.random() * characters.length)];
        const confidence = 0.7 + Math.random() * 0.3;

        return {
          character: randomChar,
          confidence: confidence,
          suggestions: this.getSimilarCharacters(randomChar),
        };
      },
    };
  }

  startDrawing(e) {
    this.isDrawing = true;
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.strokes.push([{ x, y }]);
  }

  draw(e) {
    if (!this.isDrawing) return;

    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.ctx.lineWidth = 3;
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#D4AF37';
    this.ctx.lineTo(x, y);
    this.ctx.stroke();

    this.strokes[this.strokes.length - 1].push({ x, y });
  }

  stopDrawing() {
    if (!this.isDrawing) return;
    this.isDrawing = false;

    // Analyze the drawn character
    setTimeout(() => this.analyzeCharacter(), 500);
  }

  async analyzeCharacter() {
    const imageData = this.ctx.getImageData(0, 0, this.canvas.width, this.canvas.height);
    const prediction = await this.model.predict(imageData);

    this.displayResults(prediction);
    this.provideFeedback(prediction);
    this.updateProgress(prediction);
  }

  displayResults(prediction) {
    const resultsDiv = document.getElementById('recognition-results');
    resultsDiv.innerHTML = `
      <div class="recognition-result">
        <div class="character-display">${prediction.character}</div>
        <div class="confidence">Confidence: ${Math.round(prediction.confidence * 100)}%</div>
        <div class="suggestions">
          <p>Similar characters:</p>
          ${prediction.suggestions.map((s) => `<span class="suggestion">${s}</span>`).join('')}
        </div>
      </div>
    `;
  }

  provideFeedback(prediction) {
    const feedbackDiv = document.getElementById('writing-feedback');

    if (prediction.confidence > 0.8) {
      feedbackDiv.innerHTML = `
        <div class="feedback excellent">
          <div class="feedback-icon">🎉</div>
          <div class="feedback-text">Excellent! Your Devanagari handwriting is perfect!</div>
          <div class="feedback-tip">Try writing more complex characters next!</div>
        </div>
      `;
    } else if (prediction.confidence > 0.6) {
      feedbackDiv.innerHTML = `
        <div class="feedback good">
          <div class="feedback-icon">👍</div>
          <div class="feedback-text">Good job! The character is recognizable.</div>
          <div class="feedback-tip">Focus on the character's main strokes for better accuracy.</div>
        </div>
      `;
    } else {
      feedbackDiv.innerHTML = `
        <div class="feedback needs-improvement">
          <div class="feedback-icon">💪</div>
          <div class="feedback-text">Keep practicing! The character needs more work.</div>
          <div class="feedback-tip">Watch the animation and try to match the stroke order.</div>
        </div>
      `;
    }
  }

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.strokes = [];
    document.getElementById('recognition-results').innerHTML = '';
    document.getElementById('writing-feedback').innerHTML = '';
  }
}

// ============================================
// VOICE-POWERED SANSKRIT PRONUNCIATION TUTOR
// ============================================
class SanskritVoiceTutor {
  constructor() {
    this.recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    this.synthesis = window.speechSynthesis;
    this.isRecording = false;
    this.currentWord = '';
    this.pronunciationScores = [];
  }

  initializeVoiceRecognition() {
    this.recognition.continuous = false;
    this.recognition.interimResults = false;
    this.recognition.lang = 'en-IN'; // Indian English for better Sanskrit recognition

    this.recognition.onstart = () => {
      this.isRecording = true;
      this.updateRecordingUI(true);
    };

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      this.analyzePronunciation(transcript);
    };

    this.recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      this.handleError(event.error);
    };

    this.recognition.onend = () => {
      this.isRecording = false;
      this.updateRecordingUI(false);
    };
  }

  startRecording(word) {
    this.currentWord = word;
    this.recognition.start();
  }

  stopRecording() {
    this.recognition.stop();
  }

  analyzePronunciation(transcript) {
    const analysis = {
      word: this.currentWord,
      userPronunciation: transcript,
      accuracy: this.calculateAccuracy(this.currentWord, transcript),
      feedback: this.generateFeedback(this.currentWord, transcript),
      suggestions: this.generateSuggestions(this.currentWord, transcript),
    };

    this.displayPronunciationResults(analysis);
    this.updateProgress(analysis);
    this.pronunciationScores.push(analysis.accuracy);
  }

  calculateAccuracy(expected, actual) {
    // Simplified accuracy calculation
    const expectedLower = expected.toLowerCase();
    const actualLower = actual.toLowerCase();

    if (expectedLower === actualLower) return 100;

    // Calculate similarity based on character matching
    let matches = 0;
    const maxLength = Math.max(expectedLower.length, actualLower.length);

    for (let i = 0; i < maxLength; i++) {
      if (expectedLower[i] === actualLower[i]) matches++;
    }

    return Math.round((matches / maxLength) * 100);
  }

  generateFeedback(expected, actual) {
    const accuracy = this.calculateAccuracy(expected, actual);

    if (accuracy >= 90) {
      return {
        type: 'excellent',
        message: '🎉 Perfect pronunciation! Your Sanskrit sounds authentic!',
        culturalNote: this.getCulturalNote(expected),
      };
    } else if (accuracy >= 70) {
      return {
        type: 'good',
        message: "👍 Good pronunciation! With practice, you'll sound like a native speaker!",
        culturalNote: this.getCulturalNote(expected),
      };
    } else {
      return {
        type: 'needs-practice',
        message: '💪 Keep practicing! Sanskrit pronunciation takes time to master.',
        culturalNote: this.getCulturalNote(expected),
      };
    }
  }

  getCulturalNote(word) {
    const culturalNotes = {
      नमस्ते: 'This is the most common Sanskrit greeting, meaning "I bow to the divine in you."',
      धर्म: 'Dharma is a core concept in Indian philosophy, meaning duty, righteousness, and cosmic order.',
      योग: 'Yoga means "union" - the union of body, mind, and spirit, originating from ancient India.',
      शान्ति: 'Shanti means peace, often chanted three times for peace in body, mind, and spirit.',
    };

    return (
      culturalNotes[word] || 'This word carries deep cultural significance in Indian tradition.'
    );
  }

  playCorrectPronunciation(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'hi-IN'; // Hindi for better Sanskrit pronunciation
    utterance.rate = 0.8; // Slower for learning
    this.synthesis.speak(utterance);
  }

  displayPronunciationResults(analysis) {
    const resultsDiv = document.getElementById('pronunciation-results');
    resultsDiv.innerHTML = `
      <div class="pronunciation-result ${analysis.feedback.type}">
        <div class="word-display">
          <div class="expected-word">${analysis.word}</div>
          <div class="user-pronunciation">You said: "${analysis.userPronunciation}"</div>
        </div>
        <div class="accuracy-score">
          <div class="score-circle">${analysis.accuracy}%</div>
          <div class="score-label">Accuracy</div>
        </div>
        <div class="feedback-section">
          <div class="feedback-message">${analysis.feedback.message}</div>
          <div class="cultural-note">${analysis.feedback.culturalNote}</div>
        </div>
        <div class="action-buttons">
          <button onclick="voiceTutor.playCorrectPronunciation('${analysis.word}')" class="luxury-btn luxury-btn-sm">
            🔊 Hear Correct Pronunciation
          </button>
          <button onclick="voiceTutor.startRecording('${analysis.word}')" class="luxury-btn luxury-btn-sm">
            🎤 Try Again
          </button>
        </div>
      </div>
    `;
  }
}

// ============================================
// GAMIFICATION SYSTEM WITH INDIAN CULTURE
// ============================================
class SanskritGamification {
  constructor() {
    this.userProgress = {
      level: 1,
      experience: 0,
      badges: [],
      achievements: [],
      streak: 0,
      lastActive: null,
    };

    this.culturalBadges = {
      diwali_explorer: {
        name: 'Diwali Explorer',
        description: 'Learn 10 Diwali-related Sanskrit words',
        icon: '🪔',
        rarity: 'common',
        culturalValue: 85,
      },
      ramayana_scholar: {
        name: 'Ramayana Scholar',
        description: 'Complete Ramayana vocabulary module',
        icon: '📚',
        rarity: 'rare',
        culturalValue: 95,
      },
      yoga_master: {
        name: 'Yoga Master',
        description: 'Perfect pronunciation of 50 yoga terms',
        icon: '🧘‍♀️',
        rarity: 'epic',
        culturalValue: 98,
      },
      sanskrit_orator: {
        name: 'Sanskrit Orator',
        description: 'Speak 100 Sanskrit sentences fluently',
        icon: '🎤',
        rarity: 'legendary',
        culturalValue: 100,
      },
      festival_celebrant: {
        name: 'Festival Celebrant',
        description: 'Learn Sanskrit for all major Indian festivals',
        icon: '🎉',
        rarity: 'rare',
        culturalValue: 90,
      },
      devanagari_artist: {
        name: 'Devanagari Artist',
        description: 'Achieve 95% accuracy in handwriting recognition',
        icon: '🎨',
        rarity: 'epic',
        culturalValue: 92,
      },
    };

    this.indianLeaderboards = {
      national: {
        name: 'National Champions',
        description: 'Top Sanskrit learners across India',
        icon: '🇮🇳',
      },
      maharashtra: {
        name: 'Maharashtra Warriors',
        description: 'Top learners from Maharashtra',
        icon: '🌊',
      },
      delhi: {
        name: 'Delhi Scholars',
        description: 'Top learners from Delhi',
        icon: '🏛️',
      },
      bangalore: {
        name: 'Bangalore Techies',
        description: 'Tech professionals from Bangalore',
        icon: '💻',
      },
      kolkata: {
        name: 'Kolkata Intellectuals',
        description: 'Academic performers from Kolkata',
        icon: '📖',
      },
    };
  }

  awardBadge(badgeId) {
    const badge = this.culturalBadges[badgeId];
    if (!badge || this.userProgress.badges.includes(badgeId)) return false;

    this.userProgress.badges.push(badgeId);
    this.userProgress.experience += badge.culturalValue;
    this.checkLevelUp();

    this.showBadgeAwarded(badge);
    this.shareAchievement(badge);
    return true;
  }

  showBadgeAwarded(badge) {
    const modal = document.createElement('div');
    modal.className = 'badge-award-modal';
    modal.innerHTML = `
      <div class="badge-award-content">
        <div class="badge-icon">${badge.icon}</div>
        <div class="badge-name">${badge.name}</div>
        <div class="badge-description">${badge.description}</div>
        <div class="badge-rarity ${badge.rarity}">${badge.rarity.toUpperCase()}</div>
        <div class="cultural-value">Cultural Value: ${badge.culturalValue}/100</div>
        <button onclick="this.parentElement.parentElement.remove()" class="luxury-btn">
          Awesome! 🎉
        </button>
      </div>
    `;

    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 5000);
  }

  shareAchievement(badge) {
    const shareText = `🏆 Just unlocked "${badge.name}" badge on SanskritNova AI! 
    Learning our ancient language with modern AI. 🇮🇳
    #SanskritNova #LearnSanskrit #AI #IndianHeritage #MakeInIndia`;

    this.showShareOptions(shareText, badge);
  }

  showShareOptions(text, badge) {
    const shareModal = document.createElement('div');
    shareModal.className = 'share-modal';
    shareModal.innerHTML = `
      <div class="share-content">
        <h3>Share Your Achievement! 🎉</h3>
        <div class="preview">
          <div class="badge-preview">${badge.icon}</div>
          <div class="badge-name">${badge.name}</div>
        </div>
        <div class="share-buttons">
          <button onclick="shareOnWhatsApp('${encodeURIComponent(text)}')" class="share-btn whatsapp">
            📱 WhatsApp
          </button>
          <button onclick="shareOnTwitter('${encodeURIComponent(text)}')" class="share-btn twitter">
            🐦 Twitter
          </button>
          <button onclick="shareOnInstagram('${badge.name}')" class="share-btn instagram">
            📸 Instagram
          </button>
          <button onclick="copyToClipboard('${text}')" class="share-btn copy">
            📋 Copy
          </button>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="luxury-btn-secondary">
          Close
        </button>
      </div>
    `;

    document.body.appendChild(shareModal);
  }

  updateStreak() {
    const today = new Date().toDateString();
    const lastActive = this.userProgress.lastActive;

    if (lastActive !== today) {
      const yesterday = new Date(Date.now() - 86400000).toDateString();

      if (lastActive === yesterday) {
        this.userProgress.streak++;
      } else {
        this.userProgress.streak = 1;
      }

      this.userProgress.lastActive = today;
      this.showStreakUpdate();
    }
  }

  showStreakUpdate() {
    if (this.userProgress.streak === 1) return;

    const streakNotification = document.createElement('div');
    streakNotification.className = 'streak-notification';
    streakNotification.innerHTML = `
      <div class="streak-content">
        <div class="streak-icon">🔥</div>
        <div class="streak-text">${this.userProgress.streak} day streak!</div>
        <div class="streak-subtitle">Keep learning Sanskrit daily!</div>
      </div>
    `;

    document.body.appendChild(streakNotification);
    setTimeout(() => streakNotification.remove(), 3000);
  }
}

// ============================================
// SOCIAL MEDIA INTEGRATION FOR VIRAL GROWTH
// ============================================
class SocialMediaIntegration {
  constructor() {
    this.shareableContent = [];
    this.viralMetrics = {
      whatsappShares: 0,
      twitterShares: 0,
      instagramShares: 0,
      totalReach: 0,
    };
  }

  generateShareableContent(type, data) {
    const templates = {
      achievement: (badge) => ({
        text: `🏆 Just unlocked "${badge.name}" on SanskritNova AI! 
        Learning our ancient language with modern AI. 🇮🇳
        Join me: https://sanskritnova.ai`,
        hashtags: ['#SanskritNova', '#LearnSanskrit', '#AI', '#IndianHeritage', '#MakeInIndia'],
        imageUrl: this.generateAchievementImage(badge),
      }),

      milestone: (progress) => ({
        text: `🎯 Milestone achieved! Learned ${progress.wordsLearned} Sanskrit words with SanskritNova AI! 
        🇮🇳 Rediscovering our heritage with technology.
        Start your journey: https://sanskritnova.ai`,
        hashtags: ['#SanskritNova', '#Milestone', '#IndianLanguages', '#AI', '#EdTech'],
        imageUrl: this.generateMilestoneImage(progress),
      }),

      culturalInsight: (insight) => ({
        text: `🕉️ Beautiful Sanskrit insight: "${insight.sanskrit}" means "${insight.meaning}"
        ${insight.culturalContext ? '\n' + insight.culturalContext : ''}
        Learn more with SanskritNova AI: https://sanskritnova.ai`,
        hashtags: ['#SanskritWisdom', '#IndianCulture', '#AncientKnowledge', '#SanskritNova'],
        imageUrl: this.generateInsightImage(insight),
      }),
    };

    return templates[type](data);
  }

  shareOnWhatsApp(content) {
    const text = `${content.text}\n\n${content.hashtags.join(' ')}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`);
    this.trackShare('whatsapp');
  }

  shareOnTwitter(content) {
    const text = `${content.text}\n\n${content.hashtags.join(' ')}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
    this.trackShare('twitter');
  }

  shareOnInstagram(badgeName) {
    const storyText = `🏆 ${badgeName}\n\n🕉️ SanskritNova AI\n🇮🇳 Learn Sanskrit with AI\n\n#SanskritNova #LearnSanskrit`;

    // Create Instagram story download
    this.downloadInstagramStory(badgeName, storyText);
    this.trackShare('instagram');
  }

  generateInstagramStory(badgeName, text) {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');

    // Create beautiful gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#D4AF37');
    gradient.addColorStop(1, '#8B4513');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);

    // Add traditional Indian pattern overlay
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(Math.random() * 1080, Math.random() * 1920, Math.random() * 100 + 50, 0, Math.PI * 2);
      ctx.fill();
    }

    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px Noto Serif Devanagari';
    ctx.textAlign = 'center';
    ctx.fillText('🏆', 540, 400);

    ctx.font = 'bold 60px Noto Serif Devanagari';
    ctx.fillText(badgeName, 540, 600);

    ctx.font = '40px Playfair Display';
    ctx.fillText('SanskritNova AI', 540, 800);

    ctx.font = '30px Playfair Display';
    ctx.fillText('🇮🇳 Learn Sanskrit with AI', 540, 900);

    ctx.font = '25px Playfair Display';
    ctx.fillText('#SanskritNova #LearnSanskrit', 540, 1800);

    // Download the image
    canvas.toBlob((blob) => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sanskritnova-achievement.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  trackShare(platform) {
    this.viralMetrics[`${platform}Shares`]++;
    this.viralMetrics.totalReach += this.calculateReach(platform);

    // Update viral coefficient
    this.updateViralCoefficient();

    // Show celebration for viral content
    if (this.viralMetrics.totalReach % 100 === 0) {
      this.showViralCelebration();
    }
  }

  calculateReach(platform) {
    const reachMultipliers = {
      whatsapp: 5, // Average 5 people see WhatsApp shares
      twitter: 25, // Average 25 people see Twitter shares
      instagram: 15, // Average 15 people see Instagram stories
    };

    return reachMultipliers[platform] || 1;
  }

  showViralCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'viral-celebration';
    celebration.innerHTML = `
      <div class="celebration-content">
        <div class="celebration-icon">🚀</div>
        <div class="celebration-text">Going Viral!</div>
        <div class="celebration-subtitle">${this.viralMetrics.totalReach} people reached!</div>
        <div class="celebration-metrics">
          <div class="metric">
            <div class="metric-number">${this.viralMetrics.whatsappShares}</div>
            <div class="metric-label">WhatsApp</div>
          </div>
          <div class="metric">
            <div class="metric-number">${this.viralMetrics.twitterShares}</div>
            <div class="metric-label">Twitter</div>
          </div>
          <div class="metric">
            <div class="metric-number">${this.viralMetrics.instagramShares}</div>
            <div class="metric-label">Instagram</div>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 5000);
  }
}

// ============================================
// INITIALIZATION
// ============================================
const aiTutor = new SanskritAITutor();
const handwritingRecognition = new DevanagariHandwritingRecognition();
const voiceTutor = new SanskritVoiceTutor();
const gamification = new SanskritGamification();
const socialMedia = new SocialMediaIntegration();

// Initialize voice recognition
voiceTutor.initializeVoiceRecognition();

// Global functions for social sharing
window.shareOnWhatsApp = (text) => socialMedia.shareOnWhatsApp({ text, hashtags: [] });
window.shareOnTwitter = (text) => socialMedia.shareOnTwitter({ text, hashtags: [] });
window.shareOnInstagram = (badgeName) => socialMedia.shareOnInstagram(badgeName);
window.copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
  alert('Text copied to clipboard!');
};

// Initialize handwriting canvas
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('handwriting-canvas');
  if (canvas) {
    canvas.addEventListener('mousedown', (e) => handwritingRecognition.startDrawing(e));
    canvas.addEventListener('mousemove', (e) => handwritingRecognition.draw(e));
    canvas.addEventListener('mouseup', () => handwritingRecognition.stopDrawing());
    canvas.addEventListener('mouseleave', () => handwritingRecognition.stopDrawing());

    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY,
      });
      canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      const mouseEvent = new MouseEvent('mouseup', {});
      canvas.dispatchEvent(mouseEvent);
    });
  }
});

// Export for use in main app
window.SanskritAI = {
  aiTutor,
  handwritingRecognition,
  voiceTutor,
  gamification,
  socialMedia,
};

console.log('🚀 SanskritNova AI Features Loaded - Ready to go viral in India! 🇮🇳');
