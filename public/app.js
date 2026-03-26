// SanskritNova AI - Logic Layer

// --- Selectors ---
const chatArea = document.getElementById("chat-messages");
const chatForm = document.getElementById("chat-form");
const chatPrompt = document.getElementById("chat-prompt");
const modeItems = document.querySelectorAll(".mode-item");
const currentModeTag = document.getElementById("current-mode-display");
const typingIndicator = document.getElementById("typing");
const globalStatus = document.getElementById("global-status");

const visionDropZone = document.getElementById("vision-drop-zone");
const visionUpload = document.getElementById("vision-upload");
const visionResult = document.getElementById("vision-result-container");
const ocrDisplayText = document.getElementById("ocr-text");
const ocrExplanation = document.getElementById("ocr-explanation");

const translateInput = document.getElementById("translate-input");
const btnTranslate = document.getElementById("btn-translate-google");
const translatedOutput = document.getElementById("translated-text");

const translitInput = document.getElementById("translit-input");
const translitResult = document.getElementById("translit-result-text");

const trackListContainer = document.getElementById("track-list-container");

// --- API Config ---
const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
const API_BASE = isLocal ? "http://localhost:8000/api" : "/api";

// --- State ---
let activeMode = "learn";

// --- Helpers ---
const setStatus = (msg, isWorking = false) => {
  globalStatus.textContent = msg;
  const dot = document.querySelector(".status-dot");
  if (isWorking) {
    dot.style.background = "#f1c40f"; // Gold
    dot.style.boxShadow = "0 0 8px #f1c40f";
  } else {
    dot.style.background = "#e67e22"; // Saffron
    dot.style.boxShadow = "0 0 8px #e67e22";
  }
};

const appendMessage = (content, role) => {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${role === "user" ? "user" : "bot"}`;
  msgDiv.innerHTML = `<div class="msg-content">${content}</div>`;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
};

// --- API Service ---
const apiCall = async (endpoint, data, method = "POST") => {
  setStatus("Nova is working...", true);
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!res.ok) {
      const errorMsg = await res.text();
      throw new Error(errorMsg || `API Error: ${res.status}`);
    }
    setStatus("System Ready");
    return await res.json();
  } catch (err) {
    console.error(err);
    setStatus("System Error");
    throw err;
  }
};

// --- Chat Logic ---
modeItems.forEach((item) => {
  item.addEventListener("click", () => {
    modeItems.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");
    activeMode = item.dataset.mode;
    currentModeTag.textContent = `${activeMode.charAt(0).toUpperCase() + activeMode.slice(1)} Mode`;
  });
});

chatForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = chatPrompt.value.trim();
  if (!prompt) return;

  appendMessage(prompt, "user");
  chatPrompt.value = "";
  typingIndicator.classList.remove("hidden");

  try {
    let result;
    if (activeMode === "grounded") {
      result = await apiCall("/grounded-answer", { message: prompt, k: 3 });
    } else {
      result = await apiCall("/chat", { message: prompt, mode: activeMode });
    }
    
    appendMessage(result.reply, "bot");
    if (result.sources && result.sources.length > 0) {
      const sourcesText = result.sources.map(s => `[${s.source}#${s.chunk_id}]`).join(", ");
      appendMessage(`<small style="opacity: 0.6">Sources: ${sourcesText}</small>`, "bot");
    }
  } catch (err) {
    appendMessage(`Sorry, something went wrong: ${err.message}`, "bot");
  } finally {
    typingIndicator.classList.add("hidden");
  }
});

// --- Vision OCR Lab ---
const processVision = async (base64) => {
  visionResult.classList.add("hidden");
  setStatus("Decoding image...", true);

  try {
    const result = await apiCall("/vision-ocr", { image_base64: base64 });
    ocrDisplayText.textContent = result.text || "No text detected.";
    ocrExplanation.textContent = result.explanation || "";
    visionResult.classList.remove("hidden");
  } catch (err) {
    alert("OCR failed: " + err.message);
  }
};

visionDropZone.addEventListener("click", () => visionUpload.click());

visionUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const base64 = event.target.result.split(",")[1];
    processVision(base64);
  };
  reader.readAsDataURL(file);
});

visionDropZone.addEventListener("dragover", (e) => {
  e.preventDefault();
  visionDropZone.classList.add("dragover");
});

visionDropZone.addEventListener("dragleave", () => {
  visionDropZone.classList.remove("dragover");
});

visionDropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  visionDropZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      const base64 = event.target.result.split(",")[1];
      processVision(base64);
    };
    reader.readAsDataURL(file);
  }
});

// --- Translation Lab ---
btnTranslate.addEventListener("click", async () => {
  const text = translateInput.value.trim();
  if (!text) return;

  try {
    const result = await apiCall("/translate-google", { text, target_language: "en" });
    translatedOutput.textContent = result.translated_text;
  } catch (err) {
    translatedOutput.textContent = "Translation failed: " + err.message;
  }
});

// --- Translit Lab ---
translitInput.addEventListener("input", async () => {
  const text = translitInput.value.trim();
  if (!text) {
    translitResult.textContent = "";
    return;
  }

  try {
    const result = await apiCall("/transliterate", { text });
    translitResult.textContent = result.iast;
  } catch (err) {
    console.error(err);
  }
});

// --- Tracks Initialization ---
const loadTracks = async () => {
  try {
    const tracks = await apiCall("/tracks", null, "GET");
    trackListContainer.innerHTML = tracks.map(track => `
      <article class="track-item">
        <h5>${track.title}</h5>
        <p>${track.level} • ${track.duration}</p>
      </article>
    `).join("");
  } catch (err) {
    trackListContainer.innerHTML = `<p style="font-size: 0.7rem; color: var(--ink-faint)">Unable to load tracks.</p>`;
  }
};

// Start
loadTracks();
setStatus("System Ready");
console.log("SanskritNova AI Initialized.");
