# Postman Testing Guide - Check Referrer API

## Quick Setup

### Base URL

- **Local Development:** `http://localhost:3000`
- **Production:** `https://your-domain.com`

### API Endpoint

```
/api/check-referrer
```

---

## Method 1: GET Request (Query Parameter)

### Step-by-Step Instructions

1. **Open Postman** and click **New** → **HTTP Request**

2. **Set Request Type:**

   - Method: `GET`
   - URL: `http://localhost:3000/api/check-referrer`

3. **Add Query Parameter:**

   - Click on the **Params** tab
   - Add a new parameter:
     - **Key:** `url`
     - **Value:** `https://medicalterpenes.com`
     - ✅ Check the box to enable it

4. **Send Request:**
   - Click the **Send** button

### Visual Guide

```
GET http://localhost:3000/api/check-referrer?url=https://medicalterpenes.com
```

**Params Tab:**

```
Key: url          Value: https://medicalterpenes.com    ✅
```

### Example URLs to Test

```
# Old website (should return isFromOldWebsite: true)
http://localhost:3000/api/check-referrer?url=https://medicalterpenes.com
http://localhost:3000/api/check-referrer?url=https://www.medicalterpenes.com/page

# New website (should return isFromNewWebsite: true)
http://localhost:3000/api/check-referrer?url=https://loudspectrum.com

# Other website (should return isFromOldWebsite: false)
http://localhost:3000/api/check-referrer?url=https://example.com
```

### Expected Response (Old Website)

```json
{
  "isFromOldWebsite": true,
  "matchedDomain": "medicalterpenes.com",
  "isFromNewWebsite": false,
  "isFromMedicalTerpenes": true,
  "url": "https://medicalterpenes.com",
  "newWebsiteDomain": "loudspectrum.com"
}
```

---

## Method 2: POST Request (JSON Body)

### Step-by-Step Instructions

1. **Open Postman** and click **New** → **HTTP Request**

2. **Set Request Type:**

   - Method: `POST`
   - URL: `http://localhost:3000/api/check-referrer`

3. **Set Headers:**

   - Click on the **Headers** tab
   - Add header:
     - **Key:** `Content-Type`
     - **Value:** `application/json`

4. **Set Body:**

   - Click on the **Body** tab
   - Select **raw** radio button
   - Select **JSON** from the dropdown (on the right)
   - Enter this JSON:

   ```json
   {
     "url": "https://medicalterpenes.com"
   }
   ```

5. **Send Request:**
   - Click the **Send** button

### Visual Guide

```
POST http://localhost:3000/api/check-referrer
```

**Headers Tab:**

```
Content-Type: application/json
```

**Body Tab:**

- ✅ raw
- Dropdown: JSON
- Body content:

```json
{
  "url": "https://medicalterpenes.com"
}
```

### Alternative Body Formats

You can also use `referer` or `referrer` as field names:

```json
{
  "referer": "https://medicalterpenes.com"
}
```

or

```json
{
  "referrer": "https://medicalterpenes.com"
}
```

---

## Complete Test Collection

### Test Case 1: Old Website - Medical Terpenes

```
GET http://localhost:3000/api/check-referrer?url=https://medicalterpenes.com
```

**Expected:** `isFromOldWebsite: true`

### Test Case 2: Old Website - WWW Version

```
GET http://localhost:3000/api/check-referrer?url=https://www.medicalterpenes.com/page
```

**Expected:** `isFromOldWebsite: true`, `matchedDomain: "www.medicalterpenes.com"`

### Test Case 3: New Website

```
GET http://localhost:3000/api/check-referrer?url=https://loudspectrum.com
```

**Expected:** `isFromNewWebsite: true`, `isFromOldWebsite: false`

### Test Case 4: Other Website

```
GET http://localhost:3000/api/check-referrer?url=https://google.com
```

**Expected:** `isFromOldWebsite: false`, `isFromNewWebsite: false`

### Test Case 5: POST Request

```
POST http://localhost:3000/api/check-referrer
Body (JSON):
{
  "url": "https://medicalterpenes.com"
}
```

**Expected:** `isFromOldWebsite: true`

### Test Case 6: Missing URL (Error)

```
GET http://localhost:3000/api/check-referrer
```

**Expected:** Status `400`, Error message in response

---

## Postman Collection (Import Ready)

You can create a Postman collection with these requests:

```json
{
  "info": {
    "name": "Check Referrer API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "GET - Check Old Website",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/api/check-referrer?url=https://medicalterpenes.com",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "check-referrer"],
          "query": [
            {
              "key": "url",
              "value": "https://medicalterpenes.com"
            }
          ]
        }
      }
    },
    {
      "name": "POST - Check Old Website",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"url\": \"https://medicalterpenes.com\"\n}"
        },
        "url": {
          "raw": "http://localhost:3000/api/check-referrer",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["api", "check-referrer"]
        }
      }
    }
  ]
}
```

**To Import:**

1. Click **Import** in Postman
2. Select **Raw text**
3. Paste the JSON above
4. Click **Import**

---

## Troubleshooting

### Issue: "URL parameter is required" Error

**Solution:** Make sure you've added the `url` parameter in Params tab (GET) or Body (POST)

### Issue: Connection Refused

**Solution:**

- Make sure your Next.js server is running (`npm run dev`)
- Check if you're using the correct port (default: 3000)
- Try `http://127.0.0.1:3000` instead of `localhost`

### Issue: 404 Not Found

**Solution:**

- Verify the endpoint path: `/api/check-referrer`
- Check if your Next.js app is running
- Ensure you're in the correct environment (local vs production)

### Issue: Invalid JSON in POST

**Solution:**

- Make sure Content-Type header is set to `application/json`
- Verify JSON syntax (no trailing commas)
- Use Postman's JSON validator (it highlights errors)

---

## Quick Reference Card

```
┌─────────────────────────────────────────────────┐
│  GET Request                                    │
├─────────────────────────────────────────────────┤
│  Method: GET                                    │
│  URL: /api/check-referrer?url={your-url}       │
│  Headers: (none required)                      │
│  Body: (none)                                  │
└─────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────┐
│  POST Request                                   │
├─────────────────────────────────────────────────┤
│  Method: POST                                   │
│  URL: /api/check-referrer                      │
│  Headers: Content-Type: application/json       │
│  Body: { "url": "your-url-here" }              │
└─────────────────────────────────────────────────┘
```

---

## Testing Checklist

- [ ] GET request with old website URL returns `isFromOldWebsite: true`
- [ ] GET request with new website URL returns `isFromNewWebsite: true`
- [ ] POST request works with JSON body
- [ ] Error handling works when URL is missing
- [ ] Response contains all expected fields
- [ ] Different old website domains are detected correctly

---

## Tips

1. **Save Requests:** Save frequently used requests in a Postman collection
2. **Environment Variables:** Create variables for `base_url` to switch between local/production
3. **Tests Tab:** Add assertions to automatically validate responses
4. **Pre-request Scripts:** Use to generate dynamic URLs if needed
