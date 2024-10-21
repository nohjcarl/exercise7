const quizData = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "Highlevel Text Markup Language"
    ],
    correct: "Hyper Text Markup Language"
  },
  {
    question: "Which programming language is used primarily for web development?",
    options: ["JavaScript", "Python", "C#", "Ruby"],
    correct: "JavaScript"
  },
  {
    question: "What is CSS used for?",
    options: [
      "Creating dynamic web pages",
      "Structuring web content",
      "Styling web pages",
      "Making websites responsive"
    ],
    correct: "Styling web pages"
  },
  {
    question: "What does SQL stand for?",
    options: [
      "Structured Question Language",
      "Structured Query Language",
      "Simplified Query Logic",
      "Sequential Query Language"
    ],
    correct: "Structured Query Language"
  },
  {
    question: "Which of the following is a version control system?",
    options: ["Git", "Docker", "Kubernetes", "Apache"],
    correct: "Git"
  }
];

let currentAnswers = Array(quizData.length).fill(null);
let score = 0;
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const scoreElement = document.getElementById('score');
const submitQuizButton = document.getElementById('submitQuiz');
const retakeQuizButton = document.getElementById('retakeQuiz');

// Function to generate quiz HTML
function renderQuiz() {
  quizContainer.innerHTML = '';
  quizData.forEach((question, index) => {
    const questionBlock = document.createElement('div');
    questionBlock.className = 'question-block';
    
    const questionTitle = document.createElement('h3');
    questionTitle.innerText = `${index + 1}. ${question.question}`;
    
    questionBlock.appendChild(questionTitle);
    
    question.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement('label');
      optionLabel.className = 'option-label';
      optionLabel.innerHTML = `
        <input 
          type="radio" 
          name="question${index}" 
          value="${option}" 
          onclick="selectAnswer(${index}, '${option}')">
        ${option}
      `;
      questionBlock.appendChild(optionLabel);
    });
    
    quizContainer.appendChild(questionBlock);
  });
}

// Function to handle answer selection
function selectAnswer(questionIndex, selectedAnswer) {
  currentAnswers[questionIndex] = selectedAnswer;
}

// Function to calculate and display the score
function handleSubmit() {
  score = 0;
  quizData.forEach((question, index) => {
    if (currentAnswers[index] === question.correct) {
      score++;
    }
  });
  
  // Show the result
  scoreElement.innerText = `${score} / ${quizData.length}`;
  resultContainer.style.display = 'block';
  quizContainer.style.display = 'none';
  submitQuizButton.style.display = 'none';
}

// Function to retake the quiz
function handleRetake() {
  currentAnswers = Array(quizData.length).fill(null);
  score = 0;
  renderQuiz();
  
  // Reset UI
  resultContainer.style.display = 'none';
  quizContainer.style.display = 'block';
  submitQuizButton.style.display = 'inline-block';
}

// Event Listeners
submitQuizButton.addEventListener('click', handleSubmit);
retakeQuizButton.addEventListener('click', handleRetake);

// Initial rendering of the quiz
renderQuiz();
