# YaadMantra

YaadMantra is a production-ready, local-first Hindi mnemonic learning app built with Next.js App Router, React, TypeScript, JSON starter data, CSS modules, and browser localStorage.

It has no external backend, database, auth provider, paid API, Tailwind, shadcn, Redux, UI library, or external state library.

## Features

- Hindi-focused home page with search, trending mnemonics, categories, CTA actions, streak stats, and local generator preview
- Category system for Geography, History, Science, UPSC, SSC, Coding, Java Interview, and English Vocabulary
- Mnemonic cards with explanation expansion, favorite, share, copy, category, and difficulty
- Instant client-side search across title, category, keywords, mnemonic text, and explanation
- Favorites page backed by localStorage
- Create page for custom local mnemonics with edit/delete
- MCQ quiz mode with random questions, timer, score, best score, and progress bar
- Flashcard mode with CSS-only flip animation
- AI-like mnemonic generator that runs locally without an API
- Daily streak tracking in localStorage
- PWA manifest, service worker, installable icons, offline cache
- SEO metadata, OpenGraph tags, robots.txt, and generated sitemap
- Mobile-first responsive UI with light/dark mode and CSS-only animations

## Folder Structure

```text
.
├── public/
│   ├── icons/
│   ├── favicon.svg
│   ├── manifest.webmanifest
│   ├── robots.txt
│   └── sw.js
├── src/
│   ├── app/
│   │   ├── about/
│   │   ├── categories/
│   │   ├── create/
│   │   ├── favorites/
│   │   ├── flashcards/
│   │   ├── mnemonic/[id]/
│   │   ├── quiz/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── sitemap.ts
│   ├── components/
│   ├── data/
│   ├── hooks/
│   ├── types/
│   └── utils/
├── next.config.ts
├── package.json
├── tsconfig.json
├── vercel.json
└── README.md
```

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
```

The app is configured with `output: "export"` and writes the static deployment output to `out/`.

## Deploy To Vercel

1. Push this repository to GitHub.
2. Import it in Vercel as a Next.js project.
3. Keep the default install command: `npm install`.
4. Keep the build command: `npm run build`.
5. Vercel will publish the static `out/` directory using `vercel.json`.

No environment variables are required.
