// ===============================
// Questions Data
// ===============================
const questions = [
    {
        question: "What does JS stand for?",
        options: ["JavaSource", "JavaScript", "JustScript", "JScript"],
        answer: 1
    },
    {
        question: "Which keyword declares a variable?",
        options: ["var", "int", "string", "float"],
        answer: 0
    },
    {
        question: "Which method selects an element by ID?",
        options: ["querySelector()", "getElementById()", "getElements()", "selectId()"],
        answer: 1
    },
    {
        question: "Which is NOT a data type?",
        options: ["Number", "Boolean", "Float", "String"],
        answer: 2
    }
];

// ===============================
// Select DOM Elements
// ===============================
const questionEl = document.getElementById("question");
const optionButtons = document.querySelectorAll(".option-btn");
const nextBtn = document.querySelector(".next-btn");
const progressBar = document.getElementById("progress-bar");
const timeEl = document.getElementById("time");
const resultBox = document.getElementById("result-box");
const scoreEl = document.getElementById("score");

// ===============================
// State Variables
// ===============================
let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;
let selectedAnswer = null;

// ===============================
// Start Quiz
// ===============================
function startQuiz() {
    currentQuestion = 0;
    score = 0;
    resultBox.style.display = "none";
    nextBtn.style.display = "block";
    showQuestion();
}

// ===============================
// Show Question
// ===============================
function showQuestion() {
    resetOptions();
    startTimer();

    const q = questions[currentQuestion];
    questionEl.textContent = q.question;

    optionButtons.forEach((btn, index) => {
        btn.textContent = q.options[index];
        btn.onclick = () => selectAnswer(index);
    });

    updateProgress();
}

// ===============================
// Select Answer
// ===============================
function selectAnswer(index) {
    selectedAnswer = index;

    clearInterval(timer);

    const correctAnswer = questions[currentQuestion].answer;

    optionButtons.forEach(btn => btn.disabled = true);

    if (index === correctAnswer) {
        score++;
        optionButtons[index].style.backgroundColor = "#4CAF50";
        optionButtons[index].style.color = "#fff";
    } else {
        optionButtons[index].style.backgroundColor = "#e53935";
        optionButtons[index].style.color = "#fff";

        optionButtons[correctAnswer].style.backgroundColor = "#4CAF50";
        optionButtons[correctAnswer].style.color = "#fff";
    }
}

// ===============================
// Next Question
// ===============================
nextBtn.addEventListener("click", () => {
    if (selectedAnswer === null) return;

    currentQuestion++;
    selectedAnswer = null;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// ===============================
// Timer
// ===============================
function startTimer() {
    timeLeft = 15;
    timeEl.textContent = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeEl.textContent = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timer);
            currentQuestion++;
            selectedAnswer = null;

            if (currentQuestion < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }
    }, 1000);
}

// ===============================
// Update Progress Bar
// ===============================
function updateProgress() {
    let progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = progress + "%";
}

// ===============================
// Reset Options
// ===============================
function resetOptions() {
    optionButtons.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = "#f1f1f1";
        btn.style.color = "#000";
    });
}

// ===============================
// Show Result
// ===============================
function showResult() {
    questionEl.textContent = "Quiz Completed!";
    document.querySelector(".options").style.display = "none";
    nextBtn.style.display = "none";
    resultBox.style.display = "block";
    scoreEl.textContent = score;
}

// ===============================
// Restart Quiz
// ===============================
document.querySelector(".restart-btn").addEventListener("click", () => {
    document.querySelector(".options").style.display = "flex";
    startQuiz();
});

// Start on Load
startQuiz();