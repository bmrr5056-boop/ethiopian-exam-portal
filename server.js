const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// የሙከራ ጥያቄዎችን እዚህ ሰርቨሩ ላይ በሃርድኮድ እንጭናቸዋለን (የፎርማት ስህተትን ሙሉ በሙሉ ለማስቀረት)
const testQuestions = [
  {
    "id": 1,
    "grade": 12,
    "stream": "natural",
    "subject": "physics",
    "question": "Which of the following colors has the highest frequency?",
    "options": ["Red", "Green", "Blue", "Violet"],
    "answer": "Violet"
  },
  {
    "id": 2,
    "grade": 12,
    "stream": "social",
    "subject": "geography",
    "question": "Which of the following is the longest river in the world?",
    "options": ["Nile", "Amazon", "Mississippi", "Yangtze"],
    "answer": "Nile"
  },
  {
    "id": 3,
    "grade": 12,
    "stream": "both",
    "subject": "english",
    "question": "Identify the correct sentence:",
    "options": ["He don't like coffee.", "He doesn't likes coffee.", "He doesn't like coffee.", "He not like coffee."],
    "answer": "He doesn't like coffee."
  },
  {
    "id": 4,
    "grade": 12,
    "stream": "both",
    "subject": "english",
    "question": "She is looking forward to ________ her graduation next month.",
    "options": ["celebrate", "celebrated", "celebrating", "celebrates"],
    "answer": "celebrating"
  },
  {
    "id": 5,
    "grade": 12,
    "stream": "both",
    "subject": "english",
    "question": "By the time the teacher arrived, the students ________ the classroom clean.",
    "options": ["have made", "had made", "are making", "will make"],
    "answer": "had made"
  }
];

// ዋናው የጥያቄ ማምጫ API
app.get('/api/quiz/:subject', (req, res) => {
    const subjectParam = req.params.subject.trim().toLowerCase();
    
    // በሰርቨሩ ላይ ካሉት ጥያቄዎች ፊልተር ያደርጋል
    const filteredQuestions = testQuestions.filter(q => 
        q.subject.toLowerCase() === subjectParam
    );

    if (filteredQuestions.length === 0) {
        return res.status(404).json({ message: "ለዚህ ትምህርት ጥያቄ አልተገኘም!" });
    }

    // ጥያቄዎቹን ማቀያየሪያ (Shuffle)
    const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
    res.json(shuffled);
});

// ለሙከራ ዌብሳይቱ በስተጀርባ የሚሰራው API በትክክል መስራቱን በብሮውዘር ለማየት (ለምሳሌ፡ /test-api)
app.get('/test-api', (req, res) => {
    res.json({ status: "ሰርቨሩ በትክክል እየሰራ ነው!", totalQuestions: testQuestions.length });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

