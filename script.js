// ELEMENTS
const video = document.getElementById("video");
const statusText = document.getElementById("status");
const historyList = document.getElementById("history");
const startBtn = document.getElementById("startBtn");

let stream = null;
let started = false;

// START ATTENDANCE
startBtn.addEventListener("click", async () => {
  if (started) return;

  try {
    stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
    started = true;

    setStatus("Present");
    saveHistory("Present");
  } catch (e) {
    statusText.innerText = "Camera permission denied";
  }
});

// STATUS UPDATE
function setStatus(text) {
  statusText.innerText = "Status: " + text;
}

// TAB CHANGE → ABSENT
document.addEventListener("visibilitychange", () => {
  if (started && document.hidden) {
    setStatus("Absent");
    saveHistory("Absent");
  }
});

// CAMERA STOP → ABSENT
video.addEventListener("ended", () => {
  if (started) {
    setStatus("Absent");
    saveHistory("Absent");
  }
});

// -------- HISTORY (LOCALSTORAGE) --------
function saveHistory(status) {
  const now = new Date().toLocaleString();
  const entry = `${now} - ${status}`;

  let history = JSON.parse(localStorage.getItem("attendanceHistory"));
  if (!Array.isArray(history)) history = [];

  history.push(entry);
  localStorage.setItem("attendanceHistory", JSON.stringify(history));

  renderHistory();
}

function renderHistory() {
  historyList.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];

  history.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    historyList.appendChild(li);
  });
}

// LOAD HISTORY ON PAGE LOAD
renderHistory();
