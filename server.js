const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

// === ВСЕ ТВОИ ДАННЫЕ ЗДЕСЬ ===
const profileData = {
    name: "Yahyoo_Erikovich",
    role: "Full-Stack & Mobile Developer",
    location: "Tashkent, Uzbekistan",
    status: "Open to Work",
    
    // Профессиональное описание
    bio: "Разработчик из Ташкента. Специализируюсь на создании сложных Telegram-ботов с админ-панелями и кроссплатформенных мобильных приложений. Владею полным циклом разработки: от логики на Python/Node.js до интерфейсов на JS/Dart.",
    
    contacts: {
        github: "https://github.com/", // Сюда потом вставишь свою ссылку
        telegram: "https://t.me/"      // Сюда свой юзернейм
    },

    skills: [
        { name: "Python", level: 90, icon: "fab fa-python", color: "#ffe873" },
        { name: "Node.js", level: 85, icon: "fab fa-node-js", color: "#6cc24a" },
        { name: "Dart / Flutter", level: 80, icon: "fas fa-mobile-alt", color: "#42a5f5" }, 
        { name: "JavaScript", level: 95, icon: "fab fa-js", color: "#f7df1e" },
        { name: "HTML5 & CSS3", level: 98, icon: "fab fa-html5", color: "#e34c26" }
    ],
    
    projects: [
        {
            title: "Telegram Bot 'Biochem'",
            tech: ["Python", "Aiogram", "Admin Panel", "SQLite"],
            desc: "Образовательная платформа по биологии внутри Telegram. Реализовано 4 основных раздела. Ключевая особенность — кастомная админ-панель, позволяющая загружать и удалять видео-материалы, управлять пользователями и контентом без вмешательства в код."
        },
        {
            title: "Portfolio System",
            tech: ["Node.js", "Express", "REST API"],
            desc: "Full-Stack веб-приложение (текущий сайт). Использует архитектуру Client-Server: фронтенд динамически запрашивает данные через API endpoint /api/profile."
        },
        {
            title: "Mobile App MVP",
            tech: ["Dart", "Flutter", "Firebase"],
            desc: "Кроссплатформенное мобильное приложение. Разработка адаптивного UI и интеграция с облачной базой данных."
        }
    ]
};

// API Endpoints
app.get('/api/profile', (req, res) => {
    res.json(profileData);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === БЫЛО ===
// app.listen(PORT, () => {
//    console.log(`Server running at http://localhost:${PORT}`);
// });

// === СТАЛО (Замени на это) ===
if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running at http://localhost:${PORT}`);
    });
}

module.exports = app;