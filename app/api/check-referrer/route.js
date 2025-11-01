import { NextResponse } from 'next/server';

// Old website domains list (can be configured via environment variable)
const getOldWebsiteDomains = () => {
  const envDomains = process.env.OLD_WEBSITE_DOMAINS;
  if (envDomains) {
    return envDomains
      .split(',')
      .map((domain) => domain.trim().toLowerCase())
      .filter(Boolean);
  }

  // Default fallback list
  return ['medicalterpenes.com', 'www.medicalterpenes.com', 'medical-terpenes.com'];
};

// Current/new website domain
const NEW_WEBSITE_DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_DOMAIN || 'loudspectrum.com';

/**
 * Checks if the provided URL is from an old website
 * @param {string} url - The URL string to check
 * @returns {Object} - Object containing match information
 */
function checkOldWebsite(url) {
  if (!url || typeof url !== 'string') {
    return {
      isFromOldWebsite: false,
      matchedDomain: null,
      url: null,
    };
  }

  const oldWebsiteDomains = getOldWebsiteDomains();
  const normalizedUrl = url.toLowerCase();

  // Check if URL matches any old website domain
  for (const domain of oldWebsiteDomains) {
    if (normalizedUrl.includes(domain)) {
      return {
        isFromOldWebsite: true,
        matchedDomain: domain,
        url: url,
      };
    }
  }

  // Check if URL is from the new website
  const normalizedNewDomain = NEW_WEBSITE_DOMAIN.toLowerCase();
  if (normalizedUrl.includes(normalizedNewDomain)) {
    return {
      isFromOldWebsite: false,
      matchedDomain: null,
      url: url,
      isFromNewWebsite: true,
    };
  }

  return {
    isFromOldWebsite: false,
    matchedDomain: null,
    url: url,
  };
}

export async function GET(request) {
  try {
    // Get URL from query parameter
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    // If no URL provided in query, check referer header for backward compatibility
    const urlToCheck = url || request.headers.get('referer') || request.headers.get('referrer') || '';

    if (!urlToCheck) {
      return NextResponse.json(
        {
          error: 'URL parameter is required. Usage: /api/check-referrer?url=your-url-here',
          isFromOldWebsite: false,
          isFromMedicalTerpenes: false,
        },
        { status: 400 },
      );
    }

    // Check if URL matches any old website
    const result = checkOldWebsite(urlToCheck);

    // Maintain backward compatibility
    const isFromMedicalTerpenes = result.isFromOldWebsite && result.matchedDomain?.includes('medicalterpenes');

    return NextResponse.json({
      isFromOldWebsite: result.isFromOldWebsite,
      matchedDomain: result.matchedDomain,
      isFromNewWebsite: result.isFromNewWebsite || false,
      isFromMedicalTerpenes,
      url: result.url,
      newWebsiteDomain: NEW_WEBSITE_DOMAIN,
    });
  } catch (error) {
    console.error('Error checking referrer:', error);
    return NextResponse.json(
      {
        error: 'Failed to check referrer',
        isFromOldWebsite: false,
        isFromMedicalTerpenes: false,
      },
      { status: 500 },
    );
  }
}

// Also support POST request with URL in body
export async function POST(request) {
  try {
    const body = await request.json();
    const url = body?.url || body?.referer || body?.referrer || '';

    if (!url) {
      return NextResponse.json(
        {
          error: 'URL is required in request body. Example: {"url": "medicalterpenes.com"}',
          isFromOldWebsite: false,
          isFromMedicalTerpenes: false,
        },
        { status: 400 },
      );
    }

    // Check if URL matches any old website
    const result = checkOldWebsite(url);

    // Maintain backward compatibility
    const isFromMedicalTerpenes = result.isFromOldWebsite && result.matchedDomain?.includes('medicalterpenes');

    return NextResponse.json({
      isFromOldWebsite: result.isFromOldWebsite,
      matchedDomain: result.matchedDomain,
      isFromNewWebsite: result.isFromNewWebsite || false,
      isFromMedicalTerpenes,
      url: result.url,
      newWebsiteDomain: NEW_WEBSITE_DOMAIN,
    });
  } catch (error) {
    console.error('Error checking referrer:', error);
    return NextResponse.json(
      {
        error: 'Failed to check referrer',
        isFromOldWebsite: false,
        isFromMedicalTerpenes: false,
      },
      { status: 500 },
    );
  }
}
