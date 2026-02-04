# AWS Amplify CSP Header Configuration

This document provides instructions for configuring Content Security Policy (CSP) headers in AWS Amplify for enhanced security.

## Why Use HTTP Headers Instead of Meta Tags?

While the current implementation uses a `<meta>` tag for CSP, HTTP headers are preferred for production because:

1. **More secure** - Headers are applied before HTML is parsed
2. **Support all directives** - Meta tags cannot set `frame-ancestors` (ignored by browsers)
3. **Better protection** - Headers protect against attacks before the document loads
4. **Industry best practice** - Recommended by OWASP and security experts

## Option 1: Using amplify.yml (Recommended)

Add custom headers to your `amplify.yml` file in the repository root:

```yaml
version: 1
frontend:
  phases:
    preBuild:
      commands:
        - npm ci
    build:
      commands:
        - npm run build
  artifacts:
    baseDirectory: out
    files:
      - "**/*"
  cache:
    paths:
      - node_modules/**/*
  customHeaders:
    - pattern: "**/*"
      headers:
        - key: Content-Security-Policy
          value: >-
            default-src 'self';
            script-src 'self' 'sha256-<THEME_HASH>' 'sha256-<GA_CONFIG_HASH>' https://www.googletagmanager.com;
            style-src 'self' 'unsafe-inline';
            img-src 'self' data: https://github-readme-stats.vercel.app https://www.google-analytics.com;
            font-src 'self';
            connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com;
            frame-src 'none';
            frame-ancestors 'none';
            object-src 'none';
            base-uri 'self';
            form-action 'self';
            upgrade-insecure-requests;
            worker-src 'self';
            manifest-src 'self'
        - key: X-Frame-Options
          value: DENY
        - key: X-Content-Type-Options
          value: nosniff
        - key: Referrer-Policy
          value: strict-origin-when-cross-origin
        - key: Permissions-Policy
          value: geolocation=(), microphone=(), camera=()
```

**Important:** Replace `<THEME_HASH>` and `<GA_CONFIG_HASH>` with the actual SHA-256 hashes. You can get these by:

```bash
# Run the development server and check the meta tag content in the browser
npm run dev
# Or compute them manually with Node.js (see below)
```

To compute the hashes programmatically:

```javascript
// Create a script: scripts/compute-csp-hashes.js
const crypto = require("crypto");
const fs = require("fs");

// Read the script content from layout.tsx
const layoutContent = fs.readFileSync("app/layout.tsx", "utf8");

// Extract the THEME_INIT_SCRIPT and GA_CONFIG_SCRIPT
// ... parse and extract the script content ...

function generateHash(content) {
  return (
    "sha256-" + crypto.createHash("sha256").update(content).digest("base64")
  );
}

console.log("Theme hash:", generateHash(themeScript));
console.log("GA hash:", generateHash(gaScript));
```

## Option 2: AWS Amplify Console (Alternative)

If you prefer not to use `amplify.yml`, configure headers directly in the AWS Amplify Console:

1. **Navigate to your app** in the AWS Amplify Console
2. Click **App settings** → **Rewrites and redirects** (or **Custom headers** if available)
3. Add a custom header rule:
   - **Source address:** `</^[^.]+$|\.(?!(css|gif|ico|jpg|jpeg|js|png|txt|svg|woff|woff2|ttf|map|json|webp)$)([^.]+$)/>`
   - **Target address:** `/index.html`
   - **Type:** `200 (Rewrite)`

4. For headers, you may need to contact AWS Support or use the `amplify.yml` method above (Console UI varies)

## Option 3: Custom Build Script (Most Flexible)

Create a script that generates the CSP header with current hashes:

```javascript
// scripts/generate-amplify-config.js
const crypto = require("crypto");
const fs = require("fs");

// Read the actual script content from your layout
const THEME_INIT_SCRIPT = `...`; // Copy from layout.tsx
const GA_CONFIG_SCRIPT = `...`; // Copy from layout.tsx

function generateHash(content) {
  return (
    "sha256-" + crypto.createHash("sha256").update(content).digest("base64")
  );
}

const themeHash = generateHash(THEME_INIT_SCRIPT);
const gaHash = generateHash(GA_CONFIG_SCRIPT);

const amplifyConfig = {
  version: 1,
  frontend: {
    phases: {
      preBuild: { commands: ["npm ci"] },
      build: { commands: ["npm run build"] },
    },
    artifacts: {
      baseDirectory: "out",
      files: ["**/*"],
    },
    customHeaders: [
      {
        pattern: "**/*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `default-src 'self'; script-src 'self' '${themeHash}' '${gaHash}' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://github-readme-stats.vercel.app https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com https://analytics.google.com; frame-src 'none'; frame-ancestors 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; upgrade-insecure-requests; worker-src 'self'; manifest-src 'self'`,
          },
        ],
      },
    ],
  },
};

fs.writeFileSync("amplify.yml", JSON.stringify(amplifyConfig, null, 2));
console.log("Generated amplify.yml with CSP hashes");
```

Add to `package.json`:

```json
{
  "scripts": {
    "generate:amplify": "node scripts/generate-amplify-config.js"
  }
}
```

## After Configuration

1. **Remove the meta tag** from `app/layout.tsx` once HTTP headers are working:

   ```tsx
   // Remove this line:
   <meta httpEquiv="Content-Security-Policy" content={cspContent} />
   ```

2. **Deploy and test:**

   ```bash
   git add amplify.yml
   git commit -m "Add CSP headers via Amplify config"
   git push
   ```

3. **Verify headers** are being sent:

   ```bash
   curl -I https://yoursite.com
   # Look for: Content-Security-Policy: ...
   ```

4. **Check browser console** for any CSP violations after deployment

## Additional Security Headers (Recommended)

Along with CSP, consider adding these headers:

- `X-Frame-Options: DENY` - Defense in depth against clickjacking
- `X-Content-Type-Options: nosniff` - Prevent MIME type sniffing
- `Referrer-Policy: strict-origin-when-cross-origin` - Control referrer information
- `Permissions-Policy: geolocation=(), microphone=(), camera=()` - Disable unnecessary features

These are already included in the `amplify.yml` example above.

## Testing

Test your CSP configuration:

1. **Chrome DevTools:**
   - Open DevTools → Console
   - Look for CSP violation warnings
   - All resources should load without errors

2. **CSP Evaluator:**
   - Visit: https://csp-evaluator.withgoogle.com/
   - Paste your CSP policy
   - Review recommendations

3. **Security Headers:**
   - Visit: https://securityheaders.com/
   - Enter your domain
   - Check for A+ rating

## Troubleshooting

**Issue:** Scripts blocked after adding headers  
**Solution:** Ensure hashes match exactly. Scripts must not have any whitespace changes.

**Issue:** Google Analytics not working  
**Solution:** Verify all GA domains are in `connect-src` and `script-src`

**Issue:** Images not loading  
**Solution:** Add the image domain to `img-src` directive

**Issue:** Amplify not applying headers  
**Solution:** Check `amplify.yml` is in repository root and properly formatted (YAML is indentation-sensitive)

## References

- [MDN: Content-Security-Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [AWS Amplify Custom Headers](https://docs.aws.amazon.com/amplify/latest/userguide/custom-headers.html)
- [OWASP: Content Security Policy](https://cheatsheetseries.owasp.org/cheatsheets/Content_Security_Policy_Cheat_Sheet.html)
