# ZENIX frontend

React + Vite + JSX + SCSS.

## Run

```bash
npm install
npm run verify
npm run build
npm run dev
```

## Optional environment

Copy `.env.example` to `.env.local` when the corresponding external integrations are ready.

- `VITE_TELEGRAM_URL` — general ZENIX Telegram URL.
- `VITE_LEAD_ENDPOINT` — JSON POST endpoint for contact and waitlist forms.

When `VITE_LEAD_ENDPOINT` is empty, the UI falls back to an email handoff instead of pretending the lead was submitted.
