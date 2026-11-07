# TaskTracker FrontEnd (React + Vite, JavaScript)

UI for listing, creating, and completing tasks, plus a **Stats** page.

## Local run (on your other machine)

```bash
npm install
cp .env.example .env
npm run dev
```

## Tests

```bash
npm test
```

CI runs on every push to `main` (see `.github/workflows/frontend-ci.yml` — must live under the **Git repo root**).


Open http://localhost:5173 — API calls go to `/api/*` and Vite proxies to the BackEnd at `http://localhost:8080`.

## Pages

- **/** — create tasks (optional file attachment), toggle complete, delete
- **/stats** — totals and completion rate from `GET /tasks/stats`

## Production build

```bash
# Point at your deployed BackEnd URL
VITE_API_BASE_URL=https://your-backend.example.com npm run build
npm run preview
```

## Docker

```bash
docker build -t tasktracker-frontend --build-arg VITE_API_BASE_URL=https://your-backend .
docker run --rm -p 8081:8080 tasktracker-frontend
```

## Separate repo folder

You can copy only this `FrontEnd/` directory to its own Git repo; set `VITE_API_BASE_URL` to the BackEnd URL when they are not on the same host.

Test Case:
---------
npm test --> execute this to run test cases