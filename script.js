const video = document.getElementById("video");
const statusText = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

let lastSeenTime = Date.now();
const BUNK_LIMIT = 15000; // 15 seconds

// Webcam ON
navigator.mediaDevices
  .getUserMedia({ video: true })
  .then((stream) => (video.srcObject = stream));

// Load face detector
Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("./models")]).then(() =>
  console.log("Model loaded"),
);

startBtn.onclick = () => {
  statusText.innerText = "Status: Attendance Started";
  startMonitoring();
};

function startMonitoring() {
  setInterval(async () => {
    const detections = await faceapi.detectAllFaces(
      video,
      new faceapi.TinyFaceDetectorOptions(),
    );

    if (detections.length > 0) {
      lastSeenTime = Date.now();
      statusText.innerText = "Status: Present ✅";
    } else {
      const diff = Date.now() - lastSeenTime;
      if (diff > BUNK_LIMIT) {
        statusText.innerText = "Status: BUNK ALERT ⚠️";
        console.log("Bunk detected!");
      } else {
        statusText.innerText = "Status: Not detected…";
      }
    }
  }, 1000);
}
