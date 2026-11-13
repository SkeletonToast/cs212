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

// questions
let currentQuestion = 0;

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

function loadQuestion(value) {
    // alert('loading question')
    fetch('./questions.json')
        .then(response => response.json())
        .then(data => {
            // console.log("Quiz Title:", data.quiz_title)
            // const firstQuestion = data.questions[0]
            // alert(JSON.stringify(data, null, 2))
            // alert(data.questions[0])
            // alert("First Question text:", data.questions[0].question)
            // console.log("First Answer choice:", firstQuestion.options[0])
            
            let title = data.questions[value];
            document.getElementById("questionTitle").textContent = JSONtext(title.question);
            document.getElementById("optionOne").textContent = JSONtext(title.options[0]);
            document.getElementById("optionTwo").textContent = JSONtext(title.options[1]);
            document.getElementById("optionThree").textContent = JSONtext(title.options[2]);
            document.getElementById("optionFour").textContent = JSONtext(title.options[3]);
        })

    currentQuestion = value;
}

function checkAnswer() {

}

function JSONtext(text) {
    return JSON.stringify(text).replace(/"/g, '')
}

startTimer();
// questionsList();

loadQuestion(1);
// alert('hello');