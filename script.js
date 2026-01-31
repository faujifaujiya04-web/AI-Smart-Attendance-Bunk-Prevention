const video = document.getElementById("video");

navigator.mediaDevices
  .getUserMedia({ video: {} })
  .then((stream) => (video.srcObject = stream));

Promise.all([faceapi.nets.tinyFaceDetector.loadFromUri("/models")]).then(
  startVideo,
);

function startVideo() {
  video.addEventListener("play", () => {
    setInterval(async () => {
      const detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions(),
      );
      console.log("Faces detected:", detections.length);
    }, 1000);
  });
}
