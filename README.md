# Brian Orea — Terminal Portfolio

One-page portfolio for Brian Orea (Arisu), built as an interactive terminal. Visitors type
commands or tap the chips; output renders as terminal lines. The stack is Vite, React, and
TypeScript, with no UI, animation, icon, or CSS libraries.

## Run locally

```sh
npm install
npm run dev
npm run preview   # after a build
npm run build
```

`npm run build` runs `tsc -b` and then `vite build`, and writes the deployable site to `dist/`.

## Commands

`help`, `about`, `projects`, `open <project-id>`, `skills`, `resume`, `contact`, `theme`, `clear`.
Extras: `whoami`, `ls`, `sudo`. Aliases: `cat about`, `ls projects`.

Keyboard: Up/Down browse history, Tab completes commands and project ids, Ctrl+L clears the
screen. Tab moves focus when the prompt is empty so chips and other controls stay keyboard
reachable.

## Add a project

Edit `src/data/projects.ts` only. The `id` field is a kebab-case slug and automatically becomes
the argument for `open <id>` and the value offered by Tab completion.

## Change colors

Edit the dark and light token blocks in `src/styles/tokens.css`. Components and command output
only use semantic classes and `var(--token)` values, so every existing line restyles when the
theme changes.

## Replace the resume

Replace `public/resume.pdf` with the final PDF. The current file is a valid placeholder that
says so. The `resume` command links to `/resume.pdf`.

## Deploy

Vercel: framework preset **Vite**, build command `npm run build`, output directory `dist`.
Netlify: build command `npm run build`, publish directory `dist`. No `netlify.toml` is required.

The canonical URL and Open Graph URL currently use the placeholder domain
`https://brianorea.dev/`; update the `<head>` in `index.html` when the real domain is chosen.

## Font

Monocraft is by Idrees Hassan and is licensed under the SIL Open Font License 1.1
(`public/fonts/OFL.txt`). The TTFs are copied unmodified into `public/fonts/`.
