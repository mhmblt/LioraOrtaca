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

module.exports = (request, response) => {
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    response.statusCode = 405;
    response.end();
    return;
  }

  const origin = resolveSiteOrigin(request);
  const isPreview = process.env.VERCEL_ENV === 'preview';
  const lines = isPreview
    ? ['User-agent: *', 'Disallow: /']
    : ['User-agent: *', 'Allow: /', 'Disallow: /api/', '', `Sitemap: ${origin}/sitemap.xml`];
  const body = `${lines.join('\n')}\n`;

  response.statusCode = 200;
  response.setHeader('Content-Type', 'text/plain; charset=utf-8');
  response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400');
  response.end(request.method === 'HEAD' ? undefined : body);
};
