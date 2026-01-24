// ============================================
// LOADER SIMULATION
// ============================================
window.addEventListener('load', () => {
    const bar = document.getElementById('loaderBar');
    const status = document.getElementById('loaderStatus');
    const loader = document.getElementById('loader');
    
    const messages = [
        "Loading core modules...",
        "Initializing quantum states...",
        "Optimizing render pipeline...",
        "System Ready."
    ];

    let progress = 0;
    let msgIndex = 0;

    const interval = setInterval(() => {
        progress += Math.random() * 10;
        if (progress > 100) progress = 100;
        
        bar.style.width = `${progress}%`;

        if (progress > 25 && msgIndex === 0) {
            status.textContent = messages[1];
            msgIndex++;
        }
        if (progress > 60 && msgIndex === 1) {
            status.textContent = messages[2];
            msgIndex++;
        }
        if (progress === 100) {
            status.textContent = messages[3];
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('loaded');
            }, 500);
        }
    }, 150);
});

// ============================================
// QUANTUM FIELD PARTICLES (MOUSE INTERACTIVE)
// ============================================
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

// Mouse state
let mouse = { x: null, y: null, radius: 150 };

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Resize
function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    initParticles();
}
window.addEventListener('resize', resize);

class Particle {
    constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
        this.baseColor = 'rgba(59, 130, 246, '; // Blue base
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.baseColor + '0.5)';
        ctx.fill();
    }

    update() {
        // Movement
        this.x += this.vx;
        this.y += this.vy;

        // Mouse Interaction (Repulsion/Attraction physics)
        if (mouse.x != null) {
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx + dy*dy);
            
            if (distance < mouse.radius) {
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const force = (mouse.radius - distance) / mouse.radius;
                const directionX = forceDirectionX * force * 3;
                const directionY = forceDirectionY * force * 3;
                
                // Push away slightly
                this.x -= directionX;
                this.y -= directionY;
            }
        }

        // Bounce off edges
        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;

        this.draw();
    }
}

function initParticles() {
    particles = [];
    let numberOfParticles = (width * height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animateParticles() {
    requestAnimationFrame(animateParticles);
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
    }
    connectParticles();
}

function connectParticles() {
    let opacityValue = 1;
    for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
            let distance = ((particles[a].x - particles[b].x) * (particles[a].x - particles[b].x)) 
                         + ((particles[a].y - particles[b].y) * (particles[a].y - particles[b].y));
            
            if (distance < (width/7) * (height/7)) {
                opacityValue = 1 - (distance/20000);
                ctx.strokeStyle = 'rgba(34, 211, 238,' + opacityValue * 0.15 + ')'; // Cyan connections
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[a].x, particles[a].y);
                ctx.lineTo(particles[b].x, particles[b].y);
                ctx.stroke();
            }
        }
    }
}

resize();
animateParticles();

// ============================================
// TYPING EFFECT
// ============================================
const typeEl = document.getElementById('typingText');
const phrases = [
    "> cargo build",
    "> python main.py",
    "> qiskit assemble",
    "> git commit -m 'Initial'"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typeEl.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typeEl.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 500;
    }

    setTimeout(type, typeSpeed);
}

// Start typing after load
setTimeout(type, 2000);

// ============================================
// SCROLL REVEAL
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ============================================
// HOLOGRAPHIC CARD EFFECT
// ============================================
function handleCardHover(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
}

function handleCardLeave(card) {
    // Optional: reset effect or fade out border handled by CSS opacity
}

// ============================================
// MAGNETIC BUTTONS
// ============================================
document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const position = btn.getBoundingClientRect();
        const x = e.pageX - position.left - position.width / 2;
        const y = e.pageY - position.top - position.height / 2;
        
        btn.style.transform = `translate(${x * 0.3}px, ${y * 0.5}px)`;
    });
    
    btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
    });
});

// ============================================
// NAV LOGIC
// ============================================
const nav = document.getElementById('nav');
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
});

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// ============================================
// UPGRADED TERMINAL CONTACT LOGIC
// ============================================
const terminalInput = document.getElementById('terminalInput');
const terminalSend = document.getElementById('terminalSend');
const terminalOutput = document.getElementById('terminalOutput');

// Helper to type out text slowly (like a real computer)
function typeOutput(text, className = '') {
    const div = document.createElement('div');
    div.className = `output-line ${className}`;
    terminalOutput.appendChild(div);
    
    // Typing effect
    let i = 0;
    const speed = 20; 
    function type() {
        if (i < text.length) {
            div.textContent += text.charAt(i);
            i++;
            // Scroll to bottom
            terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
            setTimeout(type, speed);
        }
    }
    type();
}

function typeCommand(text) {
    const div = document.createElement('div');
    div.className = 'output-line command';
    div.textContent = `guest@portfolio:~$ ${text}`;
    terminalOutput.appendChild(div);
}

function handleSend() {
    const rawInput = terminalInput.value.trim();
    const input = rawInput.toLowerCase();
    
    if (!rawInput) return;

    typeCommand(rawInput);
    terminalInput.value = '';

    // 1. CLEAR
    if (input === 'clear') {
        setTimeout(() => {
            terminalOutput.innerHTML = '';
            addLine('Terminal cleared.', 'success');
        }, 200);
        return;
    }

    // 2. HELP
    if (input === 'help') {
        typeOutput("Available Commands: ls, cat [project], whoami, rust, matrix, status, clear, [message]");
        return;
    }

    // 3. LS (List Projects)
    if (input === 'ls' || input === 'll') {
        typeOutput("DerbyOS-web/  Spatial-Audio/  Quantum-Alg/  CLI-Tools/");
        return;
    }

    // 4. CAT (Read Project)
    if (input.startsWith('cat ')) {
        const project = input.split(' ')[1];
        if (project.includes('derby')) {
            typeOutput("DerbyOS: Monte Carlo race simulation. Language: Vanilla JS.");
        } else if (project.includes('spatial')) {
            typeOutput("Spatial-Audio: 3D HRTF Audio Engine. Language: Web Audio API.");
        } else if (project.includes('quantum')) {
            typeOutput("Quantum-Alg: Grover's & Shor's Algorithms. Language: Python/Qiskit.");
        } else {
            typeOutput(`cat: ${project}: No such file or directory`, 'error');
        }
        return;
    }

    // 5. WHOAMI
    if (input === 'whoami') {
        typeOutput("heet");
        return;
    }

    // 6. RUST (Easter Egg)
    if (input === 'rust' || input === 'cargo') {
        const crab = `
        🦀
        // Rust is safe and fast.
        // Memory safety guaranteed without garbage collection.
        `;
        typeOutput(crab, 'success');
        return;
    }

    // 7. SUDO (Joke)
    if (input.startsWith('sudo')) {
        typeOutput("[sudo] password for guest: ******", 'error');
        setTimeout(() => typeOutput("guest is not in the sudoers file. This incident will be reported.", 'error'), 1000);
        return;
    }

    // 8. MATRIX (Easter Egg)
    if (input === 'matrix') {
        typeOutput("Wake up, Neo...", 'success');
        document.body.style.textShadow = "0 0 5px #0f0";
        document.body.style.color = "#0f0";
        return;
    }

    // 9. STATUS (Quantum Theme)
    if (input === 'status') {
        typeOutput("--- SYSTEM DIAGNOSTICS ---");
        setTimeout(() => typeOutput("UPTIME: 99.99%"), 500);
        setTimeout(() => typeOutput("QUANTUM COHERENCE: STABLE"), 1000);
        setTimeout(() => typeOutput("RUST COMPILER: ACTIVE"), 1500);
        setTimeout(() => typeOutput("MEMORY LEAKS: NONE"), 2000);
        return;
    }

    // 10. DEFAULT (Send Email)
    // If it's not a command, treat it as a message
    typeOutput('Processing transmission...');
    setTimeout(() => {
        typeOutput('Encrypting packet with AES-256...', 'success');
        setTimeout(() => {
            window.location.href = `mailto:hitkumarp589@gmail.com?subject=Portfolio Inquiry&body=${encodeURIComponent(rawInput)}`;
        }, 1500);
    }, 1000);
}

// Legacy Helper
function addLine(text, type = '') {
    const div = document.createElement('div');
    div.className = `output-line ${type}`;
    div.textContent = text;
    terminalOutput.appendChild(div);
    // Scroll to bottom
    terminalOutput.parentElement.scrollTop = terminalOutput.parentElement.scrollHeight;
}

terminalSend.addEventListener('click', handleSend);
terminalInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSend();
});

// Set Year
document.getElementById('year').textContent = new Date().getFullYear();
