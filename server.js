const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// የጥያቄዎች ኤፒአይ (API)
app.get('/api/questions', (req, res) => {
    fs.readFile('questions.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "ፋይሉን ማንበብ አልተቻለም" });
        res.json(JSON.parse(data));
    });
});

// 1. የተማሪዎች ምዝገባ ኤፒአይ (Sign Up)
app.post('/api/signup', (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: "እባክዎ ሁሉንም ክፍት ቦታዎች ይሙሉ" });

    fs.readFile('users.json', 'utf8', (err, data) => {
        let users = [];
        if (!err) users = JSON.parse(data);

        // ስሙ ቀድሞ መኖሩን ማረጋገጥ
        const userExists = users.find(u => u.username === username);
        if (userExists) return res.status(400).json({ error: "ይህ የተጠቃሚ ስም ቀድሞ ተይዟል" });

        users.push({ username, password });
        fs.writeFile('users.json', JSON.stringify(users, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "መመዝገብ አልተቻለም" });
            res.json({ success: "በተሳካ ሁኔታ ተመዝግበዋል!" });
        });
    });
});

// 2. የተማሪዎች መግቢያ ኤፒአይ (Login)
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "የሰርቨር ስህተት" });
        const users = JSON.parse(data);
        
        const user = users.find(u => u.username === username && u.password === password);
        if (!user) return res.status(400).json({ error: "የተሳሳተ የተጠቃሚ ስም ወይም የይለፍ ቃል!" });
        
        res.json({ success: "በተሳካ ሁኔታ ገብተዋል", username });
    });
});

app.listen(PORT, () => {
    console.log(`የፈተና ፖርታል ሰርቨር በፖርት ${PORT} ላይ መሥራት ጀምሯል!`);
});
