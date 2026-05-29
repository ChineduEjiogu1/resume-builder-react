# Résumé Builder

A browser-based résumé builder with a live editor and a real-time, print-ready preview. Type on the left; a clean, single-page résumé in the [Harvard MCS](https://careerservices.fas.harvard.edu/) format renders on the right. Export to PDF in one click — no account, no server, no data leaving the browser.

> **About this version.** This is a React + TypeScript rebuild of an earlier vanilla-JavaScript version. The data model and architecture are deliberately unchanged — the same résumé object and the same one-way data flow — re-expressed with typed components and a reducer-driven state layer. The goal was never "make it work" (the vanilla version already does); it was to rebuild a working app on stronger foundations and learn React/TS by translating something already understood end to end.

---

## Table of contents

- [Features](#features)
- [Tech stack](#tech-stack)
- [Architecture](#architecture)
  - [One-way data flow](#one-way-data-flow)
  - [Data model](#data-model)
  - [State management](#state-management)
  - [Component structure](#component-structure)
- [Project structure](#project-structure)
- [Getting started](#getting-started)
- [Build order](#build-order)
- [Roadmap](#roadmap)
- [Project history](#project-history)
- [License](#license)

---

## Features

- **Live two-pane editor** — edit fields on the left, watch the formatted résumé update instantly on the right.
- **Structured sections** — Education, Experience, Leadership, and Skills, each with the fields that section actually needs.
- **Dynamic entries and bullets** — add or remove jobs, roles, and bullet points on the fly; the preview keeps up.
- **Automatic persistence** — work is saved to `localStorage` on every change, so a refresh never loses anything. No sign-in required.
- **One-click PDF export** — uses the browser's native print dialog, with print styles that hide the editor and show only the résumé.
- **One-page warning** — flags when content overflows a single page, nudging toward the one-page résumé convention.
- **Typed end to end** — the résumé's shape is a TypeScript type, so malformed data (a misspelled field, a missing array) is caught at compile time rather than discovered by squinting at a broken preview.

---

## Tech stack

| Layer | Choice | Why |
| --- | --- | --- |
| Build tool | **Vite** | Fast dev server, first-class React + TypeScript template, minimal config. |
| UI | **React 18** | Declarative rendering — describe the UI from state instead of hand-syncing the DOM. |
| Language | **TypeScript** | The app is data-shape-heavy; types catch "wrong field" bugs before runtime. |
| State | **`useReducer` + Context** | Structured actions and a single source of truth, shared without prop-drilling. |
| Styling | **Plain CSS** | A screen stylesheet plus a dedicated print stylesheet for PDF export. |
| Persistence | **`localStorage`** | Zero-backend durability, scoped to the browser. |
| Export | **`window.print()`** | The browser already renders the preview perfectly; printing to PDF reuses it. |

No state library, no CSS framework, no backend — intentionally. The app is small enough that the platform suffices, and keeping the dependency surface thin keeps the architecture legible.

---

## Architecture

### One-way data flow

The whole app is one source of truth flowing in one direction:

```
        ┌─────────────────────────────┐
        │            App              │
        │  useReducer + ResumeContext │   ← single source of truth
        └──────────────┬──────────────┘
                       │  provides { resume, dispatch }
          ┌────────────┴────────────┐
          ▼                         ▼
   ┌─────────────┐           ┌─────────────┐
   │   Editor    │           │   Preview   │
   │  (writes)   │           │   (reads)   │
   │  dispatch → │           │  ← resume   │
   └─────────────┘           └─────────────┘
```

The editor and preview never talk to each other. The editor only ever **dispatches** changes; the preview only ever **reads** state. They meet exactly once, at the top, in `App`. State flows down through context; changes flow back up as dispatched actions. This is what makes the app easy to reason about — there is only ever one place the data lives, and only one way it changes.

### Data model

The résumé is a single typed object. This type is the spine of the project — every component and every reducer action is checked against it.

```ts
export interface Basics {
  name: string;
  address: string;
  cityState: string;
  email: string;
  phone: string;
}

export interface EducationEntry {
  school: string;
  degree: string;
  location: string;
  dateRange: string;
  thesis?: string;      // optional fields modeled with ?
  coursework?: string;
}

// Experience and Leadership share one shape
export interface BulletedEntry {
  organization: string;
  role: string;
  location: string;
  dateRange: string;
  bullets: string[];
}

export interface SkillItem {
  label: string;
  text: string;
}

export interface Resume {
  basics: Basics;
  education: EducationEntry[];
  experience: BulletedEntry[];
  leadership: BulletedEntry[];
  skills: SkillItem[];
}
```

### State management

All updates go through a single pure reducer. Each action is a typed message describing one change; the reducer returns a new `Resume` (updates are immutable — `spread`/`map`/`filter`, never mutation).

```ts
type ResumeAction =
  | { type: "UPDATE_BASIC_FIELD"; field: keyof Basics; value: string }
  | { type: "UPDATE_ENTRY_FIELD"; section: EntrySection; index: number; field: string; value: string }
  | { type: "UPDATE_BULLET"; section: BulletedSection; entryIndex: number; bulletIndex: number; value: string }
  | { type: "ADD_ENTRY"; section: EntrySection }
  | { type: "REMOVE_ENTRY"; section: EntrySection; index: number }
  | { type: "ADD_BULLET"; section: BulletedSection; entryIndex: number }
  | { type: "REMOVE_BULLET"; section: BulletedSection; entryIndex: number; bulletIndex: number }
  | { type: "LOAD_RESUME"; resume: Resume }
  | { type: "RESET_RESUME" };
```

The reducer's state and `dispatch` are placed on a React context. Components reach them through small hooks rather than props:

```ts
const resume = useResume();          // any component that reads
const dispatch = useResumeDispatch(); // any component that writes
```

### Component structure

Components fall into clear roles:

- **`editor/`** — writes. Every component dispatches actions. Includes the form for basic info and a generic section editor reused across Education, Experience, and Leadership, plus a dedicated Skills editor.
- **`preview/`** — reads. Purely presentational; given the résumé, it renders the document. This is the React translation of the original render layer.
- **`shared/`** — reusable inputs (`TextField`, `TextareaField`) used throughout the editor.
- **`ui/`** — app chrome: toolbar, save-status indicator, page-overflow warning.
- **`hooks/`** — cross-cutting behavior: `localStorage` persistence and page-height measurement.
- **`state/`** — the types, the default résumé, the reducer, and the context provider.

---

## Project structure

```
resume-builder-react/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── main.tsx                  # entry point — renders <App />
    ├── App.tsx                   # owns state, provides context; mounts Toolbar + Editor + Preview
    │
    ├── styles/
    │   ├── app.css               # two-pane layout + résumé typography
    │   └── print.css             # @media print — hide editor, show only the résumé
    │
    ├── state/                    # source of truth
    │   ├── resumeTypes.ts        # the Resume type and section unions
    │   ├── defaultResume.ts      # starting résumé data, typed as Resume
    │   ├── resumeReducer.ts      # all updates, immutable, one action per change
    │   └── ResumeContext.tsx     # provides { resume, dispatch } app-wide
    │
    ├── components/
    │   ├── editor/               # writes via dispatch
    │   │   ├── Editor.tsx
    │   │   ├── BasicsForm.tsx
    │   │   ├── SectionEditor.tsx
    │   │   ├── EntryEditor.tsx
    │   │   ├── BulletEditor.tsx
    │   │   └── SkillsEditor.tsx
    │   │
    │   ├── preview/              # reads state (the render layer)
    │   │   ├── Preview.tsx
    │   │   ├── ResumeHeader.tsx
    │   │   ├── PreviewSection.tsx
    │   │   └── PreviewEntry.tsx
    │   │
    │   ├── shared/               # reusable inputs
    │   │   ├── TextField.tsx
    │   │   └── TextareaField.tsx
    │   │
    │   └── ui/                   # app chrome
    │       ├── Toolbar.tsx
    │       ├── SaveStatus.tsx
    │       └── PageWarning.tsx
    │
    ├── hooks/
    │   ├── usePersistedResume.ts # load/save localStorage
    │   └── usePageWarning.ts     # measure preview height, flag overflow
    │
    └── utils/
        └── resumeFactories.ts    # build a blank entry for a given section
```

---

## Getting started

**Prerequisites:** a recent [Node.js](https://nodejs.org/) (current Vite requires a modern LTS — upgrade if the terminal warns you).

```bash
# 1. Scaffold the project (sets up TypeScript + Vite config correctly)
npm create vite@latest resume-builder-react -- --template react-ts
cd resume-builder-react

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then drop the `src/` tree above into place. To produce a production build:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built app locally to check it
```

---

## Build order

The app is built incrementally rather than all at once — the same path the vanilla version followed, which keeps each step small and verifiable:

1. Scaffold the Vite + React + TypeScript project.
2. Define the `Resume` types (`resumeTypes.ts`).
3. Create `defaultResume.ts` with real data, typed as `Resume`.
4. Build the **preview** from that hardcoded data — get the document rendering with no interactivity yet.
5. Add the reducer and the context provider.
6. Make the preview read from context instead of the constant.
7. Build `BasicsForm` with controlled inputs — confirm the preview updates live.
8. Build the Education editor, then Experience and Leadership (one generic section editor).
9. Add bullet editing.
10. Add the add/remove actions.
11. Add the `localStorage` persistence hook.
12. Add PDF export.
13. Add the one-page warning.

---

## Roadmap

Deliberately deferred until the frontend is mature. None of these are needed for the app to be useful; each is a self-contained next slice.

- **Backend** (e.g. FastAPI) — user accounts, multiple saved résumés, and cloud sync. This is the point at which a server earns its place.
- **AI-assisted tailoring** — paste a job description and get suggested rewrites of bullet points to match it. Requires a backend to hold the API key securely (keys never belong in frontend code).
- **Multiple templates** — alternate résumé layouts beyond the MCS format.
- **Import/export** — download and re-upload the résumé as a JSON file.

---

## Project history

This project began as a vanilla-JavaScript application — no framework, no build step — written to build a solid grasp of state, rendering, and event handling from first principles. That version is complete and deployed. The React + TypeScript rebuild documented here keeps the same data model and architecture but replaces the hand-written render loop and event delegation with React's declarative rendering and a typed reducer.

The throughline: build it by hand first to understand what a framework actually does for you, then rebuild it on top of the framework with that understanding intact.

---

## License

Released under the [MIT License](https://opensource.org/licenses/MIT). See `LICENSE` for details.
