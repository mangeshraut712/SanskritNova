// SanskritNova AI - Logic Evolution 2026

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
    dot.style.background = "#f1c40f"; // Amber Gold
    dot.style.boxShadow = "0 0 15px #f1c40f";
  } else {
    dot.style.background = "#f97316"; // Saffron
    dot.style.boxShadow = "0 0 15px #f97316";
  }
};

const appendMessage = (content, role) => {
  const msgDiv = document.createElement("div");
  msgDiv.className = `msg ${role === "user" ? "user" : "bot"}`;
  msgDiv.innerHTML = `<div class="msg-content" style="animation: revealStagger 0.4s ease-out;">${content}</div>`;
  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
};

// --- API Service ---
const apiCall = async (endpoint, data, method = "POST") => {
  setStatus("Nova Processing...", true);
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      method,
      headers: { "Content-Type": "application/json" },
      body: data ? JSON.stringify(data) : undefined,
    });
    if (!res.ok) throw new Error(`API Connection Failed: ${res.status}`);
    setStatus("System Ready");
    return await res.json();
  } catch (err) {
    console.error(err);
    setStatus("Node Error");
    throw err;
  }
};

// --- Chat Logic ---
modeItems.forEach((item) => {
  item.addEventListener("click", () => {
    modeItems.forEach((btn) => btn.classList.remove("active"));
    item.classList.add("active");
    activeMode = item.dataset.mode;
    currentModeTag.textContent = `${activeMode.toUpperCase()} ACTIVE`;
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
      const sourcesText = result.sources.map(s => `[${s.source}]`).join(", ");
      appendMessage(`<small style="opacity: 0.6; font-size: 0.7rem;">Verified Reference Node: ${sourcesText}</small>`, "bot");
    }
  } catch (err) {
    appendMessage(`Processing Interrupted: ${err.message}`, "bot");
  } finally {
    typingIndicator.classList.add("hidden");
  }
});

// --- Vision Lab ---
const processVision = async (base64) => {
  visionResult.classList.add("hidden");
  setStatus("Neural Decoding...", true);

  try {
    const result = await apiCall("/vision-ocr", { image_base64: base64 });
    ocrDisplayText.textContent = result.text || "No detectable glyphs.";
    ocrExplanation.textContent = result.explanation || "";
    visionResult.classList.remove("hidden");
    visionResult.style.animation = "revealStagger 0.5s ease-out";
  } catch (err) {
    alert("Decryption failed: " + err.message);
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

// --- Drag & Drop ---
visionDropZone.addEventListener("dragover", (e) => { e.preventDefault(); visionDropZone.style.borderColor = "var(--accent)"; });
visionDropZone.addEventListener("dragleave", (e) => { e.preventDefault(); visionDropZone.style.borderColor = "var(--line)"; });
visionDropZone.addEventListener("drop", (e) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      processVision(event.target.result.split(",")[1]);
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
    translatedOutput.style.animation = "revealStagger 0.4s ease-out";
  } catch (err) {
    translatedOutput.textContent = "Node failure: " + err.message;
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
      <article class="track-item" style="animation: revealStagger 0.4s ease-out;">
        <h5>${track.title}</h5>
        <p>${track.level.toUpperCase()} • ${track.duration}</p>
      </article>
    `).join("");
  } catch (err) {
    trackListContainer.innerHTML = `<p style="font-size: 0.7rem; color: var(--ink-soft); opacity: 0.5;">Pathways offline.</p>`;
  }
};

// Start
loadTracks();
setStatus("Evolution 2026 Ready");
console.log("Evolution 2026 Logic Layer Active.");
