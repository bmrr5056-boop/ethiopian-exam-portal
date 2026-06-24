const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ሁሉንም Natural እና Social ሰብጀክቶች በአንድ ላይ የያዘ የጥያቄዎች ባንክ
const allQuestions = [
  // --- ENGLISH ---
  { "id": 1, "grade": 12, "stream": "both", "subject": "english", "question": "Identify the correct sentence:", "options": ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."], "answer": "He doesn't like coffee." },
  { "id": 2, "grade": 12, "stream": "both", "subject": "english", "question": "She is looking forward to ________ her graduation next month.", "options": ["celebrate", "celebrated", "celebrating", "celebrates"], "answer": "celebrating" },
  { "id": 3, "grade": 12, "stream": "both", "subject": "english", "question": "By the time the teacher arrived, the students ________ the classroom clean.", "options": ["have made", "had made", "are making", "will make"], "answer": "had made" },

  // --- MATHEMATICS ---
  { "id": 4, "grade": 12, "stream": "both", "subject": "mathematics", "question": "What is the derivative of f(x) = x^2 + 3x?", "options": ["2x + 3", "x + 3", "2x", "3x"], "answer": "2x + 3" },

  // --- GEOGRAPHY ---
  { "id": 5, "grade": 12, "stream": "social", "subject": "geography", "question": "Which of the following is the longest river in the world?", "options": ["Nile", "Amazon", "Mississippi", "Yangtze"], "answer": "Nile" },

  // --- PHYSICS ---
  { "id": 6, "grade": 12, "stream": "natural", "subject": "physics", "question": "Which of the following colors has the highest frequency?", "options": ["Red", "Green", "Blue", "Violet"], "answer": "Violet" },

  // --- HISTORY ---
  { "id": 7, "grade": 12, "stream": "social", "subject": "history", "question": "In which year did the Battle of Adwa take place?", "options": ["1896", "1886", "1935", "1872"], "answer": "1896" },

  // --- CIVICS ---
  { "id": 8, "grade": 12, "stream": "both", "subject": "civics", "question": "Which of the following is a core element of a democratic system?", "options": ["Rule of law", "One-party rule", "Absence of constitution", "Censorship"], "answer": "Rule of law" },

  // --- ECONOMICS ---
  { "id": 9, "grade": 12, "stream": "social", "subject": "economics", "question": "What is the basic economic problem faced by all societies?", "options": ["Scarcity", "Inflation", "Unemployment", "Poverty"], "answer": "Scarcity" },

  // --- APTITUDE (SAT) ---
  { "id": 10, "grade": 12, "stream": "both", "subject": "aptitude (sat)", "question": "Complete the series: 2, 4, 8, 16, ________.", "options": ["32", "24", "20", "64"], "answer": "32" }
];

// ዋናው የጥያቄ ማምጫ API Route
app.get('/api/quiz/:subject', (req, res) => {
    // ከ Dropdown የሚመጣውን ስም (ለምሳሌ ENGLISH ወይም APTITUDE (SAT)) ሙሉ በሙሉ ያጸዳና ያሳንሰዋል
    let subjectParam = req.params.subject.trim().toLowerCase();

    // በዝርዝሩ ውስጥ ያሉትን ሁሉንም ጥያቄዎች ፊልተር ያደርጋል
    const filteredQuestions = allQuestions.filter(q => {
        let currentSub = q.subject.trim().toLowerCase();
        return currentSub === subjectParam || subjectParam.includes(currentSub) || currentSub.includes(subjectParam);
    });

    if (filteredQuestions.length === 0) {
        return res.status(404).json({ message: "ለዚህ ትምህርት እስካሁን ጥያቄ አልተጫነም!" });
    }

    // ጥያቄዎቹ እንዳይደጋገሙ ማቀያየሪያ (Shuffle)
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    res.json(shuffled);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

