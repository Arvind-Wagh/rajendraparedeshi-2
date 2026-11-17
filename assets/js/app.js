

document.addEventListener('DOMContentLoaded', () => {
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
  const mobileToggle = document.getElementById('mobileMenuToggle');
  const mainNav = document.getElementById('mainNav');

  if (mobileToggle && mainNav) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mainNav.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      mobileToggle.setAttribute('aria-label', isExpanded ? 'Close menu' : 'Open menu');
      
      mobileToggle.innerHTML = isExpanded
        ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>'
        : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
    });
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('active')) {
          mainNav.classList.remove('active');
          mobileToggle.setAttribute('aria-expanded', 'false');
          mobileToggle.setAttribute('aria-label', 'Open menu');
          mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>';
        }
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && mainNav.classList.contains('active')) {
        mainNav.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        mobileToggle.setAttribute('aria-label', 'Open menu');
        mobileToggle.focus();
      }
    });
  }
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
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.history.pushState(null, '', targetId);
        const headerOffset = header ? header.offsetHeight : 80;
        const targetPos = targetElement.getBoundingClientRect().top + window.scrollY - headerOffset - 12;
        window.scrollTo({
          top: targetPos,
          behavior: 'smooth'
        });
      }
    });
  });
  const tabButtons = document.querySelectorAll('.credential-tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  function activateTab(button) {
      const targetTab = button.getAttribute('data-tab');

      tabButtons.forEach(btn => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
        btn.setAttribute('tabindex', '-1');
      });
      tabPanes.forEach(pane => {
        pane.classList.remove('active');
        pane.setAttribute('hidden', '');
      });

      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      button.setAttribute('tabindex', '0');
      const activePane = document.getElementById(`tab-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
        activePane.removeAttribute('hidden');
      }
  }

  tabButtons.forEach((button, index) => {
    button.addEventListener('click', () => activateTab(button));
    button.addEventListener('keydown', (event) => {
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabButtons.length;
      else if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabButtons.length) % tabButtons.length;
      else if (event.key === 'Home') nextIndex = 0;
      else if (event.key === 'End') nextIndex = tabButtons.length - 1;
      else return;
      event.preventDefault();
      tabButtons[nextIndex].focus();
      activateTab(tabButtons[nextIndex]);
    });
  });
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
  const backToTopBtn = document.getElementById('fabTop');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      backToTopBtn.style.display = window.scrollY > 450 ? 'flex' : 'none';
    }, { passive: true });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  const contactForm = document.getElementById('contactForm');
  const formStatusNote = document.getElementById('formStatusNote');

  if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();
      
      const nameInput = contactForm.elements.namedItem('name');
      const phoneInput = contactForm.elements.namedItem('phone');
      nameInput.setCustomValidity(nameInput.value.trim().length < 2 ? 'Please enter your name.' : '');
      const phoneDigits = phoneInput.value.replace(/\D/g, '');
      phoneInput.setCustomValidity(phoneDigits.length < 7 || phoneDigits.length > 15 ? 'Enter a phone number with 7 to 15 digits.' : '');
      if (!contactForm.reportValidity()) return;

      const formData = new FormData(contactForm);
      const name = formData.get('name') || '';
      const email = formData.get('email') || '';
      const phone = formData.get('phone') || '';
      const area = formData.get('interest') || 'General Clinical Focus';
      const message = formData.get('message') || 'No additional message provided.';
      const messagingConsent = formData.get('rcs_consent') === 'yes' ? 'Yes' : 'No';

      const subject = `Consultation Enquiry: Dr. Rajendrasingh Pardeshi - ${name}`;
      const emailBody = [
        `Name: ${name}`,
        `Contact Phone: ${phone}`,
        `Email: ${email}`,
        `Area of Clinical Concern: ${area}`,
        `Message / Details:`,
        `${message}`,
        ``,
        `Optional SMS/RCS/WhatsApp consent: ${messagingConsent}`,
        `Prepared by the website enquiry form. This email has not been sent by the website.`
      ].join('\n');

      const mailtoLink = `mailto:info@rajendrasinghpardeshi.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
      
      if (formStatusNote) {
        formStatusNote.textContent = 'Your email application should open with a draft. Review it and send it to complete your enquiry. The website has not sent your message.';
      }

      window.location.assign(mailtoLink);
    });
  }

});
