# CLAUDE.md — Carles Oliva website

Instructions for Claude Code and any agent working in this repository.

## Purpose

Personal and professional portfolio / CV website of Carles Oliva (maritime professional, yacht crew).
Repository: `Mr-coliva/mr-coliva.github.io`. Served by GitHub Pages at the custom domain in `CNAME` (`carlesoliva.es`).

## Architecture

Static single-page site. No build step, no package manager, no framework, no JS dependencies.

| Path | Responsibility |
|---|---|
| `index.html` | Entry point and all page content, authored in **English**. Sections: `#home`, `#about`, `#why-me`, `#deckhand-profile`, `#experience`, `#qualifications`, `#cover-letter`, `#cv`, `#contact`. Loads Google Fonts, `style.css`, and `script.js` at the end of `<body>`. |
| `style.css` | All styling: base, header/nav, sections, components, media queries, and dark theme overrides (`body.dark-theme …`). No CSS custom properties yet. |
| `script.js` | Mobile menu, language menu, translations, theme toggle, `localStorage` persistence, language-specific document links. |
| `images/profile.jpg` | Hero portrait. |
| `documents/*.pdf` | CV and cover letter in EN (`CV.pdf`, `Cover-Letter.pdf`), ES (`*-ES.pdf`), CA (`*-CA.pdf`). Personal documents — see Privacy. |
| `CNAME` | GitHub Pages custom domain. Do not change without explicit approval. |

### Language system (EN / ES / CA)

- English is the source text in the HTML. `script.js` holds `translations.es` and `translations.ca`, keyed by the **normalized English text** (whitespace collapsed).
- `applyLanguage(lang)` walks all text nodes, replaces matching ones, and separately sets `<html lang>`, `document.title`, meta description, hero image `alt` and menu `aria-label`.
- `updateDocumentLinks(lang)` swaps `href` on elements with `data-document="cv" | "cover-letter"`.
- Choice persisted in `localStorage["preferred-language"]`; default `en`.
- **Consequence:** editing any English sentence in `index.html` silently breaks its translation unless both dictionaries are updated with the new key. Every text change must update EN, ES and CA together.

### Theme (light / dark)

- Light by default. `setTheme(isDark)` toggles `body.dark-theme`; label and `aria-pressed` are updated by `updateThemeLabel()` in the current language.
- Persisted in `localStorage["preferred-theme"]` (`"dark"` / `"light"`). System `prefers-color-scheme` is not currently used.
- Any new component needs a matching `body.dark-theme` rule in `style.css`.

## Git workflow

- Never work directly on `main`. One branch per task: `feat/…`, `fix/…`, `chore/…`, `docs/…`.
- Small, focused commits with descriptive messages. Do not mix unrelated changes.
- Changes reach `main` only through a pull request.
- **Merging into `main` publishes the site** (GitHub Pages). Merging, pushing to `main`, changing Pages settings, or publishing anything requires **explicit human approval** from the repository owner, every time.
- Agents do not push, merge, force-push, rewrite history, or delete branches unless explicitly asked.

## Repository separation

This repository is only for the Carles Oliva website. The David Costa project lives in a separate repository: never copy content, personal data, documents, assets or configuration between them, and never run a task for one in the other's working directory. Confirm the repository root and remote before starting work.

## Privacy

- `documents/` and `images/` contain personal data. Never add, replace, publish, or share personal documents, certificates, IDs or photos without explicit authorization from Carles Oliva.
- Do not send personal data (email, phone, documents) to external services.
- Do not add new personal data to the site unless explicitly requested.

## Agent roles

Subagent definitions live in `.claude/agents/` (one Markdown file per agent). Their `tools` / `disallowedTools` frontmatter is the source of truth for what each agent can technically do. Agent definitions load at session start, so restart the session after changing them.

| Agent (`name`) | Responsibility | Tools | May edit |
|---|---|---|---|
| **Coordinator** (`coordinator`) | Plans and supervises: breaks requests into tasks, picks agents, assigns file owners, sequences dependencies, writes agent briefs, consolidates results, flags what needs human approval. | Read, Grep, Glob | Nothing. |
| **Technical Auditor** (`technical-auditor`) | Read-only analysis of architecture, quality, security, dependencies, regressions; validates candidate issues with file:line evidence. | Read, Grep, Glob, Graphify queries | Nothing. |
| **UX/UI Designer** (`ux-ui-designer`) | Layout, visual hierarchy, colour/contrast, responsive behaviour, accessibility, copy proposals (EN/ES/CA). Delivers specs for the Frontend Developer. | Read, Grep, Glob | Nothing. |
| **Frontend Developer** (`frontend-developer`) | Implements approved changes in HTML, CSS and JS, including EN/ES/CA translation updates and dark-theme styles. | Read, Grep, Glob, Edit | **Only** `index.html`, `style.css`, `script.js` (existing files; enforced by a hook). |
| **QA Engineer** (`qa-engineer`) | Designs test plans and verifies by code inspection before PR (see Testing). Anything needing a browser, commands or Playwright is reported as not verified. | Read, Grep, Glob | Nothing. |

### Orchestration

- **The main session launches agents and collects their results.** The Coordinator cannot launch subagents (no `Agent` tool). It returns a plan and agent briefs, and the main session invokes the agents in that order.
- Subagents cannot ask the user questions. Decisions that need human approval come back to the main session, which asks the owner.
- Agents exchange short, structured hand-offs (each agent file defines an output format) and reference earlier findings instead of repeating full audits. Do not invoke agents that add no value to the task.
- Branches, commits and other Git operations are done only by the main session, and only within the Git workflow rules above.

### File ownership rules

- **The Frontend Developer is the only agent that modifies `index.html`, `style.css` and `script.js`.** No other agent has edit tools.
- Each file has **one** editing owner per task; no two agents edit the same file at the same time.
- `index.html` and `script.js` are coupled through translation keys: a text change in one requires the other, so both always belong to the Frontend Developer in the same task.
- `CLAUDE.md`, `.claude/`, `CNAME`, `README.md`, `documents/` and `images/` are not edited by any agent. Changes to them are made by the main session, with the owner's approval.
- Parallel work on the same files is not allowed. If parallel editing is ever needed, use separate branches or git worktrees and integrate sequentially.
- Read-only agents may read any file at any time.

### Technical enforcement

- `.claude/hooks/frontend-edit-guard.js`: a `PreToolUse` hook declared in `frontend-developer.md`. It allows `Edit` only on the three existing website files at the repo root and denies everything else, including new files, `..`, paths outside the repo, UNC paths and alternate data streams. It fails closed. Requires Node.js on `PATH` and an accepted workspace trust dialog.
- `.claude/settings.json`: `ask` rules force a human prompt (in every permission mode) for Git commit/push/merge/rebase/reset, dependency installs, and edits to `CLAUDE.md`, `.claude/`, `CNAME`, `documents/`, `images/`.
- Everything else in this file (approvals, no dependencies, privacy, file ownership between tasks) is enforced by instructions and human review.

## Design reference: `apple-design` skill

- Location: `.claude/skills/apple-design/SKILL.md` (skill name `apple-design`). It sums up Apple's WWDC guidance on motion, interaction, materials and typography, adapted for the web. It is reference material only: do not edit it as part of site tasks.
- This local copy is the **canonical** version for this repository. Any account-level copy (e.g. `anthropic-skills:apple-design`) is not the reference.
- Agents read the file with `Read`. They have no `Skill` tool, and the skill is not preloaded. They ignore its "Initial Response" section.
- **UX/UI Designer:** use it as a design reference when it applies, e.g. for feedback on press, transitions, the mobile and language menus, translucent header/nav, dark/light changes, type scale and spacing.
- **Frontend Developer:** may consult it when building interactions, motion, materials (`backdrop-filter`) or typography.
- Apply it selectively. Do not restyle every page or component to look "Apple-like". This is a static portfolio with few gestures, so most of the drag, spring and momentum material does not apply.
- Precedence, from highest to lowest: the owner's requirements → accessibility (WCAG AA, keyboard, focus, ARIA) → responsive behaviour → performance → `prefers-reduced-motion` support → the site's existing visual identity (including its current Google Fonts) → stylistic ideas from the skill.
- No new dependencies. Do not add libraries, such as the `motion` / Framer Motion examples in the skill, or CDNs or build tooling just because the skill describes a technique. Use plain CSS and vanilla JS (CSS transitions, `requestAnimationFrame`, Pointer Events). Any dependency needs explicit owner approval.

## Testing expectations

There is no automated test suite. Before a PR, verify and report:

1. **Browser check:** open the page locally; verify every section in desktop (≥1200px), tablet (~800–1000px) and mobile (~375px) widths.
2. **Languages:** switch EN → ES → CA → EN; no text stays in the wrong language; title, meta description, `alt`, document links update; reload keeps the choice.
3. **Theme:** toggle light/dark in each language; new or changed components are styled in both; reload keeps the choice.
4. **Navigation:** all anchors scroll to existing sections; mobile menu and language menu open/close; PDF links resolve for all three languages.
5. **Accessibility:** keyboard-only navigation, visible focus, heading order, `alt` text, ARIA states, text contrast ≥ WCAG AA (4.5:1 for normal text).
6. **Console:** no JavaScript errors.

Report what was verified and what could not be verified. Do not claim a check passed if it was not run.

## Candidate issues from the initial audit (2026-11-11)

These are **hypotheses to validate**, not accepted facts. Re-check against current code before acting on any of them.

- i18n: when a key is missing for the selected language, the node keeps the previous language's text instead of reverting to English (`script.js`, `applyLanguage`).
- i18n: missing keys `"NOW"`, `"NEXT"` (ES and CA) and `"IN PROGRESS"` (CA); duplicate `"IN PROGRESS"` key in ES.
- i18n: title/description/alt/aria labels duplicated in separate maps; text-keyed dictionaries are fragile.
- Accessibility: small grey labels (`#8FA6B2`, `#718792`) likely below AA contrast; mobile menu lacks `aria-expanded`; heading hierarchy issues in hero and qualifications; `#cover-letter` has no heading.
- CSS: `.section-header` / `.section-label` used in HTML but unstyled; duplicated media-query blocks; inconsistent breakpoints (600/769/800/801/900); unused selectors (`.experience-*`, `.qualification-icon`, `.contact-content`, `.contact-link`); no CSS variables.
- Head/SEO: no Open Graph, canonical, favicon, or `hreflang`; Google Fonts loaded from Google with unused weights.
- Theme/language flash on load (preferences applied after first paint).
- Not verified: desktop nav overflow between ~800–1100px; PDF content consistency across languages; GitHub Pages settings, HTTPS and DNS.

## Token efficiency

- Do not re-read the whole repository or repeat a full audit; start from this file and read only the files and line ranges the task needs.
- Prefer targeted `Grep` and offset/limit `Read` over full-file reads of `script.js` (large translation dictionaries) and `style.css`.
- Graphify indexes only part of this repo (mainly `script.js`). Use it for symbol lookups, request small budgets and skeleton results, and fall back to reading the file for HTML/CSS.
- Do not open PDFs or images unless the task concerns them.
- Keep reports concise: findings with file:line evidence, no restating unchanged context.
