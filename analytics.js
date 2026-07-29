(() => {
  const config = window.LIORA_CONFIG || {};
  const measurementId = String(config.ga4MeasurementId || '').trim().toUpperCase();
  const isConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
  const consentKey = 'liora-consent-v1';
  const campaignKey = 'liora-campaign-v1';
  const banner = document.getElementById('consentBanner');
  const acceptButton = document.getElementById('consentAccept');
  const rejectButton = document.getElementById('consentReject');
  const settingsButton = document.getElementById('cookieSettings');
  let googleTagLoaded = false;
  let consentState = null;
  const getPageType = () => {
    const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (path === '/mugla-ortaca-satilik-daire') return 'sales_landing';
    if (path === '/en' || path === '/en/index') return 'project_home_en';
    if (path === '/privacy') return 'privacy';
    if (path === '/' || path === '/index') return 'project_home_tr';
    return 'other';
  };

  const readStorage = (storage, key) => {
    try { return storage.getItem(key); } catch { return null; }
  };

  const writeStorage = (storage, key, value) => {
    try { storage.setItem(key, value); } catch {}
  };

  const removeStorage = (storage, key) => {
    try { storage.removeItem(key); } catch {}
  };

  if (!isConfigured) {
    if (settingsButton) settingsButton.hidden = true;
    if (banner) banner.hidden = true;
    return;
  }

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };
  window.gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
  window.gtag('set', 'ads_data_redaction', true);

  const getCampaign = () => {
    const current = new URLSearchParams(window.location.search);
    const keys = {
      utm_id: 'campaign_id',
      utm_source: 'campaign_source',
      utm_medium: 'campaign_medium',
      utm_campaign: 'campaign_name',
      utm_term: 'campaign_term',
      utm_content: 'campaign_content'
    };
    const found = Object.entries(keys).reduce((result, [queryKey, eventKey]) => {
      const value = current.get(queryKey);
      if (value) result[eventKey] = value.slice(0, 100);
      return result;
    }, {});

    if (Object.keys(found).length) {
      writeStorage(window.sessionStorage, campaignKey, JSON.stringify(found));
      return found;
    }

    try {
      return JSON.parse(readStorage(window.sessionStorage, campaignKey) || '{}');
    } catch {
      return {};
    }
  };

  const loadGoogleTag = () => {
    if (googleTagLoaded) return;
    googleTagLoaded = true;
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', measurementId, {
      send_page_view: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      content_group: getPageType(),
      transport_type: 'beacon'
    });
  };

  const hideBanner = () => {
    if (banner) banner.hidden = true;
    document.body.classList.remove('consent-open');
  };

  const showBanner = () => {
    if (!banner) return;
    banner.hidden = false;
    document.body.classList.add('consent-open');
  };

  const updateConsent = (choice) => {
    consentState = choice;
    writeStorage(window.localStorage, consentKey, choice);
    const granted = choice === 'granted';
    window.gtag('consent', 'update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    if (granted) {
      getCampaign();
      loadGoogleTag();
    } else {
      removeStorage(window.sessionStorage, campaignKey);
    }
    hideBanner();
  };

  const track = (eventName, parameters = {}) => {
    if (consentState !== 'granted') return;
    window.gtag('event', eventName, {
      page_language: document.documentElement.lang || 'tr',
      page_type: getPageType(),
      ...getCampaign(),
      ...parameters
    });
  };

  const storedConsent = readStorage(window.localStorage, consentKey);
  if (storedConsent === 'granted') {
    consentState = 'granted';
    window.gtag('consent', 'update', {
      analytics_storage: 'granted',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    getCampaign();
    loadGoogleTag();
  } else if (storedConsent === 'denied') {
    consentState = 'denied';
  } else {
    showBanner();
  }

  acceptButton?.addEventListener('click', () => updateConsent('granted'));
  rejectButton?.addEventListener('click', () => updateConsent('denied'));
  settingsButton?.addEventListener('click', showBanner);

  document.addEventListener('click', (event) => {
    const eventTarget = event.target instanceof Element ? event.target : event.target?.parentElement;
    const link = eventTarget?.closest('a,button');
    if (!link) return;
    const href = link.getAttribute('href') || '';
    const conversion = link.dataset.conversion || '';

    if (conversion.startsWith('whatsapp-') || href.includes('wa.me/')) {
      track('generate_lead', {
        method: 'whatsapp',
        placement: conversion.replace('whatsapp-', '') || 'link'
      });
      return;
    }

    if (href.startsWith('tel:')) {
      track('contact', { method: 'phone', placement: link.closest('footer') ? 'footer' : 'contact' });
      return;
    }

    if (href.startsWith('mailto:')) {
      track('contact', { method: 'email', placement: link.closest('footer') ? 'footer' : 'contact' });
      return;
    }

    if (href.includes('instagram.com/mefyapitr')) {
      track('select_content', { content_type: 'social', item_id: 'instagram' });
      return;
    }

    if (href.includes('mefyapitr.com')) {
      track('select_content', { content_type: 'corporate_website', item_id: 'mef_yapi' });
      return;
    }

    if (href.includes('google.com/maps')) {
      track('select_content', { content_type: 'location', item_id: 'project_map' });
      return;
    }

    const ctaItems = {
      'hero-info': 'hero_info',
      'header-info': 'header_info',
      'mobile-info': 'mobile_info',
      'faq-contact': 'faq_contact'
    };
    if (ctaItems[conversion]) {
      track('select_content', { content_type: 'cta', item_id: ctaItems[conversion] });
    }
  });

  document.querySelectorAll('.faq details').forEach((details, index) => {
    details.addEventListener('toggle', () => {
      if (details.open) track('select_content', { content_type: 'faq', item_id: `faq_${index + 1}` });
    });
  });

  window.addEventListener('liora:language-change', (event) => {
    track('language_change', { language: event.detail?.language || document.documentElement.lang });
  });

  const availability = document.querySelector('.availability');
  if (availability && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry], currentObserver) => {
      if (!entry.isIntersecting) return;
      track('view_promotion', {
        promotion_id: 'last_4_residences',
        promotion_name: 'Liora Ortaca — Son 4 Daire'
      });
      currentObserver.disconnect();
    }, { threshold: 0.5 });
    observer.observe(availability);
  }

  window.LioraAnalytics = Object.freeze({
    track,
    openPreferences: showBanner
  });
})();
