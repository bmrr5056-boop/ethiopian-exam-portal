const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// ጥያቄዎችን በጥንቃቄ ፊልተር አድርጎ የሚልክ API
app.get('/api/quiz/:subject', (req, res) => {
    // ከፊት ገጽ የመጣውን የትምህርት ስም ወደ ትልልቅ ፊደላት ይቀይራል፣ ባዶ ቦታዎችን ያጠፋል
    const requestedSubject = req.params.subject.trim().toUpperCase();

    const filePath = path.join(__dirname, 'questions.json');
    
    if (!fs.existsSync(filePath)) {
        return res.status(200).json([
            {
                "id": 1,
                "question": "የ questions.json ፋይል አልተገኘም! እባክህ ፋይሉን ፍጠር።",
                "options": ["እሺ", "እሺ", "እሺ", "እሺ"],
                "answer": "እሺ"
            }
        ]);
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: "ፋይሉን ማንበብ አልተቻለም" });
        }

        try {
            const allQuestions = JSON.parse(data);
            
            // በትምህርት ስም ፊልተር ያደርጋል (ፊደላትን ሳያዳላ)
            const filteredQuestions = allQuestions.filter(q => 
                q.subject && q.subject.trim().toUpperCase() === requestedSubject
            );

            // ካልተገኘ መተላለፊያ (Fallback)፡ ሙሉውን ጥያቄ ወይም የመጀመሪያዎቹን ጥያቄዎች ይልካል (ዌብሳይቱ እንዳይቆም)
            if (filteredQuestions.length === 0) {
                console.log(`ትምህርት አልተገኘም: ${requestedSubject}. አጠቃላይ ጥያቄዎች ይላካሉ።`);
                const fallbackQuestions = allQuestions.slice(0, 5).sort(() => 0.5 - Math.random());
                return res.json(fallbackQuestions);
            }

            // ከተገኘ ጥያቄዎቹን አቀያይሮ (Shuffle) ይልካል
            const shuffled = filteredQuestions.sort(() => 0.5 - Math.random());
            res.json(shuffled);

        } catch (e) {
            return res.status(500).json({ message: "የ JSON ፎርማት ስህተት አለበት" });
        }
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
