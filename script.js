const levels = [
  {
    title: "📚 Grade 11",
    descriptionLines: [
      "Grade 11:",
      "Courses:",
      "English(U)",
      "Math(U)",
      "Law(M)",
      "Chemistry(U)",
      "Physics(U)",
      "Co-op(D)",
      "Computer Science (U)",
      "",
      "Desired Average:",
      "90%+ A 90+ average would allow me to be accepted into a good university. uOttawa serves as a backup in which I will need an 80+ average and a 90+ average would secure it and uOttawa also allows me to do 3 years of honors then go straight to law school instead of waiting another year.",
      "",
      "Other plans:",
      "I will stay on track to do 10 volunteer hours per year to finish them. I also plan to secure a summer job via my Co-op placement in a law firm."
    ],
    task: "Which course is NOT part of Grade 11?",
    options: ["Physics(U)", "History(U)", "Law(M)", "Chemistry(U)"],
    answer: "History(U)"
  },
  {
    title: "📘 Grade 12",
    descriptionLines: [
      "Grade 12:",
      "Courses:",
      "English(U)",
      "Calculus and Vectors(U)",
      "Law(M)",
      "Chemistry(U)",
      "Physics(U)",
      "Advanced Functions(U)",
      "",
      "Desired Average:",
      "90%+ A 90+ average would allow me to be accepted into a good university. uOttawa serves as a backup in which I will need an 80+ average and a 90+ average would secure it and uOttawa also allows me to do 3 years of honors then go straight to law school instead of waiting another year.",
      "",
      "Other plans:",
      "I will stay on track to do 10 volunteer hours per year to finish them. I also plan to secure a summer job via my Co-op placement in a law firm from last year. This would also get me experience throughout post secondary to act as a summer lawyer in law school."
    ],
    task: "What is the desired average to get into uOttawa without backup?",
    options: ["80%", "85%", "90%", "75%"],
    answer: "90%"
  },
  {
    title: "🎓 Graduation and Summer After",
    descriptionLines: [
      "Graduation and Summer After:",
      "I will use the time after graduation to take a breather for a week or two and perfect my resume for a part time job alongside university.",
      "In the summer before university I will stay up nights with my father and trade stocks with him so I can save up money for my university tuition.",
      "I will also continue investing in university but not as much."
    ],
    task: "What will I do to save money before university?",
    options: ["Trade stocks with my father", "Work full-time", "Get a loan", "Sell my car"],
    answer: "Trade stocks with my father"
  },
  {
    title: "🏫 First Year after Graduation",
    descriptionLines: [
      "First Year after Graduation:",
      "I will be in university majoring in English as it will help me in being a lawyer.",
      "I will also invest in my spare time to pay off student loans.",
      "I will take a part-time job and visit family during major Hindu festivals."
    ],
    task: "What major will I pursue at university?",
    options: ["Law", "Business", "English", "Engineering"],
    answer: "English"
  },
  {
    title: "📖 Year Two After Graduation (Undergrad Year 2)",
    descriptionLines: [
      "Year Two After Graduation:",
      "School: Continue with English major classes (second year inclusive literature, advanced writing, and rhetoric are good choices)—if a first-year law course is offered, take that, too; an internship or co-op related to legal experience would be great here, too.",
      "Work/Finance: Continue part-time work, maintain decent credit while paying down school debt and focusing on $.",
      "Personal: Attend student clubs/societies/law endeavors, debate groups, and cultural societies."
    ],
    task: "Which activity is recommended for personal growth?",
    options: ["Ignore clubs", "Attend debate groups", "Skip internships", "Avoid school societies"],
    answer: "Attend debate groups"
  },
  {
    title: "📚 Year Three After Graduation (Undergrad Year 3)",
    descriptionLines: [
      "Year Three After Graduation:",
      "Finish honors year courses and plan for LSAT test.",
      "Research law schools and further into your degree.",
      "Continue internships with law offices and save money.",
      "Attend networking events and workshops."
    ],
    task: "What test should I plan for?",
    options: ["GRE", "LSAT", "SAT", "MCAT"],
    answer: "LSAT"
  },
  {
    title: "⚖️ Extra Credit: Year Four After Graduation (Law School Year 1)",
    descriptionLines: [
      "Law School Year 1:",
      "Attend law school for freshman year leveraging Honors English degree.",
      "Focus on legal investigative research.",
      "Summer part-time work may lead to clerkships."
    ],
    task: "What is a possible summer opportunity in 1L year?",
    options: ["Clerkships", "Full-time job", "Internship unrelated to law", "No work allowed"],
    answer: "Clerkships"
  },
  {
    title: "📜 Extra Credit: Year Five After Graduation (Law School Year 2/Postgraduate Law Development)",
    descriptionLines: [
      "Law School Year 2:",
      "Continue courses to prepare for articling or practical legal training.",
      "Seek articling and job fairs.",
      "Prepare to launch career."
    ],
    task: "What is the main goal of this year?",
    options: ["Prepare for articling", "Take a break", "Change major", "Start a new hobby"],
    answer: "Prepare for articling"
  }
];

let currentLevel = 0;

const display = document.getElementById("timeline-display");
const xpBar = document.getElementById("xp-fill");
const nextBtn = document.getElementById("next-level-btn");
const gameContainer = document.getElementById("game-container");

// Load audio files (make sure these are in your project folder)
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const victorySound = new Audio('victory.mp3');

function showEndScreen() {
  victorySound.play();

  gameContainer.innerHTML = `
    <h1>🎉 Congratulations! 🎉</h1>
    <h2>You have completed Law School and are ready to launch your legal career!</h2>
    <p>Thanks for playing Career Quest: Lawyer Edition.</p>
  `;
}

function showLevel() {
  if (currentLevel >= levels.length) {
    showEndScreen();
    return;
  }

  nextBtn.disabled = true; // disable next until correct answer

  const level = levels[currentLevel];

  // Format description
  const formattedDescription = level.descriptionLines
    .map(line => {
      if (line.endsWith(":")) {
        return `<p><strong>${line}</strong></p>`;
      } else if (line === "") {
        return `<br>`;
      } else {
        return `<p>${line}</p>`;
      }
    })
    .join("");

  // Create multiple choice options
  const optionsHtml = level.options
    .map(opt => `<button class="option-btn">${opt}</button>`)
    .join(" ");

  display.innerHTML = `
    <h2>${level.title}</h2>
    ${formattedDescription}
    <div id="task-container" style="margin-top:15px;">
      <p><strong>Task:</strong> ${level.task}</p>
      <div id="options-container">${optionsHtml}</div>
      <p id="task-feedback" style="margin-top:10px;"></p>
    </div>
  `;

  // Update XP bar
  const xpPercent = ((currentLevel + 1) / levels.length) * 100;
  xpBar.style.width = xpPercent + "%";

  // Update button text
  if (currentLevel >= levels.length - 1) {
    nextBtn.innerText = "🎉 Finish!";
  } else {
    nextBtn.innerText = "Next Level";
  }

  // Add option buttons event listeners
  const feedback = document.getElementById("task-feedback");
  const optionButtons = document.querySelectorAll(".option-btn");

  optionButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === level.answer) {
        correctSound.play();
        feedback.style.color = "#00ff99";
        feedback.textContent = "Correct! You can proceed to the next level.";
        nextBtn.disabled = false;
      } else {
        wrongSound.play();
        feedback.style.color = "#ff6b6b";
        feedback.textContent = "Incorrect. Please try again.";
        nextBtn.disabled = true;
      }
    });
  });

  // Now increment level after displaying everything
  currentLevel++;
}

nextBtn.addEventListener("click", showLevel);

// Show first level on load
showLevel();
