const siteOrigin = 'https://www.lioraortaca.com';
const host = 'www.lioraortaca.com';
const key = '0df6914d2e91b1442f60a77c4c937d72';
const urls = [
  `${siteOrigin}/`,
  `${siteOrigin}/en`,
  `${siteOrigin}/mugla-ortaca-satilik-daire`
];

const keyLocation = `${siteOrigin}/${key}.txt`;
const keyResponse = await fetch(keyLocation, { method: 'GET' });
if (!keyResponse.ok || (await keyResponse.text()).trim() !== key) {
  throw new Error(`IndexNow anahtarı canlı sitede doğrulanamadı: ${keyLocation}`);
}

const response = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({
    host,
    key,
    keyLocation,
    urlList: urls
  })
});

if (!response.ok) {
  throw new Error(`IndexNow gönderimi başarısız: HTTP ${response.status} ${await response.text()}`);
}

console.log(`IndexNow: ${urls.length} canonical URL gönderildi.`);
