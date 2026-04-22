/* HEAD SPA — Main JS — v2 */
document.addEventListener('DOMContentLoaded', () => {

  /* ---- Nav scroll ---- */
  const nav = document.querySelector('.nav');
  const links = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');

  const onScroll = () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    const y = window.scrollY + window.innerHeight / 3;
    sections.forEach(s => {
      const top = s.offsetTop - 100;
      const id = s.getAttribute('id');
      if (y >= top && y < top + s.offsetHeight) {
        links.forEach(l => {
          l.classList.toggle('active', l.getAttribute('href') === '#' + id);
        });
      }
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ---- */
  const burger = document.querySelector('.nav__hamburger');
  const menu = document.querySelector('.nav__menu');
  const overlay = document.querySelector('.nav__overlay');

  const closeMenu = () => {
    burger.classList.remove('active');
    menu.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  burger?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    burger.classList.toggle('active');
    overlay.classList.toggle('active');
    document.body.style.overflow = open ? 'hidden' : '';
  });
  overlay?.addEventListener('click', closeMenu);
  document.querySelectorAll('.nav__menu a').forEach(a => a.addEventListener('click', closeMenu));

  /* ---- Smooth scroll ---- */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 70;
      window.scrollTo({ top: target.offsetTop - navH, behavior: 'smooth' });
    });
  });

  /* ---- Reveal on scroll ---- */
  const revealEls = document.querySelectorAll('.reveal, .reveal-l, .reveal-r');
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });
  revealEls.forEach(el => io.observe(el));

  /* ---- Footer year ---- */
  const yr = document.querySelector('.footer__year');
  if (yr) yr.textContent = new Date().getFullYear();
});
