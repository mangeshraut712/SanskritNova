/**
 * SanskritNova AI - Luxury Indian Ancient Inspired Frontend
 */

// Configuration
const CONFIG = {
  apiBase: window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost'
    ? 'http://localhost:8000'
    : '',
  endpoints: {
    chat: '/api/chat',
    grounded: '/api/grounded-answer',
    translit: '/api/transliterate',
    health: '/api/health'
  }
};

// State
let activeMode = 'learn';

// DOM Elements
const chatMessages = document.getElementById('chat-messages');
const chatForm = document.getElementById('chat-form');
const chatInput = document.getElementById('chat-input');
const modeCards = document.querySelectorAll('.mode-card');
const translitInput = document.getElementById('translit-input');
const translitBtn = document.getElementById('translit-btn');
const translitResult = document.getElementById('translit-result');

// Utility Functions
function showTyping() {
  const typingEl = document.createElement('div');
  typingEl.className = 'message bot typing';
  typingEl.innerHTML = `
    <div class="message-avatar">🕉️</div>
    <div class="message-content">
      <p class="typing-dots"><span>.</span><span>.</span><span>.</span></p>
    </div>
  `;
  chatMessages.appendChild(typingEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  return typingEl;
}

function hideTyping(typingEl) {
  if (typingEl && typingEl.parentNode) {
    typingEl.parentNode.removeChild(typingEl);
  }
}

function addMessage(content, role) {
  const messageEl = document.createElement('div');
  messageEl.className = `message ${role}`;

  const avatar = role === 'bot' ? '🕉️' : '🙏';
  messageEl.innerHTML = `
    <div class="message-avatar">${avatar}</div>
    <div class="message-content">
      <p>${escapeHtml(content)}</p>
    </div>
  `;

  chatMessages.appendChild(messageEl);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

async function apiCall(endpoint, data) {
  const response = await fetch(`${CONFIG.apiBase}${endpoint}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Request failed');
  }

  return response.json();
}

// Chat Handlers
async function handleChatSubmit(e) {
  e.preventDefault();

  const message = chatInput.value.trim();
  if (!message) return;

  chatInput.value = '';
  addMessage(message, 'user');

  const typingEl = showTyping();

  try {
    const endpoint = activeMode === 'grounded' ? CONFIG.endpoints.grounded : CONFIG.endpoints.chat;
    const payload = activeMode === 'grounded'
      ? { message, k: 3 }
      : { message, mode: activeMode };

    const response = await apiCall(endpoint, payload);
    hideTyping(typingEl);

    addMessage(response.reply, 'bot');

    if (activeMode === 'grounded' && response.sources?.length) {
      const sources = response.sources.map(s => `${s.source}#${s.chunk_id}`).join(', ');
      addMessage(`Sources: ${sources}`, 'bot');
    }
  } catch (error) {
    hideTyping(typingEl);
    addMessage(`Error: ${error.message}`, 'bot');
  }
}

// Mode Selection
function handleModeChange(e) {
  const card = e.currentTarget;
  const mode = card.dataset.mode;
  if (!mode) return;

  activeMode = mode;
  modeCards.forEach(c => c.classList.remove('active'));
  card.classList.add('active');
}

// Transliteration Handler
async function handleTranslit() {
  const text = translitInput.value.trim();
  if (!text) return;

  translitResult.classList.add('loading');

  try {
    const response = await apiCall(CONFIG.endpoints.translit, { text });
    translitResult.textContent = response.iast || 'No result';
  } catch (error) {
    translitResult.textContent = `Error: ${error.message}`;
  } finally {
    translitResult.classList.remove('loading');
  }
}

// Event Listeners
if (chatForm) {
  chatForm.addEventListener('submit', handleChatSubmit);
}

modeCards.forEach(card => {
  card.addEventListener('click', handleModeChange);
});

if (translitBtn) {
  translitBtn.addEventListener('click', handleTranslit);
}

if (translitInput) {
  translitInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleTranslit();
    }
  });
}

// Check API health on load
fetch(`${CONFIG.apiBase}${CONFIG.endpoints.health}`)
  .then(res => {
    if (res.ok) {
      console.log('✓ API Connected');
    }
  })
  .catch(() => console.log('Running in offline mode'));

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
