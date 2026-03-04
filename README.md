# 🔊 LeetCode Skill Issue Detector

A Chrome extension that plays meme sounds when you run or submit code on LeetCode.

**Accepted?** Nice. 🎉  
**Wrong Answer?** Skill issue. 💀

---

## 📹 Demo

https://github.com/user-attachments/assets/3c487718-d023-44ee-a0b1-d2280432b6c9
<!-- 
To make the video show on GitHub:
1. Go to your repo → Issues → New Issue
2. Drag & drop leetcode-sound-meme.mp4 into the comment box
3. GitHub will generate a URL — copy it
4. Replace the URL above with that link
5. You can discard the issue without saving

Alternatively, if you push the mp4 to the repo, use:


## ✨ Features

- 🎉 Plays a sound on **Accepted** submissions
- 💀 Plays a different sound on **Wrong Answer**, **Runtime Error**, **TLE**, **MLE**, and **Compile Error**
- 🧪 Works on both **Run Code** (test) and **Submit**
- 🎚️ Independent volume controls for accept and fail sounds
- 🔇 Toggle sounds on/off from the popup
- ⚙️ Option to disable sounds on test runs (keep them for submissions only)
- 💾 Settings persist across sessions via Chrome sync storage

---

## 📸 Popup UI

<!-- Add a screenshot of the popup here -->
<!-- ![Popup](assets/popup.png) -->

| Feature | Control |
|---|---|
| Enable / Disable | Toggle switch |
| Accept volume | Green slider |
| Fail volume | Red slider |
| Play on test run | Toggle switch |

---

## 🚀 Installation

### Option 1: Download the ZIP (easiest)

1. Download **[leetcode-skill-issue-detector.zip]** from [Releases](https://github.com/yeschirag/leetcode-skill-issue-detector/releases/tag/v1.0)
2. **Unzip** it to any folder on your computer
3. Open **chrome://extensions** in Chrome
4. Enable **Developer mode** (toggle in the top right)
5. Click **Load unpacked**
6. Select the **unzipped folder**
7. Go to any LeetCode problem and start coding! 🎉

### Option 2: Clone from source

1. Clone the repo
   ```bash
   git clone https://github.com/yeschirag/leetcode-skill-issue-detector.git
   ```
2. Open **chrome://extensions** in Chrome
3. Enable **Developer mode** (top right)
4. Click **Load unpacked**
5. Select the `leetcode-sound` folder
6. Go to any LeetCode problem and start coding!

---

## 📁 Project Structure

```
leetcode-sound/
├── manifest.json      # Extension config
├── content.js         # Detects results & plays sounds
├── popup.html         # Settings popup UI
├── popup.css          # Popup styling
├── popup.js           # Popup logic & storage
├── nice.mp3           # Sound for accepted submissions
└── faahh.mp3          # Sound for failed submissions
```

---

## 🛠️ How It Works

1. Content script runs on `leetcode.com/*`
2. Listens for clicks on the **Run** and **Submit** buttons (detected via `data-e2e-locator` attributes)
3. Watches for DOM mutations in the result panel (`data-e2e-locator="console-result"`)
4. Plays the appropriate sound based on the result text

---

## 🤝 Contributing

PRs welcome! If LeetCode changes their DOM structure and sounds stop working, feel free to open an issue.

---

## 📝 License

MIT — do whatever you want with it.

---

<p align="center">
  <i>because every wrong answer deserves a sound effect</i>
</p>
