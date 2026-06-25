/* ================================================
   PREMIUM PORTFOLIO - NAWAZ VK
   JavaScript - Animations & Interactions
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initLoader();
  initParticles();
  initMouseSpotlight();
  initNavbar();
  initTypingEffect();
  initScrollReveal();
  initSkillBars();
  initProjectFilter();
  initCertificateModal();
  initContactForm();
  initScrollProgress();
  initBackToTop();
  initMagneticButtons();
  initCounters();
});

/* ========== LOADER ========== */
function initLoader() {
  const loader = document.querySelector('.page-transition');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 500);
  }
}

/* ========== PARTICLE BACKGROUND ========== */
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  const particleCount = window.innerWidth < 768 ? 30 : 80;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.5 + 0.2
    };
  }

  function initParticleArray() {
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(139, 92, 246, ${particle.opacity})`;
      ctx.fill();

      // Draw connections
      particles.forEach((p2, j) => {
        if (i !== j) {
          const dx = particle.x - p2.x;
          const dy = particle.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(139, 92, 246, ${0.1 * (1 - dist / 150)})`;
            ctx.stroke();
          }
        }
      });

      // Update position
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      // Boundary check
      if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  initParticleArray();
  drawParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticleArray();
  });
}

/* ========== MOUSE SPOTLIGHT ========== */
function initMouseSpotlight() {
  const spotlight = document.querySelector('.mouse-spotlight');
  if (!spotlight) return;

  let mouseX = 0;
  let mouseY = 0;
  let currentX = 0;
  let currentY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animate() {
    const ease = 0.1;
    currentX += (mouseX - currentX) * ease;
    currentY += (mouseY - currentY) * ease;

    spotlight.style.left = currentX + 'px';
    spotlight.style.top = currentY + 'px';

    requestAnimationFrame(animate);
  }

  animate();
}

/* ========== NAVBAR ========== */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  // Scroll effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }

  // Set active link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

/* ========== TYPING EFFECT ========== */
function initTypingEffect() {
  const typingElement = document.querySelector('.typing-text');
  if (!typingElement) return;

  const phrases = [
    'Web Developer',
    'Problem Solver',
    'Tech Enthusiast',
    'Prompt Engineering Learner',
    'Future Software Engineer'
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 50;
    } else {
      typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      typingSpeed = 2000;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  type();
}

/* ========== SCROLL REVEAL ========== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));
}

/* ========== SKILL BARS ANIMATION ========== */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-progress');

  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '0';
        bar.style.width = width + '%';
        skillObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => skillObserver.observe(bar));
}

/* ========== PROJECT FILTER ========== */
function initProjectFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projects = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.dataset.filter;

      projects.forEach(project => {
        const projectCategory = project.dataset.category;

        if (filterValue === 'all' || projectCategory === filterValue) {
          project.style.display = 'block';
          project.style.animation = 'fadeInUp 0.5s ease forwards';
        } else {
          project.style.display = 'none';
        }
      });
    });
  });
}

/* ========== CERTIFICATE MODAL ========== */
function initCertificateModal() {
  const certificates = document.querySelectorAll('.certificate-card');
  const modal = document.querySelector('.modal-overlay');
  const modalContent = modal?.querySelector('.modal-content');
  const modalClose = document.querySelector('.modal-close');

  certificates.forEach(cert => {
    cert.addEventListener('click', () => {
      const imgSrc = cert.querySelector('.certificate-image')?.src;
      const title = cert.querySelector('.certificate-title')?.textContent;
      const issuer = cert.querySelector('.certificate-issuer')?.textContent;

      if (modal && imgSrc) {
        modalContent.innerHTML = `
          <img src="${imgSrc}" alt="${title}" style="max-width: 100%; max-height: 85vh; border-radius: 12px;">
          <div style="position: absolute; bottom: 20px; left: 20px; right: 20px; padding: 15px; background: rgba(5, 8, 22, 0.9); border-radius: 8px; backdrop-filter: blur(10px);">
            <h4 style="font-size: 1rem; margin-bottom: 5px;">${title || 'Certificate'}</h4>
            <p style="font-size: 0.85rem; color: rgba(255, 255, 255, 0.6);">${issuer || ''}</p>
          </div>
        `;

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  function closeModal() {
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = '';
    }
  }
}

/* ========== CONTACT FORM ========== */
function initContactForm() {
  const form = document.querySelector('.contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset errors
    const formGroups = form.querySelectorAll('.form-group');
    formGroups.forEach(group => group.classList.remove('error'));

    // Validate
    let isValid = true;
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const subject = form.querySelector('#subject');
    const message = form.querySelector('#message');

    if (!name.value.trim()) {
      showError(name, 'Please enter your name');
      isValid = false;
    }

    if (!isValidEmail(email.value)) {
      showError(email, 'Please enter a valid email address');
      isValid = false;
    }

    if (!subject.value.trim()) {
      showError(subject, 'Please enter a subject');
      isValid = false;
    }

    if (!message.value.trim()) {
      showError(message, 'Please enter your message');
      isValid = false;
    }

    if (isValid) {
      // Show success message
      const successMsg = form.querySelector('.form-success');
      if (successMsg) {
        successMsg.classList.add('show');
        form.reset();

        setTimeout(() => {
          successMsg.classList.remove('show');
        }, 5000);
      }
    }
  });

  function showError(input, message) {
    const formGroup = input.closest('.form-group');
    if (formGroup) {
      formGroup.classList.add('error');
      const errorEl = formGroup.querySelector('.form-error');
      if (errorEl) errorEl.textContent = message;
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}

/* ========== SCROLL PROGRESS ========== */
function initScrollProgress() {
  const progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) return;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    progressBar.style.width = progress + '%';
  });
}

/* ========== BACK TO TOP ========== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* ========== MAGNETIC BUTTONS ========== */
function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll('.btn-magnetic');

  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
}

/* ========== ANIMATED COUNTERS ========== */
function initCounters() {
  const counters = document.querySelectorAll('.counter');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseInt(counter.dataset.target);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
          current += increment;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target + '+';
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, {
    threshold: 0.5
  });

  counters.forEach(counter => counterObserver.observe(counter));
}

/* ========== SMOOTH PAGE TRANSITIONS ========== */
function navigateTo(url) {
  const transition = document.querySelector('.page-transition');
  if (transition) {
    transition.classList.remove('hidden');
    setTimeout(() => {
      window.location.href = url;
    }, 500);
  } else {
    window.location.href = url;
  }
}

/* ========== CARD GLOW EFFECT ========== */
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.left = x - 100 + 'px';
      glow.style.top = y - 100 + 'px';
      glow.style.opacity = '0.15';
    }
  });

  card.addEventListener('mouseleave', () => {
    const glow = card.querySelector('.card-glow');
    if (glow) {
      glow.style.opacity = '0';
    }
  });
});

/* ========== PARALLAX SCROLL ========== */
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  document.querySelectorAll('.parallax').forEach(element => {
    const speed = element.dataset.speed || 0.5;
    element.style.transform = `translateY(${scrollY * speed}px)`;
  });
});

/* ========== KEYBOARD NAVIGATION ========== */
document.addEventListener('keydown', (e) => {
  // Press 'Escape' to close modals/menus
  if (e.key === 'Escape') {
    const modal = document.querySelector('.modal-overlay.active');
    if (modal) modal.classList.remove('active');

    const navMenu = document.querySelector('.nav-menu.active');
    const navToggle = document.querySelector('.nav-toggle');
    if (navMenu) {
      navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('active');
    }
  }
});

/* ========== CSS ANIMATIONS KEYFRAMES ========== */
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;
document.head.appendChild(style);
