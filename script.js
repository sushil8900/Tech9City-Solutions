// Nexaforge Company Website — Interactive Features

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initMobileMenu();
  initScrollAnimations();
  initSmoothScrolling();
  initContactForm();
  initParticles();
  initTypingHero();
});

// =====================
// Scroll Progress Bar
// =====================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const total = document.body.offsetHeight - window.innerHeight;
    bar.style.width = ((scrolled / total) * 100) + '%';
  });
}

// =====================
// Mobile Menu
// =====================
function initMobileMenu() {
  const btn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav#main-nav');
  if (!btn || !nav) return;

  btn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    btn.innerHTML = open ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    btn.setAttribute('aria-expanded', open);
  });

  // Close on nav link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      btn.innerHTML = '<i class="fas fa-bars"></i>';
      btn.setAttribute('aria-expanded', 'false');
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!btn.contains(e.target) && !nav.contains(e.target)) {
      nav.classList.remove('open');
      btn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });
}

// =====================
// Smooth Scrolling
// =====================
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.querySelector('header').offsetHeight + 20;
      window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
    });
  });
}

// =====================
// Scroll Animations
// =====================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll(
    '.service-card, .work-card, .about-stat-card, .tech-category, .contact-card, .hero-stats'
  ).forEach(el => observer.observe(el));
}

// =====================
// Hero Typing Effect
// =====================
function initTypingHero() {
  const badge = document.querySelector('.hero-badge');
  if (!badge) return;
  const phrases = [
    'Next-Gen Software Studio',
    'AI-First Engineering',
    'Full-Stack Excellence',
    'Scale Without Limits',
    'Tech9City Solutions'
  ];
  let current = 0;
  let charIdx = 0;
  let deleting = false;
  const icon = '<i class="fas fa-rocket"></i> ';

  function type() {
    const phrase = phrases[current];
    if (!deleting) {
      badge.innerHTML = icon + phrase.slice(0, ++charIdx);
      if (charIdx === phrase.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      badge.innerHTML = icon + phrase.slice(0, --charIdx);
      if (charIdx === 0) {
        deleting = false;
        current = (current + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 40 : 75);
  }
  setTimeout(type, 1000);
}

// =====================
// Contact Form
// =====================
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showNotification('Please fill in all required fields.', 'error');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification('Please enter a valid email address.', 'error');
      return;
    }

    // Simulate async submit
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      showNotification(`Thanks ${name}! We'll be in touch shortly.`, 'success');
      form.reset();
      btn.disabled = false;
      btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    }, 1200);
  });
}

// =====================
// Notification System
// =====================
function showNotification(message, type = 'info') {
  document.querySelector('.notification')?.remove();

  const icons = { success: 'fa-check-circle', error: 'fa-exclamation-circle', info: 'fa-info-circle' };
  const n = document.createElement('div');
  n.className = `notification ${type}`;
  n.innerHTML = `<i class="fas ${icons[type]}"></i><span>${message}</span>`;
  document.body.appendChild(n);

  setTimeout(() => {
    n.style.animation = 'slideOutRight 0.3s ease-in forwards';
    setTimeout(() => n.remove(), 320);
  }, 5000);
}

// =====================
// Canvas Particle Background
// =====================
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.style.cssText = `
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%;
    pointer-events: none; z-index: -1;
  `;
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let particles = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function spawn() {
    particles = Array.from({ length: 55 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.8 + 0.5,
      opacity: Math.random() * 0.4 + 0.1
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(14,165,233,${p.opacity})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  window.addEventListener('resize', () => { resize(); spawn(); });
  resize();
  spawn();
  draw();
}

// =====================
// Active nav highlight on scroll
// =====================
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const headerH = document.querySelector('header').offsetHeight;
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - headerH - 60) current = sec.id;
  });

  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === `#${current}`);
  });
});

console.log('%c⚡ Tech9City Solutions', 'font-size:22px;font-weight:800;color:#0ea5e9;');
console.log('%cBuilding scalable, intelligent products.', 'color:#94a3b8;font-size:13px;');
