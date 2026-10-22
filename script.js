(() => {
  const reset = document.getElementById('resetView');
  const toast = document.getElementById('toast');
  let toastTimer;
  function notify(message) {
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
  }
  // Lightweight tilt interaction echoes the reference's draggable/explorable workspace.
  const tiltCards = [...document.querySelectorAll('.tilt-card')];
  const canTilt = window.matchMedia('(hover:hover) and (pointer:fine)').matches;
  if (canTilt) {
    tiltCards.forEach(card => {
      card.addEventListener('pointermove', event => {
        const r = card.getBoundingClientRect();
        const x = (event.clientX - r.left) / r.width - .5;
        const y = (event.clientY - r.top) / r.height - .5;
        card.style.transform = `perspective(900px) rotateX(${(-y * 2.2).toFixed(2)}deg) rotateY(${(x * 2.2).toFixed(2)}deg) translateY(-2px)`;
      });
      card.addEventListener('pointerleave', () => { card.style.transform = ''; });
    });
  }
  // Navigation feedback, similar to the small "area discovered" notification in the reference.
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      const name = link.textContent.trim().toLowerCase().replace(/^./, c => c.toUpperCase());
      notify(`${name} section discovered`);
    });
  });
  reset.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelectorAll('.tilt-card').forEach(card => card.style.transform = '');
    notify('View reset · back to the beginning');
  });
  // Show current section in the browser title for assistive context and a subtle active state.
  const navLinks = [...document.querySelectorAll('.nav-links a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => link.classList.toggle('active', link.hash === `#${entry.target.id}`));
      });
    }, { rootMargin: '-25% 0px -60% 0px' });
    sections.forEach(section => observer.observe(section));
  }
})();
