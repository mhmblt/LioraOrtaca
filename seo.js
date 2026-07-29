(() => {
  const config = window.LIORA_CONFIG || {};
  const inventory = config.inventory || { total: 8, available: 4 };

  const normalizeOrigin = (value) => {
    if (!value) return '';
    try {
      const url = new URL(String(value).trim());
      return url.protocol === 'https:' || url.protocol === 'http:' ? url.origin : '';
    } catch {
      return '';
    }
  };

  const configuredOrigin = normalizeOrigin(config.siteUrl);
  const runtimeOrigin = /^(https?:)$/.test(window.location.protocol) ? window.location.origin : '';
  const origin = configuredOrigin || runtimeOrigin;
  if (!origin) return;

  const content = {
    tr: {
      homeTitle: 'Liora Ortaca | Zamansız Bir Miras',
      homeDescription: "Muğla Ortaca Cumhuriyet Mahallesi'nde MEF Yapı imzası taşıyan 8 dairelik Liora Ortaca'yı keşfedin. Kalan 4 daire için güncel bilgi alın.",
      socialDescription: "Doğal taş mimarisiyle yalnızca 8 seçkin aile için tasarlanan Liora Ortaca'da son 4 daire. Detaylı bilgi için iletişime geçin.",
      imageAlt: 'Gün batımında Liora Ortaca butik konut projesi',
      salesTitle: 'Muğla Ortaca Satılık Daire | Liora Ortaca',
      salesDescription: "Muğla Ortaca Cumhuriyet Mahallesi'nde MEF Yapı imzalı Liora Ortaca'da yalnızca 4 daire kaldı. Kat planı, güncel fiyat ve proje sunumu için bilgi alın.",
      salesSocialDescription: "Ortaca Cumhuriyet Mahallesi'nde doğal taş mimarili Liora Ortaca'da son 4 daire. Güncel fiyat ve kat planı için bilgi alın.",
      privacyTitle: 'KVKK Aydınlatma Metni | Liora Ortaca',
      privacyDescription: 'Liora Ortaca internet sitesi ziyaretçileri için işlenen veriler, amaçlar, hukuki sebepler, aktarım ve KVKK hakları.',
      cookieTitle: 'Çerez Politikası ve Teknolojiler | Liora Ortaca',
      cookieDescription: 'Liora Ortaca sitesindeki dil depolaması, çerezsiz Google Analytics ölçümü, Google Haritalar ve tarayıcı kontrolleri.'
    },
    en: {
      homeTitle: 'Liora Ortaca | Boutique Residences in Muğla, Ortaca',
      homeDescription: 'Liora Ortaca by MEF Yapı is a boutique residential project with natural-stone architecture in Cumhuriyet, Muğla. Contact us for the final 4 of 8 residences.',
      socialDescription: 'A boutique natural-stone residential project for eight select families in Ortaca, Muğla. Contact us about the final four residences.',
      imageAlt: 'Liora Ortaca boutique residences at sunset',
      salesTitle: 'Muğla Ortaca Satılık Daire | Liora Ortaca',
      salesDescription: "Muğla Ortaca Cumhuriyet Mahallesi'nde MEF Yapı imzalı Liora Ortaca'da yalnızca 4 daire kaldı. Kat planı, güncel fiyat ve proje sunumu için bilgi alın.",
      salesSocialDescription: "Ortaca Cumhuriyet Mahallesi'nde doğal taş mimarili Liora Ortaca'da son 4 daire. Güncel fiyat ve kat planı için bilgi alın.",
      privacyTitle: 'Privacy Notice | Liora Ortaca',
      privacyDescription: 'Privacy notice for Liora Ortaca website visitors, including data, purposes, legal grounds, transfers and rights.',
      cookieTitle: 'Cookie Policy and Technologies | Liora Ortaca',
      cookieDescription: 'Language storage, cookieless Google Analytics, Google Maps and browser controls on the Liora Ortaca website.'
    }
  };

  const setMeta = (selector, value) => {
    const element = document.querySelector(selector);
    if (element && value) element.setAttribute('content', value);
  };

  const upsertLink = (attributes) => {
    const selector = attributes.hreflang
      ? `link[rel="alternate"][hreflang="${attributes.hreflang}"]`
      : `link[rel="${attributes.rel}"]`;
    let element = document.querySelector(selector);
    if (!element) {
      element = document.createElement('link');
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
    return element;
  };

  const getLanguage = () => {
    if (/^\/mugla-ortaca-satilik-daire(?:\.html)?\/?$/.test(window.location.pathname)) return 'tr';
    const requested = new URLSearchParams(window.location.search).get('lang');
    if (requested === 'en' || requested === 'tr') return requested;
    return document.documentElement.lang === 'en' ? 'en' : 'tr';
  };

  const isPrivacyPage = () => /^\/privacy(?:\.html)?\/?$/.test(window.location.pathname);
  const isCookiePage = () => /^\/cookies(?:\.html)?\/?$/.test(window.location.pathname);
  const isSalesPage = () => /^\/mugla-ortaca-satilik-daire(?:\.html)?\/?$/.test(window.location.pathname);
  const homePath = (language) => language === 'en' ? '/en' : '/';
  const privacyPath = (language) => language === 'en' ? '/privacy?lang=en' : '/privacy';
  const cookiePath = (language) => language === 'en' ? '/cookies?lang=en' : '/cookies';
  const absolute = (path) => new URL(path, `${origin}/`).href;

  const renderStructuredData = (language, canonicalUrl, imageUrl, description, title, pageType) => {
    const websiteId = `${origin}/#website`;
    const organizationId = `${origin}/#organization`;
    const projectId = `${origin}/#liora-ortaca`;
    const webpageId = `${canonicalUrl}#webpage`;
    const webPage = {
      '@type': 'WebPage',
      '@id': webpageId,
      url: canonicalUrl,
      name: title,
      description,
      inLanguage: language,
      isPartOf: { '@id': websiteId },
      primaryImageOfPage: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1200,
        height: 630
      }
    };
    if (!['privacy', 'cookies'].includes(pageType)) webPage.about = { '@id': projectId };

    const graph = [
      {
        '@type': 'WebSite',
        '@id': websiteId,
        url: `${origin}/`,
        name: 'Liora Ortaca',
        inLanguage: ['tr', 'en'],
        publisher: { '@id': organizationId }
      },
      {
        '@type': 'Organization',
        '@id': organizationId,
        name: 'MEF Yapı & İnşaat',
        url: 'https://mefyapitr.com',
        logo: {
          '@type': 'ImageObject',
          url: absolute('/assets/mef-yapi-logo.png'),
          width: 198,
          height: 293
        },
        telephone: '+905469108052',
        email: 'info.mefyapi@gmail.com',
        sameAs: [
          'https://www.instagram.com/mefyapitr/'
        ]
      },
      webPage
    ];

    if (!['privacy', 'cookies'].includes(pageType)) {
      graph.push({
        '@type': 'ApartmentComplex',
        '@id': projectId,
        name: 'Liora Ortaca',
        description,
        url: absolute('/'),
        image: [
          imageUrl,
          absolute('/assets/liora-facade.webp'),
          absolute('/assets/liora-aerial.webp')
        ],
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Cumhuriyet Mahallesi',
          addressLocality: 'Ortaca',
          addressRegion: 'Muğla',
          addressCountry: 'TR'
        },
        numberOfAccommodationUnits: {
          '@type': 'QuantitativeValue',
          value: Number(inventory.total) || 8
        },
        numberOfAvailableAccommodationUnits: {
          '@type': 'QuantitativeValue',
          value: Number(inventory.available) || 4
        },
        mainEntityOfPage: { '@id': `${absolute('/')}#webpage` }
      });
    }

    if (pageType === 'sales') {
      graph.push({
        '@type': 'BreadcrumbList',
        '@id': `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: language === 'tr' ? 'Ana Sayfa' : 'Home',
            item: absolute('/')
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'Muğla Ortaca Satılık Daire',
            item: canonicalUrl
          }
        ]
      });
      webPage.breadcrumb = { '@id': `${canonicalUrl}#breadcrumb` };
    }

    let script = document.getElementById('lioraStructuredData');
    if (!script) {
      script = document.createElement('script');
      script.id = 'lioraStructuredData';
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  };

  const updateSeo = (requestedLanguage) => {
    const language = requestedLanguage === 'en' ? 'en' : 'tr';
    const copy = content[language];
    const privacy = isPrivacyPage();
    const cookies = isCookiePage();
    const legal = privacy || cookies;
    const sales = isSalesPage();
    const pageType = privacy ? 'privacy' : (cookies ? 'cookies' : (sales ? 'sales' : 'home'));
    const canonicalPath = privacy
      ? privacyPath(language)
      : (cookies ? cookiePath(language) : (sales ? '/mugla-ortaca-satilik-daire' : homePath(language)));
    const canonicalUrl = absolute(canonicalPath);
    const imageUrl = absolute('/assets/liora-social.jpg');
    const title = privacy ? copy.privacyTitle : (cookies ? copy.cookieTitle : (sales ? copy.salesTitle : copy.homeTitle));
    const description = privacy ? copy.privacyDescription : (cookies ? copy.cookieDescription : (sales ? copy.salesDescription : copy.homeDescription));
    const socialDescription = legal ? description : (sales ? copy.salesSocialDescription : copy.socialDescription);

    upsertLink({ rel: 'canonical', href: canonicalUrl });
    if (sales) {
      document.querySelector('link[rel="alternate"][hreflang="en"]')?.remove();
      upsertLink({ rel: 'alternate', hreflang: 'tr', href: canonicalUrl });
      upsertLink({ rel: 'alternate', hreflang: 'x-default', href: canonicalUrl });
    } else {
      const alternatePath = (targetLanguage) => privacy
        ? privacyPath(targetLanguage)
        : (cookies ? cookiePath(targetLanguage) : homePath(targetLanguage));
      upsertLink({ rel: 'alternate', hreflang: 'tr', href: absolute(alternatePath('tr')) });
      upsertLink({ rel: 'alternate', hreflang: 'en', href: absolute(alternatePath('en')) });
      upsertLink({ rel: 'alternate', hreflang: 'x-default', href: absolute(alternatePath('tr')) });
    }

    document.title = title;
    setMeta('#metaDescription', description);
    setMeta('#ogLocale', language === 'en' ? 'en_US' : 'tr_TR');
    setMeta('#ogLocaleAlternate', language === 'en' ? 'tr_TR' : 'en_US');
    setMeta('#ogTitle', title);
    setMeta('#ogDescription', socialDescription);
    setMeta('#ogImage', imageUrl);
    setMeta('#ogImageAlt', copy.imageAlt);
    setMeta('#twitterTitle', title);
    setMeta('#twitterDescription', socialDescription);
    setMeta('#twitterImage', imageUrl);
    setMeta('#twitterImageAlt', copy.imageAlt);

    let ogUrl = document.querySelector('meta[property="og:url"]');
    if (!ogUrl) {
      ogUrl = document.createElement('meta');
      ogUrl.setAttribute('property', 'og:url');
      document.head.appendChild(ogUrl);
    }
    ogUrl.setAttribute('content', canonicalUrl);

    if (legal) {
      setMeta('#robotsMeta', 'noindex,follow,max-image-preview:large');
      setMeta('#googlebotMeta', 'noindex,follow,max-image-preview:large');
    }

    if (window.location.hostname.endsWith('.vercel.app')) {
      setMeta('#robotsMeta', 'noindex,nofollow,noarchive');
      setMeta('#googlebotMeta', 'noindex,nofollow,noarchive');
    }

    renderStructuredData(language, canonicalUrl, imageUrl, description, title, pageType);
  };

  updateSeo(getLanguage());
  window.addEventListener('liora:language-change', (event) => {
    updateSeo(event.detail?.language || getLanguage());
  });
})();
