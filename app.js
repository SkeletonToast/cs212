let timeLeft = 300;

function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

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

function questionsList() {
    for (i = 0; i < 10; i++) {
        // generate random number
        // check to see if it's already in the array
        // if not, add it, if so, reduce i and try again
        let value = randomInt(0, 9);
        if (verifyQuestion(value, (i + 1)))
        {
            questions[i] = value;
        }
        else
        {
            i--;
        }
    }
}

function verifyQuestion(value, size)
{
    for (i = 0; i < size; i++)
    {
        if (questions[i] == value)
        {
            return false;
        }
    }
    return true;
}

function loadQuestion() {
    alert('loading question')
    fetch('./questions.json')
        .then(response => response.json())
        .then(data => {
            // console.log("Quiz Title:", data.quiz_title)
            // const firstQuestion = data.questions[0]
            // console.log("First Question text:", firstQuestion.question)
            // console.log("First Answer choice:", firstQuestion.options[0])
            
            const currentQ = data.questions[value];

            document.getElementById("question").textContent = currentQ.question;
        })
}

function checkAnswer() {

}

startTimer();
questionsList();

loadQuestion(1);
// alert('hello');