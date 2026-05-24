/* ========================================
   AKAZA EXPERIENCE — COMPLETE SCRIPT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // Launch sequence
    initCustomCursor();
    initParticles();
    initScrollProgress();
    runIntroSequence();   // ← هذا السبب في ظهور الشاشة السوداء لو مفقود
    initHeroAnimations();
    initFloatingPanels();
    initScrollAnimations();
    initCharacterCards();
    initModal();
});

/* ========================================
   1. INTRO SEQUENCE (السبب في الشاشة السوداء)
   ======================================== */
function runIntroSequence() {
    const intro = document.querySelector('.intro-screen');
    const logo = document.querySelector('.intro-logo');

    const tl = gsap.timeline({
        onComplete: () => {
            // بعد ما الـ intro يخلص، نبدأ الـ hero
            initHeroReveal();
        }
    });

    tl.to(logo, {
        opacity: 1,
        duration: 1.2,
        ease: 'power2.out'
    })
    .to(logo, {
        filter: 'blur(8px)',
        opacity: 0.6,
        duration: 0.4,
        yoyo: true,
        repeat: 2,
        ease: 'power1.inOut'
    })
    .to(logo, {
        scale: 1.8,
        opacity: 0,
        filter: 'blur(30px)',        duration: 0.8,
        ease: 'power3.in'
    })
    .to(intro, {
        opacity: 0,
        duration: 0.6,
        ease: 'power2.inOut',
        onComplete: () => {
            intro.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    }, '-=0.3');
}

/* ========================================
   2. HERO REVEAL
   ======================================== */
function initHeroReveal() {
    const tl = gsap.timeline();

    // AKAZA letters reveal
    tl.to('.akaza-title .char', {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        stagger: 0.08,
        ease: 'expo.out'
    })
    // Subtitles
    .to('.subtitle-container', {
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out'
    }, '-=0.5')
    .from('.subtitle', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out'
    }, '-=0.6')
    // Floating panels
    .from('.glass-panel', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
    }, '-=0.3')    // Scroll indicator
    .to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        ease: 'power2.out'
    }, '-=0.2');

    // Continuous glitch effect on title
    setInterval(() => {
        const chars = document.querySelectorAll('.akaza-title .char');
        const randomChar = chars[Math.floor(Math.random() * chars.length)];
        gsap.to(randomChar, {
            x: (Math.random() - 0.5) * 8,
            skewX: (Math.random() - 0.5) * 20,
            opacity: 0.7,
            duration: 0.08,
            yoyo: true,
            repeat: 1,
            ease: 'power1.inOut'
        });
    }, 3500);
}

/* ========================================
   3. HERO ANIMATIONS (parallax)
   ======================================== */
function initHeroAnimations() {
    // Parallax on mouse move
    const hero = document.querySelector('.hero');
    const layers = document.querySelectorAll('.visual-layer');

    hero.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;

        gsap.to(layers[0], { x: x * -20, y: y * -20, duration: 1 });
        gsap.to(layers[1], { x: x * -40, y: y * -40, duration: 1 });
        gsap.to(layers[2], { x: x * -60, y: y * -60, duration: 1 });
    });

    // Floating loop for hero content
    gsap.to('.hero-title', {
        y: -15,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1
    });
}
/* ========================================
   4. FLOATING PANELS — hover glow follow
   ======================================== */
function initFloatingPanels() {
    document.querySelectorAll('.glass-panel').forEach(panel => {
        const glow = panel.querySelector('.panel-glow');

        panel.addEventListener('mousemove', (e) => {
            const rect = panel.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            gsap.to(glow, {
                left: x - rect.width,
                top: y - rect.height,
                duration: 0.4,
                ease: 'power2.out'
            });
        });
    });
}

/* ========================================
   5. SCROLL ANIMATIONS
   ======================================== */
function initScrollAnimations() {
    // Section title reveal
    gsap.to('.title-line', {
        scrollTrigger: {
            trigger: '.character-section',
            start: 'top 70%',
            toggleActions: 'play none none reverse'
        },
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.15,
        ease: 'expo.out'
    });

    // Hero fade on scroll
    gsap.to('.hero-content', {
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        },
        y: -100,
        opacity: 0
    });}

/* ========================================
   6. CHARACTER CARDS
   ======================================== */
function initCharacterCards() {
    const cards = document.querySelectorAll('.character-card');

    cards.forEach(card => {
        // Tilt on mouse move
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateY = ((x - centerX) / centerX) * 8;
            const rotateX = ((centerY - y) / centerY) * 8;

            gsap.to(card, {
                rotateX: rotateX,
                rotateY: rotateY,
                transformPerspective: 1000,
                duration: 0.4,
                ease: 'power2.out'
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotateX: 0,
                rotateY: 0,
                duration: 0.6,
                ease: 'power3.out'
            });
        });

        // Open modal on click
        card.addEventListener('click', () => {
            openModal(card.dataset.character, card);
        });
    });

    // Initial scroll reveal for cards
    gsap.from('.character-card', {
        scrollTrigger: {
            trigger: '.character-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse'        },
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: 'expo.out'
    });
}

/* ========================================
   7. MODAL
   ======================================== */
const characterData = {
    akaza: {
        name: 'AKAZA',
        rank: 'Upper Rank Three',
        bio: 'Once a human martial artist named Hakuji, Akaza became a demon obsessed with strength. His Destructive Death techniques combine devastating precision with supernatural power, making him one of Muzan\'s most lethal warriors.',
        stats: { strength: 95, speed: 90, technique: 98 }
    },
    rengoku: {
        name: 'RENGOKU',
        rank: 'Flame Hashira',
        bio: 'Kyojuro Rengoku, the Flame Pillar, burned with an unyielding spirit. His mastery of Flame Breathing and his unwavering resolve made him a beacon of hope against the demons.',
        stats: { strength: 88, speed: 92, technique: 90 }
    },
    tanjiro: {
        name: 'TANJIRO',
        rank: 'Demon Slayer',
        bio: 'Tanjiro Kamado fights to save his demon-turned sister Nezuko and avenge his slaughtered family. His kind heart and fierce determination drive him beyond human limits.',
        stats: { strength: 80, speed: 85, technique: 88 }
    },
    kokushibo: {
        name: 'KOKUSHIBO',
        rank: 'Upper Rank One',
        bio: 'The strongest of the Twelve Kizuki, Kokushibo wields Moon Breathing with six arms. Once a Demon Slayer himself, his pursuit of perfection led him to forsake his humanity.',
        stats: { strength: 99, speed: 95, technique: 100 }
    },
    doma: {
        name: 'DOMA',
        rank: 'Upper Rank Two',
        bio: 'Behind his cheerful smile lies a hollow demon incapable of emotion. Doma\'s ice-based Blood Demon Art creates beautiful yet deadly frozen constructs.',
        stats: { strength: 92, speed: 88, technique: 95 }
    },
    muzan: {
        name: 'MUZAN',
        rank: 'Demon King',
        bio: 'The progenitor of all demons, Muzan Kibutsuji has ruled the shadows for over a millennium. His absolute power and obsession with perfection make him the ultimate evil.',
        stats: { strength: 100, speed: 98, technique: 100 }
    }
};
function openModal(characterKey, cardElement) {
    const modal = document.getElementById('character-modal');
    const data = characterData[characterKey];
    if (!data) return;

    // Fill modal content
    modal.querySelector('.modal-name').textContent = data.name;
    modal.querySelector('.modal-rank').textContent = data.rank;
    modal.querySelector('.modal-bio').textContent = data.bio;
    modal.querySelector('.modal-visual').textContent = data.name;

    // Set stats
    const statFills = modal.querySelectorAll('.stat-fill');
    const values = [data.stats.strength, data.stats.speed, data.stats.technique];

    // Dim other cards
    document.querySelectorAll('.character-card').forEach(c => {
        if (c !== cardElement) {
            gsap.to(c, { filter: 'blur(4px) brightness(0.4)', duration: 0.4 });
        }
    });

    // Show modal
    modal.classList.add('active');

    gsap.fromTo(modal,
        { opacity: 0 },
        { opacity: 1, duration: 0.4, ease: 'power2.out' }
    );

    // Animate stat bars
    setTimeout(() => {
        statFills.forEach((fill, i) => {
            fill.style.width = values[i] + '%';
        });
    }, 300);
}

function closeModal() {
    const modal = document.getElementById('character-modal');

    gsap.to(modal, {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
            modal.classList.remove('active');
            // Reset stats
            modal.querySelectorAll('.stat-fill').forEach(f => f.style.width = '0%');            // Un-dim cards
            document.querySelectorAll('.character-card').forEach(c => {
                gsap.to(c, { filter: 'blur(0px) brightness(1)', duration: 0.4 });
            });
        }
    });
}

function initModal() {
    const modal = document.getElementById('character-modal');
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-backdrop').addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ========================================
   8. CUSTOM CURSOR
   ======================================== */
function initCustomCursor() {
    const glow = document.querySelector('.cursor-glow');
    const dot = document.querySelector('.cursor-dot');

    if (!glow || !dot) return;

    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        gsap.to(dot, {
            x: mouseX,
            y: mouseY,
            duration: 0.1,
            ease: 'power2.out'
        });
    });

    function loop() {
        glowX += (mouseX - glowX) * 0.15;
        glowY += (mouseY - glowY) * 0.15;
        glow.style.left = glowX + 'px';
        glow.style.top = glowY + 'px';
        requestAnimationFrame(loop);    }
    loop();

    document.querySelectorAll('button, .glass-panel, .character-card').forEach(el => {
        el.addEventListener('mouseenter', () => {
            gsap.to(glow, { width: 60, height: 60, duration: 0.3 });
        });
        el.addEventListener('mouseleave', () => {
            gsap.to(glow, { width: 40, height: 40, duration: 0.3 });
        });
    });
}

/* ========================================
   9. PARTICLES
   ======================================== */
function initParticles() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = canvas.width = window.innerWidth;
    let h = canvas.height = window.innerHeight;

    const count = window.innerWidth < 768 ? 25 : 55;
    const particles = [];
    const colors = ['139,92,246', '56,189,248', '255,107,0'];

    class P {
        constructor() { this.reset(true); }
        reset(init = false) {
            this.x = Math.random() * w;
            this.y = init ? Math.random() * h : h + 10;
            this.vy = -(Math.random() * 0.6 + 0.2);
            this.vx = (Math.random() - 0.5) * 0.3;
            this.r = Math.random() * 1.8 + 0.6;
            this.o = Math.random() * 0.5 + 0.2;
            this.c = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.y < -10) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.c},${this.o})`;
            ctx.shadowBlur = 12;
            ctx.shadowColor = `rgba(${this.c},${this.o})`;            ctx.fill();
        }
    }

    for (let i = 0; i < count; i++) particles.push(new P());

    function loop() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        requestAnimationFrame(loop);
    }
    loop();

    window.addEventListener('resize', () => {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    });
}

/* ========================================
   10. SCROLL PROGRESS BAR
   ======================================== */
function initScrollProgress() {
    const bar = document.querySelector('.scroll-progress');
    if (!bar) return;

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = (scrollTop / docHeight) * 100;
        bar.style.width = pct + '%';
    });
}