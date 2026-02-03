const video = document.getElementById("video");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");
const history = document.getElementById("history");

let attendanceStarted = false;
let absentTimer = null;

startBtn.addEventListener("click", async () => {
  if (attendanceStarted) return;

  attendanceStarted = true;
  statusText.textContent = "Status: Starting...";
  statusText.className = "";

  await startCamera();
  startDetection();
});

async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  video.srcObject = stream;
}

async function startDetection() {
  statusText.textContent = "Status: Present";
  statusText.className = "present";
  addHistory("Present");

  setInterval(() => {
    // simulate face detection (stable version)
    let faceDetected = Math.random() > 0.2; // 80% present

    if (faceDetected) {
      clearTimeout(absentTimer);
      statusText.textContent = "Status: Present";
      statusText.className = "present";
    } else {
      if (!absentTimer) {
        absentTimer = setTimeout(() => {
          statusText.textContent = "Status: Absent";
          statusText.className = "absent";
          addHistory("Absent");
          absentTimer = null;
        }, 3000); // 3 sec buffer
      }
    }
  }, 2000);
}

function addHistory(status) {
  const li = document.createElement("li");
  li.textContent = `${new Date().toLocaleString()} - ${status}`;
  history.prepend(li);
}
