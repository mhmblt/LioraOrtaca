const CANONICAL_ORIGIN = 'https://www.lioraortaca.com';

const normalizeOrigin = (value, defaultProtocol = 'https') => {
  if (!value) return '';
  const candidate = String(value).split(',')[0].trim();
  if (!candidate) return '';
  const withProtocol = /^https?:\/\//i.test(candidate) ? candidate : `${defaultProtocol}://${candidate}`;
  try {
    const url = new URL(withProtocol);
    const validProtocol = url.protocol === 'https:' || url.protocol === 'http:';
    const validHostname = /^(?:localhost|[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?)$/i.test(url.hostname);
    const validPort = !url.port || /^\d{1,5}$/.test(url.port);
    if (!validProtocol || !validHostname || !validPort || url.username || url.password) return '';
    return url.origin;
  } catch {
    return '';
  }
};

const resolveSiteOrigin = (request) => {
  if (process.env.VERCEL_ENV === 'production') return CANONICAL_ORIGIN;
  const configured = normalizeOrigin(process.env.SITE_URL);
  if (configured) return configured;
  const forwardedProtocol = String(request.headers['x-forwarded-proto'] || '').split(',')[0].trim();
  const protocol = forwardedProtocol === 'http' || forwardedProtocol === 'https'
    ? forwardedProtocol
    : (process.env.NODE_ENV === 'development' ? 'http' : 'https');
  return normalizeOrigin(request.headers['x-forwarded-host'] || request.headers.host, protocol) || CANONICAL_ORIGIN;
};

const escapeXml = (value) => String(value)
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll("'", '&apos;');

module.exports = (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    response.statusCode = 405;
    response.end();
    return;
  }

  const origin = resolveSiteOrigin(request);
  const homeTr = `${origin}/`;
  const homeEn = `${origin}/en`;
  const salesTr = `${origin}/mugla-ortaca-satilik-daire`;
  const projectImages = [
    `${origin}/assets/liora-corner.webp`,
    `${origin}/assets/liora-facade.webp`,
    `${origin}/assets/liora-aerial.webp`,
    `${origin}/assets/liora-masterplan.webp`
  ];
  const imageTags = (images) => images.flatMap((image) => [
    '    <image:image>',
    `      <image:loc>${escapeXml(image)}</image:loc>`,
    '    </image:image>'
  ]);
  const localizedPage = (location, tr, en, images = []) => [
    '  <url>',
    `    <loc>${escapeXml(location)}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(tr)}" />`,
    `    <xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(tr)}" />`,
    ...imageTags(images),
    '  </url>'
  ].join('\n');

  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    localizedPage(homeTr, homeTr, homeEn, projectImages),
    localizedPage(homeEn, homeTr, homeEn, projectImages),
    '  <url>',
    `    <loc>${escapeXml(salesTr)}</loc>`,
    `    <xhtml:link rel="alternate" hreflang="tr" href="${escapeXml(salesTr)}" />`,
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(salesTr)}" />`,
    ...imageTags(projectImages),
    '  </url>',
    '</urlset>',
    ''
  ].join('\n');

  response.statusCode = 200;
  response.setHeader('Content-Type', 'application/xml; charset=utf-8');
  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  response.end(request.method === 'HEAD' ? undefined : body);
};
