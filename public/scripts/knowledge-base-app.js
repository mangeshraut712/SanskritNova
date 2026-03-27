/* SanskritNova Knowledge Base - JavaScript Application */
/* Apple-inspired interactions with luxury design for the digital library */

// ============================================
// KNOWLEDGE BASE APPLICATION STATE
// ============================================
const KnowledgeBase = {
  // Application state
  state: {
    currentLanguage: 'en',
    currentTheme: 'light',
    isMobileMenuOpen: false,
    isLoading: false,
    searchResults: [],
    currentFilters: {
      category: '',
      period: '',
      repository: '',
      language: '',
    },
    knowledgeBaseData: {
      vedic: [
        {
          id: 'rigveda',
          title: 'Ṛgveda Saṁhitā',
          titleSanskrit: 'ऋग्वेद संहिता',
          category: 'Veda',
          period: '1500-1200 BCE',
          description:
            'The oldest of the four Vedas, containing 1,028 hymns organized into 10 mandalas.',
          manuscripts: 1200,
          verses: 10552,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
        {
          id: 'samaveda',
          title: 'Sāmaveda Saṁhitā',
          titleSanskrit: 'सामवेद संहिता',
          category: 'Veda',
          period: '1200-1000 BCE',
          description:
            'The Veda of melodies and chants, consisting of 1,875 verses primarily drawn from the Rigveda.',
          manuscripts: 800,
          verses: 1875,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
        {
          id: 'yajurveda',
          title: 'Yajurveda Saṁhitā',
          titleSanskrit: 'यजुर्वेद संहिता',
          category: 'Veda',
          period: '1200-1000 BCE',
          description:
            'The Veda of ritual formulas, existing in two main recensions: Shukla and Krishna.',
          manuscripts: 600,
          verses: 2000,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
        {
          id: 'atharvaveda',
          title: 'Atharvaveda Saṁhitā',
          titleSanskrit: 'अथर्ववेद संहिता',
          category: 'Veda',
          period: '1000-800 BCE',
          description: 'The Veda of magical formulas and daily rituals, containing 731 hymns.',
          manuscripts: 400,
          verses: 7310,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
      ],
      philosophy: [
        {
          id: 'samkhya',
          title: 'Sāṃkhya',
          titleSanskrit: 'सांख्य',
          category: 'Darshana',
          period: 'Classical',
          description:
            'One of the six orthodox philosophical systems, founded by Kapila, emphasizing dualism.',
          manuscripts: 200,
          verses: 1000,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
        {
          id: 'yoga',
          title: 'Yoga',
          titleSanskrit: 'योग',
          category: 'Darshana',
          period: 'Classical',
          description:
            "The philosophical system based on Patanjali's Yoga Sutras, emphasizing meditation.",
          manuscripts: 300,
          verses: 196,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
        {
          id: 'vedanta',
          title: 'Vedānta',
          titleSanskrit: 'वेदान्त',
          category: 'Darshana',
          period: 'Classical',
          description: 'The philosophical system based on the Upanishads and Brahma Sutras.',
          manuscripts: 500,
          verses: 555,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
        {
          id: 'mimamsa',
          title: 'Mīmāṃsā',
          titleSanskrit: 'मीमांसा',
          category: 'Darshana',
          period: 'Classical',
          description: 'The philosophical system focused on interpretation of Vedic rituals.',
          manuscripts: 400,
          verses: 1000,
          repository: 'BORI',
          criticalEdition: true,
          digitalAvailable: true,
        },
      ],
      repositories: [
        {
          id: 'bori',
          name: 'Bhandarkar Oriental Research Institute',
          location: 'Pune, India',
          founded: '1917',
          manuscripts: 28000,
          description: 'Premier research institute with 28,000+ Sanskrit manuscripts.',
          type: 'Repository',
        },
        {
          id: 'cambridge',
          name: 'Cambridge University Library',
          location: 'Cambridge, UK',
          founded: '1415',
          manuscripts: 2000,
          description: 'Extensive collection of 2,000+ Sanskrit manuscripts.',
          type: 'Repository',
        },
        {
          id: 'oxford',
          name: 'Bodleian Library',
          location: 'Oxford, UK',
          founded: '1602',
          manuscripts: 1500,
          description: 'Collection of 1,500+ Sanskrit manuscripts.',
          type: 'Repository',
        },
        {
          id: 'gretil',
          name: 'GRETIL Database',
          location: 'Göttingen, Germany',
          founded: '1997',
          manuscripts: 5000,
          description: 'Digital archive of 5,000+ Sanskrit texts.',
          type: 'Digital Archive',
        },
      ],
    },
  },

  // DOM element references
  elements: {},

  // Initialize application
  init() {
    this.cacheElements();
    this.initializeEventListeners();
    this.initializeTheme();
    this.loadInitialData();
    this.startAnimations();
    console.log('🏛️ SanskritNova Knowledge Base Initialized');
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

      // Search
      searchInput: document.getElementById('kb-search-input'),
      searchBtn: document.getElementById('kb-search-btn'),
      categoryFilter: document.getElementById('category-filter'),
      periodFilter: document.getElementById('period-filter'),
      repositoryFilter: document.getElementById('repository-filter'),
      languageFilter: document.getElementById('language-filter'),
      searchResults: document.getElementById('kb-search-results'),

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
      btn.addEventListener('click', (e) => this.switchLanguage(e.target.dataset.lang));
    });

    // Navigation smooth scroll
    this.elements.navLinks.forEach((link) => {
      link.addEventListener('click', (e) => this.handleNavigation(e));
    });

    // Search functionality
    this.elements.searchBtn?.addEventListener('click', () => this.performSearch());
    this.elements.searchInput?.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.performSearch();
    });

    // Filters
    this.elements.categoryFilter?.addEventListener('change', () => this.applyFilters());
    this.elements.periodFilter?.addEventListener('change', () => this.applyFilters());
    this.elements.repositoryFilter?.addEventListener('change', () => this.applyFilters());
    this.elements.languageFilter?.addEventListener('change', () => this.applyFilters());

    // Auto-search on input
    this.elements.searchInput?.addEventListener(
      'input',
      this.debounce(() => {
        if (this.elements.searchInput.value.length >= 3) {
          this.performSearch();
        }
      }, 500)
    );

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
    this.elements.langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Update content
    this.updateContentLanguage(lang);

    // Show toast
    this.showToast(`Language switched to ${lang === 'en' ? 'English' : 'हिन्दी'}`, 'success');
  },

  updateContentLanguage(lang) {
    // Update all translatable elements
    document.querySelectorAll('[data-translate]').forEach((element) => {
      const key = element.getAttribute('data-translate');
      // Implementation for language switching
    });
  },

  // ============================================
  // SEARCH FUNCTIONALITY
  // ============================================
  performSearch() {
    const query = this.elements.searchInput.value.trim();
    if (!query) {
      this.showToast('Please enter a search term', 'warning');
      return;
    }

    this.showLoading();

    // Simulate search with filtering
    setTimeout(() => {
      this.state.searchResults = this.searchKnowledgeBase(query);
      this.displaySearchResults();
      this.hideLoading();
      this.showToast(`Found ${this.state.searchResults.length} results`, 'success');
    }, 500);
  },

  searchKnowledgeBase(query) {
    const allData = [
      ...this.state.knowledgeBaseData.vedic,
      ...this.state.knowledgeBaseData.philosophy,
      ...this.state.knowledgeBaseData.repositories,
    ];

    const lowerQuery = query.toLowerCase();

    return allData.filter((item) => {
      // Apply filters
      if (
        this.state.currentFilters.category &&
        item.category !== this.state.currentFilters.category
      ) {
        return false;
      }
      if (this.state.currentFilters.period && item.period !== this.state.currentFilters.period) {
        return false;
      }
      if (
        this.state.currentFilters.repository &&
        item.repository !== this.state.currentFilters.repository
      ) {
        return false;
      }

      // Search in title, description, and Sanskrit title
      return (
        item.title.toLowerCase().includes(lowerQuery) ||
        item.titleSanskrit?.toLowerCase().includes(lowerQuery) ||
        item.description.toLowerCase().includes(lowerQuery)
      );
    });
  },

  displaySearchResults() {
    if (this.state.searchResults.length === 0) {
      this.elements.searchResults.innerHTML = `
        <div class="kb-card">
          <div class="kb-card-body">
            <h3>No results found</h3>
            <p>Try adjusting your search terms or filters.</p>
          </div>
        </div>
      `;
      return;
    }

    const resultsHTML = this.state.searchResults
      .map(
        (item) => `
      <div class="kb-card">
        <div class="kb-card-header">
          <h3 class="kb-card-title">${item.title}</h3>
          <div class="kb-card-subtitle">${item.titleSanskrit || ''}</div>
        </div>
        <div class="kb-card-body">
          <p class="kb-card-description">${item.description}</p>
          <div class="kb-card-meta">
            <span class="kb-card-category">${item.category}</span>
            <span class="kb-card-period">${item.period}</span>
          </div>
          <div class="kb-card-actions">
            <button class="kb-btn kb-btn-primary" onclick="KnowledgeBase.viewDetails('${item.id}')">View Details</button>
            <button class="kb-btn kb-btn-secondary" onclick="KnowledgeBase.viewManuscripts('${item.repository}')">Manuscripts</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    this.elements.searchResults.innerHTML = resultsHTML;
  },

  applyFilters() {
    // Update current filters
    this.state.currentFilters = {
      category: this.elements.categoryFilter.value,
      period: this.elements.periodFilter.value,
      repository: this.elements.repositoryFilter.value,
      language: this.elements.languageFilter.value,
    };

    // Re-run search if there's a query
    if (this.elements.searchInput.value.trim()) {
      this.performSearch();
    }
  },

  viewDetails(id) {
    // Find the item by ID
    const allData = [
      ...this.state.knowledgeBaseData.vedic,
      ...this.state.knowledgeBaseData.philosophy,
      ...this.state.knowledgeBaseData.repositories,
    ];

    const item = allData.find((item) => item.id === id);
    if (item) {
      this.showItemDetails(item);
    }
  },

  showItemDetails(item) {
    // Create a modal or navigate to details page
    this.showToast(`Viewing details for ${item.title}`, 'info');
    // Implementation for showing detailed view
  },

  viewManuscripts(repository) {
    this.showToast(`Browsing manuscripts from ${repository}`, 'info');
    // Implementation for browsing manuscripts
  },

  // ============================================
  // DATA LOADING
  // ============================================
  loadInitialData() {
    // Load initial data for display
    this.displayInitialData();
  },

  displayInitialData() {
    // Display some initial data in the search results
    const initialData = this.state.knowledgeBaseData.vedic.slice(0, 4);
    const resultsHTML = initialData
      .map(
        (item) => `
      <div class="kb-card">
        <div class="kb-card-header">
          <h3 class="kb-card-title">${item.title}</h3>
          <div class="kb-card-subtitle">${item.titleSanskrit}</div>
        </div>
        <div class="kb-card-body">
          <p class="kb-card-description">${item.description}</p>
          <div class="kb-card-meta">
            <span class="kb-card-category">${item.category}</span>
            <span class="kb-card-period">${item.period}</span>
          </div>
          <div class="kb-card-actions">
            <button class="kb-btn kb-btn-primary" onclick="KnowledgeBase.viewDetails('${item.id}')">View Details</button>
            <button class="kb-btn kb-btn-secondary" onclick="KnowledgeBase.viewManuscripts('${item.repository}')">Manuscripts</button>
          </div>
        </div>
      </div>
    `
      )
      .join('');

    if (this.elements.searchResults) {
      this.elements.searchResults.innerHTML = resultsHTML;
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
      info: 'ℹ️',
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
      '.kb-hero-badge',
      '.kb-hero-title',
      '.kb-hero-subtitle',
      '.kb-hero-stats',
      '.luxury-hero-actions',
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
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'kbFadeIn 0.8s ease forwards';
        }
      });
    }, observerOptions);

    // Observe elements
    document.querySelectorAll('.kb-card, .kb-text-display, .kb-table-container').forEach((el) => {
      observer.observe(el);
    });
  },

  initializeIntersectionObserver() {
    // Parallax effect for hero section
    const hero = document.querySelector('.kb-hero');
    if (hero) {
      window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = scrolled * 0.5;
        hero.style.transform = `translateY(${parallax}px)`;
      });
    }
  },
};

// ============================================
// GLOBAL FUNCTIONS
// ============================================
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

// ============================================
// INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  KnowledgeBase.init();
});

// ============================================
// GLOBAL EXPOSURE (for debugging)
// ============================================
window.KnowledgeBase = KnowledgeBase;
