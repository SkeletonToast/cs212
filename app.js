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
    let verify = false;
    let value = -1;
    for (let i = 0; i < 10; i++) {
        // generate random number
        // check to see if it's already in the array
        // if not, add it, if so, reduce i and try again
        while (!verify)
        {
            value = randomInt(0, 9);
            verify = verifyQuestion(value, (i + 1))
        }
        questions[i] = value
        verify = false;
    }
}

function verifyQuestion(value, size) {
    for (let i = 0; i < size; i++) {
        if (questions[i] == value) {return false;}
    }
    return true;
}

// question link loader
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.question-link');
    
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            const index = link.getAttribute('data-index');
            loadQuestion(Number(index));
        });
    });
});

function updateLinks() {
    const links = document.querySelectorAll('.question-link');
    
    links.forEach(link => {
        const index = Number(link.getAttribute('data-index'));
        if (answers[index] != -1) {
            if (correctAnswers[index] != -1 && answers[index] == correctAnswers[index])
            {
                link.textContent = ('Question ' + (index + 1) + ' (Correct)')
            }
            else {
                link.textContent = ('Question ' + (index + 1) + ' (Answered)')
            }
        }
    });
}

function loadQuestion(value) {
    document.querySelectorAll(`input[name="choice"]`).forEach(radio => radio.checked = false);
    if (answers[value] != -1)
    {
        document.querySelector(`input[name="choice"][value="${answers[value]}"]`).checked = true;
    }

    fetch('./questions.json')
    .then(response => response.json())
    .then(data => {
        let title = data.questions[questions[value]];
        document.getElementById("question_title").textContent = ("Question " + (value + 1) + ": " + JSONtext(title.question));
        document.getElementById("option_one").textContent = JSONtext(title.options[0]);
        document.getElementById("option_two").textContent = JSONtext(title.options[1]);
        document.getElementById("option_three").textContent = JSONtext(title.options[2]);
        document.getElementById("option_four").textContent = JSONtext(title.options[3]);
        // correctAnswers[value] = Number(title.answer);
    });

    currentQuestion = value;
    
    updateLinks();
}

// buttons
    document.getElementById('submit').addEventListener('click', answer);
    function answer() {
        let selected = document.querySelector('input[name="choice"]:checked');

        if (selected) {
            checkAnswer(Number(selected.value));
        } 
        else {
            alert('Please select an option before continuing.');
        }
    }

    document.getElementById('next').addEventListener('click', nextButton);
    function nextButton() {
        answers[currentQuestion] = Number(document.querySelector('input[name="choice"]:checked').value);
        loadQuestion((currentQuestion + 1) % 10);
    }

    document.getElementById('submit_quiz').addEventListener('click', submitQuiz);
    function submitQuiz() {
        updateLinks();
        for (let i = 0; i < 10; i++) {
            if (answers[i] == -1) {
                alert('All questions must be answered before submitting.');
                return;
            }
        }
        finalScore();
    }

function checkAnswer(answer) {
    answers[currentQuestion] = answer;
    if (answers[currentQuestion] == correctAnswers[currentQuestion]) {
        alert('Great job!');
        loadQuestion(currentQuestion + 1);
    }
    else {
        alert('Incorrect! Try again.');
    }
}

function finalScore() {
    let correct = 0;
    for (let i = 0; i < 10; i++) {
        if (answers[i] == correctAnswers[i]) {
            correct++;
        }
    }

    let score = ((correct / 10) * 100);
    if (score >= 90) {
        alert('Fantastic work! You got ' + score +'%!')
    } else if (score >= 80) {
        alert('Great job! You got ' + score +'%!')
    } else if (score >= 70) {
        alert('You got ' + score +'%!')
    } else if (score >= 60) {
        alert('You got ' + score +'%.')
    } else if (score >= 50) {
        alert('You only got ' + score +'%.')
    } else if (score >= 40) {
        alert('You only got ' + score +'%. Study next time!')
    } else if (score >= 30) {
        alert('How did you only get ' + score +'%?')
    } else if (score >= 20) {
        alert(score +'%? Just drop out at this point bro')
    } else if (score >= 10) {
        alert(score +'%. Just think about that for a minute or two.')
    } else {
        alert(score +'%! I\'m going to hire somebody to kill you.')
    }
}

// just a helper to output json element as text
function JSONtext(text) {
    return JSON.stringify(text).replace(/"/g, '')
}

// run on page load
startTimer();

let questions = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
let correctAnswers = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
let answers = [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1];
questionsList();

// load first question for display
loadQuestion(0);

// set default values
fetch('./questions.json')
.then(response => response.json())
.then(data => {
    document.getElementById("quizTitle").textContent = JSONtext(data.quiz_title);
})