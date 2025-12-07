# Claude Code Context

This file is automatically read by Claude Code at the start of each session.

## Project Overview

Modern Next.js 16 template with TypeScript, Tailwind CSS, and Base UI components.

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9.3
- **UI Library**: Base UI (coss ui components)
- **Styling**: Tailwind CSS 4.1.17
- **Package Manager**: pnpm 10.20.0

See [.claude/CLAUDE_CODE_GUIDE.md](.claude/CLAUDE_CODE_GUIDE.md) for detailed conventions and patterns.

## Custom Agents

This project includes specialized Claude Code agents in [.claude/agents/](.claude/agents/):

- **code-reviewer** - Proactive code quality and security reviews
- **security-auditor** - Security vulnerability scanning and auth implementation
- **penetration-tester** - Security testing and vulnerability assessment
- **web-accessibility-checker** - WCAG compliance and accessibility audits
- **documentation-expert** - Documentation generation and maintenance

Use these agents for specialized tasks beyond standard development work.

## UI Library Context

When debugging UI issues or working with components, fetch these URLs for detailed API docs:

- **Base UI Quick Start**: https://base-ui.com/react/overview/quick-start.md
- **coss ui LLMs.txt**: https://coss.com/ui/llms.txt

## Key Commands

```bash
pnpm dev                                    # Start dev server (localhost:3000)
pnpm build                                  # Production build
pnpm start                                  # Start production server
pnpm lint                                   # Run ESLint
pnpm lint:claude                            # AI-powered linter (checks vs main)
pnpm dlx shadcn@latest add @coss [name]     # Add UI component
```

## Key Locations

- **UI Components**: `src/components/design-system/`
- **App Routes**: `src/app/`
- **Utilities**: `src/lib/`
- **Hooks**: `src/hooks/`
- **Context**: `src/context/`
- **Security Guide**: [.claude/SECURITY.md](.claude/SECURITY.md)
