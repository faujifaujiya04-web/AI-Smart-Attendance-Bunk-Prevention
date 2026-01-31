window.onload = () => {
  const video = document.getElementById('video');
  const statusText = document.getElementById('status');
  const startBtn = document.getElementById('startBtn');

  let lastSeenTime = Date.now();
  const BUNK_LIMIT = 15000; // 15 seconds

  // Camera ON
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => video.srcObject = stream)
    .catch(err => alert("Camera access denied"));

  startBtn.addEventListener('click', () => {
    statusText.innerText = 'Status: Attendance Started';
    startMonitoring();
  });

  function startMonitoring() {
    setInterval(() => {
      // Dummy presence logic (no model dependency now)
      lastSeenTime = Date.now();
      statusText.innerText = 'Status: Present ✅';
    }, 3000);
  }
};
