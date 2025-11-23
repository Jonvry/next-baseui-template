# Claude Code Project Guide

This guide helps Claude Code (and other AI assistants) understand this Next.js template and work effectively with the codebase.

## Project Identity

**Template Name**: Modern Next.js 16 Template
**Type**: Web Application Template
**Framework**: Next.js 16 (App Router)
**Language**: TypeScript
**Package Manager**: pnpm 10.20.0

## Quick Reference

### File Locations

- **Entry Point**: [src/app/layout.tsx](../src/app/layout.tsx)
- **Home Page**: [src/app/page.tsx](../src/app/page.tsx)
- **Global Styles**: [src/app/globals.css](../src/app/globals.css)
- **UI Components**: [src/components/design-system/](../src/components/design-system/)
- **Utilities**: [src/lib/utils.ts](../src/lib/utils.ts)
- **Hooks**: [src/hooks/](../src/hooks/)
- **Context**: [src/context/](../src/context/)

### Path Aliases

```typescript
@/* → ./src/*
@/components → ./src/components
@/lib → ./src/lib
@/hooks → ./src/hooks
@/ui → ./src/components/design-system
```

## Code Conventions

This project follows a feature-based folder structure combined with Next.js App Router conventions. All file names should use kebab-case for consistency.

### Component Structure

#### Server Components (Default)

```typescript
// No "use client" directive needed - server components are the default

// Page component using Next.js PageProps helper (globally available, no import needed)
export default async function Page(props: PageProps<'/blog/[slug]'>) {
  const { slug } = await props.params;
  // Server-side data fetching
  return <div>{/* ... */}</div>;
}
```

```typescript
// Layout component using Next.js LayoutProps helper (globally available, no import needed)
export default function Layout(props: LayoutProps<'/dashboard'>) {
  return (
    <section>
      {props.children}
      {/* Named slots (e.g. @analytics folder) appear as typed props */}
    </section>
  );
}
```

> **Note**: `PageProps` and `LayoutProps` are global helpers generated during `next dev`, `next build`, or `next typegen`. Static routes resolve params to `{}`.

#### Client Components

```typescript
"use client"; // Required at top

import { useState } from "react";

export function InteractiveComponent() {
  const [count, setCount] = useState(0);
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>;
}
```

### Component Declaration Style

**Prefer function declarations over arrow functions:**

```typescript
// ✅ Good - Function declaration
export function MyComponent({ title }: MyComponentProps) {
  return <div>{title}</div>;
}

// ❌ Avoid - Arrow function
export const MyComponent = ({ title }: MyComponentProps) => {
  return <div>{title}</div>;
};
```

**Benefits of function declarations:**

- Better debugging (named functions in stack traces)
- Hoisting allows flexible file organization
- More readable and conventional in React

### Props Type Definitions

**Prefer `interface` over `type` for component props:**

```typescript
// ✅ Preferred - Interface
interface ButtonProps {
  variant: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  children: React.ReactNode;
}

export function Button({ variant, size = "md", onClick, children }: ButtonProps) {
  return <button onClick={onClick}>{children}</button>;
}
```

**When to use `type` instead:**

- Unions: `type Status = "idle" | "loading" | "success" | "error"`
- Intersections: `type Combined = BaseProps & ExtendedProps`
- Mapped types: `type Readonly<T> = { readonly [K in keyof T]: T[K] }`
- Utility types: `type Partial<Props>`, `type Pick<Props, "id" | "name">`

**When to use `interface`:**

- Component props (preferred)
- Object shapes
- When you need declaration merging
- API responses and data models

```typescript
// Example: Interface for props, type for state
interface UserCardProps {
    userId: string;
    showAvatar?: boolean;
}

type LoadingState = "idle" | "loading" | "success" | "error";

export function UserCard({ userId, showAvatar = true }: UserCardProps) {
    const [status, setStatus] = useState<LoadingState>("idle");
    // ...
}
```

### Import Order (Prettier Auto-sorts)

1. `server-only` (if applicable)
2. React imports (`react`, `react-dom`)
3. Next.js imports (`next/*`)
4. Third-party modules
5. Internal imports with `@/` alias
6. Relative imports (`./`, `../`)

Example:

```typescript
import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { ThemeProvider } from "@/context/theme-provider";
import { cn } from "@/lib/utils";
import "./globals.css";
```

### Type Imports

Always use `import type` for type-only imports:

```typescript
// Good
import type { Metadata } from "next";
import type { ReactNode } from "react";

// Bad (ESLint will warn)
import { Metadata } from "next";
```

### Styling Patterns

#### Using `cn()` Utility

```typescript
import { cn } from "@/lib/utils";

<div className={cn(
  "base-classes here",
  condition && "conditional-classes",
  variant === "primary" && "primary-classes",
  className // Allow external className override
)} />
```

#### Component Variants (CVA)

```typescript
import { type VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva("inline-flex items-center justify-center rounded-md", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground",
            destructive: "bg-destructive text-destructive-foreground",
        },
        size: {
            default: "h-10 px-4 py-2",
            sm: "h-9 px-3",
            lg: "h-11 px-8",
        },
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});

interface ButtonProps extends VariantProps<typeof buttonVariants> {
    // ...
}
```

### React Compiler Optimizations

This project uses React Compiler - **DO NOT** manually use:

- `React.memo()`
- `useMemo()`
- `useCallback()`

The compiler handles memoization automatically.

**Exception**: Use when you need referential equality for specific use cases (e.g., dependency arrays).

## Working with This Codebase

### Adding New Pages

1. Create file in `src/app/`:

    ```typescript
    // src/app/about/page.tsx
    export default function Page() {
      return <div>About</div>;
    }
    ```

2. TypeScript will auto-generate route types
3. Navigate with type safety:
    ```typescript
    import Link from "next/link";
    <Link href="/about">About</Link> // Type-checked!
    ```

### Adding New Components

**Component Location:**

1. **UI Components** → `src/components/design-system/[name].tsx`
2. **Feature Components** → `src/components/[feature]/[name].tsx`
3. **Layout Components** → `src/components/layout/[name].tsx`

**Important Conventions:**

- Use **function declarations** (not arrow functions)
- Use **interface** for props (preferred over type)
- Name props interface as `[ComponentName]Props`

Example:

```typescript
// src/components/ui/custom-button.tsx
import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface CustomButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary";
}

export function CustomButton({
  variant = "primary",
  className,
  children,
  ...props
}: CustomButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "secondary" && "bg-secondary text-secondary-foreground",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Adding Custom Hooks

Create in `src/hooks/`:

```typescript
// src/hooks/use-local-storage.ts
"use client";

import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
    const [value, setValue] = useState<T>(initialValue);

    useEffect(() => {
        const stored = localStorage.getItem(key);
        if (stored) setValue(JSON.parse(stored));
    }, [key]);

    const setStoredValue = (newValue: T) => {
        setValue(newValue);
        localStorage.setItem(key, JSON.stringify(newValue));
    };

    return [value, setStoredValue] as const;
}
```

### Working with Themes

Theme is managed by `next-themes` in [src/context/theme-provider.tsx](../src/context/theme-provider.tsx).

Using theme in components:

```typescript
"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      Toggle theme
    </button>
  );
}
```

Colors are defined in [src/app/globals.css](../src/app/globals.css) using CSS variables.

### Environment Variables

1. Create `.env.local`:

    ```env
    NEXT_PUBLIC_API_URL=https://api.example.com
    DATABASE_URL=postgresql://...
    SECRET_KEY=...
    ```

2. Access in code:

    ```typescript
    // Client-side (must be NEXT_PUBLIC_*)
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    // Server-side only
    const dbUrl = process.env.DATABASE_URL;
    ```

3. TypeScript types are automatically generated:

    With `typedEnv: true` enabled in [next.config.ts](../next.config.ts:8-10), Next.js automatically validates and types your environment variables at build time. No manual type declarations needed!

## Common Tasks

### Task: Add a new Base UI component

```bash
# Install a component from coss.com (Base UI components)
pnpm dlx shadcn@latest add @coss [component-name]

# Example:
pnpm dlx shadcn@latest add @coss accordion
```

### Task: Format code

```bash
# Format all files
pnpm prettier --write .

# Format specific files
pnpm prettier --write "src/**/*.{ts,tsx}"
```

### Task: Check TypeScript errors

```bash
pnpm tsc --noEmit
```

### Task: Run development server

```bash
pnpm dev
```

### Task: Create production build

```bash
pnpm build
pnpm start
```

### Task: Add a new font

```typescript
// src/app/layout.tsx
import { Inter, Roboto } from "next/font/google";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: ["400", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  return (
    <html className={`${inter.variable} ${roboto.variable}`}>
      {/* ... */}
    </html>
  );
}
```

Then use in CSS:

```css
.heading {
    font-family: var(--font-roboto);
}
```

## Understanding the File Structure

### `/src/app/` - App Router

https://nextjs.org/docs/app/getting-started/project-structure#routing-files

- `layout.tsx` - Root layout (wraps all pages)
- `page.tsx` - Home page
- `[folder]/page.tsx` - Route pages
- `loading.tsx` - Loading UI
- `error.tsx` - Error UI
- `global-error.tsx` Global error UI
- `not-found.tsx` - 404 UI

### `/src/components/design-system/` - UI Components

48 pre-built components. All are:

- Built on Base UI (accessible)
- Styled with Tailwind
- Fully typed with TypeScript
- Support dark mode
- Accept className prop for customization

### `/src/lib/` - Utilities

- `utils.ts` - Helper functions (cn, formatPrice)
- Add shared utilities here

### `/src/hooks/` - Custom Hooks

- Client-side hooks only
- Must start with "use"
- Export from index for easier imports

### `/src/context/` - Context Providers

- `theme-provider.tsx` - Theme management
- Add new contexts here (auth, user, etc.)

## ESLint Rules to Follow

1. **No console.log** - Use `console.warn` or `console.error` instead
2. **No unused imports** - Auto-removed on save
3. **Type imports** - Use `import type` for types
4. **Prefer arrow functions** - Use arrow functions for callbacks
5. **Prefer template literals** - Use backticks over string concatenation

## Common Patterns

### Fetching Data (Server Component)

https://nextjs.org/docs/app/getting-started/layouts-and-pages#route-props-helpers

```typescript
export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const response = await fetch(`https://api.example.com/products/${id}`, {
    next: { revalidate: 3600 } // Cache for 1 hour
  });
  const product = await response.json();

  return <div>{product.name}</div>;
}
```

### Form Handling with Server Actions

```typescript
// app/actions.ts
"use server";

export async function submitContact(prevState: { message: string }, formData: FormData) {
    const email = formData.get("email");

    // Handle form submission

    return { message: "Success!" };
}
```

```typescript
// app/contact/form.tsx
"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions";

const initialState = { message: "" };

export function ContactForm() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <form action={formAction}>
      <input name="email" type="email" required />
      {state?.message && <p aria-live="polite">{state.message}</p>}
      <button disabled={pending}>Submit</button>
    </form>
  );
}
```

### Error Handling

```typescript
// app/dashboard/error.tsx
"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading States

```typescript
// app/dashboard/loading.tsx
export default function Loading() {
  return <div>Loading...</div>;
}
```

## Debugging Tips

### Check Next.js build output

```bash
pnpm build
# Look for:
# - Bundle sizes
# - Static/dynamic routes
# - Build errors
```

### Enable verbose logging

```typescript
// next.config.ts
const nextConfig = {
    logging: {
        fetches: {
            fullUrl: true,
        },
    },
};
```

### TypeScript errors

```bash
pnpm tsc --noEmit
```

### Check for unused code

```bash
pnpm lint
```

## Git Workflow

### Pre-commit Hook

Husky + lint-staged automatically formats code before commits.

Files affected: All staged files
Action: Prettier format

### Committing Changes

```bash
git add .
git commit -m "feat: add new feature"
# Prettier runs automatically on staged files
```

## Performance Considerations

1. **Images**: Always use `next/image` for optimization
2. **Fonts**: Use Next.js font optimization (already configured)
3. **Server Components**: Fetch data in server components when possible
4. **Client Components**: Keep them small and specific

## Accessibility

All UI components use Base UI, which provides:

- ARIA attributes
- Keyboard navigation
- Focus management
- Screen reader support

When creating custom components, follow these patterns.

## Testing Guidelines

(Note: No testing framework is currently installed)

To add testing:

```bash
# Vitest + React Testing Library
pnpm add -D vitest @testing-library/react @testing-library/jest-dom
pnpm add -D @vitejs/plugin-react jsdom

# Playwright for E2E
pnpm add -D @playwright/test
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import to Vercel
3. Deploy automatically

### Self-Hosted

```bash
pnpm build
pnpm start
# Or use Docker, PM2, etc.
```

## Troubleshooting

### "use client" directive not working

- Must be the **first line** of the file
- Cannot have comments before it

### Type errors with route params

- Params and searchParams are now Promises in Next.js 16+
- Always await them: `const { id } = await params;`

### Styles not applying

1. Check Tailwind class exists
2. Verify globals.css is imported
3. Check for CSS variable typos
4. Inspect element in DevTools

### Hydration errors

- Ensure server and client render the same HTML
- Avoid `window`, `localStorage` in initial render
- Use `useEffect` for client-only code

## Security

See [SECURITY.md](./SECURITY.md) for comprehensive security guidelines including:

- Security headers configuration (`next.config.ts` vs `proxy.ts`)
- Content Security Policy (CSP) with nonces
- Environment variable best practices
- Input validation with Zod
- XSS prevention
- Authentication recommendations

## UI Library Reference (Base UI + coss ui)

This project uses **coss ui** components built on **Base UI**. When debugging UI issues, reference these docs.

### Base UI Quick Start

**Source**: https://base-ui.com/react/overview/quick-start

**Installation**: `npm i @base-ui-components/react` (tree-shakeable)

**Portal Setup** (for Dialog, Popover, etc.):

```css
/* Add to root element to ensure portals appear above content */
#root {
    isolation: isolate;
}
```

**iOS 26+ Safari Fix**:

```css
/* Required for backdrop components after scrolling */
body {
    position: relative;
}
```

**Component Assembly Pattern**:
Base UI components are composable - assemble sub-components:

```typescript
import { Popover } from "@base-ui-components/react/popover";

<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Portal>
    <Popover.Positioner>
      <Popover.Popup>
        <Popover.Arrow />
        <Popover.Title>Title</Popover.Title>
        <Popover.Description>Content</Popover.Description>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

**Styling**: Base UI is unstyled - supports Tailwind, CSS Modules, CSS-in-JS. All components accept `className` prop.

### coss ui Library

**Source**: https://coss.com/ui/llms.txt

**What it is**: 50+ beautifully designed, accessible, composable React components built on Base UI + Tailwind CSS.

**Philosophy**: Copy-paste-and-own approach - components are yours to customize.

**Component Categories**:

- **Form**: Input, Textarea, Checkbox, Radio Group, Select, Autocomplete, Number Field
- **Layout**: Card, Container, Separator
- **Feedback**: Toast, Alert, Progress, Spinner, Meter
- **Navigation**: Breadcrumb, Pagination, Tabs, Menu
- **Overlay**: Dialog, Popover, Tooltip, Sheet
- **Interactive**: Slider, Toggle, Accordion, Table

**Adding Components**:

```bash
pnpm dlx shadcn@latest add @coss [component-name]
```

### Debugging UI Issues

1. **Check component imports** - Ensure importing from correct path (`@/components/design-system/`)
2. **Verify Portal setup** - Overlay components need proper stacking context
3. **Inspect accessibility** - Base UI provides ARIA attributes, keyboard nav, focus management
4. **Check Tailwind classes** - Use browser DevTools to verify classes are applied
5. **Review component composition** - Base UI requires proper sub-component nesting

### AI Context Files

For detailed component APIs, fetch these URLs:

- **Base UI Quick Start**: https://base-ui.com/react/overview/quick-start.md
- **coss ui LLMs.txt**: https://coss.com/ui/llms.txt

## Additional Resources

- [Next.js 16 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Base UI Docs](https://base-ui.com)
- [coss ui Docs](https://coss.com/ui)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## Project-Specific Notes

### Custom Utilities

**`cn()`** - Merges Tailwind classes intelligently

```typescript
cn("px-4", "px-6"); // → "px-6" (later value wins)
```

**`formatPrice()`** - Formats currency

```typescript
formatPrice(1000); // → "₱1,000" (default PHP)
formatPrice(1000, "USD", "en-US"); // → "$1,000"
```

### Theme Colors

Colors use OKLCH color space for better consistency. To modify:

Edit [src/app/globals.css](../src/app/globals.css):

```css
:root {
    --primary: oklch(0.21 0.006 285.885);
    /* Change these values */
}
```

Use in components:

```typescript
<div className="bg-primary text-primary-foreground">...</div>
```

### React Compiler

This project uses React Compiler (experimental). It automatically optimizes:

- Component re-renders
- Value memoization
- Callback stability

You typically don't need manual `useMemo`/`useCallback`.

---

**Last Updated**: November 23, 2025
**Template Version**: 0.1.0

This guide should be updated as the project evolves. When adding new patterns, conventions, or significant features, update this file to help future developers (human or AI) understand the codebase.
