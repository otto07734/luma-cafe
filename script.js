/**
 * LUMA Cafe — Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // ================================
  // Navigation Scroll Effect
  // ================================
  const nav = document.querySelector('.nav');
  const heroSection = document.querySelector('.hero');
  
  const handleNavScroll = () => {
    if (window.scrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  
  window.addEventListener('scroll', handleNavScroll);
  handleNavScroll(); // Initial check

  // ================================
  // Mobile Menu Toggle
  // ================================
  const navToggle = document.querySelector('.nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  let menuOpen = false;

  navToggle.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active', menuOpen);
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (menuOpen) {
      spans[0].style.transform = 'rotate(45deg) translate(4px, 4px)';
      spans[1].style.transform = 'rotate(-45deg) translate(1px, -1px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.transform = '';
    }
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuOpen = false;
      mobileMenu.classList.remove('active');
      document.body.style.overflow = '';
      navToggle.querySelectorAll('span').forEach(span => {
        span.style.transform = '';
      });
    });
  });

  // ================================
  // Smooth Scroll for Anchor Links
  // ================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ================================
  // Fade In on Scroll Animation
  // ================================
  const fadeElements = document.querySelectorAll('.section-label, .section-title, .about-text, .about-image, .menu-category, .hours-content, .contact-content');
  
  fadeElements.forEach(el => {
    el.classList.add('fade-in');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeElements.forEach(el => {
    fadeObserver.observe(el);
  });

  // ================================
  // Gallery Lazy Loading
  // ================================
  const galleryImages = document.querySelectorAll('.gallery-item img');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  galleryImages.forEach(img => {
    imageObserver.observe(img);
  });

  // ================================
  // Newsletter Form
  // ================================
  const newsletterForm = document.querySelector('.newsletter-form');
  
  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = newsletterForm.querySelector('input');
    const button = newsletterForm.querySelector('button');
    
    // Simple validation
    if (input.value && input.checkValidity()) {
      button.textContent = 'Thank you!';
      button.disabled = true;
      input.disabled = true;
      
      // Reset after 3 seconds
      setTimeout(() => {
        button.textContent = 'Subscribe';
        button.disabled = false;
        input.disabled = false;
        input.value = '';
      }, 3000);
    }
  });

  // ================================
  // Parallax Effect on Hero
  // ================================
  const heroVideo = document.querySelector('.hero-video');
  
  if (heroVideo && window.innerWidth > 768) {
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      const rate = scrolled * 0.3;
      heroVideo.style.transform = `translateY(${rate}px)`;
    });
  }

  // ================================
  // Current Year for Copyright
  // ================================
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    footerCopy.textContent = footerCopy.textContent.replace('2026', new Date().getFullYear());
  }

  // ================================
  // Preloader (optional enhancement)
  // ================================
  window.addEventListener('load', () => {
    document.body.classList.add('loaded');
  });
});

// ================================
// Console Easter Egg
// ================================
console.log('%c☀️ LUMA', 'font-size: 24px; font-weight: bold; color: #C4A77D;');
console.log('%cLight in every cup', 'font-size: 12px; font-style: italic; color: #8B8178;');
