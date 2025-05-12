const quizData = [
    {
        question: "What is the largest country by area?",
        options: ["USA", "Russia", "China", "Canada"],
        answer: "Russia"
    },
    {
        question: "Who invented the telephone?",
        options: ["Alexander Graham Bell", "Nikola Tesla", "Thomas Edison", "Albert Einstein"],
        answer: "Alexander Graham Bell"
    },
    {
        question: "What is the capital city of Japan?",
        options: ["Osaka", "Kyoto", "Tokyo", "Hiroshima"],
        answer: "Tokyo"
    },
    {
      question: "Which planet is known as the 'Red Planet'?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
    },
    {
      question: "What is the smallest country in the world?",
      options: ["Monaco", "San Marino", "Vatican City", "Nauru"],
      answer: "Vatican City"
    },
    {
      question: "What is the chemical symbol for gold?",
      options: ["Au", "Ag", "Pb", "Fe"],
      answer: "Au"
    },
    {
      question: "Who wrote the play 'Romeo and Juliet'?",
      options: ["William Shakespeare", "Charles Dickens", "George Orwell", "Mark Twain"],
      answer: "William Shakespeare"
    },
    {
      question: "Which animal is known as the 'King of the Jungle'?",
      options: ["Tiger", "Elephant", "Lion", "Gorilla"],
      answer: "Lion"
    },
    {
      question: "Which element has the chemical symbol 'O'?",
      options: ["Oxygen", "Osmium", "Ozone", "Opium"],
      answer: "Oxygen"
    },
    {
      question: "What is the largest desert in the world?",
      options: ["Sahara Desert", "Gobi Desert", "Kalahari Desert", "Antarctic Desert"],
      answer: "Antarctic Desert"
    },
    {
      question: "Which is the longest river in the world?",
      options: ["Amazon River", "Yangtze River", "Nile River", "Mississippi River"],
      answer: "Amazon River"
    },
    {
      question: "Which country has the most population?",
      options: ["India", "USA", "China", "Russia"],
      answer: "India"
    },
    {
      question: "What is the smallest planet in our solar system?",
      options: ["Mercury", "Venus", "Mars", "Pluto"],
      answer: "Mercury"
    },
    {
      question: "In which year did World War II end?",
      options: ["1940", "1941", "1945", "1950"],
      answer: "1945"
    },
    {
      question: "Which city is known as the 'Big Apple'?",
      options: ["Los Angeles", "New York City", "Chicago", "San Francisco"],
      answer: "New York City"
    },
    {
      question: "Which is the highest mountain in the world?",
      options: ["K2", "Mount Everest", "Kilimanjaro", "Mount Fuji"],
      answer: "Mount Everest"
    },
    {
      question: "Which is the most spoken language in the world?",
      options: ["English", "Hindi", "Spanish", "Mandarin Chinese"],
      answer: "Mandarin Chinese"
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      answer: "Canberra"
    },
    {
      question: "Which country is known as the 'Land of the Rising Sun'?",
      options: ["China", "Japan", "Thailand", "South Korea"],
      answer: "Japan"
    },
    {
      question: "Which is the largest island in the world?",
      options: ["Australia", "Greenland", "New Guinea", "Borneo"],
      answer: "Greenland"
    },
    {
      question: "What is the tallest animal on Earth?",
      options: ["Elephant", "Giraffe", "Whale", "Camel"],
      answer: "Giraffe"
    },
    {
      question: "Which country is the birthplace of the Olympic Games?",
      options: ["USA", "France", "Greece", "Italy"],
      answer: "Greece"
    },
    {
      question: "Who was the first president of the United States?",
      options: ["Abraham Lincoln", "George Washington", "Thomas Jefferson", "John Adams"],
      answer: "George Washington"
    },
    {
      question: "What is the largest city in the world by population?",
      options: ["Tokyo", "New York", "Shanghai", "Mumbai"],
      answer: "Tokyo"
    },
    
    {
      question: "Which planet is closest to the Sun?",
      options: ["Earth", "Mercury", "Venus", "Mars"],
      answer: "Mercury"
    }
];


let currentQuestion = 0;
let score = 0;
let quizStarted = false;
let incorrectAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreEl = document.getElementById("score");
const reviewEl = document.getElementById("review");
const quizEl = document.getElementById("quiz");
const welcomeMsg = document.getElementById("welcomeMsg");
const toggleReviewBtn = document.getElementById("toggleReviewBtn");
const actionBtns = document.getElementById("actionBtns");

function startQuiz() {
  quizStarted = true;
  startBtn.style.display = "none";
  welcomeMsg.style.display = "none";
  quizEl.style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = ""; // Clear old options

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.textContent = option;
    btn.addEventListener("click", () => selectAnswer(btn, option));
    optionsEl.appendChild(btn);
  });

  nextBtn.style.display = "none";
  quizEl.classList.add("show");
}


function selectAnswer(btn, selected) {
  const correct = quizData[currentQuestion].answer;

  if (!selected) {
    alert("Please select an answer!");
    return;
  }
  // Highlight selected option
  Array.from(optionsEl.children).forEach(button => button.classList.remove("selected"));
  btn.classList.add("selected");

  if (selected === correct) {
    score++;
  } else {
    incorrectAnswers.push({
      question: quizData[currentQuestion].question,
      yourAnswer: selected,
      correctAnswer: correct
    });
  }

  currentQuestion++;
  nextBtn.style.display = "block";
}


function showScore() {
  questionEl.textContent = "Quiz Completed!";
  optionsEl.innerHTML = "";
  nextBtn.style.display = "none";
  quizEl.style.display = "none";
  scoreEl.textContent = `Your Score: ${score} / ${quizData.length}`;
  scoreEl.style.display = "block";

  if (incorrectAnswers.length > 0) {
    reviewEl.innerHTML = "<h3>Review Incorrect Answers:</h3>";
    incorrectAnswers.forEach(item => {
      reviewEl.innerHTML += `<p><strong>Q:</strong> ${item.question}<br>
                              <strong>Your Answer:</strong> ${item.yourAnswer || "No Answer"}<br>
                              <strong>Correct Answer:</strong> ${item.correctAnswer}</p>`;
    });
  }

  actionBtns.style.display = "flex"; // Display Restart & Review buttons
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    showScore();
  }
});

startBtn.addEventListener("click", startQuiz);

restartBtn.addEventListener("click", () => {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  scoreEl.innerHTML = "";
  reviewEl.innerHTML = "";
  restartBtn.style.display = "none";
  toggleReviewBtn.style.display = "none";
  actionBtns.style.display = "none"; // Hide buttons initially
  quizEl.style.display = "block";
  loadQuestion();
});

toggleReviewBtn.addEventListener("click", () => {
  reviewEl.style.display = reviewEl.style.display === "block" ? "none" : "block";
});

