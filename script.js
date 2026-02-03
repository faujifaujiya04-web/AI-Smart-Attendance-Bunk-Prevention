const video = document.getElementById("video");
const statusText = document.getElementById("status");
const historyList = document.getElementById("history");
const startBtn = document.getElementById("startBtn");

let attendanceStarted = false;
let absentTimer = null;

// Load models
Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromUri(
    "https://justadudewhohacks.github.io/face-api.js/models"
  )
]).then(startCamera);

function startCamera() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
    });
}

startBtn.addEventListener("click", () => {
  attendanceStarted = true;
  statusText.textContent = "Status: Started";
  statusText.className = "present";
  detectFace();
});

function detectFace() {
  if (!attendanceStarted) return;

  setInterval(async () => {
    const detection = await faceapi.detectSingleFace(
      video,
      new faceapi.TinyFaceDetectorOptions()
    );

    if (detection) {
      clearTimeout(absentTimer);
      markStatus("Present");
    } else {
      if (!absentTimer) {
        absentTimer = setTimeout(() => {
          markStatus("Absent");
          absentTimer = null;
        }, 5000); // 5 seconds buffer
      }
    }
  }, 1000);
}

function markStatus(state) {
  const time = new Date().toLocaleString();

  statusText.textContent = `Status: ${state}`;
  statusText.className = state === "Present" ? "present" : "absent";

  const li = document.createElement("li");
  li.textContent = `${time} - ${state}`;
  historyList.prepend(li);
}

