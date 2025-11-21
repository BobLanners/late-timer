// -------------------------
// Generate the sharing link
// -------------------------
if (typeof document !== "undefined") {
  const generateBtn = document.getElementById("generateBtn");
  if (generateBtn) {
    generateBtn.addEventListener("click", () => {
      const name = document.getElementById("nameInput").value.trim();
      const time = document.getElementById("timeInput").value;
      const msg = document.getElementById("msgInput").value.trim();

      if (!time) {
        alert("Please select a time.");
        return;
      }

      const params = new URLSearchParams({
        name: name || "",
        time: time,
        msg: msg || ""
      });

      const url = `${window.location.origin}${window.location.pathname.replace("index.html", "")}timer.html?${params.toString()}`;
      const resultLink = document.getElementById("resultLink");
      resultLink.value = url;
    });

    const copyBtn = document.getElementById("copyBtn");
    copyBtn.addEventListener("click", () => {
      const link = document.getElementById("resultLink");
      link.select();
      document.execCommand("copy");
      alert("Link copied!");
    });
  }
}

// -------------------------
// Timer page logic
// -------------------------
function startTimerPage() {
  const params = new URLSearchParams(window.location.search);

  const name = params.get("name") || "";
  const msg = params.get("msg") || "";
  const timeString = params.get("time");

  const meetTime = new Date(timeString);
  const messageEl = document.getElementById("message");

  let label = "";
  if (name) label += `${name}, `;
  label += msg ? msg : "here’s how late you are:";

  messageEl.textContent = label;

  function updateTimer() {
    const now = new Date();
    const diff = now - meetTime;

    const timerEl = document.getElementById("timerText");

    if (isNaN(meetTime.getTime())) {
      timerEl.textContent = "Invalid or missing time.";
      return;
    }

    // FUTURE / COUNTDOWN MODE
    if (diff < 0) {
      const seconds = Math.floor(-diff / 1000);
      const h = Math.floor(seconds / 3600);
      const m = Math.floor((seconds % 3600) / 60);
      const s = seconds % 60;
      timerEl.textContent = `Event starts in ${h}h ${m}m ${s}s`;
      return;
    }

    // LATE MODE
    const totalSeconds = Math.floor(diff / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;

    timerEl.textContent = `You are ${h}h ${m}m ${s}s late`;

    // ---- GIF LOGIC HERE ----
    const minutesLate = Math.floor(totalSeconds / 60);

    let gifSrc = "";
    if (minutesLate < 10) {
      gifSrc = "assets/gifs/Waiting.gif";
    } else if (minutesLate < 20) {
      gifSrc = "assets/gifs/Waiting_2.gif";
    } else {
      gifSrc = "assets/gifs/Waiting_3.gif";
    }

    const gifEl = document.getElementById("dynamicGif");
    gifEl.src = gifSrc;
}

  updateTimer();
  setInterval(updateTimer, 1000);
}