const $ = (id) => document.getElementById(id);

const DEFAULTS = {
  enabled: true,
  acceptVolume: 80,
  failVolume: 80,
  playOnRun: true,
};

// Load saved settings into UI
chrome.storage.sync.get(DEFAULTS, (settings) => {
  $("enabled").checked = settings.enabled;
  $("accept-vol").value = settings.acceptVolume;
  $("fail-vol").value = settings.failVolume;
  $("play-on-run").checked = settings.playOnRun;

  $("accept-vol-label").textContent = settings.acceptVolume + "%";
  $("fail-vol-label").textContent = settings.failVolume + "%";

  updateDisabledState(settings.enabled);
});

function save(key, value) {
  chrome.storage.sync.set({ [key]: value });
}

function updateDisabledState(enabled) {
  const cards = document.querySelectorAll(".card");
  // Skip the first .card (the enable toggle itself), dim the rest
  for (let i = 1; i < cards.length; i++) {
    cards[i].style.opacity = enabled ? "1" : "0.4";
    cards[i].style.pointerEvents = enabled ? "auto" : "none";
  }
}

// Enabled toggle
$("enabled").addEventListener("change", (e) => {
  save("enabled", e.target.checked);
  updateDisabledState(e.target.checked);
});

// Accept volume
$("accept-vol").addEventListener("input", (e) => {
  const val = parseInt(e.target.value);
  $("accept-vol-label").textContent = val + "%";
  save("acceptVolume", val);
});

// Fail volume
$("fail-vol").addEventListener("input", (e) => {
  const val = parseInt(e.target.value);
  $("fail-vol-label").textContent = val + "%";
  save("failVolume", val);
});

// Play on run toggle
$("play-on-run").addEventListener("change", (e) => {
  save("playOnRun", e.target.checked);
});
