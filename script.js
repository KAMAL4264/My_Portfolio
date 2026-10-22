(() => {
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');
  const progress = document.getElementById('progress');
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const open = menuToggle.getAttribute('aria-expanded') !== 'true';
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Close navigation menu' : 'Open navigation menu');
      navLinks.classList.toggle('open', open);
    });
    navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }));
    document.addEventListener('click', event => {
      if (!navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const amount = max > 0 ? (window.scrollY / max) * 100 : 0;
    if (progress) progress.style.width = `${amount}%`;
  };
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }

  const rotatingText = document.getElementById('rotatingText');
  const phrases = ['cloud & code', 'software development', 'machine learning'];
  if (rotatingText && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let index = 0;
    window.setInterval(() => {
      index = (index + 1) % phrases.length;
      rotatingText.animate([{ opacity: 0, transform: 'translateY(5px)' }, { opacity: 1, transform: 'translateY(0)' }], { duration: 380, easing: 'ease-out' });
      rotatingText.textContent = phrases[index];
    }, 2600);
  }
})();