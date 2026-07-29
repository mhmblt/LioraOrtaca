const whatsappNumber = '905469108052';

const translations = {
  tr: {
    documentTitle: 'Liora Ortaca | Zamansız Bir Miras',
    metaDescription: "Muğla Ortaca Cumhuriyet Mahallesi'nde MEF Yapı imzası taşıyan 8 dairelik Liora Ortaca'yı keşfedin. Kalan 4 daire için güncel bilgi alın.",
    whatsappMessage: 'Merhaba, Liora Ortaca projesi hakkında bilgi almak istiyorum.',
    menuLabel: 'Menüyü aç', brandAria: 'Liora Ortaca ana sayfa', navAria: 'Ana menü', mobileNavAria: 'Mobil menü', languageAria: 'Dil seçimi', mefAria: 'MEF Yapı & İnşaat web sitesi',
    navStory: 'Hikâye', navPrivileges: 'Ayrıcalıklar', navGallery: 'Galeri', navInfo: 'Bilgi Al',
    headerCta: 'Bilgi Al <span>↗</span>',
    heroKicker: 'MEF YAPI & İNŞAAT SUNAR',
    heroTitle: '<span class="heading-line">Işığı takip edin.</span><span class="heading-line"><em>Evine varın.</em></span>',
    heroCopy: "Ege'nin en saf ışığında, doğal taşın zamansız karakteriyle şekillenen seçkin bir yaşam.",
    heroSeoLine: "Muğla Ortaca Cumhuriyet Mahallesi'nde satılık 8 dairelik butik konut projesi.",
    heroImageAlt: "Muğla Ortaca'da gün batımında Liora Ortaca butik konut projesi",
    heroCta: 'Ön Talep Oluştur <span>↘</span>', explore: 'Keşfet', heroNumber: 'Seçkin aile için<br />özel tasarım',
    introKicker: 'ZAMANSIZ BİR MİRAS', introTitle: 'Bir evden daha fazlası;<br /><em>bir yaşam mirası.</em>',
    introCopy: "Liora, Muğla Ortaca'da satılık yeni daire arayanlar için bölgenin melodik tınısını doğal taşla buluşturan özel bir yaşam anlayışı. Her ayrıntısı, günün ilk ışığından akşamın altın saatine kadar huzuru hissettirmek için düşünüldü.",
    introLink: "Liora'yı keşfedin <span>→</span>",
    availabilityKicker: 'SINIRLI SAYIDA, SINIRSIZ AYRICALIK', availabilityTitle: 'Seçkin bir yaşam için<br /><em>son 4 fırsat.</em>',
    availabilityCopy: 'Yalnızca 8 seçkin daireden 4’ü için ön talep süreci devam ediyor. Liora Ortaca’da size ayrılacak yaşam alanını bugün keşfedin.',
    availabilityCta: 'Öncelik İçin WhatsApp <span>↗</span>', counterLabel: 'daire<br />kaldı', counterCaption: '<b>4 / 8</b> seçkin daire<br />için son fırsat', counterAria: 'Sekiz daireden dört daire kaldı',
    featureCaption: 'Doğayla uyum içinde<br />yalın ve güçlü mimari.', featureImageAlt: "Liora Ortaca'nın doğal taş detaylı mimarisi",
    privilegesKicker: 'YAŞAMIN ÖZÜ', privilegesTitle: 'Sade. Kalıcı.<br /><em>Size ait.</em>',
    privilegeOneTitle: 'Doğal taş mimarisi', privilegeOneCopy: 'Doğanın yalın güzelliğini her gün yeniden hissettiren, zamana meydan okuyan malzemeler.',
    privilegeTwoTitle: 'Yalnızca 8 aile', privilegeTwoCopy: 'Mahremiyetin, dinginliğin ve seçkin komşuluğun özenle korunduğu butik bir yaşam alanı.',
    privilegeThreeTitle: 'Işıkla tasarlanan anlar', privilegeThreeCopy: 'Sıcak aydınlatma detayları ve Ege ışığını içeri alan ferah yaşam alanları.',
    galleryKicker: 'GÖRSEL YOLCULUK', galleryTitle: 'Her açıdan bir başka<br />huzur hikâyesi.', galleryOne: 'Gün batımında Liora', galleryTwo: 'İncelikle işlenen cephe', galleryThree: 'Doğayla yan yana',
    galleryOneAlt: 'Liora Ortaca kuş bakışı görünümü', galleryTwoAlt: 'Liora Ortaca ön cephe görünümü', galleryThreeAlt: 'Liora Ortaca ve doğal çevresinin havadan görünümü', contactImageAlt: "Liora Ortaca'nın doğayla çevrili havadan görünümü",
    faqKicker: 'MERAK EDİLENLER', faqTitle: 'Liora Ortaca hakkında<br /><em>kısa ve net cevaplar.</em>', faqIntro: 'Yeni yaşamınıza karar verirken ihtiyaç duyacağınız temel proje bilgileri.',
    faqOneQuestion: 'Liora Ortaca nerede?', faqOneAnswer: "Proje, Muğla'nın Ortaca ilçesinde, Cumhuriyet Mahallesi'nde konumlanmaktadır.",
    faqTwoQuestion: 'Projede kaç daire bulunuyor?', faqTwoAnswer: 'Liora Ortaca yalnızca 8 seçkin aile için tasarlandı. Ön talep süreci şu anda son 4 daire için devam ediyor.',
    faqThreeQuestion: 'Kat planı ve mimari kataloğa nasıl ulaşabilirim?', faqThreeAnswer: 'Detaylı mimari katalog, kat planları ve güncel ön talep bilgileri kurumsal iletişim kanallarımız üzerinden paylaşılmaktadır.',
    faqFourQuestion: 'Liora Ortaca daire fiyatları ve ön talep bilgisi nasıl alınır?', faqFourAnswer: 'Güncel fiyat, müsait daire, kat planı ve ön talep bilgilerini WhatsApp, telefon veya e-posta üzerinden doğrudan ekibimizden alabilirsiniz.', faqLink: 'İletişime geçin →',
    contactKicker: 'SİZE AYRILAN YER', contactTitle: 'Işığın size<br /><em>ulaşmasına izin verin.</em>', contactCopy: 'Detaylı bilgi için iletişime geçin.', contactCta: 'WhatsApp’tan Bilgi Al <span>↗</span>',
    location: 'Muğla Ortaca, Cumhuriyet Mah.', footerTagline: 'Ege ışığında, zamansız bir yaşam mirası.', salesGuideLink: 'Muğla Ortaca satılık daire <span>→</span>', instagram: 'Instagram @mefyapitr <span>↗</span>',
    locationKicker: 'PROJE KONUMU', locationTitle: 'Muğla Ortaca<br />Cumhuriyet Mah.', mapLink: '<span class="map-pin">●</span> Haritada aç <b>↗</b>', mapTitle: 'Liora Ortaca proje konumu',
    copyright: '© 2026 Liora Ortaca. Tüm hakları saklıdır.', whatsappEyebrow: 'SON 4 DAİRE', whatsappFloating: 'Detaylı bilgi için bize yazın', whatsappDismiss: 'Bildirimi küçült',
    privacyLink: 'KVKK Aydınlatma Metni', cookiePolicyLink: 'Çerez Politikası'
  },
  en: {
    documentTitle: 'Liora Ortaca | Boutique Residences in Muğla, Ortaca',
    metaDescription: 'Liora Ortaca by MEF Yapı is a boutique residential project with natural-stone architecture in Cumhuriyet, Muğla. Contact us for the final 4 of 8 residences.',
    whatsappMessage: 'Hello, I would like to receive more information about Liora Ortaca.',
    menuLabel: 'Open menu', brandAria: 'Liora Ortaca home', navAria: 'Main navigation', mobileNavAria: 'Mobile navigation', languageAria: 'Language selection', mefAria: 'MEF Yapı & İnşaat website',
    navStory: 'Story', navPrivileges: 'Privileges', navGallery: 'Gallery', navInfo: 'Get Info',
    headerCta: 'Get Info <span>↗</span>',
    heroKicker: 'PRESENTED BY MEF YAPI & İNŞAAT',
    heroTitle: '<span class="heading-line">Follow the light.</span><span class="heading-line"><em>Arrive home.</em></span>',
    heroCopy: "A distinguished way of life shaped by the Aegean's purest light and the timeless character of natural stone.",
    heroSeoLine: 'A boutique 8-residence project for sale in Cumhuriyet, Ortaca.',
    heroImageAlt: 'Liora Ortaca boutique residences at sunset in Muğla, Ortaca',
    heroCta: 'Request Priority Access <span>↘</span>', explore: 'Explore', heroNumber: 'Created for<br />select families',
    introKicker: 'A TIMELESS LEGACY', introTitle: 'More than a residence;<br /><em>a legacy of living.</em>',
    introCopy: 'Liora is a distinct expression of living, inspired by the melodic character of its setting. Every detail is considered to make you feel at ease from the first light of day to the golden hour.',
    introLink: 'Discover Liora <span>→</span>',
    availabilityKicker: 'LIMITED EDITION, LASTING PRIVILEGE', availabilityTitle: 'For a distinguished life,<br /><em>four final opportunities.</em>',
    availabilityCopy: 'Priority access remains for only 4 of 8 select residences. Discover the home that can be reserved for you at Liora Ortaca today.',
    availabilityCta: 'Priority via WhatsApp <span>↗</span>', counterLabel: 'homes<br />remain', counterCaption: '<b>4 / 8</b> select residences<br />final opportunity', counterAria: 'Four of eight residences remain',
    featureCaption: 'A strong, understated architecture<br />in harmony with nature.', featureImageAlt: 'Natural-stone architectural details at Liora Ortaca',
    privilegesKicker: 'THE ESSENCE OF LIVING', privilegesTitle: 'Simple. Enduring.<br /><em>Entirely yours.</em>',
    privilegeOneTitle: 'Natural stone architecture', privilegeOneCopy: 'Timeless materials that let you feel the quiet beauty of nature anew, every day.',
    privilegeTwoTitle: 'Only 8 families', privilegeTwoCopy: 'A boutique setting where privacy, calm and a discerning neighbourhood are carefully preserved.',
    privilegeThreeTitle: 'Moments designed with light', privilegeThreeCopy: 'Warm lighting details and generous living spaces that welcome the Aegean light inside.',
    galleryKicker: 'A VISUAL JOURNEY', galleryTitle: 'A different story of<br />serenity from every angle.', galleryOne: 'Liora at sunset', galleryTwo: 'A façade crafted with care', galleryThree: 'Alongside nature',
    galleryOneAlt: 'Aerial view of Liora Ortaca', galleryTwoAlt: 'Front façade of Liora Ortaca', galleryThreeAlt: 'Aerial view of Liora Ortaca in its natural setting', contactImageAlt: 'Aerial view of Liora Ortaca surrounded by nature',
    faqKicker: 'FREQUENTLY ASKED', faqTitle: 'Liora Ortaca,<br /><em>clearly answered.</em>', faqIntro: 'The essential project information you need when considering your new home.',
    faqOneQuestion: 'Where is Liora Ortaca located?', faqOneAnswer: 'The project is located in Cumhuriyet District, Ortaca, Muğla, Türkiye.',
    faqTwoQuestion: 'How many residences are in the project?', faqTwoAnswer: 'Liora Ortaca was designed for only eight select families. Priority access is currently available for the final four residences.',
    faqThreeQuestion: 'How can I receive the floor plans and architectural catalogue?', faqThreeAnswer: 'The detailed architectural catalogue, floor plans and current priority-access information are available through our corporate contact channels.',
    faqFourQuestion: 'How can I receive current pricing and priority-access information?', faqFourAnswer: 'Contact our team directly via WhatsApp, telephone or email for current pricing, available residences, floor plans and priority-access details.', faqLink: 'Contact us →',
    contactKicker: 'A PLACE RESERVED FOR YOU', contactTitle: 'Let the light<br /><em>find its way to you.</em>', contactCopy: 'Contact us for detailed information.', contactCta: 'Get Information on WhatsApp <span>↗</span>',
    location: 'Muğla Ortaca, Cumhuriyet District', footerTagline: 'A timeless legacy of living in the Aegean light.', salesGuideLink: 'Muğla Ortaca residence guide <span>→</span>', instagram: 'Instagram @mefyapitr <span>↗</span>',
    locationKicker: 'PROJECT LOCATION', locationTitle: 'Muğla Ortaca<br />Cumhuriyet District', mapLink: '<span class="map-pin">●</span> Open in maps <b>↗</b>', mapTitle: 'Liora Ortaca project location',
    copyright: '© 2026 Liora Ortaca. All rights reserved.', whatsappEyebrow: 'ONLY 4 HOMES LEFT', whatsappFloating: 'Message us for details', whatsappDismiss: 'Minimize notification',
    privacyLink: 'Privacy Notice', cookiePolicyLink: 'Cookie Policy'
  }
};

const whatsappLink = document.getElementById('whatsappLink');
const whatsappWidget = document.getElementById('whatsappWidget');
const whatsappDismiss = document.getElementById('whatsappDismiss');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const languageButtons = document.querySelectorAll('.language-button');

const syncLanguageUrl = (language) => {
  const currentUrl = new URL(window.location.href);
  const isLocalPreview = ['127.0.0.1', 'localhost', '::1'].includes(currentUrl.hostname);
  currentUrl.pathname = language === 'en' ? (isLocalPreview ? '/en/index.html' : '/en') : '/';
  currentUrl.searchParams.delete('lang');
  const nextUrl = `${currentUrl.pathname}${currentUrl.search}${currentUrl.hash}`;
  window.history.replaceState({}, '', nextUrl);
};

const setLanguage = (language, persist = true) => {
  const copy = translations[language] || translations.tr;
  document.documentElement.lang = language;
  document.title = copy.documentTitle;
  document.getElementById('metaDescription').setAttribute('content', copy.metaDescription);
  document.querySelectorAll('[data-i18n]').forEach((element) => { if (copy[element.dataset.i18n]) element.textContent = copy[element.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => { if (copy[element.dataset.i18nHtml]) element.innerHTML = copy[element.dataset.i18nHtml]; });
  document.querySelectorAll('[data-i18n-alt]').forEach((element) => { if (copy[element.dataset.i18nAlt]) element.setAttribute('alt', copy[element.dataset.i18nAlt]); });
  document.querySelectorAll('[data-i18n-title]').forEach((element) => { if (copy[element.dataset.i18nTitle]) element.setAttribute('title', copy[element.dataset.i18nTitle]); });
  document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => { if (copy[element.dataset.i18nAriaLabel]) element.setAttribute('aria-label', copy[element.dataset.i18nAriaLabel]); });
  menuButton?.setAttribute('aria-label', copy.menuLabel);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsappMessage)}`;
  if (whatsappLink) {
    whatsappLink.href = whatsappUrl;
    whatsappLink.setAttribute('aria-label', copy.whatsappFloating);
  }
  whatsappDismiss?.setAttribute('aria-label', copy.whatsappDismiss);
  document.querySelectorAll('.availability .button, .contact .button').forEach((link) => { link.href = whatsappUrl; });
  const isLocalPreview = ['127.0.0.1', 'localhost', '::1'].includes(window.location.hostname);
  const privacyPath = isLocalPreview ? '/privacy.html' : '/privacy';
  const cookiePath = isLocalPreview ? '/cookies.html' : '/cookies';
  const salesPath = isLocalPreview ? '/mugla-ortaca-satilik-daire.html' : '/mugla-ortaca-satilik-daire';
  document.querySelectorAll('[data-privacy-link]').forEach((link) => {
    link.href = language === 'en' ? `${privacyPath}?lang=en` : privacyPath;
  });
  document.querySelectorAll('[data-cookie-link]').forEach((link) => {
    link.href = language === 'en' ? `${cookiePath}?lang=en` : cookiePath;
  });
  document.querySelectorAll('[data-sales-link]').forEach((link) => {
    link.href = salesPath;
  });
  languageButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  if (persist) {
    try { localStorage.setItem('liora-language', language); } catch {}
    syncLanguageUrl(language);
  }
  window.dispatchEvent(new CustomEvent('liora:language-change', { detail: { language } }));
};

let storedLanguage = 'tr';
try { storedLanguage = localStorage.getItem('liora-language') || 'tr'; } catch {}
const requestedLanguage = new URLSearchParams(window.location.search).get('lang');
const validRequestedLanguage = ['tr', 'en'].includes(requestedLanguage) ? requestedLanguage : '';
const pathLanguage = /^\/en(?:\/|\/index\.html)?$/.test(window.location.pathname) ? 'en' : '';
const initialLanguage = pathLanguage || validRequestedLanguage || (['tr', 'en'].includes(storedLanguage) ? storedLanguage : 'tr');
setLanguage(initialLanguage, false);
if (pathLanguage !== initialLanguage || validRequestedLanguage) syncLanguageUrl(initialLanguage);
languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));

window.setTimeout(() => whatsappWidget?.classList.add('is-visible'), 1400);
whatsappDismiss?.addEventListener('click', () => {
  whatsappWidget?.classList.add('is-dismissed');
});

menuButton?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuButton.classList.toggle('open', isOpen);
  menuButton.setAttribute('aria-expanded', String(isOpen));
});
mobileNav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  mobileNav.classList.remove('open');
  menuButton.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const availabilityCounter = document.querySelector('[data-count]');
if (availabilityCounter) {
  const counterObserver = new IntersectionObserver(([entry], currentObserver) => {
    if (!entry.isIntersecting) return;
    const target = Number(availabilityCounter.dataset.count);
    const startedAt = performance.now();
    const duration = 1100;
    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      availabilityCounter.textContent = String(Math.round((1 - Math.pow(1 - progress, 3)) * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    entry.target.classList.add('is-counted');
    requestAnimationFrame(tick);
    currentObserver.unobserve(entry.target);
  }, { threshold: 0.45 });
  counterObserver.observe(availabilityCounter.closest('.availability-counter'));
}
