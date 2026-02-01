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
}

function markAbsent() {
  attendanceText.innerText = "Attendance: Absent ❌";
  statusText.innerText = "Status: Bunk Alert ⚠️";
  rowStatus.innerText = "Absent";
  rowStatus.style.color = "red";
}

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
