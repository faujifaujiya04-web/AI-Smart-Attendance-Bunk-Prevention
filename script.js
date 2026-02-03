const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const attendanceText = document.getElementById("attendance");
const rowStatus = document.getElementById("rowStatus");

let attendanceStarted = false;

// Camera
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

// Helpers
function markPresent() {
  attendanceText.innerText = "Attendance: Present ✅";
  statusText.innerText = "Status: Attendance Started";
  rowStatus.innerText = "Present";
  rowStatus.style.color = "green";
  saveHistory("Present");
}

function markAbsent() {
  attendanceText.innerText = "Attendance: Absent ❌";
  statusText.innerText = "Status: Bunk Alert ⚠️";
  rowStatus.innerText = "Absent";
  rowStatus.style.color = "red";
  saveHistory("Absent");
}

// ===== Attendance History =====
const historyList = document.getElementById("history");

function saveHistory(status) {
  const date = new Date().toLocaleString();
  const record = `${date} - ${status}`;

  let history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];
  history.push(record);
  localStorage.setItem("attendanceHistory", JSON.stringify(history));

  showHistory();
}

function showHistory() {
  historyList.innerHTML = "";
  const history = JSON.parse(localStorage.getItem("attendanceHistory")) || [];
  history.forEach((item) => {
    const li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
}

// page load‑la history show
showHistory();

// Button
startBtn.addEventListener("click", async () => {
  attendanceStarted = true;
  await startCamera();
  markPresent();

  // Demo bunk logic after 15s
  setTimeout(() => {
    if (attendanceStarted) {
      markAbsent();
    }
  }, 15000);
});
