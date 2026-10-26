const lessonIds = [
    "linux",
    "networking",
    "authentication",
    "firewalls",
    "phishing",
    "vulnerabilities"
];

const STORAGE_KEY = "cybershield-completed-lessons";

function getCompletedLessons() {
    try {
        const saved = JSON.parse(
            localStorage.getItem(STORAGE_KEY) || "[]"
        );

        if (!Array.isArray(saved)) {
            return [];
        }

        return saved.filter(id => lessonIds.includes(id));
    } catch (error) {
        return [];
    }
}

function updateProgress() {
    const completed = getCompletedLessons();

    const percentage = Math.round(
        (completed.length / lessonIds.length) * 100
    );

    document.getElementById("completed-count").textContent =
        completed.length;

    document.getElementById("progress").textContent =
        `${percentage}%`;

    document.getElementById("progress-bar").style.width =
        `${percentage}%`;

    document.querySelectorAll(".complete-button").forEach(button => {
        const isCompleted = completed.includes(button.dataset.lesson);

        button.classList.toggle("completed", isCompleted);

        button.textContent = isCompleted
            ? "✓ Completed — Undo"
            : "Mark Completed";
    });
}

document.querySelectorAll(".complete-button").forEach(button => {
    button.addEventListener("click", () => {
        const id = button.dataset.lesson;
        const completed = getCompletedLessons();

        const updated = completed.includes(id)
            ? completed.filter(item => item !== id)
            : [...completed, id];

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(updated)
        );

        updateProgress();
    });
});

document.getElementById("check-password").addEventListener("click", () => {
    const password = document.getElementById("password").value;
    const result = document.getElementById("password-result");

    if (!password) {
        result.textContent = "Please enter a sample password.";
        return;
    }

    let score = 0;
    const suggestions = [];

    if (password.length >= 12) {
        score++;
    } else {
        suggestions.push("Use at least 12 characters.");
    }

    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) {
        score++;
    } else {
        suggestions.push("Include uppercase and lowercase letters.");
    }

    if (/\d/.test(password)) {
        score++;
    } else {
        suggestions.push("Consider including numbers.");
    }

    if (/[^A-Za-z0-9]/.test(password)) {
        score++;
    } else {
        suggestions.push("Consider including symbols.");
    }

    const labels = [
        "Needs improvement",
        "Weak",
        "Moderate",
        "Good",
        "Strong"
    ];

    const strength = labels[score];

    result.textContent = `${strength}. ${suggestions.join(" ")}`;
});

updateProgress();
const quizForm = document.getElementById("quiz-form");
const quizResult = document.getElementById("quiz-result");

quizForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const answers = {
        q1: "b",
        q2: "c",
        q3: "b",
        q4: "a",
        q5: "c"
    };

    let score = 0;
    const totalQuestions = Object.keys(answers).length;

    for (const question in answers) {
        const selected = document.querySelector(
            'input[name="' + question + '"]:checked'
        );

        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    const percentage = Math.round((score / totalQuestions) * 100);

    let message;

    if (score === totalQuestions) {
        message = "Excellent! All answers are correct.";
    } else if (score >= 3) {
        message = "Good work! Review the questions you missed.";
    } else {
        message = "Keep learning and try again!";
    }

    quizResult.textContent =
        "Your score: " + score + "/" + totalQuestions +
        " (" + percentage + "%). " + message;
});

quizForm.addEventListener("reset", function () {
    quizResult.textContent = "";
});
