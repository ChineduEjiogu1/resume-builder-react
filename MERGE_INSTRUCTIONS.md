# TypeScript scaffold — how to use

This is the `src/` tree from the chart. It does NOT include `package.json`,
`tsconfig.json`, `vite.config.ts`, or `index.html` — let Vite generate those.

## Steps
1. Scaffold the real project:

       npm create vite@latest resume-builder-react -- --template react-ts
       cd resume-builder-react
       npm install

2. Copy the `src/` folder from this scaffold OVER the one Vite generated
   (overwrite `App.tsx` and `main.tsx`; add the new folders).

3. Run it:

       npm run dev

## What's filled in vs stubbed
- `state/resumeTypes.ts` — DONE. Real types, ready to use.
- Everything else — one-line stub comments naming each file's job and the
  vanilla function it maps to. Fill them in following the build order.

## Build order
types -> defaultResume -> Preview (hardcoded) -> reducer + Provider ->
Preview reads context -> BasicsForm -> Education -> Experience/Leadership ->
bullets -> add/remove -> persistence -> PDF -> page warning.
