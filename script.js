// Global Clock
function updateTime() {
    const select = document.getElementById("country-select");
    const selectedCountry = select.value;

    if (!selectedCountry) {
        return;
    }

    const options = { timeZone: selectedCountry, hour12: true };
    const currentTime = new Date().toLocaleTimeString("en-US", options);

    const timeElement = document.getElementById("current-time");
    timeElement.textContent = currentTime;
}

// Refresh time every second
setInterval(updateTime, 1000);

// Local Watch
setInterval(displayTime, 1000);

function displayTime() {
    let now = new Date();
    let time = now.toLocaleTimeString();
    document.getElementById("clock").textContent = time;
}

// Stopwatch
const timer = document.getElementById("stopwatch");
let hr = 0;
let min = 0;
let sec = 0;
let stoptime = true;

function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
    }
}

function timerCycle() {
    if (stoptime == false) {
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        sec = sec + 1;

        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }

        if (sec < 10) {
            sec = "0" + sec;
        }
        if (min < 10) {
            min = "0" + min;
        }
        if (hr < 10) {
            hr = "0" + hr;
        }

        timer.innerHTML = hr + ":" + min + ":" + sec;

        setTimeout("timerCycle()", 1000);
    }
}
function resetTimer() {
    timer.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
}

// Countdown Timer
let ctTime;
let totalDuration = 0;

function setStartTimer() {
    if (!ctTime) {
        let cdHours = parseInt(document.getElementById("cdHours").value) || 0;
        let cdMinutes =
            parseInt(document.getElementById("cdMinutes").value) || 0;
        let cdSeconds =
            parseInt(document.getElementById("cdSeconds").value) || 0;

        if (cdHours < 0 || cdMinutes < 0 || cdSeconds < 0) {
            alert("Please enter positive values for the countdown timer.");
            return;
        }

        if (cdHours === 0 && cdMinutes === 0 && cdSeconds === 0) {
            alert("Please enter a valid duration for the countdown timer.");
            return;
        }
        totalDuration = cdHours * 3600 + cdMinutes * 60 + cdSeconds;
        updateTimer();
        ctTime = setInterval(decrementTimer, 1000);
    }
}

function decrementTimer() {
    if (totalDuration > 0) {
        totalDuration--;
        updateTimer();
    } else {
        clearInterval(ctTime);
        alert("Countdown finished!");
        cdHours = document.getElementById("cdHours").value = "";
        cdMinutes = document.getElementById("cdMinutes").value = "";
        cdSeconds = document.getElementById("cdSeconds").value = "";
        ctTime = null;
    }
}

function setStopTimer() {
    clearInterval(ctTime);
    ctTime = null;
}

function setResetTimer() {
    clearInterval(ctTime);
    ctTime = null;
    cdHours = document.getElementById("cdHours").value = "";
    cdMinutes = document.getElementById("cdMinutes").value = "";
    cdSeconds = document.getElementById("cdSeconds").value = "";
    totalDuration = 0;

    updateTimer();
}

function updateTimer() {
    let hours = Math.floor(totalDuration / 3600);
    let minutes = Math.floor((totalDuration % 3600) / 60);
    let seconds = totalDuration % 60;

    let formattedTime =
        (hours < 10 ? "0" + hours : hours) +
        ":" +
        (minutes < 10 ? "0" + minutes : minutes) +
        ":" +
        (seconds < 10 ? "0" + seconds : seconds);

    document.getElementById("ctTime").textContent = formattedTime;
}

// Alarm Clock
function setAlarm() {
    let alarmTime = document.getElementById("alarm-clock").value;
    if (!alarmTime) {
        alert("Please set a valid alarm time.");
        return;
    }

    let now = new Date();
    let alarmDate = new Date(now.toDateString() + " " + alarmTime);
    console.log(alarmDate);
    if (alarmDate < now) {
        alert("Please set a future time for the alarm.");
        return;
    }

    let timeDifference = alarmDate - now;

    setTimeout(function () {
        alert("Alarm! Wake Up");
        alarmTime = document.getElementById("alarm-clock").value = "";
    }, timeDifference);
}
