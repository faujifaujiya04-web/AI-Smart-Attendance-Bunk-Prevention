const video = document.getElementById("video");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");

// Camera start
async function startCamera() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    video.srcObject = stream;
  } catch (err) {
    alert("Camera access denied");
  }
}

// Button click
startBtn.addEventListener("click", () => {
  statusText.innerText = "Status: Attendance Started ✅";
  statusText.style.color = "green";
});

// Auto start camera
startCamera();
