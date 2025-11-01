# How to Implement Old Website Check with Button

This guide shows you how to add a button that checks if a user came from an old website and shows the rebranding popup.

## Option 1: Using the Pre-built Component

### Simple Implementation

```jsx
import CheckOldWebsiteButton from '@/components/CheckOldWebsiteButton';

export default function MyPage() {
  return (
    <div>
      <h1>Welcome to Loud Spectrum</h1>
      <CheckOldWebsiteButton />
    </div>
  );
}
```

This component includes:
- ✅ Button to trigger the check
- ✅ Loading state
- ✅ Automatic popup display
- ✅ Result display
- ✅ Toast notifications

---

## Option 2: Custom Button Implementation

### Basic Example

```jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RebrandingPopup from '@/components/RebrandingPopup';

export default function CustomCheckButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheck = async () => {
    setIsLoading(true);

    try {
      // Get referrer (where user came from)
      const referrer = document.referrer || window.location.href;

      // Call API
      const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(referrer)}`);
      const data = await response.json();

      // Show popup if from old website
      if (data.isFromOldWebsite && !data.isFromNewWebsite) {
        setShowPopup(true);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={handleCheck} disabled={isLoading}>
        {isLoading ? 'Checking...' : 'Check Referrer'}
      </Button>

      {showPopup && <RebrandingPopup />}
    </>
  );
}
```

---

## Option 3: Check Specific URL (Manual Input)

### With Input Field

```jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import RebrandingPopup from '@/components/RebrandingPopup';
import { toast } from 'sonner';

export default function ManualCheckButton() {
  const [url, setUrl] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleCheck = async () => {
    if (!url.trim()) {
      toast.error('Please enter a URL');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      setResult(data);

      if (data.isFromOldWebsite && !data.isFromNewWebsite) {
        setShowPopup(true);
        toast.success(`Detected old website: ${data.matchedDomain}`);
      } else {
        toast.info('Not from an old website');
      }
    } catch (error) {
      toast.error('Failed to check URL');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter URL to check (e.g., https://medicalterpenes.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="flex-1"
        />
        <Button onClick={handleCheck} disabled={isLoading || !url.trim()}>
          {isLoading ? 'Checking...' : 'Check URL'}
        </Button>
      </div>

      {result && (
        <div className="rounded-lg border p-4 bg-gray-50">
          <p><strong>Is Old Website:</strong> {result.isFromOldWebsite ? '✅ Yes' : '❌ No'}</p>
          {result.matchedDomain && <p><strong>Matched:</strong> {result.matchedDomain}</p>}
        </div>
      )}

      {showPopup && <RebrandingPopup />}
    </div>
  );
}
```

---

## Option 4: Auto-Check on Page Load (Current Behavior)

### Update RebrandingPopup Component

The existing `RebrandingPopup` component already auto-checks on page load. If you want to add a manual trigger button, you can modify it:

```jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RebrandingPopup from '@/components/RebrandingPopup';

export default function RebrandingWithButton() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const checkAndShow = async () => {
    setIsLoading(true);

    try {
      const referrer = document.referrer || window.location.href;
      const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(referrer)}`);
      const data = await response.json();

      if (data.isFromOldWebsite && !data.isFromNewWebsite) {
        const hasSeenPopup = localStorage.getItem('rebranding-popup-seen');
        if (!hasSeenPopup) {
          setShowPopup(true);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button onClick={checkAndShow} disabled={isLoading}>
        {isLoading ? 'Checking...' : 'Show Rebranding Info'}
      </Button>

      {showPopup && <RebrandingPopup />}
    </>
  );
}
```

---

## Option 5: Check from Link Click

### Track Link Clicks

```jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import RebrandingPopup from '@/components/RebrandingPopup';

export default function LinkTracker() {
  const [showPopup, setShowPopup] = useState(false);

  const handleLinkClick = async (linkUrl) => {
    try {
      // Check if the link is from an old website
      const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(linkUrl)}`);
      const data = await response.json();

      if (data.isFromOldWebsite) {
        // Open link
        window.open(linkUrl, '_blank');

        // Show popup
        setShowPopup(true);
      } else {
        // Just open link normally
        window.open(linkUrl, '_blank');
      }
    } catch (error) {
      console.error('Error:', error);
      window.open(linkUrl, '_blank');
    }
  };

  return (
    <>
      <a
        href="https://medicalterpenes.com"
        onClick={(e) => {
          e.preventDefault();
          handleLinkClick('https://medicalterpenes.com');
        }}
      >
        Visit Old Website
      </a>

      {showPopup && <RebrandingPopup />}
    </>
  );
}
```

---

## Option 6: Using POST Request

### POST Method Example

```jsx
const handleCheck = async () => {
  setIsLoading(true);

  try {
    const referrer = document.referrer || window.location.href;

    // Using POST instead of GET
    const response = await fetch('/api/check-referrer', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: referrer,
      }),
    });

    const data = await response.json();

    if (data.isFromOldWebsite && !data.isFromNewWebsite) {
      setShowPopup(true);
    }
  } catch (error) {
    console.error('Error:', error);
  } finally {
    setIsLoading(false);
  }
};
```

---

## Styling Options

### Using Your Button Component

```jsx
import { Button } from '@/components/ui/button';

<Button variant="default" size="lg" onClick={handleCheck}>
  Check Old Website
</Button>
```

### Custom Styled Button

```jsx
<button
  onClick={handleCheck}
  className="bg-gradient-four-colors rounded-lg px-6 py-2 font-medium text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
  disabled={isLoading}
>
  {isLoading ? 'Checking...' : 'Check Old Website'}
</button>
```

---

## Complete Working Example

```jsx
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import RebrandingPopup from '@/components/RebrandingPopup';

export default function OldWebsiteChecker() {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);

  const checkOldWebsite = async () => {
    setIsLoading(true);
    setResult(null);

    try {
      // Option 1: Check document referrer (where user came from)
      const referrer = document.referrer || window.location.href;

      // Option 2: Check a specific URL (uncomment to use)
      // const referrer = 'https://medicalterpenes.com';

      const response = await fetch(`/api/check-referrer?url=${encodeURIComponent(referrer)}`);
      const data = await response.json();

      setResult(data);

      if (data.error) {
        toast.error(data.error);
        return;
      }

      if (data.isFromOldWebsite && !data.isFromNewWebsite) {
        setShowPopup(true);
        toast.success(`Welcome from ${data.matchedDomain}!`);
      } else if (data.isFromNewWebsite) {
        toast.info('You are already on our new website!');
      } else {
        toast.info('No old website detected.');
      }
    } catch (error) {
      console.error('Error checking old website:', error);
      toast.error('Failed to check referrer. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem('rebranding-popup-seen', 'true');
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold">Old Website Checker</h2>

      <Button
        onClick={checkOldWebsite}
        disabled={isLoading}
        className="bg-gradient-four-colors px-6 py-2 font-medium text-white transition-all duration-200 hover:opacity-90 disabled:opacity-50"
      >
        {isLoading ? 'Checking...' : 'Check Old Website'}
      </Button>

      {result && (
        <div className="mt-4 rounded-lg border bg-gray-50 p-4">
          <h3 className="font-semibold mb-2">Check Result:</h3>
          <ul className="space-y-1 text-sm">
            <li>From Old Website: {result.isFromOldWebsite ? '✅ Yes' : '❌ No'}</li>
            {result.matchedDomain && <li>Matched Domain: <strong>{result.matchedDomain}</strong></li>}
            <li>From New Website: {result.isFromNewWebsite ? '✅ Yes' : '❌ No'}</li>
            {result.url && <li>Checked URL: <code className="text-xs">{result.url}</code></li>}
          </ul>
        </div>
      )}

      {showPopup && (
        <div onClick={handleClosePopup}>
          <RebrandingPopup />
        </div>
      )}
    </div>
  );
}
```

---

## Testing Your Button

1. **Test with Old Website URL:**
   - Manually set `document.referrer` in browser console:
   ```javascript
   Object.defineProperty(document, 'referrer', {
     value: 'https://medicalterpenes.com',
     writable: true
   });
   ```
   - Then click your button

2. **Test Programmatically:**
   ```javascript
   // In browser console
   fetch('/api/check-referrer?url=https://medicalterpenes.com')
     .then(res => res.json())
     .then(data => console.log(data));
   ```

---

## Best Practices

1. **Loading States:** Always show loading state while checking
2. **Error Handling:** Catch and display errors gracefully
3. **User Feedback:** Use toast notifications or result displays
4. **Local Storage:** Store "seen" status to avoid showing popup repeatedly
5. **Accessibility:** Add proper ARIA labels and keyboard support

---

## Common Use Cases

- **Manual Check Button:** User clicks to check their referrer
- **Auto-Check on Load:** Check automatically when component mounts
- **Link Tracking:** Check before opening external links
- **Form Submission:** Check referrer before submitting forms
- **Analytics:** Track old website visitors
