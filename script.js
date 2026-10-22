(() => {
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const themeButton = document.querySelector('.theme-toggle');
  const themeLabel = themeButton.querySelector('.theme-label');
  const themeIcon = themeButton.querySelector('.theme-icon');
  const intro = document.querySelector('#intro-screen');

  const dismissIntro = () => {
    if (!intro || !intro.classList.contains('is-active')) return;
    intro.classList.remove('is-active');
    intro.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('intro-active');
    window.setTimeout(() => intro.remove(), 550);
  };

  if (intro) {
    document.body.classList.add('intro-active');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const introDuration = reducedMotion ? 0 : 2700;
    const introTimer = window.setTimeout(dismissIntro, introDuration);
    intro.querySelector('.intro-skip').addEventListener('click', () => {
      window.clearTimeout(introTimer);
      dismissIntro();
    });
  }

  const applyTheme = (theme, saveChoice = false) => {
    const isDark = theme === 'dark';
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
    themeButton.setAttribute('aria-pressed', String(isDark));
    themeButton.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    themeLabel.textContent = isDark ? 'Light' : 'Dark';
    themeIcon.textContent = isDark ? '☼' : '◐';
    if (saveChoice) {
      try { localStorage.setItem('portfolio-theme', isDark ? 'dark' : 'light'); } catch (_) { /* Storage may be unavailable in private browsing. */ }
    }
  };

  try {
    if (localStorage.getItem('portfolio-theme') === 'dark') applyTheme('dark');
  } catch (_) { /* Keep the light theme when storage is unavailable. */ }

  themeButton.addEventListener('click', () => {
    const isDark = document.documentElement.dataset.theme === 'dark';
    applyTheme(isDark ? 'light' : 'dark', true);
  });

  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Open navigation' : 'Close navigation');
    nav.classList.toggle('open', !isOpen);
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuButton.setAttribute('aria-expanded', 'false');
      menuButton.setAttribute('aria-label', 'Open navigation');
      nav.classList.remove('open');
    });
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          activeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }
})();
