import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');
const assert = (condition, message) => {
  if (!condition) throw new Error(message);
};

const pages = ['index.html', 'en/index.html', 'mugla-ortaca-satilik-daire.html', 'privacy.html', '404.html'];
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
  [...html.matchAll(/\/assets\/([^"'\s,)]+)/gi)].forEach((match) => {
    assert(fs.existsSync(path.join(root, 'assets', match[1])), `${file}: missing asset /assets/${match[1]}`);
  });
});

const home = read('index.html');
const englishHome = read('en/index.html');
const salesPage = read('mugla-ortaca-satilik-daire.html');
const privacy = read('privacy.html');
const notFound = read('404.html');
const vercel = JSON.parse(read('vercel.json'));
JSON.parse(read('manifest.webmanifest'));

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

console.log(`Verified ${pages.length} pages, metadata, links, images, CSP, robots and sitemap.`);
