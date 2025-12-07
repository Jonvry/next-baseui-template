# Project Overview

A modern Next.js 16 template with React 19, TypeScript, Tailwind CSS 4, and a comprehensive UI component library.

## Tech Stack

### Core Framework

- **Next.js 16.0.3** - React framework with App Router, React Compiler, and Typed Routes
- **React 19.2.0** - Latest React with improved hooks and compiler optimizations
- **TypeScript 5** - Type-safe development with strict mode enabled

### Styling & UI

- **Tailwind CSS 4** - Utility-first CSS framework (latest PostCSS version)
- **Base UI Components 1.0.0-beta.6** - Headless accessible React components
- **next-themes 0.4.6** - Dark mode support with system preference detection
- **Lucide React 0.554.0** - Beautiful & consistent icon library
- **class-variance-authority 0.7.1** - Type-safe component variants
- **tw-animate-css 1.4.0** - Enhanced Tailwind animations

### Developer Experience

- **ESLint 9** - Modern flat config with Next.js, TypeScript, and unused imports rules
- **Prettier 3.6.2** - Code formatting with import sorting and Tailwind class sorting
- **Husky 9.1.7** - Git hooks for pre-commit checks
- **lint-staged 16.2.7** - Run linters on staged files
- **pnpm 10.20.0** - Fast, disk space efficient package manager

### React Optimizations

- **React Compiler (Babel Plugin)** - Automatic memoization and optimization
- **Component Caching** - Next.js experimental component caching enabled
- **Typed Routes** - Type-safe routing with auto-generated route types
- **Typed Environment Variables** - Environment variable type safety

## Project Structure

```
├── src/
│   ├── app/                        # Next.js App Router
│   │   ├── layout.tsx              # Root layout with theme & toast providers
│   │   ├── page.tsx                # Home page
│   │   ├── globals.css             # Global styles & CSS variables
│   │   ├── global-error.tsx        # Global error boundary
│   │   ├── sitemap.ts              # SEO sitemap configuration
│   │   ├── robots.ts               # SEO robots.txt configuration
│   │   ├── opengraph-image.jpeg    # Default Open Graph image
│   │   ├── favicon.ico             # App icon
│   │   └── design-system/          # Design system demo page
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       └── _components/        # Demo components
│   ├── components/
│   │   └── design-system/          # 48 pre-built UI components
│   │       ├── accordion.tsx
│   │       ├── alert.tsx
│   │       ├── alert-dialog.tsx
│   │       ├── autocomplete.tsx
│   │       ├── avatar.tsx
│   │       ├── badge.tsx
│   │       ├── breadcrumb.tsx
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── checkbox.tsx
│   │       ├── checkbox-group.tsx
│   │       ├── collapsible.tsx
│   │       ├── combobox.tsx
│   │       ├── dialog.tsx
│   │       ├── empty.tsx
│   │       ├── field.tsx
│   │       ├── fieldset.tsx
│   │       ├── form.tsx
│   │       ├── frame.tsx
│   │       ├── group.tsx
│   │       ├── input.tsx
│   │       ├── input-group.tsx
│   │       ├── kbd.tsx
│   │       ├── label.tsx
│   │       ├── menu.tsx
│   │       ├── meter.tsx
│   │       ├── number-field.tsx
│   │       ├── pagination.tsx
│   │       ├── popover.tsx
│   │       ├── preview-card.tsx
│   │       ├── progress.tsx
│   │       ├── radio-group.tsx
│   │       ├── scroll-area.tsx
│   │       ├── select.tsx
│   │       ├── separator.tsx
│   │       ├── sheet.tsx
│   │       ├── skeleton.tsx
│   │       ├── slider.tsx
│   │       ├── spinner.tsx
│   │       ├── switch.tsx
│   │       ├── table.tsx
│   │       ├── tabs.tsx
│   │       ├── textarea.tsx
│   │       ├── toast.tsx
│   │       ├── toggle.tsx
│   │       ├── toggle-group.tsx
│   │       ├── toolbar.tsx
│   │       └── tooltip.tsx
│   ├── context/
│   │   ├── theme-provider.tsx      # Dark/light theme context
│   │   └── query-provider.tsx      # Query client provider (if needed)
│   ├── hooks/
│   │   ├── use-debounce.ts         # Debounce hook
│   │   ├── use-throttle.ts         # Throttle hook
│   │   └── use-window-size.ts      # Window size hook
│   ├── lib/
│   │   └── utils.ts                # Utility functions (cn, formatPrice)
│   ├── definitions.ts              # Type definitions (CurrencyCode, LocaleCode)
│   └── proxy.ts                    # Proxy/middleware configuration
├── .husky/                         # Git hooks
├── .vscode/                        # VSCode settings
├── components.json                 # shadcn/ui config
├── eslint.config.mjs               # ESLint flat config
├── next.config.ts                  # Next.js configuration
├── package.json                    # Dependencies & scripts
├── tsconfig.json                   # TypeScript config
├── .prettierrc                     # Prettier config
└── .prettierignore                 # Prettier ignore patterns
```

## Key Features

### 1. Modern Next.js Setup

- **App Router** - File-based routing with React Server Components
- **React Compiler** - Automatic optimization without manual memoization
- **Component Caching** - Improved performance with caching
- **Typed Routes** - Full type safety for navigation
- **Typed Environment Variables** - Runtime validation of env vars
- **Global Error Boundary** - Catches and handles application errors gracefully
- **SEO Ready** - Pre-configured sitemap.ts and robots.ts

### 2. Theme System

- Light/Dark mode support using next-themes
- System preference detection
- Smooth transitions
- OKLCH color space for better color consistency
- CSS variables for easy customization
- Comprehensive color palette:
    - Primary, Secondary, Accent
    - Muted, Destructive, Warning, Success, Info
    - Card, Popover, Sidebar specific colors

### 3. UI Component Library

48 pre-built, accessible components built on Base UI:

- **Forms**: Input, Textarea, Select, Checkbox, Checkbox Group, Radio Group, Switch, Number Field, Autocomplete, Combobox, Field, Fieldset, Form, Input Group
- **Navigation**: Menu, Breadcrumb, Tabs, Pagination
- **Feedback**: Alert, Toast, Dialog, Progress, Spinner, Skeleton, Empty
- **Layout**: Card, Frame, Separator, Scroll Area, Sheet, Group
- **Data Display**: Table, Badge, Avatar, Kbd, Meter, Preview Card
- **Overlays**: Popover, Tooltip, Dialog, Alert Dialog
- **Interactive**: Button, Toggle, Toggle Group, Slider, Collapsible, Accordion, Toolbar

### 4. Developer Tools

#### ESLint Configuration

- Next.js recommended rules
- TypeScript type-checking
- Unused imports auto-removal
- Code style enforcement:
    - Prefer arrow callbacks
    - Prefer template literals
    - Consistent type imports
    - No console.log (warnings)

#### Prettier Configuration

- Auto-format on save
- Import sorting with custom order:
    1. `server-only`
    2. React imports
    3. Next.js imports
    4. Third-party modules
    5. `@/` aliased imports
    6. Relative imports
- Tailwind class sorting
- 4-space indentation
- 100 character line width

#### Git Hooks (Husky + lint-staged)

- Pre-commit: Auto-format all staged files
- Ensures code consistency before commits

### 5. Type Definitions

#### Currency & Locale Types (`src/definitions.ts`)

Pre-defined types with autocomplete support:

```typescript
type CurrencyCode =
    | "USD"
    | "EUR"
    | "GBP"
    | "JPY"
    | "PHP"
    | "CNY"
    | "AUD"
    | "CAD"
    | "CHF"
    | "SGD"
    | (string & {});
type LocaleCode =
    | "en-US"
    | "en-GB"
    | "en-PH"
    | "ja-JP"
    | "zh-CN"
    | "de-DE"
    | "fr-FR"
    | "es-ES"
    | (string & {});
```

### 6. Utility Functions

#### `cn()` - Class Name Merger

Combines clsx and tailwind-merge for optimal className handling:

```typescript
cn("px-4 py-2", "px-6"); // Result: "px-6 py-2"
```

#### `formatCurrency()` - Currency Formatter

Locale-aware price formatting with optional decimal control:

```typescript
formatCurrency(1000); // "₱1,000.00" (default PHP)
formatCurrency(1000, "USD", "en-US"); // "$1,000.00"
formatCurrency(1000, "PHP", "en-PH", false); // "₱1,000" (no cents)
```

### 7. Custom Hooks

- **useDebounce** - Delay rapid value changes
- **useThrottle** - Limit function execution rate
- **useWindowSize** - Track window dimensions reactively

## Configuration Details

### Next.js Config ([next.config.ts](next.config.ts))

```typescript
{
  reactCompiler: true,         // Enable React Compiler
  cacheComponents: true,       // Cache components for performance
  typedRoutes: true,           // Type-safe routing
  experimental: {
    typedEnv: true             // Validate environment variables
  }
}
```

### TypeScript Config ([tsconfig.json](tsconfig.json))

- Target: ES2017
- Strict mode enabled
- Path alias: `@/*` → `./src/*`
- JSX: react-jsx (new JSX transform)

### Tailwind Setup

- Tailwind CSS 4 (PostCSS architecture)
- Custom variant for dark mode
- CSS variables for theming
- Custom radius values
- Skeleton animation keyframes

### shadcn/ui Configuration ([components.json](components.json))

- Style: New York
- Base color: Zinc
- CSS variables enabled
- UI alias: `@/components/design-system`
- Icon library: Lucide
- Custom registry: `@coss`

## Development Commands

```bash
# Install dependencies
pnpm install

# Development server (http://localhost:3000)
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Design System

### Demo Page

Visit `/design-system` to see all components in action with interactive demos.

### Color Palette

Uses OKLCH color space for consistent, perceptually uniform colors:

- Better interpolation between colors
- More predictable lightness values
- Wide gamut support

### Typography

- Font: Manrope (Google Fonts)
- Variable font for optimal performance
- Font fallbacks: Arial, Helvetica, sans-serif

### Spacing & Radius

- Border radius: 0.625rem (10px) base
- Responsive radius scale: sm, md, lg, xl
- Consistent spacing using Tailwind scale

## Security

For comprehensive security guidelines, see [.claude/SECURITY.md](.claude/SECURITY.md).

### Quick Reference

| Topic                             | Location                                           |
| --------------------------------- | -------------------------------------------------- |
| Security Headers (static)         | `next.config.ts` → `headers()`                     |
| Security Headers (dynamic/nonces) | `src/proxy.ts`                                     |
| CSP Configuration                 | [SECURITY.md](.claude/SECURITY.md#5-csp-reference) |
| Environment Variables             | `.env.local` (never commit)                        |

### Security Headers

Add to [next.config.ts](next.config.ts):

```typescript
async headers() {
    return [
        {
            source: "/(.*)",
            headers: [
                { key: "X-Frame-Options", value: "DENY" },
                { key: "X-Content-Type-Options", value: "nosniff" },
                { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
                { key: "Content-Security-Policy", value: "default-src 'self'; ..." },
            ],
        },
    ];
}
```

### Security Checklist

- [ ] Security headers configured
- [ ] CSP policy defined
- [ ] Environment variables scoped correctly
- [ ] Input validation on forms/actions
- [ ] HTTPS in production
- [ ] Dependencies updated (`pnpm audit`)

## Best Practices

### Component Development

1. Use Server Components by default
2. Add "use client" only when needed (interactivity, hooks, context)
3. Leverage React Compiler (avoid manual memo/useCallback)
4. Use typed routes for navigation
5. Prefer composition over prop drilling

### Styling

1. Use utility classes over custom CSS
2. Use `cn()` for conditional classes
3. Follow design system color variables
4. Leverage Tailwind's responsive utilities

### Type Safety

1. Import types with `import type`
2. Use Next.js typed routes: `Route<"/path">`
3. Validate environment variables
4. Avoid `any` type (ESLint warns)

### Performance

1. Optimize images with `next/image`
2. Use server components for data fetching
3. Implement loading states
4. Code split with dynamic imports when needed

## Environment Variables

Set up your environment variables in `.env.local`:

```env
# Add your environment variables here
# Examples:
# NEXT_PUBLIC_API_URL=
# DATABASE_URL=
# API_SECRET_KEY=
```

With `typedEnv: true`, Next.js will validate these at build time.

## Next Steps

1. Customize theme colors in [globals.css](src/app/globals.css)
2. Update metadata in [layout.tsx](src/app/layout.tsx)
3. Build your first page in [page.tsx](src/app/page.tsx)
4. Configure sitemap URLs in [sitemap.ts](src/app/sitemap.ts)
5. Add environment variables to `.env.local`
6. Configure remote image patterns in [next.config.ts](next.config.ts) if needed
7. Visit `/design-system` to explore available components

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Base UI Documentation](https://base-ui.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
