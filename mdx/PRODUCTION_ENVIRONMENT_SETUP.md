# Production Environment Setup Guide

## Overview

This guide covers the environment variables needed for production deployment, specifically focusing on DHL API integration and other required services.

## Required Environment Variables

### DHL API Configuration (Production)

Create a `.env.production` file in your project root with the following variables:

```bash
# =============================================================================
# DHL API Configuration (Production)
# =============================================================================

# DHL API Credentials (Production)
# Get these from your DHL Developer Portal (https://developer.dhl.com/)
DHL_API_KEY=your_production_dhl_api_key_here
DHL_API_SECRET=your_production_dhl_api_secret_here
DHL_ACCOUNT_NUMBER=your_production_dhl_account_number_here

# DHL API URL (Production)
# Use the production DHL API endpoint
NEXT_PUBLIC_DHL_API_URL=https://api-eu.dhl.com/mydhlapi
```

### Application URLs (Production)

```bash
# =============================================================================
# Application URLs (Production)
# =============================================================================

# Main API URL (Production)
# Replace with your actual production API domain
NEXT_PUBLIC_API_URL=https://your-production-api-domain.com

# Local API URL (if needed for internal calls)
# Replace with your actual production domain
NEXT_PUBLIC_API_LOCAL_URL=https://your-production-domain.com
```

### External Services (Production)

```bash
# =============================================================================
# External Services (Production)
# =============================================================================

# Country/State/City API Key
# Get from https://countrystatecity.in/
NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY=your_production_country_api_key_here

# Node Environment
NODE_ENV=production
```

## Environment Variable Usage

### DHL API Variables

| Variable                  | Usage                                | Required |
| ------------------------- | ------------------------------------ | -------- |
| `DHL_API_KEY`             | DHL API authentication key           | ✅ Yes   |
| `DHL_API_SECRET`          | DHL API authentication secret        | ✅ Yes   |
| `DHL_ACCOUNT_NUMBER`      | Your DHL account number for shipping | ✅ Yes   |
| `NEXT_PUBLIC_DHL_API_URL` | DHL API endpoint URL                 | ✅ Yes   |

### Application URLs

| Variable                    | Usage                         | Required    |
| --------------------------- | ----------------------------- | ----------- |
| `NEXT_PUBLIC_API_URL`       | Main backend API URL          | ✅ Yes      |
| `NEXT_PUBLIC_API_LOCAL_URL` | Internal API calls (fallback) | ⚠️ Optional |

### External Services

| Variable                                 | Usage                 | Required |
| ---------------------------------------- | --------------------- | -------- |
| `NEXT_PUBLIC_COUNTRY_STATE_CITY_API_KEY` | Location services API | ✅ Yes   |

## DHL API Setup Steps

### 1. Create DHL Developer Account

1. Visit [DHL Developer Portal](https://developer.dhl.com/)
2. Sign up for a developer account
3. Create a new application

### 2. Get Production Credentials

1. Navigate to your application dashboard
2. Generate production API key and secret
3. Note your DHL account number

### 3. API Endpoint Configuration

- **Production URL**: `https://api-eu.dhl.com/mydhlapi`
- **Sandbox URL**: `https://api-sandbox.dhl.com/mydhlapi` (for testing)

## Security Considerations

### Environment Variable Security

- ✅ **Never commit** `.env.production` to version control
- ✅ **Use secure storage** for production credentials
- ✅ **Rotate credentials** regularly
- ✅ **Limit API key permissions** to required scopes only

### DHL API Security

- ✅ **Use HTTPS** for all API calls
- ✅ **Implement rate limiting** to avoid API abuse
- ✅ **Monitor API usage** and costs
- ✅ **Handle errors gracefully** with fallback options

## Deployment Checklist

### Pre-Deployment

- [ ] DHL production credentials obtained
- [ ] API endpoints tested in sandbox
- [ ] Environment variables configured
- [ ] Error handling implemented
- [ ] Rate limiting configured

### Post-Deployment

- [ ] DHL API calls working correctly
- [ ] Shipping rates displaying properly
- [ ] Error messages user-friendly
- [ ] API usage monitoring enabled
- [ ] Backup shipping options available

## Testing Production Setup

### 1. Test DHL API Connection

```bash
curl -X POST "https://api-eu.dhl.com/mydhlapi/rates" \
  -H "Authorization: Basic $(echo -n 'API_KEY:API_SECRET' | base64)" \
  -H "Content-Type: application/json" \
  -d '{
    "customerDetails": {
      "shipperDetails": {
        "postalCode": "90210",
        "countryCode": "US"
      },
      "receiverDetails": {
        "postalCode": "10001",
        "countryCode": "US"
      }
    },
    "accounts": [{
      "typeCode": "shipper",
      "number": "YOUR_ACCOUNT_NUMBER"
    }],
    "plannedShippingDateAndTime": "2024-01-15T10:00:00",
    "unitOfMeasurement": "metric",
    "packages": [{
      "weight": 1.0,
      "dimensions": {
        "length": 10,
        "width": 10,
        "height": 10
      }
    }]
  }'
```

### 2. Verify Environment Variables

Create a test endpoint to verify variables are loaded (remove in production):

```javascript
// pages/api/test-env.js (REMOVE IN PRODUCTION)
export default function handler(req, res) {
  res.json({
    dhlConfigured: !!(process.env.DHL_API_KEY && process.env.DHL_API_SECRET),
    apiUrl: process.env.NEXT_PUBLIC_DHL_API_URL,
    nodeEnv: process.env.NODE_ENV,
  });
}
```

## Monitoring and Logging

### DHL API Monitoring

- Monitor API response times
- Track API error rates
- Log failed shipping calculations
- Monitor API usage costs

### Error Handling

- Implement graceful fallbacks
- Log errors for debugging
- Display user-friendly messages
- Provide alternative shipping options

## Troubleshooting

### Common Issues

#### 1. "User not authorized" Error

- **Cause**: Invalid API credentials
- **Solution**: Verify `DHL_API_KEY` and `DHL_API_SECRET`

#### 2. "Product not available" Error

- **Cause**: Invalid pickup date or location
- **Solution**: Check date calculation and address format

#### 3. API Rate Limiting

- **Cause**: Too many requests
- **Solution**: Implement request throttling

#### 4. Network Timeouts

- **Cause**: Slow API response
- **Solution**: Increase timeout and add retry logic

## Support and Resources

### DHL Developer Resources

- [DHL Developer Portal](https://developer.dhl.com/)
- [DHL API Documentation](https://developer.dhl.com/api-reference)
- [DHL Support](https://developer.dhl.com/support)

### Internal Resources

- Component Documentation: `/mdx/CHOOSE_YOUR_COURIER_FLOW.md`
- API Route: `/app/api/dhl/rates/route.js`
- Test Page: `/app/[locale]/(test)/dhl/page.js`
