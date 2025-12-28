# Security Guide

This document outlines the security practices, configuration guidelines, and recommended hardening techniques for this Next.js project.

---

## 1. Security Headers

Next.js supports two mechanisms for adding security headers:

- **Static headers** (`next.config.ts`) — best for global, build-time headers
- **Dynamic headers** (`proxy.ts`) — used when CSP requires _per-request_ values like nonces

---

## Choosing the Correct Method

Use this table to determine where your CSP or headers should be defined:

| If you are using CSP that is…                                      | Use              |
| ------------------------------------------------------------------ | ---------------- |
| **Static** (simple CSP, no nonces or per-user data)                | `next.config.ts` |
| **Dynamic per-request** (nonces, hashes, user/session-based rules) | `proxy.ts`       |
| Want **best performance** (headers cached at build time)           | `next.config.ts` |
| Need to **modify headers only for certain paths**                  | `proxy.ts`       |

---

## 2. Static Security Headers (`next.config.ts`)

Best for simple, global security policies.

```ts
// next.config.ts
import type { NextConfig } from "next";

const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https:;
    frame-ancestors 'none';
    base-uri 'self';
    form-action 'self';
`;

const nextConfig: NextConfig = {
    reactCompiler: true,
    cacheComponents: true,
    typedRoutes: true,

    experimental: {
        typedEnv: true,
    },

    async headers() {
        return [
            {
                source: "/(.*)",
                headers: [
                    {
                        key: "Content-Security-Policy",
                        value: cspHeader.replace(/\n/g, ""),
                    },
                    {
                        key: "X-Frame-Options",
                        value: "DENY",
                    },
                    {
                        key: "X-Content-Type-Options",
                        value: "nosniff",
                    },
                    {
                        key: "Referrer-Policy",
                        value: "strict-origin-when-cross-origin",
                    },
                    {
                        key: "Permissions-Policy",
                        value: "camera=(), microphone=(), geolocation=()",
                    },
                    // Enable only when using HTTPS
                    // {
                    //     key: "Strict-Transport-Security",
                    //     value: "max-age=31536000; includeSubDomains",
                    // },
                ],
            },
        ];
    },
};

export default nextConfig;
```

---

## 3. Dynamic Security Headers (`proxy.ts`)

Used when your security policy requires values that must be regenerated **every request**, such as CSP _nonces_.

```ts
// src/proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const response = NextResponse.next();

    response.headers.set("x-nonce", nonce);

    response.headers.set(
        "Content-Security-Policy",
        `script-src 'self' 'nonce-${nonce}'; style-src 'self' 'unsafe-inline';`
    );

    return response;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
```

---

## 4. Using the Nonce in Layouts

In Next.js 16 (App Router), `headers()` is async:

```tsx
// app/layout.tsx
import { headers } from "next/headers";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const headersList = await headers();
    const nonce = headersList.get("x-nonce") ?? "";

    return (
        <html>
            <head>
                <script
                    nonce={nonce}
                    dangerouslySetInnerHTML={{
                        __html: `console.log("Secure inline script with nonce")`,
                    }}
                />
            </head>
            <body>{children}</body>
        </html>
    );
}
```

---

## 5. CSP Reference

### Directive Overview

| Directive         | Purpose                           | Recommended Value                   |
| ----------------- | --------------------------------- | ----------------------------------- |
| `default-src`     | Fallback for all other directives | `'self'`                            |
| `script-src`      | JavaScript sources                | `'self'` + `'nonce-...'`            |
| `style-src`       | CSS sources                       | `'self' 'unsafe-inline'`            |
| `img-src`         | Image sources                     | `'self' data: https:`               |
| `font-src`        | Font loading                      | `'self' https://fonts.gstatic.com'` |
| `connect-src`     | XHR, fetch, websockets            | `'self'` + API URLs                 |
| `frame-ancestors` | Frame embedding control           | `'none'`                            |
| `form-action`     | Allowed form targets              | `'self'`                            |

### CSP Explained: What Resources Are Allowed

**Content Security Policy** is an HTTP header that tells the browser what resources are allowed to load and execute on your webpage.

Think of it as a **whitelist** for your website:

- Which scripts can run?
- Where can images load from?
- Which stylesheets are allowed?
- Where can the page make network requests to?

### Example CSP Configuration

```ts
// csp.ts

/**
 * Allowing CDN Example (Common Setup)
 *
 * Content-Security-Policy:
 *   default-src 'self';
 *   script-src 'self' https://cdn.jsdelivr.net;
 *   style-src 'self' https://fonts.googleapis.com;
 *   font-src 'self' https://fonts.gstatic.com;
 *   img-src 'self' data: https://i.imgur.com;
 */

// ✅ Scripts from your domain + jsDeliver CDN
// ✅ Styles from your domain + Google Fonts
// ✅ Fonts from Google Fonts CDN
// ✅ Images from your domain + Imgur
// ❌ Inline scripts BLOCKED
// ❌ Any other external domain BLOCKED
```

### How CSP Protects Against XSS

Even if an attacker injects `<script>` tags, the browser will **refuse to execute them** unless they match your CSP policy.

```html
<!-- Attacker injects this -->
<script>
    alert("XSS");
</script>

<!-- Browser blocks it because it's not from an allowed source -->
```

---

## 6. Environment Variables & Secret Management

```
# .env.local (do NOT commit)

# Safe for browser
NEXT_PUBLIC_API_URL=https://api.example.com

# Server-only
DATABASE_URL=postgresql://...
JWT_SECRET=...
API_SECRET_KEY=...
```

### Rules

- Never commit `.env.local`, `.env.production`
- Use `NEXT_PUBLIC_` only when exposing to client
- Rotate secrets
- Separate development / staging / production secrets

---

## 7. Input Validation

Always validate user input server-side.

```ts
"use server";

import { z } from "zod";

const contactSchema = z.object({
    email: z.string().email(),
    message: z.string().min(1).max(1000),
});

export async function submitContact(formData: FormData) {
    const result = contactSchema.safeParse({
        email: formData.get("email"),
        message: formData.get("message"),
    });

    if (!result.success) {
        return { error: "Invalid input" };
    }

    // Process validated data...
}
```

---

## 8. XSS Prevention

### Understanding XSS Defense Strategies

XSS (Cross-Site Scripting) attacks inject malicious scripts into trusted websites. We use **two complementary approaches**:

1. **Sanitization** - Remove dangerous content from stored data (HTML/Markdown)
2. **Escaping** - Encode data only at output to make it safe for specific contexts (DOM, SQL)

---

### Sanitization vs. Escaping

#### Sanitization (for HTML/Markdown input)

We modify the data to remove dangerous or unwanted content — typically when allowing user markup.

```ts
// validation.ts
import DOMPurify from "dompurify";
import { marked } from "marked";

// HTML sanitization
const userInput = "<h1>Hello</h1><script>alert('XSS')</script>";
const safeHTML = DOMPurify.sanitize(userInput);
// => "<h1>Hello</h1>"

// Markdown sanitization
const markdown = "Hello **World** <script>alert(1)</script>";
const html = marked.parse(markdown);
const safe = DOMPurify.sanitize(html);
```

#### Escaping (output encoding)

You don't modify stored data — you encode it **only at output** to make it safe in its target context (DOM, SQL).

```ts
// escaping.ts

// Escaping HTML output
function escapeHTML(str: string) {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

const safeHTML = `<div>${escapeHTML(userInput)}</div>`;

// Escaping SQL Query
const stmt = db.prepare("SELECT * FROM users WHERE name = ?");
stmt.bind(userInput);
const user = stmt.get();
```

---

### Defence Strategy for Stored XSS

#### 1. Client-Side and/or Server-Side Validation

Apply validation rules **before** storing user content:

```ts
// test.js
function validateComment(text) {
    // Length limit
    if (text.length > 1000) throw new Error("Too long");

    // Character whitelist (if possible, because for many apps this rule will be too restrictive)
    if (!/^[a-zA-Z0-9\s.,!?-]+$/.test(text)) {
        throw new Error("Invalid characters");
    }

    // At minimum, reject obvious HTML tags
    if (/<script|<iframe|javascript:/i.test(text)) {
        throw new Error("Invalid content");
    }
}
```

**⚠️ Character Whitelist Problem**

1. Too restrictive for international users
2. Users often NEED some formatting (bold, italic, links to sources, etc.)
3. Regex can be exploited (ReDoS attack)

**ReDoS (Regular Expression Denial of Service)**

A ReDoS attack exploits the complexity of regex operations to cause a denial of service by making the regex engine take an excessive amount of time to process certain inputs.

```js
// test.js
const regex = /(a|a)*c/;
const input = "aaaaaaaaaaaaaaaaaaaaaa";

console.log(regex.test(input)); // Takes a long time to process
```

---

#### 2. Sanitization on Storage (If HTML or Markdown is needed)

**For HTML/Markdown user-generated content**, sanitize **before** storing:

```ts
// test.ts
import DOMPurify from "isomorphic-dompurify";

async function createComment(text) {
    // If you MUST allow some HTML (bold, italic, links)
    const sanitized = DOMPurify.sanitize(text, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "a"],
        ALLOWED_ATTR: ["href"],
        ALLOWED_URI_REGEXP: /^https:\/\//i, // Only https:// links
    });

    await db.comments.insert({ text: sanitized });
}
```

**Alternatives to DOMPurify:**

- `sanitize-html` (Node.js)
- `xss` (lightweight)

---

**⚠️ When using `dangerouslySetInnerHTML`**

When we use `dangerouslySetInnerHTML` we **MUST trust that sanitized HTML is actually sanitized**. If sanitization failed, we have XSS.

```tsx
// test.tsx
function Comment({ html }) {
    // CRITICAL: Only use if you're 100% sure the HTML is sanitized
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
```

**Better approach: Use `textContent` instead of `innerHTML`**

```tsx
// test.tsx
function Comment({ text }) {
    // Even if text contains malicious script, it will be inserted as plain text
    return <div>{text}</div>;
}
```

This way, even a malicious script will be inserted as a **plain text node** instead of executable code.

---

### Why We Want to Store Original (Not-Sanitized) Data

**Reasons to preserve original user input:**

- You can't fix what you've destroyed
- Context changes (what's safe today may need different handling tomorrow)
- Security patches become easier (re-sanitize with updated rules)
- Better interoperability (different outputs may need different sanitization)
- Preserve user intent (don't lose formatting or content)

**Best practice:**

```ts
// Store BOTH original and sanitized versions
await db.comments.insert({
    text_original: userInput, // Original, unsanitized
    text_sanitized: DOMPurify.sanitize(userInput), // Safe for display
});
```

---

### CSP (Content Security Policy)

**Content Security Policy** is an HTTP header that tells the browser **what resources are allowed to load and execute** on your webpage.

Think of it as a **whitelist for your website**:

- Which scripts can run?
- Where can images load from?
- Which stylesheets are allowed?
- Where can the page make network requests to?

```ts
// csp.ts

/**
 * Allowing CDN Example (Common Setup)
 *
 * Content-Security-Policy:
 *   default-src 'self';
 *   script-src 'self' https://cdn.jsdelivr.net;
 *   style-src 'self' https://fonts.googleapis.com;
 *   font-src 'self' https://fonts.gstatic.com;
 *   img-src 'self' https://i.imgur.com;
 */

// ✅ Scripts from your domain + jsDeliver CDN
// ✅ Styles from your domain + Google Fonts
// ✅ Fonts from Google Fonts CDN
// ❌ Inline scripts BLOCKED
// ❌ Any other external domain BLOCKED
```

**How it protects against XSS:**

Even if an attacker injects `<script>` tags, the browser will refuse to execute them unless they match your CSP policy.

---

### Example: Complete XSS Protection Flow

```tsx
// app/comments/actions.ts
"use server";

import DOMPurify from "isomorphic-dompurify";
import { z } from "zod";

const commentSchema = z.object({
    text: z.string().min(1).max(1000),
});

export async function submitComment(formData: FormData) {
    // 1. Validate length and format
    const result = commentSchema.safeParse({
        text: formData.get("text"),
    });

    if (!result.success) {
        return { error: "Invalid input" };
    }

    // 2. Sanitize if HTML is needed
    const sanitized = DOMPurify.sanitize(result.data.text, {
        ALLOWED_TAGS: ["b", "i", "em", "strong", "a"],
        ALLOWED_ATTR: ["href"],
        ALLOWED_URI_REGEXP: /^https:\/\//i,
    });

    // 3. Store both original and sanitized versions
    await db.comments.insert({
        text_original: result.data.text,
        text_sanitized: sanitized,
    });

    return { success: true };
}
```

```tsx
// app/comments/page.tsx
export default function CommentsPage({ comments }) {
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    {/* Safe: React escapes automatically */}
                    {comment.text_sanitized}
                </div>
            ))}
        </div>
    );
}
```

---

### ❌ Never Do This

```tsx
// DANGER: Unsanitized user content
<div dangerouslySetInnerHTML={{ __html: userContent }} />;

// DANGER: Direct string interpolation in HTML
element.innerHTML = userInput;

// DANGER: Inline event handlers with user data
<div onClick={`eval(${userInput})`} />;
```

---

### ✅ Safe Practices

```tsx
// SAFE: Sanitize before rendering HTML
import DOMPurify from "dompurify";

// SAFE: React auto-escapes text
<div>{userContent}</div>;

// SAFE: Use textContent, not innerHTML
element.textContent = userInput;

const safe = DOMPurify.sanitize(userContent);
<div dangerouslySetInnerHTML={{ __html: safe }} />;
```

---

## 9. Authentication Best Practices

- Use well-maintained auth systems: **Better auth, Clerk, Auth0**
- Validate permissions on server actions
- Avoid storing JWT in localStorage
- Use **HTTPS only** in production
- Implement CSRF protection if using form POSTs

---

## 10. Database Security

- Use ORM sanitization (Drizzle, Prisma)
- Never interpolate raw SQL strings
- Enforce RLS if using PostgreSQL (optional)
- Encrypt sensitive fields

---

## 11. Security Checklist

### Headers & Policies

- [ ] CSP configured (`next.config.ts` or `proxy.ts`)
- [ ] No `'unsafe-inline'` in production scripts
- [ ] X-Frame-Options set to `DENY`
- [ ] Permissions-Policy defined

### Secrets

- [ ] `.env.local` ignored
- [ ] No secrets in Git history
- [ ] Rotated secrets every 90 days

### App

- [ ] Input validated with Zod
- [ ] No raw SQL
- [ ] Sanitized HTML rendering
- [ ] Authentication enforced
- [ ] HTTPS enabled

### Maintenance

- [ ] Dependencies updated monthly
- [ ] `pnpm audit` checked
- [ ] Error messages sanitized (no stack traces in prod)
