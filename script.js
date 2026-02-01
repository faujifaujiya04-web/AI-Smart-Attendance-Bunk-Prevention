const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const attendanceText = document.getElementById("attendance");

let attendanceStarted = false;

// Camera start
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera permission denied");
  }
}

// Button click
startBtn.addEventListener("click", async () => {
  statusText.innerText = "Status: Attendance Started";
  attendanceText.innerText = "Attendance: Present ✅";
  attendanceStarted = true;
  await startCamera();

  // Demo absent logic
  setTimeout(() => {
    if (attendanceStarted) {
      attendanceText.innerText = "Attendance: Absent ❌";
      statusText.innerText = "Status: Bunk Alert ⚠️";
    }
  }, 15000); // 15 seconds
});
