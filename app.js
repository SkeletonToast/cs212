let timeLeft = 300;

function startTimer() {
    const timerInterval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up!");
        } else {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            document.getElementById("time").innerHTML = minutes + ":" + seconds.toString().padStart(2, '0');
            console.log(minutes + ":" + seconds.toString().padStart(2, '0'));
            timeLeft--;
        }
    }, 1000);
}

startTimer();