/* SanskritNova AI - Viral Interactions JavaScript */
/* Interactive features for maximum engagement and viral growth */

// ============================================
// VIRAL INTERACTIONS MANAGER
// ============================================
class ViralInteractions {
  constructor() {
    this.socialMetrics = {
      whatsappShares: 0,
      twitterShares: 0,
      instagramShares: 0,
      totalReach: 0
    };
    
    this.userEngagement = {
      timeSpent: 0,
      featuresUsed: new Set(),
      badgesEarned: [],
      socialActions: 0
    };
    
    this.viralCoefficient = 0;
    this.initializeEventListeners();
    this.startEngagementTracking();
  }

  initializeEventListeners() {
    // AI Tutor interactions
    const aiChatInput = document.getElementById('ai-chat-input');
    const sendAiMessage = document.getElementById('send-ai-message');
    
    if (aiChatInput && sendAiMessage) {
      sendAiMessage.addEventListener('click', () => this.sendAiMessage());
      aiChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') this.sendAiMessage();
      });
    }

    // Handwriting interactions
    const recognizeBtn = document.getElementById('recognize-handwriting');
    const clearCanvas = document.getElementById('clear-canvas');
    
    if (recognizeBtn) {
      recognizeBtn.addEventListener('click', () => this.recognizeHandwriting());
    }
    
    if (clearCanvas) {
      clearCanvas.addEventListener('click', () => this.clearHandwritingCanvas());
    }

    // Voice interactions
    const startRecording = document.getElementById('start-recording');
    const stopRecording = document.getElementById('stop-recording');
    const hearPronunciation = document.getElementById('hear-pronunciation');
    
    if (startRecording) {
      startRecording.addEventListener('click', () => this.startVoiceRecording());
    }
    
    if (stopRecording) {
      stopRecording.addEventListener('click', () => this.stopVoiceRecording());
    }
    
    if (hearPronunciation) {
      hearPronunciation.addEventListener('click', () => this.playPronunciation());
    }

    // Social sharing interactions
    const shareWhatsapp = document.getElementById('share-whatsapp');
    const shareTwitter = document.getElementById('share-twitter');
    const shareInstagram = document.getElementById('share-instagram');
    const shareBtn = document.getElementById('share-btn');
    
    if (shareWhatsapp) {
      shareWhatsapp.addEventListener('click', () => this.shareOnWhatsApp());
    }
    
    if (shareTwitter) {
      shareTwitter.addEventListener('click', () => this.shareOnTwitter());
    }
    
    if (shareInstagram) {
      shareInstagram.addEventListener('click', () => this.shareOnInstagram());
    }
    
    if (shareBtn) {
      shareBtn.addEventListener('click', () => this.showShareModal());
    }

    // Gamification interactions
    this.initializeGamification();

    // Hero actions
    const startLearning = document.getElementById('start-learning');
    const watchDemo = document.getElementById('watch-demo');
    
    if (startLearning) {
      startLearning.addEventListener('click', () => this.startLearningJourney());
    }
    
    if (watchDemo) {
      watchDemo.addEventListener('click', () => this.watchDemo());
    }

    // Theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  // ============================================
  // AI TUTOR INTERACTIONS
  // ============================================
  sendAiMessage() {
    const input = document.getElementById('ai-chat-input');
    const message = input.value.trim();
    
    if (!message) {
      this.showToast('Please type a message!', 'warning');
      return;
    }

    this.addUserMessage(message);
    input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Simulate AI response with cultural context
    setTimeout(() => {
      this.hideTypingIndicator();
      const response = this.generateAIResponse(message);
      this.addAIMessage(response);
      this.trackFeatureUsage('ai-tutor');
    }, 1500);
  }

  addUserMessage(message) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'viral-message user';
    messageDiv.innerHTML = `
      <div class="viral-message-content">${message}</div>
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  addAIMessage(response) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'viral-message ai';
    messageDiv.innerHTML = `
      <div class="viral-message-content">${response.text}</div>
      ${response.culturalNote ? `<div class="viral-cultural-note">📝 ${response.culturalNote}</div>` : ''}
      ${response.shareable ? this.createShareButtons(response.shareable) : ''}
    `;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  generateAIResponse(message) {
    const culturalResponses = {
      'diwali': {
        text: 'Diwali in Sanskrit is "दीपावली" - it means "row of lamps." This beautiful festival symbolizes the victory of light over darkness and good over evil. Would you like to learn some Diwali-related Sanskrit words?',
        culturalNote: 'Diwali is mentioned in ancient Sanskrit texts as a celebration of Lord Rama\'s return to Ayodhya.',
        shareable: true
      },
      'yoga': {
        text: 'Yoga in Sanskrit is "योग" - it means "union" or "to join." It represents the union of body, mind, and spirit. The concept originates from ancient Indian texts like the Yoga Sutras of Patanjali.',
        culturalNote: 'Yoga is one of India\'s greatest gifts to the world, with roots dating back over 5,000 years.',
        shareable: true
      },
      'namaste': {
        text: 'नमस्ते (Namaste) is a beautiful Sanskrit greeting! It means "I bow to the divine in you." This gesture acknowledges the divine spark within each person.',
        culturalNote: 'Namaste is more than just a greeting - it\'s a spiritual practice that recognizes equality and respect.',
        shareable: true
      },
      'ramayana': {
        text: 'The Ramayana (रामायणम्) is one of the greatest epics in Sanskrit literature. It teaches us about dharma (righteousness), devotion, and the victory of good over evil.',
        culturalNote: 'Composed by Valmiki in Sanskrit, the Ramayana has influenced Indian culture for thousands of years.',
        shareable: true
      }
    };

    const lowerMessage = message.toLowerCase();
    
    // Check for cultural keywords
    for (const [keyword, response] of Object.entries(culturalResponses)) {
      if (lowerMessage.includes(keyword)) {
        return response;
      }
    }

    // Default responses
    const defaultResponses = [
      {
        text: 'That\'s a great question! Sanskrit is the ancient language of India, rich in spiritual and philosophical wisdom. Would you like to learn about a specific topic?',
        culturalNote: 'Sanskrit is considered the mother of many Indian languages and has a 3,500-year literary tradition.',
        shareable: false
      },
      {
        text: 'I\'d be happy to help you learn Sanskrit! This beautiful language connects us to India\'s ancient wisdom and cultural heritage. What aspect interests you most?',
        culturalNote: 'Learning Sanskrit opens doors to understanding ancient Indian texts, philosophy, and culture.',
        shareable: false
      },
      {
        text: 'Sanskrit is not just a language - it\'s a gateway to understanding India\'s rich cultural heritage. Let me help you discover its beauty and significance!',
        culturalNote: 'Many modern Indian languages have roots in Sanskrit, making it foundational to Indian linguistic heritage.',
        shareable: false
      }
    ];

    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
  }

  showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    const indicator = document.createElement('div');
    indicator.className = 'viral-message ai typing-indicator';
    indicator.innerHTML = `
      <div class="viral-message-content">
        <div class="viral-typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    `;
    indicator.id = 'typing-indicator';
    chatMessages.appendChild(indicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  hideTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
      indicator.remove();
    }
  }

  // ============================================
  // HANDWRITING INTERACTIONS
  // ============================================
  recognizeHandwriting() {
    this.trackFeatureUsage('handwriting');
    
    // Simulate recognition
    const results = document.getElementById('recognition-results');
    const feedback = document.getElementById('writing-feedback');
    
    results.innerHTML = `
      <div class="viral-recognition-result">
        <div class="viral-character-display">अ</div>
        <div class="viral-confidence">Confidence: 87%</div>
        <div class="viral-suggestions">
          <p>Similar characters:</p>
          <span class="viral-suggestion">आ</span>
          <span class="viral-suggestion">इ</span>
          <span class="viral-suggestion">उ</span>
        </div>
      </div>
    `;
    
    feedback.innerHTML = `
      <div class="viral-feedback excellent">
        <div class="viral-feedback-icon">🎉</div>
        <div class="viral-feedback-text">Excellent handwriting!</div>
        <div class="viral-feedback-tip">Your Devanagari strokes are perfect!</div>
      </div>
    `;

    this.showToast('Handwriting recognized! Great job! 🎉', 'success');
    this.checkForAchievement('handwriting-master');
  }

  clearHandwritingCanvas() {
    const canvas = document.getElementById('handwriting-canvas');
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    document.getElementById('recognition-results').innerHTML = '';
    document.getElementById('writing-feedback').innerHTML = '';
  }

  // ============================================
  // VOICE INTERACTIONS
  // ============================================
  startVoiceRecording() {
    this.trackFeatureUsage('voice-learning');
    
    const startBtn = document.getElementById('start-recording');
    const stopBtn = document.getElementById('stop-recording');
    
    if (startBtn) startBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
    
    this.showToast('Recording... Speak clearly! 🎤', 'info');
    
    // Simulate recording
    setTimeout(() => {
      this.analyzeVoiceRecording();
    }, 3000);
  }

  stopVoiceRecording() {
    const startBtn = document.getElementById('start-recording');
    const stopBtn = document.getElementById('stop-recording');
    
    if (startBtn) startBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
    
    this.showToast('Recording stopped! Analyzing pronunciation... 🎯', 'info');
  }

  analyzeVoiceRecording() {
    const results = document.getElementById('pronunciation-results');
    
    results.innerHTML = `
      <div class="viral-pronunciation-result good">
        <div class="viral-word-display">
          <div class="viral-pronounced-word">नमस्ते</div>
          <div class="viral-user-pronunciation">You said: "namaste"</div>
        </div>
        <div class="viral-accuracy-score">
          <div class="viral-score-circle">85%</div>
          <div class="viral-score-label">Accuracy</div>
        </div>
        <div class="viral-feedback-section">
          <div class="viral-feedback-message">👍 Good pronunciation! Keep practicing!</div>
          <div class="viral-cultural-note">नमस्ते means "I bow to the divine in you" - it's one of the most beautiful Sanskrit greetings.</div>
        </div>
        <div class="viral-action-buttons">
          <button onclick="viralInteractions.playPronunciation()" class="viral-btn viral-btn-sm">
            🔊 Hear Correct
          </button>
          <button onclick="viralInteractions.startVoiceRecording()" class="viral-btn viral-btn-sm">
            🎤 Try Again
          </button>
        </div>
      </div>
    `;

    this.checkForAchievement('voice-master');
  }

  playPronunciation() {
    const word = document.querySelector('.viral-sanskrit-word')?.textContent || 'नमस्ते';
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(word);
      utterance.lang = 'hi-IN';
      utterance.rate = 0.8;
      speechSynthesis.speak(utterance);
      this.showToast('Playing correct pronunciation... 🔊', 'info');
    }
  }

  // ============================================
  // SOCIAL SHARING INTERACTIONS
  // ============================================
  shareOnWhatsApp() {
    const text = `🚀 Just discovered SanskritNova AI - the #1 Sanskrit learning platform in India! 🇮🇳
    
Features:
🤖 AI tutor with cultural context
✍️ Handwriting recognition
🎤 Voice pronunciation analysis
🎮 Gamified learning with Indian culture

Join me in rediscovering our ancient language with modern AI!
🔗 https://sanskrit-nova.vercel.app/viral-ai-page.html

#SanskritNova #LearnSanskrit #AI #IndianHeritage #MakeInIndia #TrendingIndia`;

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappUrl, '_blank');
    
    this.trackSocialShare('whatsapp');
    this.showToast('Shared on WhatsApp! 📱', 'success');
  }

  shareOnTwitter() {
    const text = `🚀 SanskritNova AI - #1 Sanskrit learning platform in India! 🇮🇳

AI-powered Sanskrit learning with cultural context, handwriting recognition, and voice analysis!

🔗 https://sanskrit-nova.vercel.app/viral-ai-page.html

#SanskritNova #LearnSanskrit #AI #IndianHeritage #MakeInIndia #TrendingIndia`;

    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    window.open(twitterUrl, '_blank');
    
    this.trackSocialShare('twitter');
    this.showToast('Shared on Twitter! 🐦', 'success');
  }

  shareOnInstagram() {
    this.generateInstagramStory();
    this.trackSocialShare('instagram');
    this.showToast('Instagram story generated! 📸 Check your downloads.', 'success');
  }

  generateInstagramStory() {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1920;
    const ctx = canvas.getContext('2d');
    
    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 0, 1920);
    gradient.addColorStop(0, '#FF6B35');
    gradient.addColorStop(1, '#FFD700');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1920);
    
    // Add traditional pattern
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    for (let i = 0; i < 15; i++) {
      ctx.beginPath();
      ctx.arc(
        Math.random() * 1080,
        Math.random() * 1920,
        Math.random() * 80 + 40,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    
    // Add text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 80px Playfair Display';
    ctx.textAlign = 'center';
    ctx.fillText('🇮🇳 SanskritNova AI', 540, 400);
    
    ctx.font = 'bold 60px Noto Serif Devanagari';
    ctx.fillText('संस्कृत अध्ययनम्', 540, 550);
    
    ctx.font = '40px Playfair Display';
    ctx.fillText('Learn Sanskrit with AI', 540, 700);
    
    ctx.font = '30px Playfair Display';
    ctx.fillText('🤖 AI Tutor • ✍️ Handwriting • 🎤 Voice', 540, 800);
    
    ctx.font = '25px Playfair Display';
    ctx.fillText('#SanskritNova #LearnSanskrit #AI #IndianHeritage', 540, 1800);
    
    // Download
    canvas.toBlob(blob => {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'sanskritnova-instagram-story.png';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  showShareModal() {
    const modal = document.createElement('div');
    modal.className = 'viral-share-modal';
    modal.innerHTML = `
      <div class="viral-share-modal-content">
        <h3>🚀 Share SanskritNova AI!</h3>
        <p>Help us make Sanskrit learning viral in India! 🇮🇳</p>
        <div class="viral-share-options">
          <button onclick="viralInteractions.shareOnWhatsApp()" class="viral-share-btn whatsapp">
            📱 WhatsApp
          </button>
          <button onclick="viralInteractions.shareOnTwitter()" class="viral-share-btn twitter">
            🐦 Twitter
          </button>
          <button onclick="viralInteractions.shareOnInstagram()" class="viral-share-btn instagram">
            📸 Instagram
          </button>
        </div>
        <button onclick="this.parentElement.parentElement.remove()" class="viral-btn viral-btn-secondary">
          Close
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  trackSocialShare(platform) {
    this.socialMetrics[`${platform}Shares`]++;
    this.userEngagement.socialActions++;
    
    // Calculate reach
    const reachMultipliers = {
      whatsapp: 5,
      twitter: 25,
      instagram: 15
    };
    
    this.socialMetrics.totalReach += reachMultipliers[platform] || 1;
    this.updateSocialMetrics();
    this.calculateViralCoefficient();
    
    // Check for viral milestones
    if (this.socialMetrics.totalReach >= 100 && this.socialMetrics.totalReach % 100 === 0) {
      this.showViralCelebration();
    }
  }

  updateSocialMetrics() {
    const whatsappElement = document.getElementById('whatsapp-shares');
    const twitterElement = document.getElementById('twitter-shares');
    const instagramElement = document.getElementById('instagram-shares');
    const reachElement = document.getElementById('total-reach');
    
    if (whatsappElement) whatsappElement.textContent = this.socialMetrics.whatsappShares;
    if (twitterElement) twitterElement.textContent = this.socialMetrics.twitterShares;
    if (instagramElement) instagramElement.textContent = this.socialMetrics.instagramShares;
    if (reachElement) reachElement.textContent = this.socialMetrics.totalReach;
  }

  calculateViralCoefficient() {
    const totalShares = this.socialMetrics.whatsappShares + 
                        this.socialMetrics.twitterShares + 
                        this.socialMetrics.instagramShares;
    
    if (totalShares === 0) {
      this.viralCoefficient = 0;
      return;
    }
    
    // Simple viral coefficient calculation
    this.viralCoefficient = this.socialMetrics.totalReach / totalShares;
    
    // Update UI if viral
    if (this.viralCoefficient > 10) {
      this.showViralBadge();
    }
  }

  showViralCelebration() {
    const celebration = document.createElement('div');
    celebration.className = 'viral-celebration';
    celebration.innerHTML = `
      <div class="viral-celebration-content">
        <div class="viral-celebration-icon">🚀</div>
        <div class="viral-celebration-text">Going Viral!</div>
        <div class="viral-celebration-subtitle">${this.socialMetrics.totalReach} people reached!</div>
        <div class="viral-celebration-metrics">
          <div class="viral-celebration-metric">
            <div class="viral-celebration-number">${this.socialMetrics.whatsappShares}</div>
            <div class="viral-celebration-label">WhatsApp</div>
          </div>
          <div class="viral-celebration-metric">
            <div class="viral-celebration-number">${this.socialMetrics.twitterShares}</div>
            <div class="viral-celebration-label">Twitter</div>
          </div>
          <div class="viral-celebration-metric">
            <div class="viral-celebration-number">${this.socialMetrics.instagramShares}</div>
            <div class="viral-celebration-label">Instagram</div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(celebration);
    setTimeout(() => celebration.remove(), 5000);
  }

  showViralBadge() {
    const badge = document.createElement('div');
    badge.className = 'viral-viral-badge';
    badge.innerHTML = `
      <div class="viral-viral-content">
        <div class="viral-viral-icon">🔥</div>
        <div class="viral-viral-text">VIRAL CONTENT!</div>
        <div class="viral-viral-subtitle">Coefficient: ${this.viralCoefficient.toFixed(1)}</div>
      </div>
    `;
    
    document.body.appendChild(badge);
    setTimeout(() => badge.remove(), 3000);
  }

  // ============================================
  // GAMIFICATION INTERACTIONS
  // ============================================
  initializeGamification() {
    // Badge interactions
    const badges = document.querySelectorAll('.viral-badge');
    badges.forEach(badge => {
      badge.addEventListener('click', () => this.handleBadgeClick(badge));
    });

    // Leaderboard tabs
    const tabs = document.querySelectorAll('.viral-tab-btn');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => this.switchLeaderboardTab(tab));
    });
  }

  handleBadgeClick(badgeElement) {
    const badgeName = badgeElement.querySelector('.viral-badge-name')?.textContent;
    
    if (badgeName && !this.userEngagement.badgesEarned.includes(badgeName)) {
      this.userEngagement.badgesEarned.push(badgeName);
      this.showBadgeAwarded(badgeName);
      this.trackFeatureUsage('badges');
    }
  }

  showBadgeAwarded(badgeName) {
    const modal = document.createElement('div');
    modal.className = 'viral-badge-award-modal';
    modal.innerHTML = `
      <div class="viral-badge-award-content">
        <div class="viral-badge-award-icon">🏆</div>
        <div class="viral-badge-award-name">${badgeName}</div>
        <div class="viral-badge-award-desc">Badge unlocked!</div>
        <button onclick="this.parentElement.parentElement.remove()" class="viral-btn">
          Awesome! 🎉
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    setTimeout(() => modal.remove(), 5000);
  }

  switchLeaderboardTab(tabElement) {
    // Remove active class from all tabs
    document.querySelectorAll('.viral-tab-btn').forEach(tab => {
      tab.classList.remove('active');
    });
    
    // Add active class to clicked tab
    tabElement.classList.add('active');
    
    // Update leaderboard content (simulation)
    const region = tabElement.dataset.region;
    this.updateLeaderboardContent(region);
  }

  updateLeaderboardContent(region) {
    // Simulate different leaderboard content for different regions
    const leaderboardData = {
      national: [
        { rank: 1, name: '👨‍💻 TechGuru_92', location: '🌊 Mumbai', score: '2,450 XP' },
        { rank: 2, name: '👩‍🎓 SanskritLover', location: '🏛️ Delhi', score: '2,380 XP' },
        { rank: 3, name: '🧘‍♀️ YogaMaster', location: '💻 Bangalore', score: '2,290 XP' }
      ],
      maharashtra: [
        { rank: 1, name: '👨‍💻 MumbaiCoder', location: '🌊 Mumbai', score: '2,100 XP' },
        { rank: 2, name: '👩‍🎓 PuneScholar', location: '🏛️ Pune', score: '1,950 XP' },
        { rank: 3, name: '🧘‍♀️ NashikYogi', location: '🌊 Nashik', score: '1,890 XP' }
      ],
      delhi: [
        { rank: 1, name: '👨‍🏫 DelhiTeacher', location: '🏛️ Delhi', score: '2,200 XP' },
        { rank: 2, name: '👩‍🎓 DUStudent', location: '🏛️ Delhi', score: '2,100 XP' },
        { rank: 3, name: '🧘‍♀️ NoidaYogi', location: '🏛️ Noida', score: '1,980 XP' }
      ],
      bangalore: [
        { rank: 1, name: '👨‍💻 Techie_BLR', location: '💻 Bangalore', score: '2,350 XP' },
        { rank: 2, name: '👩‍🎓 IIScStudent', location: '💻 Bangalore', score: '2,280 XP' },
        { rank: 3, name: '🧘‍♀️ YogaBengaluru', location: '💻 Bangalore', score: '2,190 XP' }
      ]
    };

    const data = leaderboardData[region] || leaderboardData.national;
    const listElement = document.querySelector('.viral-leaderboard-list');
    
    if (listElement) {
      listElement.innerHTML = data.map(item => `
        <div class="viral-leaderboard-item">
          <div class="viral-rank">${item.rank}</div>
          <div class="viral-player-info">
            <div class="viral-player-name">${item.name}</div>
            <div class="viral-player-location">${item.location}</div>
          </div>
          <div class="viral-player-score">${item.score}</div>
        </div>
      `).join('');
    }
  }

  // ============================================
  // UTILITY FUNCTIONS
  // ============================================
  startLearningJourney() {
    this.showToast('🚀 Welcome to your Sanskrit learning journey! Let\'s start with the AI tutor.', 'success');
    document.getElementById('ai-tutor').scrollIntoView({ behavior: 'smooth' });
    this.trackFeatureUsage('start-journey');
  }

  watchDemo() {
    this.showToast('🎬 Demo video coming soon! For now, try the AI tutor above.', 'info');
    this.trackFeatureUsage('demo-request');
  }

  toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
      themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
    }
    
    this.showToast(`Theme changed to ${newTheme} mode!`, 'success');
  }

  trackFeatureUsage(feature) {
    this.userEngagement.featuresUsed.add(feature);
    
    // Check for achievements
    if (this.userEngagement.featuresUsed.size >= 5) {
      this.checkForAchievement('explorer');
    }
  }

  checkForAchievement(achievement) {
    if (!this.userEngagement.badgesEarned.includes(achievement)) {
      this.userEngagement.badgesEarned.push(achievement);
      this.showBadgeAwarded(achievement);
    }
  }

  startEngagementTracking() {
    setInterval(() => {
      this.userEngagement.timeSpent += 1;
      
      // Check for time-based achievements
      if (this.userEngagement.timeSpent === 300) { // 5 minutes
        this.checkForAchievement('dedicated-learner');
      }
    }, 1000);
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `viral-toast ${type}`;
    
    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️'
    };

    toast.innerHTML = `
      <div class="viral-toast-content">
        <div class="viral-toast-message">${icons[type]} ${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  createShareButtons(content) {
    return `
      <div class="viral-share-buttons">
        <button onclick="viralInteractions.shareOnWhatsApp()" class="viral-btn viral-btn-sm">
          📱 Share
        </button>
      </div>
    `;
  }
}

// ============================================
// ADDITIONAL CSS FOR DYNAMIC ELEMENTS
// ============================================
const additionalCSS = `
.viral-typing-dots {
  display: flex;
  gap: 4px;
  align-items: center;
}

.viral-typing-dots span {
  width: 8px;
  height: 8px;
  background: var(--luxury-gold);
  border-radius: 50%;
  animation: typing 1.4s infinite;
}

.viral-typing-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.viral-typing-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    opacity: 0.7;
  }
  30% {
    transform: translateY(-10px);
    opacity: 1;
  }
}

.viral-cultural-note {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background: rgba(212, 175, 55, 0.1);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--luxury-black);
}

.viral-share-buttons {
  margin-top: 1rem;
  display: flex;
  gap: 0.5rem;
}

.viral-share-modal,
.viral-badge-award-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.viral-share-modal-content,
.viral-badge-award-content {
  background: white;
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  max-width: 400px;
  margin: 0 1rem;
}

.viral-share-modal h3 {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--luxury-black);
}

.viral-share-options {
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin: 1.5rem 0;
}

.viral-badge-award-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.viral-badge-award-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--luxury-black);
  margin-bottom: 0.5rem;
}

.viral-badge-award-desc {
  color: var(--luxury-black);
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.viral-celebration {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: linear-gradient(135deg, var(--luxury-gold) 0%, var(--luxury-gold-light) 100%);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  z-index: 9999;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

.viral-celebration-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.viral-celebration-text {
  font-family: 'Playfair Display', serif;
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--luxury-black);
  margin-bottom: 0.5rem;
}

.viral-celebration-subtitle {
  color: var(--luxury-black);
  opacity: 0.8;
  margin-bottom: 1.5rem;
}

.viral-celebration-metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.viral-celebration-metric {
  text-align: center;
}

.viral-celebration-number {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--luxury-black);
}

.viral-celebration-label {
  font-size: 0.75rem;
  color: var(--luxury-black);
  opacity: 0.7;
}

.viral-viral-badge {
  position: fixed;
  top: 100px;
  right: 20px;
  background: linear-gradient(135deg, #FF6B35 0%, #FFD700 100%);
  border-radius: 15px;
  padding: 1rem;
  text-align: center;
  z-index: 9998;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: pulse 2s ease-in-out infinite;
}

.viral-viral-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.viral-viral-text {
  font-family: 'Playfair Display', serif;
  font-weight: 800;
  color: white;
  font-size: 0.875rem;
}

.viral-viral-subtitle {
  color: white;
  opacity: 0.9;
  font-size: 0.75rem;
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
`;

// Inject additional CSS
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalCSS;
document.head.appendChild(styleSheet);

// ============================================
// INITIALIZATION
// ============================================
const viralInteractions = new ViralInteractions();

// Global function for external access
window.viralInteractions = viralInteractions;

console.log('🚀 SanskritNova Viral Interactions Loaded - Ready to go viral in India! 🇮🇳');
