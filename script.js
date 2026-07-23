const whatsappNumber = '905469108052';

const translations = {
  tr: {
    documentTitle: 'Liora Ortaca | Zamansız Bir Miras',
    metaDescription: "Liora Ortaca — Ege'nin ışığında, sekiz seçkin aileye özel zamansız yaşam.",
    whatsappMessage: 'Merhaba, Liora Ortaca projesi hakkında bilgi almak istiyorum.',
    menuLabel: 'Menüyü aç',
    navStory: 'Hikâye', navPrivileges: 'Ayrıcalıklar', navGallery: 'Galeri', navInfo: 'Bilgi Al',
    headerCta: 'Bilgi Al <span>↗</span>',
    heroKicker: 'MEF YAPI & İNŞAAT SUNAR',
    heroTitle: '<span class="heading-line">Işığı takip edin.</span><span class="heading-line"><em>Evine varın.</em></span>',
    heroCopy: "Ege'nin en saf ışığında, doğal taşın zamansız karakteriyle şekillenen seçkin bir yaşam.",
    heroCta: 'Ön Talep Oluştur <span>↘</span>', explore: 'Keşfet', heroNumber: 'Seçkin aile için<br />özel tasarım',
    introKicker: 'ZAMANSIZ BİR MİRAS', introTitle: 'Bir evden daha fazlası;<br /><em>bir yaşam mirası.</em>',
    introCopy: 'Liora, bölgenin melodik tınısını taşından alan özel bir yaşam anlayışı. Her ayrıntısı, günün ilk ışığından akşamın altın saatine kadar huzuru hissettirmek için düşünüldü.',
    introLink: "Liora'yı keşfedin <span>→</span>",
    availabilityKicker: 'SINIRLI SAYIDA, SINIRSIZ AYRICALIK', availabilityTitle: 'Seçkin bir yaşam için<br /><em>son 4 fırsat.</em>',
    availabilityCopy: 'Yalnızca 8 seçkin daireden 4’ü için ön talep süreci devam ediyor. Liora Ortaca’da size ayrılacak yaşam alanını bugün keşfedin.',
    availabilityCta: 'Öncelik İçin WhatsApp <span>↗</span>', counterLabel: 'daire<br />kaldı', counterCaption: '<b>4 / 8</b> seçkin daire<br />için son fırsat',
    featureCaption: 'Doğayla uyum içinde<br />yalın ve güçlü mimari.',
    privilegesKicker: 'YAŞAMIN ÖZÜ', privilegesTitle: 'Sade. Kalıcı.<br /><em>Size ait.</em>',
    privilegeOneTitle: 'Doğal taş mimarisi', privilegeOneCopy: 'Doğanın yalın güzelliğini her gün yeniden hissettiren, zamana meydan okuyan malzemeler.',
    privilegeTwoTitle: 'Yalnızca 8 aile', privilegeTwoCopy: 'Mahremiyetin, dinginliğin ve seçkin komşuluğun özenle korunduğu butik bir yaşam alanı.',
    privilegeThreeTitle: 'Işıkla tasarlanan anlar', privilegeThreeCopy: 'Sıcak aydınlatma detayları ve Ege ışığını içeri alan ferah yaşam alanları.',
    galleryKicker: 'GÖRSEL YOLCULUK', galleryTitle: 'Her açıdan bir başka<br />huzur hikâyesi.', galleryOne: 'Gün batımında Liora', galleryTwo: 'İncelikle işlenen cephe', galleryThree: 'Doğayla yan yana',
    contactKicker: 'SİZE AYRILAN YER', contactTitle: 'Işığın size<br /><em>ulaşmasına izin verin.</em>', contactCopy: 'Detaylı bilgi için iletişime geçin.', contactCta: 'WhatsApp’tan Bilgi Al <span>↗</span>',
    location: 'Muğla Ortaca, Cumhuriyet Mah.', footerTagline: 'Ege ışığında, zamansız bir yaşam mirası.', instagram: 'Instagram @mefyapitr <span>↗</span>',
    locationKicker: 'PROJE KONUMU', locationTitle: 'Muğla Ortaca<br />Cumhuriyet Mah.', mapLink: '<span class="map-pin">●</span> Haritada aç <b>↗</b>',
    copyright: '© 2026 Liora Ortaca. Tüm hakları saklıdır.', whatsappFloating: "WhatsApp'tan bilgi alın"
  },
  en: {
    documentTitle: 'Liora Ortaca | A Timeless Legacy',
    metaDescription: "Liora Ortaca — A timeless, light-filled life created exclusively for eight discerning families.",
    whatsappMessage: 'Hello, I would like to receive more information about Liora Ortaca.',
    menuLabel: 'Open menu',
    navStory: 'Story', navPrivileges: 'Privileges', navGallery: 'Gallery', navInfo: 'Get Info',
    headerCta: 'Get Info <span>↗</span>',
    heroKicker: 'PRESENTED BY MEF YAPI & İNŞAAT',
    heroTitle: '<span class="heading-line">Follow the light.</span><span class="heading-line"><em>Arrive home.</em></span>',
    heroCopy: "A distinguished way of life shaped by the Aegean's purest light and the timeless character of natural stone.",
    heroCta: 'Request Priority Access <span>↘</span>', explore: 'Explore', heroNumber: 'Created for<br />select families',
    introKicker: 'A TIMELESS LEGACY', introTitle: 'More than a residence;<br /><em>a legacy of living.</em>',
    introCopy: 'Liora is a distinct expression of living, inspired by the melodic character of its setting. Every detail is considered to make you feel at ease from the first light of day to the golden hour.',
    introLink: 'Discover Liora <span>→</span>',
    availabilityKicker: 'LIMITED EDITION, LASTING PRIVILEGE', availabilityTitle: 'For a distinguished life,<br /><em>four final opportunities.</em>',
    availabilityCopy: 'Priority access remains for only 4 of 8 select residences. Discover the home that can be reserved for you at Liora Ortaca today.',
    availabilityCta: 'Priority via WhatsApp <span>↗</span>', counterLabel: 'homes<br />remain', counterCaption: '<b>4 / 8</b> select residences<br />final opportunity',
    featureCaption: 'A strong, understated architecture<br />in harmony with nature.',
    privilegesKicker: 'THE ESSENCE OF LIVING', privilegesTitle: 'Simple. Enduring.<br /><em>Entirely yours.</em>',
    privilegeOneTitle: 'Natural stone architecture', privilegeOneCopy: 'Timeless materials that let you feel the quiet beauty of nature anew, every day.',
    privilegeTwoTitle: 'Only 8 families', privilegeTwoCopy: 'A boutique setting where privacy, calm and a discerning neighbourhood are carefully preserved.',
    privilegeThreeTitle: 'Moments designed with light', privilegeThreeCopy: 'Warm lighting details and generous living spaces that welcome the Aegean light inside.',
    galleryKicker: 'A VISUAL JOURNEY', galleryTitle: 'A different story of<br />serenity from every angle.', galleryOne: 'Liora at sunset', galleryTwo: 'A façade crafted with care', galleryThree: 'Alongside nature',
    contactKicker: 'A PLACE RESERVED FOR YOU', contactTitle: 'Let the light<br /><em>find its way to you.</em>', contactCopy: 'Contact us for detailed information.', contactCta: 'Get Information on WhatsApp <span>↗</span>',
    location: 'Muğla Ortaca, Cumhuriyet District', footerTagline: 'A timeless legacy of living in the Aegean light.', instagram: 'Instagram @mefyapitr <span>↗</span>',
    locationKicker: 'PROJECT LOCATION', locationTitle: 'Muğla Ortaca<br />Cumhuriyet District', mapLink: '<span class="map-pin">●</span> Open in maps <b>↗</b>',
    copyright: '© 2026 Liora Ortaca. All rights reserved.', whatsappFloating: 'Get information on WhatsApp'
  }
};

const whatsappLink = document.getElementById('whatsappLink');
const menuButton = document.querySelector('.menu-button');
const mobileNav = document.querySelector('.mobile-nav');
const languageButtons = document.querySelectorAll('.language-button');

const setLanguage = (language, persist = true) => {
  const copy = translations[language] || translations.tr;
  document.documentElement.lang = language;
  document.title = copy.documentTitle;
  document.getElementById('metaDescription').setAttribute('content', copy.metaDescription);
  document.querySelectorAll('[data-i18n]').forEach((element) => { if (copy[element.dataset.i18n]) element.textContent = copy[element.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-html]').forEach((element) => { if (copy[element.dataset.i18nHtml]) element.innerHTML = copy[element.dataset.i18nHtml]; });
  menuButton?.setAttribute('aria-label', copy.menuLabel);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(copy.whatsappMessage)}`;
  if (whatsappLink) whatsappLink.href = whatsappUrl;
  document.querySelectorAll('.availability .button, .contact .button').forEach((link) => { link.href = whatsappUrl; });
  languageButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.language === language)));
  if (persist) { try { localStorage.setItem('liora-language', language); } catch {} }
};

let storedLanguage = 'tr';
try { storedLanguage = localStorage.getItem('liora-language') || 'tr'; } catch {}
setLanguage(storedLanguage, false);
languageButtons.forEach((button) => button.addEventListener('click', () => setLanguage(button.dataset.language)));

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
