const thread = document.getElementById("message-thread");
const form = document.getElementById("chat-form");
const promptInput = document.getElementById("prompt");
const statusPill = document.getElementById("status-pill");
const modeButtons = Array.from(document.querySelectorAll(".mode-button"));
const sampleButtons = Array.from(document.querySelectorAll(".sample-prompt"));
const trackList = document.getElementById("track-list");
const transliterationForm = document.getElementById("transliteration-form");
const transliterationInput = document.getElementById("transliteration-input");
const transliterationResult = document.getElementById("transliteration-result");
const transliterationStatus = document.getElementById("transliteration-status");
const isLocalStaticPreview =
  window.location.hostname === "127.0.0.1" || window.location.hostname === "localhost";
const apiBase = isLocalStaticPreview ? `http://${window.location.hostname}:8000/api` : "/api";
const chatEndpoint = `${apiBase}/chat`;
const groundedEndpoint = `${apiBase}/grounded-answer`;
const tracksEndpoint = `${apiBase}/tracks`;
const transliterationEndpoint = `${apiBase}/transliterate`;

let activeMode = "learn";
let isGroundedMode = false;

const setStatus = (label) => {
  statusPill.textContent = label;
};

const appendMessage = (content, role) => {
  const article = document.createElement("article");
  article.className = `message ${role}`;
  const paragraph = document.createElement("p");
  paragraph.textContent = content;
  article.appendChild(paragraph);
  thread.appendChild(article);
  thread.scrollTop = thread.scrollHeight;
};

const loadTracks = async () => {
  if (!trackList) {
    return;
  }

  try {
    const response = await fetch(tracksEndpoint);
    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.detail || "Failed to load tracks.");
    }

    trackList.innerHTML = "";
    body.forEach((track) => {
      const item = document.createElement("article");
      item.className = "track-item";
      item.innerHTML = `
        <div class="track-meta">
          <strong>${track.title}</strong>
          <span>${track.level} • ${track.duration}</span>
        </div>
        <p>${track.focus}</p>
      `;
      trackList.appendChild(item);
    });
  } catch (error) {
    trackList.innerHTML = `<p class="track-placeholder">${error.message}</p>`;
  }
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const mode = button.dataset.mode;

    if (mode === "grounded") {
      // Toggle grounded mode
      isGroundedMode = !isGroundedMode;
      button.classList.toggle("active", isGroundedMode);
    } else {
      // Set chat mode
      activeMode = mode;
      // Update active state for chat mode buttons (exclude grounded toggle)
      modeButtons.forEach((item) => {
        if (item.dataset.mode !== "grounded") {
          item.classList.toggle("active", item === button);
        }
      });
    }
  });
});

sampleButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const sampleMode = button.dataset.mode;
    promptInput.value = button.textContent.trim();

    // If sample has a mode, switch to that mode
    if (sampleMode) {
      if (sampleMode === "grounded") {
        isGroundedMode = true;
        modeButtons.forEach(btn => {
          if (btn.dataset.mode === "grounded") btn.classList.add("active");
        });
      } else {
        activeMode = sampleMode;
        modeButtons.forEach(btn => {
          if (btn.dataset.mode === sampleMode) btn.classList.add("active");
          else if (btn.dataset.mode !== "grounded") btn.classList.remove("active");
        });
      }
    }

    promptInput.focus();
  });
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const message = promptInput.value.trim();
  if (!message) {
    return;
  }

  appendMessage(message, "user");
  promptInput.value = "";
  setStatus("Thinking");

  try {
    const endpoint = isGroundedMode ? groundedEndpoint : chatEndpoint;
    const payload = isGroundedMode
      ? { message, k: 3 }
      : { message, mode: activeMode };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const body = await response.json();
    if (!response.ok) {
      throw new Error(body.detail || "Request failed.");
    }

    appendMessage(body.reply, "assistant");
    if (isGroundedMode && Array.isArray(body.sources) && body.sources.length > 0) {
      const sourceSummary = body.sources
        .map((source) => `${source.source}#${source.chunk_id}`)
        .join(", ");
      appendMessage(`Sources: ${sourceSummary}`, "assistant");
    }
    setStatus("Ready");
  } catch (error) {
    appendMessage(error.message, "assistant");
    setStatus("Error");
  }
});

if (transliterationForm) {
  transliterationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const text = transliterationInput.value.trim();
    if (!text) {
      return;
    }

    transliterationStatus.textContent = "Working";

    try {
      const response = await fetch(transliterationEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
      const body = await response.json();
      if (!response.ok) {
        throw new Error(body.detail || "Transliteration failed.");
      }

      transliterationResult.textContent = body.iast;
      transliterationStatus.textContent = "Ready";
    } catch (error) {
      transliterationResult.textContent = error.message;
      transliterationStatus.textContent = "Error";
    }
  });
}

loadTracks();
