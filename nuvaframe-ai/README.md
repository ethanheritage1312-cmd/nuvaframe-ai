# Nuvaframe AI

A premium, black-and-turquoise starting point for an AI faceless short-video creation platform.

## Current status

This repository contains the responsive marketing site and a functional creator-brief interface. **It does not yet generate real videos.** The creator currently validates and previews the user's brief; the video provider, authentication, database, payments, and export pipeline must be configured and tested before launch.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

## Main routes

- `/` — landing page
- `/create` — creator brief and style settings

## Next engineering milestones

1. Choose a video-generation provider and integrate its server-side API.
2. Add durable generation-job state, progress polling/webhooks, and secure video storage.
3. Add authentication and a database with row-level security.
4. Add usage quotas, billing, and verified payment webhooks.
5. Add automated tests, accessibility checks, provider-failure handling, and deployment configuration.

## Security notes

- Never commit `.env.local` or real API keys.
- Keep provider keys and service-role credentials on the server only.
- Validate and rate-limit generation requests before exposing them publicly.
- Add authorization checks before users can access projects or generated media.
- Review provider licensing, content rules, and costs before launch.
