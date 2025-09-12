/* js/script.js
   - smooth scrolling untuk anchor internal
   - navbar shadow saat scroll
   - simple fade-in when element enters viewport (gunakan .fade-in pada elemen)
   - kalkulator: logic untuk tugas-js.html
*/

// ===== Smooth scroll for same-page anchors (if any) =====
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  // ===== Navbar shadow on scroll =====
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 10) header.classList.add('shadow-lg');
      else header.classList.remove('shadow-lg');
    });
  }

  // ===== Fade-in using IntersectionObserver =====
  const faders = document.querySelectorAll('.fade-in');
  if (faders.length) {
    const obs = new IntersectionObserver((entries, obsInstance) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('opacity-100','translate-y-0');
          entry.target.classList.remove('opacity-0','translate-y-6');
          obsInstance.unobserve(entry.target);
        }
      });
    }, { threshold: 0.25 });

    faders.forEach(el => {
      el.classList.add('opacity-0','translate-y-6','transition','duration-700','ease-out');
      obs.observe(el);
    });
  }

  // ===== Kalkulator (tugas-js.html) =====
  const display = document.getElementById('display');
  const calcBtns = document.querySelectorAll('.calc-btn');
  const clearBtn = document.getElementById('clear');
  const equalsBtn = document.getElementById('equals');

  if (calcBtns && calcBtns.length) {
    calcBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const val = btn.getAttribute('data-value');
        // append symbol (for multiplication/division use js operators)
        display.value += val;
      });
    });

    if (clearBtn) clearBtn.addEventListener('click', () => display.value = '');
    if (equalsBtn) equalsBtn.addEventListener('click', () => {
      try {
        // caution: eval used only for simple calculator task
        const result = eval(display.value || "0");
        display.value = result;
      } catch (err) {
        display.value = 'Error';
        setTimeout(() => display.value = '', 1000);
      }
    });
  }

  // optional: console log
  console.log('Script loaded — portofolio ready.');
});