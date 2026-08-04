import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const pages = ['index.html', 'en/index.html', 'mugla-ortaca-satilik-daire.html', 'privacy.html', 'cookies.html', '404.html'];
pages.forEach((file) => {
  const html = read(file);
  assert((html.match(/<h1\b/gi) || []).length === 1, `${file}: exactly one H1 is required`);
  const ids = [...html.matchAll(/\bid="([^"]+)"/gi)].map((match) => match[1]);
  assert(new Set(ids).size === ids.length, `${file}: duplicate IDs are present`);
  [...html.matchAll(/\bhref="#([^"]+)"/gi)].forEach((match) => {
    assert(ids.includes(match[1]), `${file}: missing anchor target #${match[1]}`);
  });
  (html.match(/<img\b[^>]*>/gi) || []).forEach((image) => {
    assert(/\bwidth="\d+"/i.test(image) && /\bheight="\d+"/i.test(image), `${file}: image dimensions are missing`);
  });
  (html.match(/<a\b[^>]*target="_blank"[^>]*>/gi) || []).forEach((link) => {
    assert(/\brel="[^"]*noopener/i.test(link), `${file}: target=_blank link is missing noopener`);
  });
  assert(html.includes('href="/favicon.ico"'), `${file}: root favicon.ico link is missing`);
  assert(html.includes('href="/assets/favicon-96.png"'), `${file}: 96px PNG favicon link is missing`);
  assert(html.includes('href="/assets/apple-touch-icon.png"'), `${file}: Apple Touch icon link is missing`);
  const head = html.match(/<head>[\s\S]*?<\/head>/i)?.[0] || '';
  assert(head.includes('/site-config.js?v=20260804a1'), `${file}: production config must load in the head`);
  assert(head.includes('/analytics.js?v=20260804a1'), `${file}: GA4 bootstrap must load in the head`);
  assert(/<script[^>]+\/analytics\.js\?v=20260804a1[^>]+defer/i.test(head), `${file}: GA4 bootstrap must not block rendering`);
  assert(head.indexOf('/site-config.js') < head.indexOf('/analytics.js'), `${file}: GA4 config must load before analytics bootstrap`);
  assert((html.match(/\/analytics\.js\?v=/g) || []).length === 1, `${file}: Analytics must load exactly once`);
  [...html.matchAll(/\/assets\/([^"'\s,)]+)/gi)].forEach((match) => {
    assert(fs.existsSync(path.join(root, 'assets', match[1])), `${file}: missing asset /assets/${match[1]}`);
  });
});

const home = read('index.html');
const englishHome = read('en/index.html');
const salesPage = read('mugla-ortaca-satilik-daire.html');
const privacy = read('privacy.html');
const cookies = read('cookies.html');
const notFound = read('404.html');
const vercel = JSON.parse(read('vercel.json'));
const manifest = JSON.parse(read('manifest.webmanifest'));

[
  ['Turkish home', home],
  ['English home', englishHome],
  ['Sales landing', salesPage]
].forEach(([label, html]) => {
  ['name="description"', 'name="robots"', 'property="og:title"', 'name="twitter:card"', 'id="metaDescription"']
    .forEach((token) => assert(html.includes(token), `${label}: missing ${token}`));
  assert(html.includes('data-count="4"'), `${label}: availability count is missing`);
  assert(html.includes('data-conversion="whatsapp-floating"'), `${label}: floating WhatsApp conversion marker is missing`);
  assert((html.match(/<details>/g) || []).length === 4, `${label}: four FAQ items are required`);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || '';
  const descriptionTag = html.match(/<meta[^>]*name="description"[^>]*>/i)?.[0] || '';
  const description = descriptionTag.match(/content="([^"]*)"/i)?.[1] || '';
  assert(title.length >= 30 && title.length <= 65, `${label}: title length is outside the recommended range`);
  assert(description.length >= 120 && description.length <= 170, `${label}: description length is outside the recommended range`);
  assert((html.match(/rel="stylesheet"/g) || []).length === 1, `${label}: marketing pages must load one stylesheet`);
  assert(html.includes('/app.css?v='), `${label}: optimized CSS bundle is missing`);
  assert(!html.includes('fonts.googleapis.com') && !html.includes('fonts.gstatic.com'), `${label}: third-party font chain is present`);
  assert(html.includes('type="image/avif"') && html.includes('imagesrcset='), `${label}: responsive AVIF preload is missing`);
  assert(/loading="eager"[^>]*fetchpriority="high"/i.test(html), `${label}: LCP image priority is incomplete`);
  assert(/loading="lazy"[^>]*fetchpriority="low"/i.test(html), `${label}: contact image must be lazy and low priority`);
  assert(!html.includes('id="consentBanner"') && !html.includes('id="cookieSettings"'), `${label}: obsolete consent interface remains`);
  assert(/<iframe[^>]*\ssrc="https:\/\/www\.google\.com\/maps/i.test(html), `${label}: always-on Google Maps embed is missing`);
  assert(!html.includes('data-map-src') && !html.includes('data-map-load'), `${label}: obsolete map consent gate remains`);
});

assert(englishHome.includes('<html lang="en">'), 'English page language is incorrect');
assert(englishHome.includes('Follow the light.'), 'English page was not pre-rendered');
assert(home.includes('/assets/liora-social.jpg') && fs.existsSync(path.join(root, 'assets', 'liora-social.jpg')), 'Optimized social image is missing');
assert(salesPage.includes('<html lang="tr">'), 'Sales landing language is incorrect');
assert(salesPage.includes('Muğla Ortaca’da') && salesPage.includes('data-count="4"'), 'Sales landing content is incomplete');
assert((salesPage.match(/<details>/g) || []).length === 4, 'Sales landing must contain four FAQ items');
assert(salesPage.includes('https://www.lioraortaca.com/mugla-ortaca-satilik-daire'), 'Sales landing canonical metadata is missing');
assert(!salesPage.includes('hreflang="en"'), 'Turkish-only sales landing must not advertise an English alternate');
assert(privacy.includes('data-language-content="tr"') && privacy.includes('data-language-content="en"'), 'Privacy translations are incomplete');
assert(privacy.includes('content="noindex,follow'), 'Privacy page must remain noindex');
assert(privacy.includes('KVKK m.11') && privacy.includes('KVKK m.9'), 'Privacy notice legal grounds or rights are incomplete');
assert(cookies.includes('data-language-content="tr"') && cookies.includes('data-language-content="en"'), 'Cookie policy translations are incomplete');
assert(cookies.includes('content="noindex,follow'), 'Cookie policy must remain noindex');
assert(!cookies.includes('liora-consent-v2') && !cookies.includes('liora-campaign-v1'), 'Obsolete consent or campaign storage remains in the cookie inventory');
assert(cookies.includes('<code>_ga</code>') && cookies.includes('<code>_ga_*</code>'), 'Analytics cookie inventory is incomplete');
assert(cookies.includes('En çok 6 ay') && cookies.includes('Up to 6 months'), 'Analytics cookie retention disclosure is incomplete');
assert(cookies.includes('G-6PJERQFXEK'), 'Configured GA4 ID is missing from the cookie disclosure');
assert(!privacy.includes('id="consentBanner"') && !cookies.includes('id="consentBanner"'), 'Legal pages must not display a consent prompt');
const analytics = read('analytics.js');
assert(!analytics.includes('localStorage') && !analytics.includes('sessionStorage'), 'Analytics must not persist consent or campaign identifiers');
assert(analytics.includes("analytics_storage: 'granted'"), 'Analytics storage must be enabled for standard GA4 reporting');
assert(analytics.includes("ad_storage: 'denied'") && analytics.includes("ad_user_data: 'denied'") && analytics.includes("ad_personalization: 'denied'"), 'Advertising consent signals must remain denied');
assert(analytics.includes("allow_google_signals: false") && analytics.includes("allow_ad_personalization_signals: false"), 'Google Signals or ad personalization is not disabled');
assert(analytics.includes('cookie_expires: 15552000') && analytics.includes('cookie_update: false'), 'Analytics cookie lifetime controls are incomplete');
assert(analytics.includes("new Set(['lioraortaca.com', 'www.lioraortaca.com'])"), 'GA4 must be restricted to production hosts');
assert(read('site-config.js').includes("ga4MeasurementId: 'G-6PJERQFXEK'"), 'Production GA4 measurement ID is not configured');
assert(notFound.includes('content="noindex,follow"'), '404 page must remain noindex');
assert(vercel.cleanUrls === true && vercel.trailingSlash === false, 'Vercel canonical URL settings are incomplete');
assert(!JSON.stringify(vercel).includes("'unsafe-inline'"), 'CSP must not allow unsafe inline scripts');
assert(!JSON.stringify(vercel).includes('fonts.googleapis.com'), 'CSP must not allow unused third-party font styles');
assert(read('app.css').includes('/assets/fonts/playfair-normal-latin.woff2'), 'Self-hosted font bundle is incomplete');
assert(!/background-image:url\(['"]?\/?assets\/liora-(?:facade|corner|masterplan)\.(?:png|webp)/i.test(read('app.css')), 'Legacy eager image backgrounds remain in the CSS bundle');
assert(read('precision.css').includes('.grain{display:none}'), 'Mobile paint optimization is missing');
assert(JSON.stringify(vercel).includes('max-age=31536000, immutable'), 'Immutable production cache headers are missing');
assert(read('api/robots.js').includes("VERCEL_ENV === 'preview'"), 'Preview indexing protection is missing');
assert(read('api/sitemap.js').includes('homeEn'), 'English sitemap URL is missing');
assert(read('api/sitemap.js').includes('salesTr'), 'Sales landing sitemap URL is missing');
assert(read('api/sitemap.js').includes('xmlns:image'), 'Image sitemap namespace is missing');
assert(read('site-config.js').includes("siteUrl: 'https://www.lioraortaca.com'"), 'Canonical production domain is not configured');
assert(fs.existsSync(path.join(root, '0df6914d2e91b1442f60a77c4c937d72.txt')), 'IndexNow key file is missing');
['favicon.ico', 'assets/favicon-48.png', 'assets/favicon-96.png', 'assets/apple-touch-icon.png', 'assets/icon-192.png', 'assets/icon-512.png', 'assets/icon-maskable-512.png']
  .forEach((file) => assert(fs.existsSync(path.join(root, file)), `Favicon asset is missing: ${file}`));
assert(manifest.icons.some((icon) => icon.src === '/assets/icon-192.png' && icon.sizes === '192x192'), '192px manifest icon is missing');
assert(manifest.icons.some((icon) => icon.src === '/assets/icon-512.png' && icon.sizes === '512x512'), '512px manifest icon is missing');
assert(manifest.icons.some((icon) => icon.src === '/assets/icon-maskable-512.png' && icon.purpose === 'maskable'), 'Maskable manifest icon is missing');

console.log(`Verified ${pages.length} pages, metadata, links, images, CSP, robots and sitemap.`);
