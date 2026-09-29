# Jeremy Ahamioje — Engineering Portfolio

Personal portfolio and writing: selected projects, the engineering work behind them, and a blog.

**Live:** https://portfolio-pa3u.vercel.app · React · TypeScript · Vite

---

## What is here

- **Projects** — selected work with the reasoning behind each build, not just a screenshot and a stack list
- **Blog** — longer write-ups, including the hardware projects
- **Skills** and **About**
- CV available directly from the site

## Build

React 19 with TypeScript on Vite. Components are built on **Radix UI primitives** rather than a component library, so accessibility behaviour — focus management, keyboard interaction, ARIA wiring — comes from the primitive and the styling stays entirely local. Motion is **Framer Motion**; the hero carousel is **Embla**.

The design is specified separately in [`DESIGN_SPECIFICATION.md`](./DESIGN_SPECIFICATION.md) and image credits in [`Attributions.md`](./Attributions.md).

## Running locally

```bash
npm install
npm run dev
```

## Elsewhere

- [jeremybuilds.vercel.app](https://jeremybuilds.vercel.app) — a second portfolio build
- [Sendy Errands](https://github.com/Sendyerrands) — errand and delivery platform: TypeScript API, React admin, React Native app, PHP customer site

---

Built by [Jeremy Ahamioje](https://github.com/JeremyAhamioje).
