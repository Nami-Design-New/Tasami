# Repository Guidelines

## Project Structure & Module Organization

Tasami is a Vite + React application. Main app entry points live in `src/main.jsx` and `src/App.jsx`. Route-level pages are split between `src/routes/website`, `src/routes/website-auth`, `src/routes/dashboard-auth`, and `src/routes/dash-board`. Reusable UI belongs in `src/ui`, layouts in `src/layout`, API and editor helpers in `src/lib`, Redux state in `src/redux`, shared utilities in `src/utils`, and validation schemas in `src/validations`. Static assets, icons, fonts, and SCSS/CSS live under `src/assets`; public files such as the service worker and favicons live in `public`. Test helpers are in `src/test`, with component tests colocated near implementation files.

## Build, Test, and Development Commands

- `npm run dev` starts the Vite development server, usually at `http://localhost:5173`.
- `npm run build` creates a production bundle in `dist`.
- `npm run preview` serves the production build locally for verification.
- `npm run lint` runs ESLint across the repository.
- `npm test` runs Vitest in watch mode.
- `npm run test:ui` opens the Vitest UI.

Use `npm install` to install dependencies from `package-lock.json`.

## Coding Style & Naming Conventions

Use JavaScript ES modules and JSX. Follow the existing style: two-space indentation, double quotes, semicolons, and React function components. Component files use `PascalCase.jsx` such as `ProfileMenu.jsx`; hooks use `useFeatureName.js`; validation files use descriptive kebab-case names where already established. Keep route components inside their route domain and prefer shared components from `src/ui` before creating new one-off UI. Run `npm run lint` before submitting changes.

## Testing Guidelines

Tests use Vitest with `jsdom`, React Testing Library, and setup from `src/test/setup.js`. Name tests `*.test.jsx` or `*.test.js`; examples include `FileUploader.test.jsx` and `ReusableDataTable.test.jsx`. Place tests beside the component or module they cover. Focus tests on user-visible behavior, data-table interactions, forms, and hooks with branching logic. Run `npm test` for development and `npm run test:ui` when debugging failures.

## Commit & Pull Request Guidelines

Recent history uses Conventional Commit prefixes such as `fix:` and `feat:`. Keep subjects imperative and scoped to the change, for example `fix: update validation handling in EditWorkGroupModal`. Pull requests should include a short summary, affected routes or modules, test results (`npm run lint`, `npm test`, or why not run), linked issue or task, and screenshots for visible UI changes.

## Security & Configuration Tips

Do not commit local secrets from `.env.local`. Keep API access centralized through `src/lib/axios.js` and `src/lib/adminAxios.js`. When changing Firebase, maps, chat, or notification behavior, verify required environment variables and service worker behavior in `public/firebase-messaging-sw.js`.
