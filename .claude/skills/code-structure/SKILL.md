---
name: code-structure
description: Load before making ANY change to code in this repository (The Name — Vite/React site). Enforces the DRY principle (reuse existing components/utils/tokens instead of duplicating) and keeps STRUCTURE.md in sync with the actual codebase. Use before editing, adding, moving, or refactoring any file under src/, and before touching index.html.
---

# Code structure & DRY discipline

This repo has been refactored more than once to remove duplication that
crept in (a WhatsApp icon defined twice, a List/Cards toggle copy-pasted
across two pages). This skill exists so that doesn't keep happening.

## Before writing or editing any code

1. **Read `STRUCTURE.md`** at the repo root. It documents the current
   folder layout, the page/data/i18n conventions, and the design-token
   system. Do not guess at conventions — that file is the source of truth.
2. **Search before you write.** If the change involves markup, a CSS rule,
   or a small utility function, grep the codebase first for something that
   already does it:
   - A UI pattern used by 2+ pages/components → belongs in `src/components/`.
   - A CSS rule that would be identical in two files → belongs in
     `src/styles/theme.css` as a shared class, not duplicated per file.
   - A hardcoded color/font/spacing value → use the existing CSS custom
     property from `theme.css`, or add a new token there if genuinely new.
   - Display text (any string a user reads) → belongs in
     `src/i18n/translations/{en,fr,es,ar}.js`, never inline in JSX or in a
     page's `data.js`.
   If you find an existing match, reuse or extend it. Only write a new
   version when nothing close already exists.
3. **`index.html` is the Vite entry shell, not removable.** It holds only
   `<head>` metadata and the `#root` mount point + script tag. Never
   attempt to delete it or treat it as "leftover" — a Vite SPA cannot run
   without it. Content/copy changes belong in `src/`, not here.

## After making a change

If the change added, moved, renamed, or removed a file, introduced a new
shared component/util/token, or changed a convention (e.g. how pages are
structured, how i18n keys are shaped) — **update `STRUCTURE.md` in the same
turn**, before ending your response. Do not defer this to "later" or a
separate pass; a structural doc that lags the code is worse than no doc,
because it actively misleads the next read of it.

A change that does NOT need a `STRUCTURE.md` update: fixing a bug inside an
existing file, tweaking copy in a translation file, adjusting a CSS value
that's already a token. Use judgment — the bar is "would someone reading
STRUCTURE.md now be told something false about the codebase," not "did any
file change."
