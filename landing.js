(() => {
  const whatsappNumber = '905469108052';
  const whatsappMessage = 'Merhaba, Liora Ortaca projesindeki son 4 daire için güncel fiyat ve kat planı bilgisi almak istiyorum.';
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
  const menuButton = document.querySelector('.menu-button');
  const mobileNav = document.querySelector('.mobile-nav');
  const whatsappWidget = document.getElementById('whatsappWidget');
  const whatsappDismiss = document.getElementById('whatsappDismiss');

  document.querySelectorAll('[data-whatsapp]').forEach((link) => {
    link.href = whatsappUrl;
  });

  menuButton?.addEventListener('click', () => {
    const isOpen = mobileNav?.classList.toggle('open') || false;
    menuButton.classList.toggle('open', isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuButton?.classList.remove('open');
    menuButton?.setAttribute('aria-expanded', 'false');
  }));

  window.setTimeout(() => whatsappWidget?.classList.add('is-visible'), 1400);
  whatsappDismiss?.addEventListener('click', () => {
    whatsappWidget?.classList.add('is-dismissed');
  });

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
  }

  const availabilityCounter = document.querySelector('[data-count]');
  const counterContainer = availabilityCounter?.closest('.availability-counter');
  if (availabilityCounter && counterContainer && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver(([entry], observer) => {
      if (!entry.isIntersecting) return;
      const target = Number(availabilityCounter.dataset.count);
      const startedAt = performance.now();
      const duration = 1100;
      const tick = (now) => {
        const progress = Math.min((now - startedAt) / duration, 1);
        availabilityCounter.textContent = String(Math.round((1 - Math.pow(1 - progress, 3)) * target));
        if (progress < 1) requestAnimationFrame(tick);
      };
      counterContainer.classList.add('is-counted');
      requestAnimationFrame(tick);
      observer.disconnect();
    }, { threshold: 0.45 });
    counterObserver.observe(counterContainer);
  } else if (availabilityCounter) {
    availabilityCounter.textContent = availabilityCounter.dataset.count || '4';
    counterContainer?.classList.add('is-counted');
  }
})();
