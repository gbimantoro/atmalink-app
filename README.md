# ATMALINK (Atma Jaya Alumni SuperApp & Platform)

Modern, unified alumni engagement and networking ecosystem for Universitas Katolik Indonesia Atma Jaya (PERLUNI UAJ).

[![Deploy to Cloudflare](https://github.com/gbimantoro/atmalink-app/actions/workflows/deploy.yml/badge.svg)](https://github.com/gbimantoro/atmalink-app/actions/workflows/deploy.yml)

## 🌐 Live Deployment
- **Mobile Web (Dev/Staging)**: [https://devatmalink.perluniuaj.org](https://devatmalink.perluniuaj.org)
- **API Health Check**: [https://devatmalink.perluniuaj.org/health](https://devatmalink.perluniuaj.org/health)
- **Cloudflare Worker Project**: `atmalink-app`
- **Bindings**: Cloudflare D1 (SQL Database), KV (Tokens & Caching), R2 (Media Storage), Durable Objects (Realtime Chat)

---

## 🏗️ Architecture & Monorepo Structure

```
atmalink-app/
├── apps/
│   ├── mobile-web/       # Mobile-first React 18 + Vite + Tailwind CSS PWA
│   ├── admin-dashboard/  # Web management dashboard (React + Recharts)
│   └── flutter-app/      # Cross-platform native mobile app (Android/iOS)
├── packages/
│   ├── ui-core/          # Atma Jaya brand tokens, AtmaButton, AlumniIdCard, etc.
│   ├── api-client/       # Type-safe client generated from OpenAPI
│   └── ts-config/        # Base TypeScript shared configurations
├── workers/
│   └── api/              # Cloudflare Worker API backend built with Hono.js
└── .github/
    └── workflows/
        └── deploy.yml    # Automated CI/CD pipeline for Cloudflare Workers
```

---

## 🔐 Authentication (Passwordless Magic Link)
The platform utilizes modern passwordless Magic Link authentication:
1. Enter your registered alumni email (e.g. `budi.santoso@alumni.atmajaya.ac.id`).
2. A cryptographic single-use magic token is issued via KV.
3. The client verifies the token and receives an HMAC-signed JWT session token.

### Quick Demo Accounts:
- **Budi Santoso** (Teknik Informatika '18): `budi.santoso@alumni.atmajaya.ac.id`
- **Siti Rahma** (Kedokteran '16): `siti.rahma@alumni.atmajaya.ac.id`

---

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- pnpm >= 9

### Installation & Local Development
```bash
# Clone the repository
git clone git@github.com:gbimantoro/atmalink-app.git
cd atmalink-app

# Install dependencies
pnpm install

# Run Mobile Web in dev mode
pnpm dev:mobile-web

# Run Cloudflare Worker API locally
pnpm dev:api
```

### Building & Deploying
```bash
# Build Mobile Web bundle
pnpm build:mobile-web

# Deploy Cloudflare Worker with static assets
pnpm deploy:preview
```

---

## 🔄 CI/CD Automation
The `.github/workflows/deploy.yml` pipeline automatically builds the `@atmajaya/mobile-web` bundle and deploys it along with the `atmalink-app` worker directly to Cloudflare on push to `main`.
Required GitHub Secrets:
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`
