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
