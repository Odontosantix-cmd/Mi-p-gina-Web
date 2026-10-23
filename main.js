/**
 * Odonto Santyx - Consultorio Odontológico
 * Main JavaScript Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initStatCounters();
  initAppointmentForm();
  initScrollObserver();
});

/* 1. Navbar Scroll Effect */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* 2. Mobile Hamburger Drawer */
function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = hamburger.querySelector('i');
      if (navMenu.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = hamburger.querySelector('i');
        if (icon) {
          icon.classList.remove('fa-xmark');
          icon.classList.add('fa-bars');
        }
      });
    });
  }
}

/* 3. Animated Counter for Stats */
function initStatCounters() {
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const animateStats = () => {
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats || animated) return;

    const rect = heroStats.getBoundingClientRect();
    if (rect.top <= window.innerHeight && rect.bottom >= 0) {
      animated = true;
      statNumbers.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const duration = 2000;
        const stepTime = 30;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.innerText = target;
            clearInterval(timer);
          } else {
            counter.innerText = Math.ceil(current);
          }
        }, stepTime);
      });
    }
  };

  window.addEventListener('scroll', animateStats);
  animateStats(); // Run once in case visible on load
}

/* 4. Appointment Form -> WhatsApp Generator */
function initAppointmentForm() {
  const appointmentForm = document.getElementById('appointmentForm');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('userName').value.trim();
      const phone = document.getElementById('userPhone').value.trim();
      const service = document.getElementById('userService').value;
      const notes = document.getElementById('userNotes').value.trim();

      // Format WhatsApp Message
      let message = `¡Hola Odonto Santyx! 👋\n\nDeseo agendar una cita odontológica en Túquerres:\n`;
      message += `• *Nombre:* ${name}\n`;
      message += `• *Teléfono:* ${phone}\n`;
      message += `• *Tratamiento:* ${service}\n`;
      
      if (notes) {
        message += `• *Notas/Preferencia:* ${notes}\n`;
      }
      
      message += `\nQuedo atento(a) a su confirmación. ¡Muchas gracias!`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/573161726866?text=${encodedMessage}`;

      // Open WhatsApp in new tab
      window.open(whatsappUrl, '_blank');
    });
  }
}

/* 5. Smooth Reveal on Scroll */
function initScrollObserver() {
  const revealElements = document.querySelectorAll('.service-card, .feature-item, .gallery-card, .contact-info-card, .appointment-card');

  revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => observer.observe(el));
}
