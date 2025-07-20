# GaerGuild Store – Front-End Documentation  

Modern **Next.js 15** application delivering a fast, accessible and responsive tech-commerce experience.

## 1 · Overview
The front-end is a **TypeScript-first** SPA powered by **Next.js (App Router)**.  
It consumes the REST API (see backend docs) via **RTK Query**, provides animated UI with **Framer Motion**, and embraces **Tailwind CSS** for utility-based styling alongside **Ant Design** components.

## 2 · Tech Stack
| Layer | Libraries / Tools |
|-------|-------------------|
| Framework | Next.js 15, React 18, TypeScript 5 |
| State & Data | Redux Toolkit, RTK Query |
| Styling | Tailwind CSS v3, Ant Design v5, CSS Modules |
| Animations | Framer Motion v11 |
| Notifications | Sonner |
| Lint / Format | ESLint |

## 3 · Key Features
- **Responsive Layouts** – adaptive grid (1–4 cards) with container queries.
- **Dynamic Routing** – App Router (`app/` directory) with SSG/SSR per page:
  - `/` – hero, featured products
  - `/products` – search, filters, pagination
  - `/products/[id]` – details, cart integration
  - `/contact`
- **Centralised State** – cart slice, UI slice and shared API cache.
- **Cart Sidebar** – slide-in panel, quantity controls, clear cart, checkout modal.
- **Checkout Flow** – modal with form validation, bKash & Nagad wallet support, success modal.
- **Skeletons & Lazy Loading** – graceful data loading indicators.

## 4 · Setup & Running

### 4.1 Prerequisites
- Node 18+
- npm 9 / Yarn 1.22
- Access to Qtech Store backend API (`.env.local`)

### 4.2 Installation
```bash
git clone https://github.com/mu-senpai/qtec-task.git
cd qtec-task/client
npm install     
```

### 4.3 Environment Variables (`.env.local`)
```
NEXT_PUBLIC_API_BASE_URL=https://qtech-task-server.vercel.app/api/
```

### 4.4 Scripts
| Command | Action |
|---------|--------|
| `npm run dev` | Local dev server on `http://localhost:3000` |
| `npm run build` | Production build with next build |
| `npm run start` | Launch prod server (`.next/standalone`) |
| `npm run lint` | ESLint |

## 5 · Development Guidelines
### 5.1 Code Style
- **Functional components** with `FC` or typed props.
- **Hooks** in `hooks/` when stateful logic reused across components.
- Keep components **presentational vs container**: UI under `components/`, data fetching under `pages/` or hooks.

### 5.2 State Management
- Global data via **RTK Query**, cached and auto-revalidated.
- UI state (sidebar, modals) in `uiSlice`.
- Cart state in `cartSlice`; persists per session via anonymous `sessionId`.

### 5.3 Styling
- Tailwind for utilities; Ant Design for complex components (Table, Modal).
- Custom utilities declared in `@layer utilities` inside `globals.css`.

### 5.4 Imports
- Absolute paths via `tsconfig.json` alias `@/` → `src/`:
  ```ts
  import { HeroContent } from '@/components/layout/HeroContent'
  ```

### 5.5 Commit Conventions
- Conventional Commits (`feat:`, `fix:`, `refactor:`…)
- PR titles follow same schema, linked to issues.


## 6 · Deployment
1. Build assets  
   ```bash
   npm run build
   ```
2. Output is in `.next/` (or `.next/standalone` for Docker).
3. Deploy to **Vercel**, **Render** or any Node host with:
   ```bash
   npm run start
   ```
4. Set environment variables in host dashboard.

## 7 · Roadmap
- Integrate `next-auth` for Google / GitHub sign-in.
- Stripe or SSLCOMMERZ live payment gateway.
- Multi-currency & i18n (react-intl).
- Product reviews & ratings backend.
- CMS integration (Sanity) for marketing pages.


> Crafted in Dhaka, Bangladesh 🇧🇩 – Happy coding!