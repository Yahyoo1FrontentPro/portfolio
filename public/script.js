document.addEventListener('DOMContentLoaded', () => {
    fetchProfile();
    initCanvas();
});

// 1. Получение данных с сервера
async function fetchProfile() {
    try {
        const res = await fetch('/api/profile');
        const data = await res.json();

        // Заполнение шапки
        document.getElementById('name-display').innerText = data.name;
        document.getElementById('role-display').innerText = data.role;
        document.getElementById('bio-display').innerText = data.bio;
        document.getElementById('loc-display').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${data.location}`;
        
        // Ссылки
        document.getElementById('github-link').href = data.contacts.github;
        document.getElementById('tg-link').href = data.contacts.telegram;

        // Рендер навыков
        const skillsContainer = document.getElementById('skills-list');
        data.skills.forEach(skill => {
            const div = document.createElement('div');
            div.className = 'skill-row';
            div.innerHTML = `
                <div class="skill-meta">
                    <span><i class="${skill.icon}"></i> ${skill.name}</span>
                    <span>${skill.level}%</span>
                </div>
                <div class="bar-bg">
                    <div class="bar-fill" style="width: ${skill.level}%; background: ${skill.color}"></div>
                </div>
            `;
            skillsContainer.appendChild(div);
        });

        // Рендер проектов
        const projectsContainer = document.getElementById('projects-list');
        data.projects.forEach(proj => {
            const tagsHtml = proj.tech.map(t => `<span class="tag">${t}</span>`).join('');
            const div = document.createElement('div');
            div.className = 'project-item';
            div.innerHTML = `
                <h4>${proj.title}</h4>
                <div class="tags">${tagsHtml}</div>
                <p>${proj.desc}</p>
            `;
            projectsContainer.appendChild(div);
        });

    } catch (e) {
        console.error("Error loading profile:", e);
    }
}

// 2. Анимация фона (Частицы)
function initCanvas() {
    const canvas = document.getElementById('bgCanvas');
    const ctx = canvas.getContext('2d');
    
    let w, h, particles = [];
    
    const resize = () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
        }
        update() {
            this.x += this.vx; 
            this.y += this.vy;
            if(this.x < 0 || this.x > w) this.vx *= -1;
            if(this.y < 0 || this.y > h) this.vy *= -1;
        }
        draw() {
            ctx.fillStyle = 'rgba(102, 252, 241, 0.2)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for(let i=0; i<50; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => {
            p.update();
            p.draw();
            // Линии
            particles.forEach(p2 => {
                let dx = p.x - p2.x;
                let dy = p.y - p2.y;
                let dist = Math.sqrt(dx*dx + dy*dy);
                if(dist < 100) {
                    ctx.strokeStyle = `rgba(102, 252, 241, ${0.1 - dist/1000})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            });
        });
        requestAnimationFrame(animate);
    }
    animate();
}