/**
 * DR. RAJENDRASINGH PARDESHI - OFFICIAL APPLICATION ENGINE
 * Domain: rajendrasinghpardeshi.com
 * Contact: +91 7796211575 | info@rajendrasinghpardeshi.com
 * Reference Initiative: menopauseosteoporosisclinic.com
 */

document.addEventListener('DOMContentLoaded', () => {

  // ── Header Scroll Behavior ──────────────────────────────────────────
  const header = document.getElementById('mainHeader');
  
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', handleHeaderScroll, { passive: true });
  handleHeaderScroll();

  // ── Mobile Navigation Toggle ────────────────────────────────────────
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mainNav.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      
      mobileToggle.innerHTML = isExpanded
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });

    // Close mobile nav on link click
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        }
      });
    });
  }

  // ── Active Navigation State Tracking ─────────────────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.25,
    rootMargin: '-80px 0px -40% 0px'
  });

  sections.forEach(sec => navObserver.observe(sec));

  // ── Smooth Scrolling for In-Page Anchor Links ────────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = header ? header.offsetHeight : 80;
        const targetPos = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });

  // ── Tab Navigation for Professional Profile / Credentials ────────────
  const tabButtons = document.querySelectorAll('.credential-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetTab = button.getAttribute('data-tab');

      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabPanes.forEach(pane => pane.classList.remove('active'));

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // ── Scroll Reveal System ─────────────────────────────────────────────
  const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger-children');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ── Back to Top Button ───────────────────────────────────────────────
  const backToTopBtn = document.getElementById('fabTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 450 ? 'flex' : 'none';
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Honest Form Submission Handler (Email Fallback) ───────────────────
  const contactForm = document.getElementById('contactForm');
  const formStatusNote = document.getElementById('formStatusNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const area = formData.get('interest') || 'General Clinical Focus';
      const message = formData.get('message') || 'No additional message provided.';
      const rcsConsent = formData.get('rcs_consent') === 'yes' ? 'Granted' : 'Not specified';

      const subject = `Consultation Enquiry: Dr. Rajendrasingh Pardeshi - ${name}`;
      const emailBody = [
        `Name: ${name}`,
        `Contact Phone: ${phone}`,
        `Email: ${email}`,
        `Area of Clinical Concern: ${area}`,
        `Message / Details:`,
        `${message}`,
        ``,
        `Communication via RCS Consent: ${rcsConsent}`,
        `Sent via rajendrasinghpardeshi.com official contact form.`
      ].join('\n');

      const mailtoLink = `mailto:info@rajendrasinghpardeshi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      // Inform the user honestly without fake success state
      if (formStatusNote) {
        formStatusNote.innerHTML = '<span style="color: #0d766e; font-weight: 600;">Opening your email client with your prefilled consultation details. Please send the email to complete your enquiry.</span>';
      }

      window.location.href = mailtoLink;
    });
  }

  // ── Verified Number Counter Animation ────────────────────────────────
  const counterCards = document.querySelectorAll('.metric-card');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const valElem = entry.target.querySelector('.metric-value');
        if (valElem) {
          const rawText = valElem.textContent.trim();
          const match = rawText.match(/^([\d,]+)/);
          if (match) {
            const targetNum = parseInt(match[1].replace(/,/g, ''), 10);
            const suffix = rawText.replace(match[1], '');
            const duration = 1600;
            const startTime = performance.now();

            function easeOutQuart(t) {
              return 1 - Math.pow(1 - t, 4);
            }

            function updateCounter(currentTime) {
              const elapsed = currentTime - startTime;
              const progress = Math.min(elapsed / duration, 1);
              const currentVal = Math.round(easeOutQuart(progress) * targetNum);
              valElem.textContent = currentVal.toLocaleString() + suffix;

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              }
            }

            valElem.textContent = '0' + suffix;
            requestAnimationFrame(updateCounter);
          }
        }
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  counterCards.forEach(card => counterObserver.observe(card));

});
