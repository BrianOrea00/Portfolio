# Roadmap and status

## 1. Status

The base UI is working:

- Terminal shell with title bar, theme toggle, scrollback, prompt, and quick-command chips.
- Commands: `help`, `about`, `projects`, `open <project-id>`, `skills`, `resume`, `contact`,
  `theme`, `clear`, plus `whoami`, `ls`, and `sudo`.
- Alias resolution, command history, Tab completion, Ctrl+L clearing, click-to-focus, and
  clickable command names in output.
- Dark and light themes persisted in `localStorage`, with an inline pre-paint theme script and
  updated `theme-color` metadata.
- Monocraft 400/700 served from `public/fonts/`, responsive layout down to 360px, semantic
  accessible output, and reduced-motion support.
- Static no-JS fallback content in `index.html`.

Placeholders in this build:

- `public/resume.pdf` is a valid one-page placeholder, not the final resume.
- `og.png` is referenced but not created.
- LinkedIn is not listed because no profile exists yet.
- All project `liveUrl` and `repoUrl` values are `#` and render as `pending`.
- The ayos-AI stack is marked provisional.
- The canonical and Open Graph URLs use `https://brianorea.dev/`, which is not confirmed as the
  production domain.

## 2. Known limitations

- [ ] Monocraft ships as TTF (about 205 KB regular, 348 KB bold), not subsetted woff2.
- [ ] No Open Graph image exists; `/og.png` will fail until generated.
- [ ] No LinkedIn URL exists yet.
- [ ] Project links are `#`; no live demo or repository is published for these entries.
- [ ] The ayos-AI stack is unconfirmed and marked "to confirm".
- [ ] The site is a single page with no routing, so browser back/forward cannot restore commands.
- [ ] Scrollback and command history are not persisted across reloads.
- [ ] No screenshots are committed; verification screenshots were local only.
- [ ] Command modules use `.tsx` instead of the requested `.ts` because TypeScript cannot parse
  JSX in `.ts` files.
- [ ] `public/fonts/OFL.txt` is an extra file added to satisfy the OFL redistribution condition.
- [ ] Canonical/Open Graph domain is a placeholder.

## 3. Phase 1 — content truth

- [ ] Replace all three project `liveUrl` and `repoUrl` values with real URLs.
- [ ] Confirm the final ayos-AI stack and remove the "to confirm" marker.
- [ ] Create the LinkedIn profile and add it to `src/data/profile.ts` and the contact command.
- [ ] Replace `public/resume.pdf` with the final resume.
- [ ] Add project screenshots and alt text.
- [ ] Write a short case study per project: problem, constraints, decisions, outcome.
- [ ] Confirm the production domain and update canonical, `og:url`, and `og:image`.

## 4. Phase 2 — UX and accessibility hardening

- [ ] Add command-palette/history search.
- [ ] Add a copy-output affordance with a visible "copied" confirmation.
- [ ] Review the focus order and any future focus trap with keyboard only.
- [ ] Run a screen-reader pass with NVDA and Orca; verify live-region announcements.
- [x] Audit light-theme contrast with a contrast checker, including muted text.
- [x] Check layout and interaction at 320px wide.
- [ ] Test iOS Safari `100dvh` behavior with the software keyboard open.
- [ ] Add `prefers-contrast: more` support.
- [ ] Verify Tab completion and focus escape behavior with real assistive technology.

## 5. Phase 3 — features

- [ ] Add `contact --copy` for copying the email address.
- [ ] Add `open <id> --json` for machine-readable project output.
- [ ] Add URL hash routing (`/#projects`) so commands are linkable.
- [ ] Support deep links that run a command on load.
- [ ] Add a `neofetch`-style system and profile readout.
- [ ] Add `theme <light|dark|system>` with a system-follow mode.
- [ ] Persist command history across reloads.
- [ ] Add `man <cmd>` for detailed command help.

## 6. Phase 4 — performance and deploy

- [ ] Subset Monocraft and convert both weights to woff2.
- [ ] Preload the self-hosted font and remove the unused fallback weight.
- [ ] Generate a real `og.png` and verify social previews.
- [ ] Set a Lighthouse performance and accessibility budget.
- [ ] Deploy to Vercel, then add a custom domain.
- [ ] Add a 404 page.
- [ ] Add privacy-friendly analytics only when needed.

## 7. Open questions

- [ ] Which domain will production use?
- [ ] Will a LinkedIn profile be created, or should contact stay email/GitHub/Facebook only?
- [ ] Can the Paschal cooperative approve a public demo link or repository?
- [ ] What is the confirmed ayos-AI Python component and final deployment target?
- [ ] Should project screenshots live in `public/projects/` or be generated from live demos?
- [ ] Which visual direction should the OG image follow?
