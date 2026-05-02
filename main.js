// ─── FONTS ───
(function() {
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Nunito:wght@400;500;600;700;800;900&display=swap';
  document.head.appendChild(link);
})();

// ─── NAVIGATION ───
function buildNav(activePage) {
  const pages = [
    { label: 'Home',               href: 'index.html' },
    { label: 'Courses',            href: 'courses.html' },
    { label: 'Register',           href: 'register.html' },
    { label: 'Verify Certificate', href: 'verify.html' },
  ];
  return `
  <nav>
    <a href="index.html" class="nav-brand">
      <img src="logo.png" alt="Sovryx Tech" class="nav-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
      <div class="nav-brand-logo" style="display:none;"><img src="https://sovryxtech.com.np/logo.png" alt="Sovryx Tech Logo" style="width:32px;height:32px;"></div>
      <div class="nav-brand-text">
        <span>SOVRYX TECH</span>
        <span>LEARN PORTAL</span>
      </div>
    </a>
    <ul class="nav-links">
      ${pages.map(p =>
        `<li><a href="${p.href}" class="${activePage === p.label ? 'active' : ''}">${p.label}</a></li>`
      ).join('')}
      <li><a href="register.html" class="nav-cta">Enroll Now &rarr;</a></li>
    </ul>
    <div class="nav-hamburger" onclick="toggleMenu()" id="hamburger">
      <span></span><span></span><span></span>
    </div>
  </nav>
  <div class="mobile-menu" id="mobileMenu">
    ${pages.map(p => `<a href="${p.href}">${p.label}</a>`).join('')}
    <a href="register.html" style="background:linear-gradient(135deg,#FF6B00,#E05A00);border-radius:14px;margin-top:8px;">Enroll Now &rarr;</a>
  </div>`;
}

function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}

// ─── FOOTER ───
function buildFooter() {
  return `
  <footer>
    <div class="container">
      <div class="footer-grid">
        <div class="footer-brand">
          <a href="index.html" class="nav-brand" style="text-decoration:none;">
            <img src="logo.png" alt="Sovryx Tech" class="nav-logo" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
            <div class="nav-brand-logo" style="display:none;"><img src="logo.png" alt="Sovryx Tech Logo" style="width:32px;height:32px;"></div>
            <div class="nav-brand-text">
              <span style="font-family:'Bebas Neue',cursive;font-size:18px;color:white;letter-spacing:2px;">SOVRYX TECH</span>
              <span style="font-size:10px;color:#FF6B00;font-weight:700;letter-spacing:3px;">LEARN PORTAL</span>
            </div>
          </a>
          <p>Professional IT training &amp; workshops in Biratnagar, Nepal. Learn real skills, build real projects, earn real certificates.</p>
          <div class="social-links">
            <a class="social-link" href="https://sovryxtech.com.np" target="_blank" title="Website">&#127760;</a>
            <a class="social-link" href="https://wa.me/9779762948720" target="_blank" title="WhatsApp">&#128172;</a>
            <a class="social-link" href="tel:9762948720" title="Call">&#128222;</a>
          </div>
        </div>
        <div class="footer-col">
          <h4>QUICK LINKS</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="courses.html">All Courses</a></li>
            <li><a href="register.html">Register</a></li>
            <li><a href="verify.html">Verify Certificate</a></li>
            <li><a href="https://sovryxtech.com.np" target="_blank">Main Website &#8599;</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>COURSES</h4>
          <ul>
            <li><a href="register.html?course=photoshop">Photoshop Workshop</a></li>
            <li><a href="courses.html">Web Design</a></li>
            <li><a href="courses.html">Python Programming</a></li>
            <li><a href="courses.html">IoT &amp; Arduino</a></li>
            <li><a href="courses.html">More Coming Soon</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>CONTACT</h4>
          <div class="footer-contact">
            <p>&#128205; Biratnagar, Nepal</p>
            <p>&#128222; 9762948720 / 9767115406</p>
            <p>&#128231; support@sovryxtech.info.np</p>
            <p>&#127760; sovryxtech.info.np</p>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 Sovryx Tech Pvt. Ltd. &mdash; <a href="https://sovryxtech.com.np" target="_blank">sovryxtech.com.np</a></p>
        <p style="color:rgba(255,255,255,0.3);font-size:12px;font-weight:600;">All rights reserved.</p>
      </div>
    </div>
  </footer>`;
}

// ─── INJECT NAV & FOOTER ───
function injectLayout(activePage) {
  const navEl = document.getElementById('navContainer');
  if (navEl) navEl.innerHTML = buildNav(activePage);
  const footerEl = document.getElementById('footerContainer');
  if (footerEl) footerEl.innerHTML = buildFooter();
}

// ─── FORM HANDLER (Formspree Compatible) ───
class FormHandler {
  constructor(formId, options = {}) {
    this.form = document.getElementById(formId);
    this.messageEl = options.messageEl || 'formMessage';
    this.loadingText = options.loadingText || 'Submitting...';
    this.successText = options.successText || 'Thank you! We\'ll contact you within 24 hours.';
    this.errorText = options.errorText || 'Something went wrong. Please try again or contact us directly.';

    if (this.form) {
      this.init();
    }
  }

  init() {
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.submitForm();
    });
  }

  async submitForm() {
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = this.loadingText;

    try {
      const formData = new FormData(this.form);

      // For Formspree, we can use fetch or just let the form submit naturally
      // This implementation uses fetch for better control
      const response = await fetch(this.form.action, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        this.showMessage('success', this.successText);
        this.form.reset();
        // Optional: redirect after success
        if (this.form.querySelector('input[name="_next"]')) {
          setTimeout(() => {
            window.location.href = this.form.querySelector('input[name="_next"]').value;
          }, 2000);
        }
      } else {
        throw new Error(data.error || 'Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      this.showMessage('error', this.errorText);
    } finally {
      // Reset button state
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
    }
  }

  showMessage(type, text) {
    const messageEl = document.getElementById(this.messageEl);
    if (messageEl) {
      messageEl.className = `form-message ${type}`;
      messageEl.textContent = text;
      messageEl.style.display = 'block';

      // Auto-hide after 5 seconds
      setTimeout(() => {
        messageEl.style.display = 'none';
      }, 5000);
    }
  }
}

// Initialize forms when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize registration form
  new FormHandler('registrationForm', {
    messageEl: 'formMessage',
    loadingText: 'Registering...',
    successText: 'Registration successful! We\'ll contact you within 24 hours.',
    errorText: 'Registration failed. Please try again or contact us directly.'
  });

  // Scroll reveal functionality
  const reveals = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), i * 80);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.08 });
  reveals.forEach(el => observer.observe(el));
});
