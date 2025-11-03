import { NextResponse } from 'next/server';

// --- Config helpers -------------------------------------------------------

function normalizeDomain(domain) {
  if (!domain || typeof domain !== 'string') return '';
  return domain
    .trim()
    .toLowerCase()
    .replace(/^www\./, '');
}

function parseUrl(raw) {
  if (!raw || typeof raw !== 'string') return null;
  try {
    const withProto = /^(https?:)?\/\//i.test(raw) ? raw : `http://${raw}`;
    return new URL(withProto);
  } catch {
    return null;
  }
}

function getDomainsConfig() {
  const oldEnv = process.env.OLD_WEBSITE_DOMAINS || '';
  const oldDomains = oldEnv
    .split(',')
    .map((d) => normalizeDomain(d))
    .filter(Boolean);
  const defaultOld = ['medicalterpenes.com', 'medical-terpenes.com'];
  const finalOld = oldDomains.length ? oldDomains : defaultOld;

  const newDomainRaw = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_DOMAIN || 'localhost';
  const parsed = parseUrl(newDomainRaw);
  const newHost = parsed ? parsed.hostname : newDomainRaw;
  const newDomain = normalizeDomain(newHost);

  return { oldDomains: finalOld, newDomain, rawNew: newDomainRaw };
}

// --- Decision logic -------------------------------------------------------

function evaluateSource(candidateUrl) {
  const { oldDomains, rawNew } = getDomainsConfig();

  if (!candidateUrl) {
    return {
      isFromOldWebsite: false,
      matchedDomain: null,
      isFromNewWebsite: false,
      url: null,
      newWebsiteDomain: rawNew,
    };
  }

  const parsed = parseUrl(candidateUrl);
  const utmSource = parsed?.searchParams.get('utm_source')?.toLowerCase() || '';
  const utmSourceNorm = normalizeDomain(utmSource);

  // Only consider utm_source for old-site detection
  for (const d of oldDomains) {
    if (utmSourceNorm === d || utmSourceNorm.endsWith(d)) {
      return {
        isFromOldWebsite: true,
        matchedDomain: d,
        isFromNewWebsite: false,
        url: candidateUrl,
        newWebsiteDomain: rawNew,
      };
    }
  }

  // Neutral (no utm_source match)
  return {
    isFromOldWebsite: false,
    matchedDomain: null,
    isFromNewWebsite: false,
    url: candidateUrl,
    newWebsiteDomain: rawNew,
  };
}

// --- Handlers -------------------------------------------------------------

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');
    const fallbackReferer = request.headers.get('referer') || request.headers.get('referrer') || '';
    const candidate = url || fallbackReferer;

    if (!candidate) {
      return NextResponse.json(
        {
          error: 'Provide ?url=... or ensure Referer header is present',
          ...evaluateSource(''),
        },
        { status: 400 },
      );
    }

    const result = evaluateSource(candidate);
    const isFromMedicalTerpenes = result.isFromOldWebsite && result.matchedDomain?.includes('medicalterpenes');

    return NextResponse.json({ ...result, isFromMedicalTerpenes });
  } catch (error) {
    console.error('check-referrer GET error', error);
    return NextResponse.json({ error: 'Failed to check referrer' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json().catch(() => ({}));
    const url = body?.url || body?.referer || body?.referrer || '';

    if (!url) {
      return NextResponse.json(
        {
          error: 'Body must include { url: "..." }',
          ...evaluateSource(''),
        },
        { status: 400 },
      );
    }

    const result = evaluateSource(url);
    const isFromMedicalTerpenes = result.isFromOldWebsite && result.matchedDomain?.includes('medicalterpenes');
    return NextResponse.json({ ...result, isFromMedicalTerpenes });
  } catch (error) {
    console.error('check-referrer POST error', error);
    return NextResponse.json({ error: 'Failed to check referrer' }, { status: 500 });
  }
}
