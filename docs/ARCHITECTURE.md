# Payline Architecture Documentation

## Overview

Payline is a modern fintech web application engineered with **React 19**, **Vite**, **Motion (Framer Motion)**, and **React Router v7**. The application offers an ultra-responsive, highly accessible, dual-theme (Dark/Light) experience complete with custom mouse cursor physics, dynamic orbital background beams, smooth page transitions, and modular layout components.

---

## Tech Stack & Dependencies

| Layer / Concern | Technology | Version | Purpose |
|---|---|---|---|
| Framework | React | ^19.0.0 | Component hierarchy, hooks, state lifecycle |
| Build Tool | Vite | ^6.1.0 | Fast HMR development server, optimized ESM bundling |
| Routing | React Router DOM | ^7.18.4 | Client-side routing, route transitions, SPA fallback |
| Animations | Motion (`motion/react`) | ^13.4.0 | Page transitions, hero particle effects, micro-interactions |
| Icons | Lucide React | ^0.468.0 | Consistent fintech and navigation iconography |
| Styling | Modular CSS3 | Vanilla | CSS Custom Properties, Glassmorphism, Responsive Grid/Flexbox |

---

## Directory Structure

```text
animation hero section/
├── docs/                               # Project documentation & guidelines
│   ├── ARCHITECTURE.md                 # System architecture (this file)
│   ├── DESIGN_SYSTEM.md                # Design tokens, themes, typography
│   ├── ROUTING_AND_PAGES.md            # Route map & page implementation status
│   └── NODE_11_COMPLETION.md           # Node 11 deliverables and test report
├── public/                             # Static assets & favicon
├── src/
│   ├── components/
│   │   ├── benefits/                   # Key benefits & feature grid cards
│   │   ├── cta/                        # Final call-to-action sections
│   │   ├── faq/                        # Interactive FAQ accordion system
│   │   ├── features/                   # Why Choose Us & value cards
│   │   ├── growth/                     # Interactive growth calculator & charts
│   │   ├── hero/                       # Hero section, word reveal & 3D tilt
│   │   ├── layout/                     # Navbar, Footer, and Header wrappers
│   │   ├── loading-ui/                 # Initial full-screen loader animation
│   │   ├── navigation/                 # MegaMenu, MegaMenuItem, RouteEffects
│   │   ├── pages/                      # Reusable page components (ComingSoon, ProductPage)
│   │   └── ui/                         # CustomCursor, BackgroundBeams, ThemeToggle
│   ├── data/                           # Centralized static content & menu data
│   │   ├── benefits.js                 # Benefit items data
│   │   ├── content.js                  # Hero statistics, actions, text tokens
│   │   ├── faq.js                      # FAQ question categories and answers
│   │   ├── keyBenefits.js              # Detailed feature descriptions
│   │   ├── navigation.js               # Navigation items for MegaMenus
│   │   └── pages.js                    # Content templates for inner pages
│   ├── pages/                          # Primary view routes
│   │   ├── Home.jsx                    # Landing page assembly
│   │   ├── Login.jsx                   # User authentication sign-in
│   │   ├── Register.jsx                # Account creation onboarding
│   │   ├── NotFound.jsx                # 404 Error page
│   │   ├── Pricing.jsx                 # Pricing plans & tier selection
│   │   ├── Contact.jsx                 # Customer contact & inquiry form
│   │   └── [Inner Pages]               # Accounts, Cards, Transfers, Business, etc.
│   ├── styles/                         # Global and modular stylesheets
│   │   ├── globals.css                 # Base resets, typography, root variables
│   │   ├── theme.css                   # Dark/Light theme token overrides
│   │   ├── auth.css                    # Login & registration layout styling
│   │   ├── pages.css                   # Inner pages, ComingSoon, and 404 styles
│   │   ├── footer.css                  # Footer section styles
│   │   ├── faq.css                     # FAQ accordion styles
│   │   ├── key-benefits.css            # Benefits section styles
│   │   ├── why-choose-us.css           # Value propositions section styles
│   │   ├── loader.css                  # Loading screen styles
│   │   ├── responsive.css              # Responsive overrides & breakpoint tweaks
│   │   └── background-beams.css        # Background ambient canvas & glow effects
│   ├── App.jsx                         # Root application container & router
│   └── main.jsx                        # React 19 root entry point
├── index.html                          # HTML shell & font definitions
├── package.json                        # Project dependencies and npm scripts
└── vite.config.js                      # Vite bundler configuration
```

---

## Core Systems

### 1. Theme Management (Dark & Light)
- Theme state is stored in `localStorage` under key `payline-theme` with fallback to system preference (`prefers-color-scheme: light`).
- The root document element is assigned `data-theme="dark"` or `data-theme="light"`.
- All CSS variables dynamically adapt:
  - `--bg`: Background canvas color (`#060a12` dark vs `#f8fafc` light).
  - `--surface`: Component cards and modules (`#0b1220` dark vs `#ffffff` light).
  - `--text` & `--muted`: High contrast typography vs subtle metadata text.
  - `--line` & `--glass`: Translucent border and backdrop blur parameters.
  - `--accent`: High-energy Payline electric blue (`#00a0ff`).

### 2. Navigation & Routing Architecture
- Powered by `BrowserRouter` in `src/App.jsx`.
- `RouteEffects.jsx` observes location changes:
  - Updates `document.title` dynamically according to route.
  - Automatically handles scroll-to-top or hash scrolling (e.g. `/#growth`, `/#faq`).
  - Safely focuses main content for accessibility.
- Desktop navigation features an accessible dropdown Mega Menu system with keyboard controls (Arrow keys, Escape).
- Mobile navigation provides a full slide-out responsive drawer.

### 3. Application Lifecycle & Loading Screen
- `InitialLoader.jsx` runs on first page load:
  - Preloads Space Grotesk fonts and assets.
  - Enforces smooth exit animation with Motion's `<AnimatePresence>`.
  - While active, main content is marked with `inert` and `aria-hidden` to prevent accessibility traps or duplicate tab indices.

### 4. Inner Page Strategy
- Built inner pages:
  - **Home** (`/`)
  - **Login** (`/login`)
  - **Register** (`/register`, `/signup`, `/create-account`)
  - **Pricing** (`/pricing`)
  - **Contact** (`/contact`)
  - **404** (`/404` and `*`)
- Inner feature pages planned for future nodes (Accounts, Cards, Transfers, Payments, Business Accounts, Corporate Cards, Invoicing, Payroll, About, Careers, Security):
  - Reusable `ComingSoon.jsx` component provides a cohesive, polished preview with feature highlights and priority waitlist subscription.
  - Seamlessly prepares the site for isolated development in subsequent nodes.
