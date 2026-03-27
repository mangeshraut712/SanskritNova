/* SanskritNova AI - Shared Utilities */
/* Common functions and constants used across the application */

// ============================================
// API CONFIGURATION
// ============================================
export const API_BASE_URL =
  window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : 'https://sanskrit-nova.vercel.app';

// ============================================
// THEME MANAGEMENT UTILITIES
// ============================================
export class ThemeManager {
  static initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    this.applyTheme(theme);

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  static applyTheme(theme) {
    const root = document.documentElement;
    const themeIcon = document.getElementById('theme-icon');

    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '☀️';
    } else {
      root.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
    }
  }

  static toggleTheme() {
    const currentTheme =
      document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    this.applyTheme(newTheme);
    localStorage.setItem('theme', newTheme);

    // Animate theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.style.transform = 'scale(1.2) rotate(180deg)';
      setTimeout(() => {
        themeToggle.style.transform = 'scale(1) rotate(0deg)';
      }, 300);
    }

    return newTheme;
  }
}

// ============================================
// LANGUAGE MANAGEMENT UTILITIES
// ============================================
export class LanguageManager {
  static initializeLanguage() {
    const savedLanguage = localStorage.getItem('language');
    const browserLang = navigator.language.split('-')[0];
    const language = savedLanguage || (browserLang === 'hi' ? 'hi' : 'en');

    this.updateLanguageButtons(language);
    return language;
  }

  static updateLanguageButtons(currentLang) {
    const langButtons = document.querySelectorAll('.luxury-lang-btn');
    langButtons.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.lang === currentLang);
      btn.setAttribute('aria-pressed', btn.dataset.lang === currentLang);
    });
  }

  static switchLanguage(lang) {
    localStorage.setItem('language', lang);
    this.updateLanguageButtons(lang);
    return lang;
  }
}

// ============================================
// TOAST NOTIFICATION UTILITIES
// ============================================
export class ToastManager {
  static show(message, type = 'info', duration = 3000) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `luxury-toast ${type}`;

    const icons = {
      success: '✅',
      error: '❌',
      warning: '⚠️',
      info: 'ℹ️',
    };

    toast.innerHTML = `
      <div class="luxury-toast-content">
        <div class="luxury-toast-message">${icons[type]} ${message}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// ============================================
// API UTILITIES
// ============================================
export class ApiManager {
  static async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  static async get(endpoint) {
    return this.request(endpoint);
  }

  static async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }
}

// ============================================
// ANIMATION UTILITIES
// ============================================
export class AnimationManager {
  static fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';

    const start = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }

  static fadeOut(element, duration = 300) {
    const start = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.opacity = 1 - progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        element.style.display = 'none';
      }
    };

    requestAnimationFrame(animate);
  }

  static slideIn(element, direction = 'up', duration = 300) {
    const translateMap = {
      up: 'translateY(20px)',
      down: 'translateY(-20px)',
      left: 'translateX(20px)',
      right: 'translateX(-20px)',
    };

    element.style.transform = translateMap[direction];
    element.style.opacity = '0';
    element.style.display = 'block';

    const start = performance.now();
    const animate = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);

      element.style.transform = `translate(0, 0)`;
      element.style.opacity = progress;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

// ============================================
// VALIDATION UTILITIES
// ============================================
export class ValidationManager {
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isValidSanskrit(text) {
    // Basic validation for Sanskrit text (Devanagari or IAST)
    const devanagariRegex = /[\u0900-\u097F]/;
    const iastRegex = /^[a-zA-ZāīūṛṝḷḹṃṁḥṅñṭḍṇśṣṭḍṇǵǱĀĪŪṜṞḸṂṀḤṄÑṬḌṆŚṢṬḎṆǴǸ\s]+$/;
    return devanagariRegex.test(text) || iastRegex.test(text);
  }

  static sanitizeInput(input) {
    return input.trim().replace(/[<>]/g, '');
  }
}

// ============================================
// STORAGE UTILITIES
// ============================================
export class StorageManager {
  static set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  }

  static get(key, defaultValue = null) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error('Failed to read from localStorage:', error);
      return defaultValue;
    }
  }

  static remove(key) {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  }

  static clear() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error('Failed to clear localStorage:', error);
    }
  }
}

// ============================================
// DEVICE DETECTION UTILITIES
// ============================================
export class DeviceManager {
  static isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }

  static isTablet() {
    return /iPad|Android/i.test(navigator.userAgent) && window.innerWidth > 768;
  }

  static isDesktop() {
    return !this.isMobile() && !this.isTablet();
  }

  static getViewportSize() {
    return {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }
}

// ============================================
// PERFORMANCE UTILITIES
// ============================================
export class PerformanceManager {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function () {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  static async loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }
}

// ============================================
// ERROR HANDLING UTILITIES
// ============================================
export class ErrorManager {
  static log(error, context = 'Application') {
    console.error(`[${context}] Error:`, error);

    // In production, you might want to send this to an error tracking service
    if (window.location.hostname !== 'localhost') {
      // Send error to tracking service
    }
  }

  static handleApiError(error, defaultMessage = 'An error occurred. Please try again.') {
    console.error('API Error:', error);
    ToastManager.show(defaultMessage, 'error');
  }

  static handleNetworkError(error) {
    console.error('Network Error:', error);
    ToastManager.show('Network error. Please check your connection.', 'warning');
  }
}

// ============================================
// CONSTANTS
// ============================================
export const CONSTANTS = {
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500,
  },
  BREAKPOINTS: {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1200,
  },
  STORAGE_KEYS: {
    THEME: 'theme',
    LANGUAGE: 'language',
    USER_PREFERENCES: 'userPreferences',
    CHAT_HISTORY: 'chatHistory',
  },
  API_ENDPOINTS: {
    HEALTH: '/api/health',
    INFO: '/api/info',
    TRACKS: '/api/tracks',
    TRANSLITERATE: '/api/transliterate',
    CHAT: '/api/chat',
  },
  LANGUAGES: {
    EN: 'en',
    HI: 'hi',
  },
  THEMES: {
    LIGHT: 'light',
    DARK: 'dark',
  },
};

export default {
  ThemeManager,
  LanguageManager,
  ToastManager,
  ApiManager,
  AnimationManager,
  ValidationManager,
  StorageManager,
  DeviceManager,
  PerformanceManager,
  ErrorManager,
  CONSTANTS,
};
