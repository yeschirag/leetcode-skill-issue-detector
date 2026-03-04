(() => {
  const niceSound = new Audio(chrome.runtime.getURL("nice.mp3"));
  const faahhSound = new Audio(chrome.runtime.getURL("faahh.mp3"));

  const failKeywords = [
    "Wrong Answer",
    "Runtime Error",
    "Compile Error",
    "Time Limit Exceeded",
    "Memory Limit Exceeded",
  ];

  let waiting = false;

  // Settings (loaded from storage, updated via listener)
  let settings = {
    enabled: true,
    acceptVolume: 80,
    failVolume: 80,
    playOnRun: true,
  };

  // Load settings on start
  chrome.storage.sync.get(settings, (saved) => {
    settings = { ...settings, ...saved };
    applyVolumes();
  });

  // Live-update when popup changes settings
  chrome.storage.onChanged.addListener((changes) => {
    for (const [key, { newValue }] of Object.entries(changes)) {
      settings[key] = newValue;
    }
    applyVolumes();
  });

  function applyVolumes() {
    niceSound.volume = settings.acceptVolume / 100;
    faahhSound.volume = settings.failVolume / 100;
  }

  function playNice() {
    niceSound.volume = settings.acceptVolume / 100;
    niceSound.currentTime = 0;
    niceSound.play();
  }

  function playFail() {
    faahhSound.volume = settings.failVolume / 100;
    faahhSound.currentTime = 0;
    faahhSound.play();
  }

  function checkResult() {
    if (!waiting || !settings.enabled) return;

    // LeetCode uses data-e2e-locator="console-result" for both Run and Submit results
    const resultEl = document.querySelector('[data-e2e-locator="console-result"]');
    if (!resultEl) return;

    const text = resultEl.innerText.trim();
    if (!text) return;

    if (text.includes("Accepted")) {
      waiting = false;
      playNice();
      return;
    }

    for (const keyword of failKeywords) {
      if (text.includes(keyword)) {
        waiting = false;
        playFail();
        return;
      }
    }
  }

  function onAction(isRun) {
    if (!settings.enabled) return;
    if (isRun && !settings.playOnRun) return;
    waiting = true;
  }

  // Detect Run/Submit via data-e2e-locator attributes (buttons have no text, only icons)
  document.addEventListener("click", (e) => {
    const runBtn = e.target.closest('[data-e2e-locator="console-run-button"]');
    const submitBtn = e.target.closest('[data-e2e-locator="console-submit-button"]');
    if (runBtn) onAction(true);
    else if (submitBtn) onAction(false);
  }, true);

  // Keyboard shortcuts: Ctrl+Enter = Run, Ctrl+' = Submit
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "Enter") onAction(true);
    if (e.ctrlKey && e.key === "'") onAction(false);
  });

  const observer = new MutationObserver(checkResult);
  observer.observe(document.body, { childList: true, subtree: true });
})();
