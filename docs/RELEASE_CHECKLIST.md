# Release Checklist (Landing Pages)

## Preconditions
- Changes land via PR (no direct pushes to `main`).
- CI checks required before merge:
  - `npm run build`
  - `npm test`
  - `npm run test:e2e`

## Local verification (before deploying)
Run:

```bash
npm run test:full
```

## Production spot-check (after deploying)
Open in an incognito window:
- `https://apgov.statecraftsims.com`
  - Navbar shows **AP GOV • Situation Room**
  - Tactical grid background
  - Intel briefing section present
- `https://gov.statecraftsims.com`
  - Navbar shows **Gov 2.0 Higher Ed**
  - White background (no tactical grid)
  - Daily Policy Brief section present

## Rollback
- Re-deploy the previous Vercel production deployment from the Vercel dashboard.


