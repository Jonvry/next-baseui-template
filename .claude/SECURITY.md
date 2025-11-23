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

const ContactSchema = z.object({
    email: z.string().email(),
    message: z.string().min(1).max(1000),
});

export async function submitContact(formData: FormData) {
    const result = ContactSchema.safeParse({
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

### ❌ Avoid

```tsx
<div dangerouslySetInnerHTML={{ __html: userContent }} />
```

### ✔ If needed, sanitize

```ts
import DOMPurify from "dompurify";

const safe = DOMPurify.sanitize(userContent);
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
