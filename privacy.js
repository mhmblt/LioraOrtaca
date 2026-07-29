(() => {
  const shared = {
    tr: {
      home: 'Ana Sayfa <span>↗</span>',
      returnHome: 'Projeye dön',
      privacy: 'KVKK Aydınlatma Metni',
      cookiePolicy: 'Çerez Politikası'
    },
    en: {
      home: 'Home <span>↗</span>',
      returnHome: 'Back to project',
      privacy: 'Privacy Notice',
      cookiePolicy: 'Cookie Policy'
    }
  };

  const documentCopy = {
    privacy: {
      tr: {
        title: 'KVKK<br /><em>Aydınlatma Metni</em>',
        summary: 'Kişisel verilerin hangi kapsamda ve neden işlendiğini açık, ölçülü ve doğrulanabilir biçimde açıklıyoruz.',
        updated: 'Son güncelleme: 29 Temmuz 2026',
        pageTitle: 'KVKK Aydınlatma Metni | Liora Ortaca',
        description: 'Liora Ortaca internet sitesi ziyaretçileri için KVKK aydınlatma metni; işlenen veriler, amaçlar, hukuki sebepler, aktarım ve başvuru hakları.'
      },
      en: {
        title: 'Privacy<br /><em>Notice</em>',
        summary: 'A clear, proportionate account of what personal data is processed, why it is used and the controls available to you.',
        updated: 'Last updated: 29 July 2026',
        pageTitle: 'Privacy Notice | Liora Ortaca',
        description: 'Privacy notice for visitors to the Liora Ortaca website, including data, purposes, legal grounds, transfers and rights.'
      }
    },
    cookies: {
      tr: {
        title: 'Çerez Politikası<br /><em>ve Teknolojiler</em>',
        summary: 'Sitede kullanılan tarayıcı depolamasını, çerezsiz ölçümü ve harita hizmetini açık biçimde açıklıyoruz.',
        updated: 'Son güncelleme: 29 Temmuz 2026',
        pageTitle: 'Çerez Politikası ve Teknolojiler | Liora Ortaca',
        description: 'Liora Ortaca çerez politikası; dil tercihi, çerezsiz Google Analytics ölçümü, Google Haritalar ve tarayıcı kontrolleri.'
      },
      en: {
        title: 'Cookie Policy<br /><em>&amp; Technologies</em>',
        summary: 'A clear account of browser storage, cookieless measurement and map services used on this website.',
        updated: 'Last updated: 29 July 2026',
        pageTitle: 'Cookie Policy and Technologies | Liora Ortaca',
        description: 'Liora Ortaca cookie policy covering language storage, cookieless Google Analytics, Google Maps and browser controls.'
      }
    }
  };

  const documentType = document.body.dataset.legalDocument === 'cookies' ? 'cookies' : 'privacy';
  const buttons = document.querySelectorAll('[data-language]');
  const isLocalPreview = () => ['127.0.0.1', 'localhost', '::1'].includes(window.location.hostname);
  const legalPath = (type) => {
    if (isLocalPreview()) return type === 'cookies' ? '/cookies.html' : '/privacy.html';
    return type === 'cookies' ? '/cookies' : '/privacy';
  };
  const withLanguage = (path, language) => language === 'en' ? `${path}?lang=en` : path;

  const setLanguage = (language, updateUrl = false) => {
    const selected = language === 'en' ? 'en' : 'tr';
    const copy = { ...shared[selected], ...documentCopy[documentType][selected] };
    document.documentElement.lang = selected;
    document.querySelectorAll('[data-language-content]').forEach((article) => {
      article.hidden = article.dataset.languageContent !== selected;
    });
    document.querySelectorAll('[data-privacy-i18n]').forEach((element) => {
      const value = copy[element.dataset.privacyI18n];
      if (value) element.innerHTML = value;
    });
    document.querySelectorAll('[data-privacy-i18n-aria-label]').forEach((element) => {
      const value = copy[element.dataset.privacyI18nAriaLabel];
      if (value) element.setAttribute('aria-label', value);
    });
    document.querySelectorAll('[data-home-link]').forEach((link) => {
      link.href = selected === 'en' ? (isLocalPreview() ? '/en/index.html' : '/en') : '/';
    });
    document.querySelectorAll('[data-privacy-self]').forEach((link) => {
      link.href = withLanguage(legalPath('privacy'), selected);
    });
    document.querySelectorAll('[data-cookie-self]').forEach((link) => {
      link.href = withLanguage(legalPath('cookies'), selected);
    });

    document.title = copy.pageTitle;
    ['metaDescription', 'ogDescription', 'twitterDescription'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.content = copy.description;
    });
    ['ogTitle', 'twitterTitle'].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.content = copy.pageTitle;
    });
    const ogLocale = document.getElementById('ogLocale');
    const ogLocaleAlternate = document.getElementById('ogLocaleAlternate');
    if (ogLocale) ogLocale.content = selected === 'en' ? 'en_US' : 'tr_TR';
    if (ogLocaleAlternate) ogLocaleAlternate.content = selected === 'en' ? 'tr_TR' : 'en_US';

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
