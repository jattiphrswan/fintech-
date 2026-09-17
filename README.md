# Payline React hero

The supplied Payline HTML converted to React + Vite. The original CSS, text, desktop/tablet layout, Space Grotesk font, word reveal animation, custom cursor, and mouse-driven 3D dashboard are preserved.

## Run

```sh
npm install
npm run dev
```

Use `npm.cmd` on Windows if PowerShell blocks npm scripts. Build with `npm run build`.

`src/pages/Home.jsx` assembles the background, navigation, hero, and cursor. Repeated navigation, words, statistics, actions, and chart bars live in `src/data/content.js`. The supplied CSS lives in `src/styles/globals.css`; accessibility and narrow-phone adjustments live in `responsive.css`.

The cursor effect cleans up its listeners and animation frames when unmounted. Touch devices and reduced-motion preferences are supported. Google Fonts requires an internet connection, as in the supplied HTML.

Links and dashboard actions remain placeholders matching the original. No banking services, authentication, or backend are connected.

Multi-page deployment: serve index.html for unknown application paths (SPA fallback), so routes such as /business/cards work on direct visits and refresh. Vite dev/preview already provides this. Authentication, pricing and contact submission remain clearly labeled demo experiences; no backend is connected.

## Documentation

Full architectural and design documentation is available in the [`docs/`](./docs/) directory:
- [System Architecture](file:///docs/ARCHITECTURE.md)
- [Routing & Pages Matrix](file:///docs/ROUTING_AND_PAGES.md)
- [Design System & Tokens](file:///docs/DESIGN_SYSTEM.md)
- [Node 11 Completion Report](file:///docs/NODE_11_COMPLETION.md)
