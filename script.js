const quests = [
  {
    title: "Grade 11 🎓",
    description: `
Courses:
English(U), Math(U), Law(M), Chemistry(U), Physics(U), Co-op(D), Computer Science (U)

Desired Average:
90%+ A 90+ average would allow me to be accepted into a good university. uOttawa serves as a backup in which I will need an 80+ average and a 90+ average would secure it and uOttawa also allows me to do 3 years of honors then go straight to law school instead of waiting another year.

Other plans:
I will stay on track to do 10 volunteer hours per year to finish them. I also plan to secure a summer job via my Co-op placement in a law firm.
    `,
    emoji: "📘",
    question: {
      question: "What is the university admission average you want to achieve?",
      options: ["80%", "85%", "90%", "95%"],
      correctAnswer: "90%",
      hint: "You mentioned aiming for a 90% average."
    }
  },
  {
    title: "Grade 12 📚",
    description: `
Courses:
English(U), Calculus and Vectors(U), Law(M), Chemistry(U), Physics(U), Advanced Functions(U)

Desired Average:
90%+ A 90+ average would allow me to be accepted into a good university. uOttawa serves as a backup in which I will need an 80+ average and a 90+ average would secure it and uOttawa also allows me to do 3 years of honors then go straight to law school instead of waiting another year.

Other plans:
I will stay on track to do 10 volunteer hours per year to finish them. I also plan to secure a summer job via my Co-op placement in a law firm from last year. This would also get me experience throughout post-secondary to act as a summer lawyer in law school.
    `,
    emoji: "📙",
    question: {
      question: "What advanced math course will you take in Grade 12?",
      options: ["Calculus", "Linear Algebra", "Trigonometry", "Probability"],
      correctAnswer: "Calculus",
      hint: "You mentioned Calculus and Vectors."
    }
  },
  {
    title: "Graduation & Summer After ☀️",
    description: `
I will use the time after graduation to take a breather for a week or two and perfect my resume for a part-time job alongside university. In the summer before university I will stay up nights with my father and trade stocks with him so I can save up money for my university tuition. I will also continue investing in university but not as much.
    `,
    emoji: "🎉",
    question: {
      question: "What will you do with your father in the summer after graduation?",
      options: ["Travel", "Trade Stocks", "Start a business", "Take a course"],
      correctAnswer: "Trade Stocks",
      hint: "You mentioned trading stocks together."
    }
  }
];

const questBox = document.getElementById("questBox");
const questDetails = document.getElementById("questDetails");
const quizForm = document.getElementById("quizForm");
const submitBtn = document.getElementById("submitBtn");
const progressDiv = document.getElementById("progress");
const resultMessage = document.getElementById("resultMessage");

let currentQuest = 0;
const completed = [];

function renderQuest() {
  const quest = quests[currentQuest];
  questBox.innerHTML = `<h2 style="text-align: center;">${quest.title}</h2>`;
  questDetails.textContent = quest.description.trim();

  // Render the multiple-choice question
  quizForm.innerHTML = `
    <div class="question">
      <label for="question">${quest.question.question}</label>
      <select id="question" name="question" required>
        ${quest.question.options.map(option => `<option value="${option}">${option}</option>`).join('')}
      </select>
    </div>
  `;

  submitBtn.disabled = false;
  resultMessage.textContent = "";
  updateProgress();
}

function updateProgress() {
  progressDiv.textContent = quests
    .map((q, i) => completed.includes(i) ? `✅${q.emoji}` : `⬜${q.emoji}`)
    .join("  ");
}

quizForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selectedAnswer = quizForm.querySelector("select").value;
  const correctAnswer = quests[currentQuest].question.correctAnswer;

  submitBtn.disabled = true; // Disable button to avoid multiple submissions

  if (selectedAnswer === correctAnswer) {
    resultMessage.textContent = `✅ Correct! You completed ${quests[currentQuest].title}`;
    completed.push(currentQuest); // Mark current quest as completed
    setTimeout(() => {
      currentQuest++; // Move to the next quest
      if (currentQuest < quests.length) {
        renderQuest(); // Render next quest
      } else {
        resultMessage.textContent = "🎉 You've completed all the quests!";
      }
    }, 1500); // Wait 1.5 seconds before switching
  } else {
    resultMessage.textContent = `❌ Incorrect. Hint: ${quests[currentQuest].question.hint}`;
    submitBtn.disabled = false; // Re-enable button to allow retry
  }
});

renderQuest(); // Start the game
