/**
 * SêniorCare - Main Javascript
 * Handles mobile navigation and scroll-reveal animations securely across all pages.
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Menu mobile ---- */
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('mainNav');

  if (toggle && nav) {
    const icon = toggle.querySelector('i');

    function closeMenu() {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menu de navegação');
      if (icon) {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    }

    function openMenu() {
      nav.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Fechar menu de navegação');
      if (icon) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      }
    }

    toggle.addEventListener('click', () => nav.classList.contains('open') ? closeMenu() : openMenu());
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && nav.classList.contains('open')) closeMenu();
    });
  }

  /* ---- Scroll reveal (respeita prefers-reduced-motion) ---- */
  const motionOK = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (motionOK) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  /* ---- Progress Bars (VivaBem) ---- */
  const bars = document.querySelectorAll('.progress-fill');
  if (bars.length > 0) {
    const barObserver = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.width = e.target.dataset.width || e.target.style.width;
          barObserver.unobserve(e.target);
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(b => barObserver.observe(b));
  }

});