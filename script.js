let startTime = 0;
let updatedTime = 0;
let difference = 0;
let timerInterval;
let running = false;
let lapCount = 0;

const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const laps = document.getElementById("laps");

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    let ms = Math.floor((difference % 1000) / 10);
    let sec = Math.floor((difference / 1000) % 60);
    let min = Math.floor((difference / (1000 * 60)) % 60);
    let hrs = Math.floor((difference / (1000 * 60 * 60)));

    display.innerText =
        `${(hrs < 10 ? "0" : "") + hrs}:` +
        `${(min < 10 ? "0" : "") + min}:` +
        `${(sec < 10 ? "0" : "") + sec}.` +
        `${(ms < 10 ? "0" : "") + ms}`;
}

startBtn.onclick = function () {
    if (!running) {
        startTime = new Date().getTime() - difference;
        timerInterval = setInterval(updateDisplay, 10);
        running = true;
        startBtn.innerText = "Running...";
    }
};

pauseBtn.onclick = function () {
    if (running) {
        clearInterval(timerInterval);
        running = false;
        startBtn.innerText = "Start";
    }
};

lapBtn.onclick = function () {
    if (running) {
        lapCount++;
        let li = document.createElement("li");
        li.innerText = `Lap ${lapCount}: ${display.innerText}`;
        laps.insertBefore(li, laps.firstChild);
    }
};

resetBtn.onclick = function () {
    clearInterval(timerInterval);
    running = false;
    startTime = 0;
    updatedTime = 0;
    difference = 0;
    display.innerText = "00:00:00.00";
    laps.innerHTML = "";
    lapCount = 0;
    startBtn.innerText = "Start";
};

// 🆕 Hover effect — show 🚫 Running without clicking
startBtn.addEventListener("mouseenter", () => {
    if (running) {
        startBtn.innerText = "🚫 Running";
    }
});

startBtn.addEventListener("mouseleave", () => {
    if (running) {
        startBtn.innerText = "Running...";
    }
});
