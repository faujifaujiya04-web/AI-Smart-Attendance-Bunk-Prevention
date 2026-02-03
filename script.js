const video = document.getElementById("video");
const statusText = document.getElementById("status");
const historyList = document.getElementById("history");

let streamStarted = false;

// CAMERA START
function startAttendance() {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      streamStarted = true;
      statusText.innerText = "Status: Present";
      saveHistory("Present");
    })
    .catch(err => {
      statusText.innerText = "Camera access denied";
    });
}

// ⚠️ FACE / HAND CLOSE ISSUE FIX
// camera OFF / tab change / fully stop only = Absent
video.addEventListener("pause", () => {
  if (streamStarted) {
    statusText.innerText = "Status: Absent";
    saveHistory("Absent");
  }
});

// TAB CHANGE → Absent
document.addEventListener("visibilitychange", () => {
  if (document.hidden && streamStarted) {
    statusText.innerText = "Status: Absent";
    saveHistory("Absent");
  }
});

// -------- HISTORY LOGIC --------
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

  history.forEach(item => {
    const li = document.createElement("li");
    li.innerText = item;
    historyList.appendChild(li);
  });
}

// PAGE LOAD
showHistory();
