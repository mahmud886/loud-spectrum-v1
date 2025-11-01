# Check Referrer API Reference

This API checks if a URL is from an old website to determine if a rebranding popup should be shown.

## Base URL

```
/api/check-referrer
```

## Endpoints

### GET Request

Check if a URL is from an old website using query parameters.

**Endpoint:** `GET /api/check-referrer?url={url}`

#### Example Requests

```bash
# Using curl
curl "http://localhost:3000/api/check-referrer?url=https://medicalterpenes.com/page"

# Using fetch in JavaScript
const response = await fetch('/api/check-referrer?url=https://medicalterpenes.com/page');
const data = await response.json();

# Using fetch with URL encoding
const url = encodeURIComponent('https://medicalterpenes.com/page');
const response = await fetch(`/api/check-referrer?url=${url}`);
const data = await response.json();
```

#### Query Parameters

| Parameter | Type   | Required | Description      |
| --------- | ------ | -------- | ---------------- |
| `url`     | string | No\*     | The URL to check |

\* If `url` is not provided, the API will check the `Referer` header from the request.

#### Response (Success - Old Website Detected)

```json
{
  "isFromOldWebsite": true,
  "matchedDomain": "medicalterpenes.com",
  "isFromNewWebsite": false,
  "isFromMedicalTerpenes": true,
  "url": "https://medicalterpenes.com/page",
  "newWebsiteDomain": "loudspectrum.com"
}
```

#### Response (Success - New Website)

```json
{
  "isFromOldWebsite": false,
  "matchedDomain": null,
  "isFromNewWebsite": true,
  "isFromMedicalTerpenes": false,
  "url": "https://loudspectrum.com",
  "newWebsiteDomain": "loudspectrum.com"
}
```

#### Response (Success - No Match)

```json
{
  "isFromOldWebsite": false,
  "matchedDomain": null,
  "isFromNewWebsite": false,
  "isFromMedicalTerpenes": false,
  "url": "https://example.com",
  "newWebsiteDomain": "loudspectrum.com"
}
```

#### Response (Error - Missing URL)

```json
{
  "error": "URL parameter is required. Usage: /api/check-referrer?url=your-url-here",
  "isFromOldWebsite": false,
  "isFromMedicalTerpenes": false
}
```

**Status Code:** `400 Bad Request`

---

### POST Request

Check if a URL is from an old website using JSON body.

**Endpoint:** `POST /api/check-referrer`

#### Example Requests

```bash
# Using curl
curl -X POST http://localhost:3000/api/check-referrer \
  -H "Content-Type: application/json" \
  -d '{"url": "https://medicalterpenes.com/page"}'

# Using fetch in JavaScript
const response = await fetch('/api/check-referrer', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://medicalterpenes.com/page',
  }),
});
const data = await response.json();
```

#### Request Body

```json
{
  "url": "https://medicalterpenes.com/page"
}
```

**Alternative field names:** `referer` or `referrer` are also accepted.

#### Response

Same as GET request responses.

---

## Response Fields

| Field                   | Type    | Description                                         |
| ----------------------- | ------- | --------------------------------------------------- |
| `isFromOldWebsite`      | boolean | `true` if URL matches any old website domain        |
| `matchedDomain`         | string  | The matched old website domain (null if no match)   |
| `isFromNewWebsite`      | boolean | `true` if URL is from the new website               |
| `isFromMedicalTerpenes` | boolean | `true` if matched domain contains 'medicalterpenes' |
| `url`                   | string  | The URL that was checked                            |
| `newWebsiteDomain`      | string  | The new website domain (from config)                |
| `error`                 | string  | Error message (only present on errors)              |

---

## Configuration

### Environment Variables

Add to your `.env.local` or `.env.production` file:

```bash
# Comma-separated list of old website domains
OLD_WEBSITE_DOMAINS=medicalterpenes.com,www.medicalterpenes.com,old-site.com

# New website domain (optional, defaults to loudspectrum.com)
NEXT_PUBLIC_SITE_URL=loudspectrum.com
# or
NEXT_PUBLIC_DOMAIN=loudspectrum.com
```

If `OLD_WEBSITE_DOMAINS` is not set, it defaults to:

- `medicalterpenes.com`
- `www.medicalterpenes.com`
- `medical-terpenes.com`

---

## Usage Examples

### Example 1: Frontend Component (React)

```jsx
'use client';

import { useEffect, useState } from 'react';

const RebrandingPopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkReferrer = async () => {
      try {
        // Get referrer from window
        const referrer = document.referrer || window.location.href;

        // Call API with the referrer URL
        const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(referrer)}`);
        const data = await response.json();

        if (data.isFromOldWebsite && !data.isFromNewWebsite) {
          const hasSeenPopup = localStorage.getItem('rebranding-popup-seen');
          if (!hasSeenPopup) {
            setShowPopup(true);
          }
        }
      } catch (error) {
        console.error('Error checking referrer:', error);
      }
    };

    checkReferrer();
  }, []);

  if (!showPopup) return null;

  return (
    <div className="popup">
      <h2>Welcome to Loud Spectrum!</h2>
      <p>We've rebranded from Medical Terpenes...</p>
      <button
        onClick={() => {
          setShowPopup(false);
          localStorage.setItem('rebranding-popup-seen', 'true');
        }}
      >
        Got it!
      </button>
    </div>
  );
};

export default RebrandingPopup;
```

### Example 2: Server-Side Check (Next.js API Route)

```javascript
// app/api/some-route/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
  const referer = request.headers.get('referer') || '';

  // Check if user came from old website
  const checkResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL}/api/check-referrer?url=${encodeURIComponent(referer)}`,
  );
  const checkData = await checkResponse.json();

  if (checkData.isFromOldWebsite) {
    // Show special message or redirect
    return NextResponse.json({
      message: 'Welcome from our old website!',
      showRebrandingNotice: true,
    });
  }

  return NextResponse.json({ message: 'Welcome!' });
}
```

### Example 3: Using POST Request

```javascript
async function checkUrl(url) {
  const response = await fetch('/api/check-referrer', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url }),
  });

  const data = await response.json();
  return data;
}

// Usage
const result = await checkUrl('https://medicalterpenes.com/page');
console.log('Is from old website:', result.isFromOldWebsite);
console.log('Matched domain:', result.matchedDomain);
```

### Example 4: Testing with Different URLs

```javascript
// Test function
async function testUrls() {
  const testUrls = [
    'https://medicalterpenes.com',
    'https://www.medicalterpenes.com/page',
    'https://loudspectrum.com',
    'https://example.com',
  ];

  for (const url of testUrls) {
    const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(url)}`);
    const data = await response.json();
    console.log(`URL: ${url}`);
    console.log(`Is Old Website: ${data.isFromOldWebsite}`);
    console.log(`Matched: ${data.matchedDomain}`);
    console.log('---');
  }
}
```

---

## Integration with Existing RebrandingPopup Component

The existing `RebrandingPopup` component already uses this API. Here's how it works:

```jsx
// components/RebrandingPopup.jsx
useEffect(() => {
  const checkReferrer = async () => {
    try {
      // API checks referer header automatically if no URL param
      const response = await fetch('/api/check-referrer');
      const data = await response.json();

      // Use the new dynamic flag
      const shouldShowPopup = data.isFromOldWebsite || data.isFromMedicalTerpenes;

      if (shouldShowPopup && !data.isFromNewWebsite) {
        const hasSeenPopup = localStorage.getItem('rebranding-popup-seen');
        if (!hasSeenPopup) {
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error checking referrer:', error);
    }
  };

  checkReferrer();
}, []);
```

---

## Error Handling

Always handle errors when calling the API:

```javascript
async function safeCheckReferrer(url) {
  try {
    const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(url)}`);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.error) {
      console.error('API Error:', data.error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Network or other error:', error);
    // Return safe default
    return {
      isFromOldWebsite: false,
      isFromMedicalTerpenes: false,
    };
  }
}
```

---

## Testing

### Test with cURL

```bash
# Test old website
curl "http://localhost:3000/api/check-referrer?url=https://medicalterpenes.com"

# Test new website
curl "http://localhost:3000/api/check-referrer?url=https://loudspectrum.com"

# Test POST
curl -X POST http://localhost:3000/api/check-referrer \
  -H "Content-Type: application/json" \
  -d '{"url": "https://medicalterpenes.com/page"}'
```

### Test in Browser Console

```javascript
// Test GET request
fetch('/api/check-referrer?url=https://medicalterpenes.com')
  .then((res) => res.json())
  .then((data) => console.log(data));

// Test POST request
fetch('/api/check-referrer', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url: 'https://medicalterpenes.com' }),
})
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

## Notes

- The API is case-insensitive
- Partial domain matching is supported (e.g., `medicalterpenes.com` matches `www.medicalterpenes.com/page`)
- The `isFromMedicalTerpenes` field is kept for backward compatibility
- If no URL is provided in GET request, it falls back to checking the `Referer` header
- Domains are normalized to lowercase before comparison
