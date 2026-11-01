/**
 * SHIVAM.EXE — 3D IMMERSIVE DEVELOPER PORTFOLIO
 * Animations, UI Physics, Interactions, and Audio Synthesizer
 */

(function () {
  'use strict';

  // Mark document as JS-ready for progressive enhancement
  try {
    document.documentElement.classList.add('js-ready');
  } catch (e) {}

  // State
  const state = {
    audioEnabled: false,
    audioCtx: null,
    prefersReducedMotion: window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false
  };

  /* ==========================================================================
     1. Web Audio API Sci-Fi Synthesizer (Zero External Audio Files)
     ========================================================================== */
  function initAudio() {
    try {
      if (!state.audioCtx && (window.AudioContext || window.webkitAudioContext)) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        state.audioCtx = new AudioCtx();
      }
      if (state.audioCtx && state.audioCtx.state === 'suspended') {
        state.audioCtx.resume();
      }
    } catch (e) {}
  }

  function playSynthBlip(type = 'hover') {
    if (!state.audioEnabled || !state.audioCtx) return;
    try {
      const now = state.audioCtx.currentTime;
      const osc = state.audioCtx.createOscillator();
      const gain = state.audioCtx.createGain();

      osc.connect(gain);
      gain.connect(state.audioCtx.destination);

      if (type === 'hover') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(620, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.05);
        gain.gain.setValueAtTime(0.02, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
        osc.start(now);
        osc.stop(now + 0.06);
      } else if (type === 'click') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(880, now);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.32);
      }
    } catch (e) {
      // Audio fallback silent
    }
  }

  // Audio Toggle Button
  const soundToggleBtn = document.getElementById('sound-toggle');
  const soundWaves = document.getElementById('sound-waves');

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      state.audioEnabled = !state.audioEnabled;
      soundToggleBtn.setAttribute('aria-pressed', state.audioEnabled);
      if (soundWaves) {
        soundWaves.style.display = state.audioEnabled ? 'block' : 'none';
      }
      soundToggleBtn.style.color = state.audioEnabled ? 'var(--secondary-accent)' : 'var(--text-muted)';
      if (state.audioEnabled) {
        playSynthBlip('success');
      }
    });

    if (soundWaves) {
      soundWaves.style.display = 'none';
    }
  }

  /* ==========================================================================
     2. Custom Cyber Cursor (Desktop Only)
     ========================================================================== */
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');

  if (cursor && follower && !state.prefersReducedMotion && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let mouseX = -100;
    let mouseY = -100;
    let followerX = -100;
    let followerY = -100;
    let hasMoved = false;

    window.addEventListener('mousemove', (e) => {
      if (!hasMoved) {
        hasMoved = true;
        document.body.classList.add('cursor-active');
      }
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.18;
      followerY += (mouseY - followerY) * 0.18;
      follower.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      requestAnimationFrame(animateFollower);
    }
    requestAnimationFrame(animateFollower);

    // Add hover states to interactive targets
    const interactiveSelectors = 'a, button, input, textarea, .project-card, .metric-card, .timeline-card, canvas';
    document.querySelectorAll(interactiveSelectors).forEach((el) => {
      el.addEventListener('mouseenter', () => {
        document.body.classList.add('cursor-hover');
        playSynthBlip('hover');
      });
      el.addEventListener('mouseleave', () => {
        document.body.classList.remove('cursor-hover');
      });
      el.addEventListener('click', () => {
        playSynthBlip('click');
      });
    });
  }

  /* ==========================================================================
     3. Scroll Header State & Navigation
     ========================================================================== */
  const header = document.getElementById('cyber-header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function handleScroll() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    sections.forEach((section) => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 120;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  /* ==========================================================================
     4. Mobile Navigation Menu Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      mobileToggle.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      playSynthBlip('click');
    });

    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ==========================================================================
     5. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  if ('IntersectionObserver' in window && !state.prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.05,
        rootMargin: '0px 0px 50px 0px'
      }
    );

    revealElements.forEach((el, index) => {
      el.style.transitionDelay = `${(index % 4) * 0.06}s`;
      revealObserver.observe(el);
    });
  } else {
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     6. 3D Card Hover Physics (Tilt & Glare)
     ========================================================================== */
  const tiltCard = document.getElementById('profile-tilt-card');
  const projectCards = document.querySelectorAll('.project-card');

  function applyTiltPhysics(card) {
    if (!card || state.prefersReducedMotion || window.innerWidth < 768) return;

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }

  applyTiltPhysics(tiltCard);
  projectCards.forEach(applyTiltPhysics);

  /* ==========================================================================
     7. Email Clipboard Copy Action
     ========================================================================== */
  const copyBtn = document.getElementById('copy-email-trigger');
  const displayEmail = document.getElementById('display-email');

  if (copyBtn && displayEmail) {
    copyBtn.addEventListener('click', () => {
      const email = displayEmail.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'COPIED!';
        copyBtn.style.background = '#10B981';
        copyBtn.style.color = '#ffffff';
        playSynthBlip('success');

        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.background = '';
          copyBtn.style.color = '';
        }, 2200);
      }).catch(() => {
        window.location.href = `mailto:${email}`;
      });
    });
  }

  /* ==========================================================================
     8. Terminal Contact Form Dispatch
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');

  if (contactForm && formStatus) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const subject = document.getElementById('contact-subject').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !message) {
        formStatus.style.display = 'block';
        formStatus.style.color = '#EF4444';
        formStatus.textContent = '[ERROR: ALL REQUIRED PARAMETERS MUST BE SATISFIED]';
        return;
      }

      formStatus.style.display = 'block';
      formStatus.style.color = 'var(--secondary-accent)';
      formStatus.textContent = '[TRANSMITTING PAYLOAD VIA USER MAIL CLIENT...]';
      playSynthBlip('success');

      const mailtoLink = `mailto:shivams97547@gmail.com?subject=${encodeURIComponent(`[SHIVAM.EXE] ${subject || 'New Portfolio Inquiry'}`)}&body=${encodeURIComponent(`Sender Name: ${name}\nSender Email: ${email}\n\nMessage Payload:\n${message}`)}`;

      setTimeout(() => {
        window.location.href = mailtoLink;
        formStatus.style.color = '#10B981';
        formStatus.textContent = '[TRANSMISSION DISPATCHED SUCCESSFULLY // CHECK YOUR MAIL CLIENT]';
        contactForm.reset();
      }, 700);
    });
  }

})();
