# Payline Design System

## Core Design Philosophy

Payline's visual design is built around **financial clarity, subtle depth, high-tech glassmorphism, and responsive ergonomics**. The interface balances futuristic electric blue accents with clean, legible typography and smooth physics-driven motion.

---

## Typography

- **Primary Typeface**: `'Space Grotesk', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`
- **Monospace Elements / Badges**: `ui-monospace, monospace` for figures, timestamps, and card numbers.

### Font Hierarchy

| Token / Usage | Size (Desktop) | Weight | Letter Spacing | Line Height |
|---|---|---|---|---|
| Display / Hero Title | `clamp(36px, 4.5vw, 64px)` | 500 | `-2px` | `1.08` |
| Section Headings (H2) | `clamp(28px, 3.2vw, 42px)` | 500 | `-1.2px` | `1.2` |
| Card Headings (H3) | `18px - 22px` | 500 | `-0.5px` | `1.3` |
| Body Text | `15px - 16px` | 400 | `normal` | `1.7 - 1.8` |
| Eyebrow / Badges | `10px - 11px` | 600 | `1.5px - 2px` (Uppercase) | `1.4` |
| Microcopy / Notes | `11px - 13px` | 400 | `normal` | `1.5` |

---

## Color Tokens

### 1. Dark Mode (Default)
```css
:root {
  --bg: #060a12;
  --surface: #0b1220;
  --text: #f0f4fc;
  --muted: #8899b5;
  --line: rgba(255, 255, 255, 0.08);
  --glass: rgba(11, 18, 32, 0.65);
  --accent: #00a0ff;
  --accent-rgb: 0, 160, 255;
  --accent-glow: rgba(0, 160, 255, 0.18);
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
}
```

### 2. Light Mode
```css
[data-theme="light"] {
  --bg: #f8fafc;
  --surface: #ffffff;
  --text: #0b1220;
  --muted: #57657a;
  --line: rgba(0, 0, 0, 0.08);
  --glass: rgba(255, 255, 255, 0.75);
  --accent: #006ce6;
  --accent-rgb: 0, 108, 230;
  --accent-glow: rgba(0, 108, 230, 0.12);
}
```

---

## Component Design Guidelines

### Buttons
- **Primary Button (`.page-button`)**:
  - Gradient background: `linear-gradient(110deg, #0066e8, #008cbb)`
  - Border: `1px solid rgba(0, 140, 255, 0.35)`
  - Border radius: `12px`
  - Font: `500 13px 'Space Grotesk'`
  - Hover: subtle upward lift (`translateY(-1px)`) with glowing drop shadow.
- **Secondary Button (`.page-button.secondary`)**:
  - Background: `var(--surface)`
  - Border: `1px solid var(--line)`
  - Text: `var(--text)`

### Glassmorphism & Cards
- Background: `var(--glass)` with `backdrop-filter: blur(20px)`
- Border: `1px solid var(--line)`
- Corner Radius: `20px` to `28px`
- Shadows: `0 20px 60px rgba(0, 0, 0, 0.12)`

### Form Controls
- Inputs, textareas, and select elements:
  - Background: `var(--page, var(--bg))`
  - Border: `1px solid var(--line)`
  - Padding: `13px 16px`
  - Border Radius: `10px`
  - Focus state: `outline: none; border-color: var(--accent); box-shadow: 0 0 0 3px var(--accent-glow)`

---

## Responsive Breakpoints

- **Desktop (Large)**: `> 1200px` (Full multi-column layout, mega menu expanded)
- **Laptop / Tablet Landscape**: `901px - 1200px` (Tightened column gaps)
- **Tablet Portrait**: `601px - 900px` (2-column grids collapse to 1-column, mobile drawer navigation triggers)
- **Mobile**: `≤ 600px` (Header compact, full-width buttons, single column stacking, responsive typography)
