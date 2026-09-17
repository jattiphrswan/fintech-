# Payline Routing & Pages Documentation

## Overview

Payline uses **React Router DOM v7** for declarative, accessible client-side routing. Every path is mapped with descriptive page titles, deep linking, hash-navigation support, and responsive inner page layouts.

---

## Route Matrix

| Path | Component | Status | Page Title | Description |
|---|---|---|---|---|
| `/` | `Home` | **Completed** | `Payline - Revolutionizing Finance` | Main landing hero, 3D card, growth calculator, benefits, FAQ, footer |
| `/login` | `Login` | **Node 11 (Completed)** | `Sign In | Payline` | Secure sign-in form, demo credentials, biometric / social quick login |
| `/register` | `Register` | **Node 11 (Completed)** | `Create Account | Payline` | Account onboarding, personal/business toggle, password strength meter |
| `/signup` | `Register` | **Node 11 (Alias)** | `Create Account | Payline` | Convenient alias for `/register` |
| `/create-account` | `Register` | **Node 11 (Alias)** | `Create Account | Payline` | Convenient alias for `/register` |
| `/pricing` | `Pricing` | **Completed** | `Pricing Plans | Payline` | Personal & Business tier comparison |
| `/contact` | `Contact` | **Completed** | `Contact Us | Payline` | Customer inquiries and support form preview |
| `/404` | `NotFound` | **Node 11 (Completed)** | `404 - Page Not Found | Payline` | Error 404 recovery page with route suggestions |
| `*` | `NotFound` | **Node 11 (Completed)** | `404 - Page Not Found | Payline` | Wildcard catch-all for unknown URLs |

---

## Future Inner Pages (Coming Soon Framework)

The following pages are structured with the reusable `ComingSoon.jsx` component, featuring dedicated metadata, feature previews, and a waitlist notification form. They are queued for full product implementation in upcoming nodes.

| Path | Component | Planned Node | Eyebrow & Category |
|---|---|---|---|
| `/accounts` | `Accounts` | Node 12 | Personal / Everyday Spending & Savings |
| `/cards` | `Cards` | Node 13 | Personal / Virtual & Physical Debit/Credit Cards |
| `/transfers` | `/transfers` | Node 14 | Personal / Global Real-time Transfers |
| `/payments` | `Payments` | Node 14 | Personal / Bills, Subscriptions & Recurring Payments |
| `/business` | `BusinessAccounts` | Node 15 | Business / Company Balances & Multi-entity Finance |
| `/business/cards` | `CorporateCards` | Node 16 | Business / Team Spending & Expense Management |
| `/business/invoicing` | `Invoicing` | Node 17 | Business / Automated Invoices & Receivables |
| `/business/payroll` | `Payroll` | Node 18 | Business / Team Salaries & Automated Disbursements |
| `/about` | `About` | Node 19 | Company / Mission, Vision & Team |
| `/careers` | `Careers` | Node 19 | Company / Open Opportunities & Culture |
| `/security` | `Security` | Node 20 | Company / 256-bit Encryption, SOC2 & Compliance |

---

## Route Effects & Accessibility

- **Dynamic Page Titles**: The `RouteEffects` component intercepts navigation events and synchronizes `document.title` to provide clear browser history and tab recognition.
- **Scroll Restoration**: Navigating between routes automatically scrolls the window to the top (`(0, 0)`) and moves focus to `#main-content` for screen readers.
- **Hash Scrolling**: When navigating to hash anchors (e.g. `/#growth`, `/#faq`, `/#key-benefits`), the target element is smoothly brought into view using `scrollIntoView()`.
- **SPA Fallback**: Vite development and production servers redirect all unknown non-asset requests to `index.html` ensuring direct URL visits and browser refreshes work flawlessly.
