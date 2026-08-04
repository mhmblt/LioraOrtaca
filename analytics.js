(() => {
  const config = window.LIORA_CONFIG || {};
  const measurementId = String(config.ga4MeasurementId || '').trim().toUpperCase();
  const analyticsConfigured = /^G-[A-Z0-9]+$/.test(measurementId);
  const productionHosts = new Set(['lioraortaca.com', 'www.lioraortaca.com']);
  const isProduction = productionHosts.has(window.location.hostname);
  const debugMode = new URLSearchParams(window.location.search).get('ga_debug') === '1';

  const getPageType = () => {
    const path = window.location.pathname.replace(/\.html$/, '').replace(/\/$/, '') || '/';
    if (path === '/mugla-ortaca-satilik-daire') return 'sales_landing';
    if (path === '/en' || path === '/en/index') return 'project_home_en';
    if (path === '/privacy') return 'privacy_notice';
    if (path === '/cookies') return 'cookie_policy';
    if (path === '/' || path === '/index') return 'project_home_tr';
    return 'other';
  };

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
    return Object.entries(keys).reduce((result, [queryKey, eventKey]) => {
      const value = current.get(queryKey);
      if (value) result[eventKey] = value.slice(0, 100);
      return result;
    }, {});
  };

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function gtag() { window.dataLayer.push(arguments); };

  /*
   * GA4 audience measurement is enabled on the production domain. Advertising
   * storage, Signals and personalisation remain disabled independently.
   */
  window.gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    personalization_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted'
  });
  window.gtag('set', 'ads_data_redaction', true);
  window.gtag('set', 'url_passthrough', false);

  if (!analyticsConfigured || !isProduction) {
    window.LioraAnalytics = Object.freeze({ enabled: false, track: () => {} });
    return;
  }

  const googleTag = document.createElement('script');
  googleTag.id = 'liora-google-tag';
  googleTag.async = true;
  googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(googleTag);
  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    debug_mode: debugMode,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    cookie_expires: 15552000,
    cookie_flags: 'SameSite=Lax;Secure',
    cookie_update: false,
    content_group: getPageType()
  });

  const track = (eventName, parameters = {}) => {
    window.gtag('event', eventName, {
      page_language: document.documentElement.lang || 'tr',
      page_type: getPageType(),
      ...getCampaign(),
      ...parameters
    });
  };

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

  const bindContentEvents = () => {
    document.querySelectorAll('.faq details').forEach((details, index) => {
      details.addEventListener('toggle', () => {
        if (details.open) track('select_content', { content_type: 'faq', item_id: `faq_${index + 1}` });
      });
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
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bindContentEvents, { once: true });
  else bindContentEvents();

  window.addEventListener('liora:language-change', (event) => {
    track('language_change', { language: event.detail?.language || document.documentElement.lang });
  });

  window.LioraAnalytics = Object.freeze({ enabled: true, track });
})();
