(() => {
  const copy = {
    tr: {
      title: 'Gizlilik ve<br /><em>Çerez Politikası</em>',
      summary: 'Verilerinize saygı duyuyor; ölçümleme tercihinizi açık, geri alınabilir ve güvenli tutuyoruz.',
      updated: 'Son güncelleme: 26 Temmuz 2026',
      home: 'Ana Sayfa <span>↗</span>',
      returnHome: 'Projeye dön',
      cookieSettings: 'Çerez Tercihleri',
      consentTitle: 'Gizliliğiniz sizin seçiminiz',
      consentText: 'Site performansını ve reklam dönüşümlerini ölçmek için yalnızca izninizle Analytics kullanırız.',
      privacy: 'Gizlilik ve Çerezler',
      reject: 'Reddet',
      accept: 'Kabul Et'
    },
    en: {
      title: 'Privacy &amp;<br /><em>Cookie Policy</em>',
      summary: 'We respect your data and keep your measurement choice clear, reversible and secure.',
      updated: 'Last updated: 26 July 2026',
      home: 'Home <span>↗</span>',
      returnHome: 'Back to project',
      cookieSettings: 'Cookie Preferences',
      consentTitle: 'Your privacy, your choice',
      consentText: 'We use Analytics only with your permission to measure site performance and advertising conversions.',
      privacy: 'Privacy & Cookies',
      reject: 'Reject',
      accept: 'Accept'
    }
  };

  const buttons = document.querySelectorAll('[data-language]');
  const setLanguage = (language, updateUrl = false) => {
    const selected = language === 'en' ? 'en' : 'tr';
    document.documentElement.lang = selected;
    document.querySelectorAll('[data-language-content]').forEach((article) => {
      article.hidden = article.dataset.languageContent !== selected;
    });
    document.querySelectorAll('[data-privacy-i18n]').forEach((element) => {
      const value = copy[selected][element.dataset.privacyI18n];
      if (value) element.innerHTML = value;
    });
    document.querySelectorAll('[data-home-link]').forEach((link) => {
      const localPreview = ['127.0.0.1', 'localhost', '::1'].includes(window.location.hostname);
      link.href = selected === 'en' ? (localPreview ? '/en/index.html' : '/en') : '/';
    });
    document.querySelectorAll('[data-privacy-self]').forEach((link) => {
      const localPreview = ['127.0.0.1', 'localhost', '::1'].includes(window.location.hostname);
      const privacyPath = localPreview ? '/privacy.html' : '/privacy';
      link.href = selected === 'en' ? `${privacyPath}?lang=en` : privacyPath;
    });
    buttons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === selected)));
    try { window.localStorage.setItem('liora-language', selected); } catch {}
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (selected === 'en') url.searchParams.set('lang', 'en');
      else url.searchParams.delete('lang');
      window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
    }
    window.dispatchEvent(new CustomEvent('liora:language-change', { detail: { language: selected } }));
  };

  let storedLanguage = 'tr';
  try { storedLanguage = window.localStorage.getItem('liora-language') || 'tr'; } catch {}
  const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
  const validRequestedLanguage = requestedLanguage === 'en' || requestedLanguage === 'tr' ? requestedLanguage : '';
  const initialLanguage = validRequestedLanguage || (storedLanguage === 'en' ? 'en' : 'tr');
  setLanguage(initialLanguage, false);
  if (requestedLanguage !== initialLanguage && (requestedLanguage || initialLanguage === 'en')) {
    const url = new URL(window.location.href);
    if (initialLanguage === 'en') url.searchParams.set('lang', 'en');
    else url.searchParams.delete('lang');
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }
  buttons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language, true)));
})();
