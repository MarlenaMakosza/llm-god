const ipcRenderer = window.electron.ipcRenderer;

// Add emoji stripping function (duplicate from utilities since renderer can't import from utilities)
function stripEmojis(text: string): string {
  return text
    .replace(/[\u{1F600}-\u{1F64F}]/gu, "")
    .replace(/[\u{1F300}-\u{1F5FF}]/gu, "")
    .replace(/[\u{1F680}-\u{1F6FF}]/gu, "")
    .replace(/[\u{1F1E0}-\u{1F1FF}]/gu, "")
    .replace(/[\u{2600}-\u{26FF}]/gu, "")
    .replace(/[\u{2700}-\u{27BF}]/gu, "")
    .replace(/[\u{1F900}-\u{1F9FF}]/gu, "")
    .replace(/[\u{1FA00}-\u{1FA6F}]/gu, "")
    .replace(/[\u{1FA70}-\u{1FAFF}]/gu, "")
    .replace(/[\u{FE00}-\u{FE0F}]/gu, "")
    .replace(/[\u{200D}]/gu, "")
    .trim();
}

export function logToWebPage(message: string): void {
  // Strip emojis before sending
  const cleanMessage = stripEmojis(message);

  const ipcRenderer = window.electron.ipcRenderer;
  ipcRenderer.send("enter-prompt", cleanMessage);
}

export function openClaudeMessage(message: string): void {
  ipcRenderer.send("open-claude", message);
}

export function closeClaudeMessage(message: string): void {
  ipcRenderer.send("close-claude", message);
}

export function openDeepSeekMessage(message: string): void {
  ipcRenderer.send("open-deepseek", message);
}

export function closeDeepSeekMessage(message: string): void {
  ipcRenderer.send("close-deepseek", message);
}

export function openGrokMessage(message: string): void {
  ipcRenderer.send("open-grok", message);
}

export function closeGrokMessage(message: string): void {
  ipcRenderer.send("close-grok", message);
}

export function openCopilotMessage(message: string): void {
  ipcRenderer.send("open-copilot", message);
}

export function closeCopilotMessage(message: string): void {
  ipcRenderer.send("close-copilot", message);
}

export function openChatGPTMessage(message: string): void {
  ipcRenderer.send("open-chatgpt", message);
}

export function closeChatGPTMessage(message: string): void {
  ipcRenderer.send("close-chatgpt", message);
}

export function openGeminiMessage(message: string): void {
  ipcRenderer.send("open-gemini", message);
}

export function closeGeminiMessage(message: string): void {
  ipcRenderer.send("close-gemini", message);
}

const textArea = document.getElementById(
  "prompt-input",
) as HTMLTextAreaElement | null;
const openClaudeButton = document.getElementById(
  "showClaude",
) as HTMLButtonElement | null;
const openGrokButton = document.getElementById(
  "showGrok",
) as HTMLButtonElement | null;
const openDeepSeekButton = document.getElementById(
  "showDeepSeek",
) as HTMLButtonElement | null;
const openCopilotButton = document.getElementById(
  "showCopilot",
) as HTMLButtonElement | null;
const openChatGPTButton = document.getElementById(
  "showChatGPT",
) as HTMLButtonElement | null;
const openGeminiButton = document.getElementById(
  "showGemini",
) as HTMLButtonElement | null;

const promptDropdownButton = document.querySelector(
  ".prompt-select",
) as HTMLButtonElement | null;
const modelSelectButton = document.querySelector(
  ".model-select",
) as HTMLButtonElement | null;
const themeToggleButton = document.querySelector(
  ".theme-toggle",
) as HTMLButtonElement | null;

// Check if ChatGPT is in default models and set initial button text
window.addEventListener("DOMContentLoaded", async () => {
  const ipc = window.electron.ipcRenderer;
  const defaultModels = await ipc.invoke("get-default-models");

  if (openChatGPTButton) {
    const hasChatGPT = defaultModels && defaultModels.some((url: string) => url.includes("chatgpt"));
    openChatGPTButton.textContent = hasChatGPT ? "Hide ChatGPT" : "Show ChatGPT";
  }

  if (openGeminiButton) {
    const hasGemini = defaultModels && defaultModels.some((url: string) => url.includes("gemini"));
    openGeminiButton.textContent = hasGemini ? "Hide Gemini" : "Show Gemini";
  }

  // Load saved theme preference
  const savedTheme = localStorage.getItem("theme");
  const promptArea = document.getElementById("prompt-area");
  if (savedTheme === "dark" && promptArea) {
    promptArea.classList.add("dark-mode");
    if (themeToggleButton) {
      themeToggleButton.textContent = "☀️";
    }
  }
});

if (openChatGPTButton) {
  openChatGPTButton.addEventListener("click", (event: MouseEvent) => {
    if (openChatGPTButton.textContent === "Show ChatGPT") {
      openChatGPTMessage("open chatgpt now");
      openChatGPTButton.textContent = "Hide ChatGPT";
    } else {
      closeChatGPTMessage("close chatgpt now");
      openChatGPTButton.textContent = "Show ChatGPT";
    }
  });
}

if (openGeminiButton) {
  openGeminiButton.addEventListener("click", (event: MouseEvent) => {
    if (openGeminiButton.textContent === "Show Gemini") {
      openGeminiMessage("open gemini now");
      openGeminiButton.textContent = "Hide Gemini";
    } else {
      closeGeminiMessage("close gemini now");
      openGeminiButton.textContent = "Show Gemini";
    }
  });
}

if (openClaudeButton) {
  openClaudeButton.addEventListener("click", (event: MouseEvent) => {
    if (openClaudeButton.textContent === "Show Claude") {
      openClaudeMessage("open claude now");
      openClaudeButton.textContent = "Hide Claude";
    } else {
      closeClaudeMessage("close claude now");
      openClaudeButton.textContent = "Show Claude";
    }
  });
}

if (openGrokButton) {
  openGrokButton.addEventListener("click", (event: MouseEvent) => {
    if (openGrokButton.textContent === "Show Grok") {
      openGrokMessage("open grok now");
      openGrokButton.textContent = "Hide Grok";
    } else {
      closeGrokMessage("close grok now");
      openGrokButton.textContent = "Show Grok";
    }
  });
}

if (openDeepSeekButton) {
  openDeepSeekButton.addEventListener("click", (event: MouseEvent) => {
    if (openDeepSeekButton.textContent === "Show DeepSeek") {
      openDeepSeekMessage("open deepseek now");
      openDeepSeekButton.textContent = "Hide DeepSeek";
    } else {
      closeDeepSeekMessage("close deepseek now");
      openDeepSeekButton.textContent = "Show DeepSeek";
    }
  });
}

if (openCopilotButton) {
  openCopilotButton.addEventListener("click", (event: MouseEvent) => {
    if (openCopilotButton.textContent === "Show Copilot") {
      openCopilotMessage("open copilot now");
      openCopilotButton.textContent = "Hide Copilot";
    } else {
      closeCopilotMessage("close copilot now");
      openCopilotButton.textContent = "Show Copilot";
    }
  });
}

if (textArea) {
  textArea.addEventListener("input", (event: Event) => {
    logToWebPage((event.target as HTMLTextAreaElement).value);
  });

  textArea.addEventListener("keydown", (event: KeyboardEvent) => {
    if (event.ctrlKey) {
      if (event.key === "Enter") {
        event.preventDefault();
        const promptText = textArea.value;
        if (promptText.trim()) {
          console.log("Ctrl + Enter pressed, sending prompt:", promptText);
          ipcRenderer.send("send-prompt", promptText);
          textArea.value = "";
        }
      }
    }
  });
}

if (promptDropdownButton) {
  promptDropdownButton.addEventListener("click", (event: MouseEvent) => {
    console.log("Prompt dropdown button clicked");
    event.stopPropagation();
    ipcRenderer.send("open-form-window");
  });
}

if (modelSelectButton) {
  modelSelectButton.addEventListener("click", (event: MouseEvent) => {
    console.log("Model select button clicked");
    event.stopPropagation();
    ipcRenderer.send("open-model-selection-window");
  });
}

if (themeToggleButton) {
  themeToggleButton.addEventListener("click", (event: MouseEvent) => {
    const promptArea = document.getElementById("prompt-area");
    if (promptArea) {
      promptArea.classList.toggle("dark-mode");

      if (promptArea.classList.contains("dark-mode")) {
        themeToggleButton.textContent = "☀️";
        localStorage.setItem("theme", "dark");
      } else {
        themeToggleButton.textContent = "🌙";
        localStorage.setItem("theme", "light");
      }
    }
  });
}

// Update the inject-prompt handler
ipcRenderer.on("inject-prompt", (_: any, selectedPrompt: string) => {
  console.log("Injecting prompt into textarea:", selectedPrompt);

  const injectPrompt = () => {
    const promptInput = document.getElementById(
      "prompt-input",
    ) as HTMLTextAreaElement;

    if (promptInput) {
      // Strip emojis before injecting
      const cleanPrompt = stripEmojis(selectedPrompt);

      console.log("Textarea found, injecting prompt");
      promptInput.value = cleanPrompt;
      promptInput.focus();

      const inputEvent = new Event("input", { bubbles: true });
      promptInput.dispatchEvent(inputEvent);

      console.log("Prompt injected successfully");
    } else {
      console.error("Textarea not found, retrying...");
      setTimeout(injectPrompt, 100);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectPrompt);
  } else {
    injectPrompt();
  }
});
