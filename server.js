const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ከ questions.json ላይ ጥያቄዎችን የሚያነብ API
app.get('/api/quiz/:subject', (req, res) => {
    const subjectParam = req.params.subject.trim().toUpperCase(); // ከ Dropdown የሚመጣውን ወደ UPPERCASE ይቀይራል

    // የ questions.json ፋይል መኖሩን ያረጋግጣል
    const filePath = path.join(__dirname, 'questions.json');
    if (!fs.existsSync(filePath)) {
        return res.status(500).json({ message: "ስህተት፡ questions.json ፋይል አልተገኘም!" });
    }

    // ፋይሉን ያነባል
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "ፋይሉን ለማንበብ አልተቻለም!" });
        }

        try {
            const allQuestions = JSON.parse(data);
            
            // በዕጩ ሰብጀክት ስም ፊልተር ያደርጋል (ሁለቱንም በ UPPERCASE ያወዳድራል)
            const filteredQuestions = allQuestions.filter(q => 
                q.subject && q.subject.trim().toUpperCase() === subjectParam
            );

            if (filteredQuestions.length === 0) {
                return res.status(404).json({ message: `በዚህ ትምህርት ስር እስካሁን ምንም ጥያቄ አልተጨመረም!` });
            }

            // ጥያቄዎቹን ማቀያየሪያ (Shuffle)
            const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
            res.json(shuffled);

        } catch (parseError) {
            return res.status(500).json({ message: "የ questions.json ፎርማት ስህተት አለበት!" });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
