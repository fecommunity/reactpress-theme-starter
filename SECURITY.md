# Security Policy

## Supported Versions

| Version | Supported |
| :------ | :-------- |
| `1.x`   | ✅        |

Security fixes are applied to the latest release on the default branch (`master` / `main`).

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub Issues.**

If you discover a security issue in this theme starter, report it privately:

1. Open a **[GitHub Security Advisory](https://github.com/fecommunity/reactpress-theme-starter/security/advisories/new)** on this repository, **or**
2. Report via the [ReactPress main repository](https://github.com/fecommunity/reactpress/security/advisories/new) if the issue affects the broader platform or toolkit.

Include as much detail as possible:

- Description of the vulnerability and potential impact
- Steps to reproduce
- Affected routes, components, or configuration
- Suggested fix (if any)

We aim to acknowledge reports within **5 business days** and will coordinate disclosure once a fix is available.

---

## Scope

This policy covers **this repository** (the Next.js theme frontend). Issues in the ReactPress API, admin console, or `@fecommunity/reactpress-toolkit` should be reported to the [ReactPress project](https://github.com/fecommunity/reactpress).

### In scope examples

- Cross-site scripting (XSS) in theme-rendered content or components
- Open redirects in theme routing or auth flows
- Sensitive data exposure via misconfigured environment variables documented in this repo
- Insecure defaults in theme scripts or mock API handlers

### Out of scope examples

- Vulnerabilities in third-party CMS content uploaded by site operators
- Server-side issues in the ReactPress NestJS API (report upstream)
- Denial-of-service against a self-hosted deployment without a demonstrated theme-level flaw

---

## Secure Development

Contributors should:

- Never commit secrets (`.env`, tokens, private keys)
- Use [`.env.example`](./.env.example) for documentation-only defaults
- Run `pnpm run check` before opening pull requests
- Follow [CONTRIBUTING.md](./CONTRIBUTING.md) for review and testing expectations

Thank you for helping keep ReactPress themes safe for everyone.
