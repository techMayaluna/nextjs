# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Environment Variables

Required in `.env.local`:
```
MAIL_PASSWORD=       # Gmail app password (Nodemailer)
MAIL_EMAIL=          # Gmail account
MONGODB_URI=         # MongoDB Atlas connection string
TWILIO_ACCOUNT_ID=   # Twilio account SID
TWILIO_AUTH_TOKEN=   # Twilio auth token
CLOUDAPI_KEY=        # Cloudinary API key
CLOUDAPI_SECRET=     # Cloudinary API secret
```

## Architecture

**Seguros Mayaluna** is a mobile-first PWA for insurance management targeting Colombian users (Spanish UI). Built with Next.js App Router.

### Routing Structure

- `/` — Login page
- `/home` — Protected dashboard (layout with top/bottom nav)
- `/home/seguros/[id]` — Insurance policy detail
- `/home/reportar` — File a claim/incident report
- `/home/user` — User profile
- `/forgotpass` — Multi-step password recovery

### State Management

**Zustand** (`src/app/stores/userStore.js`) is the single source of truth for authenticated user data. It:
- Persists session via `js-cookie`
- Fetches user info and insurances from the API on login
- Enriches insurance data with company assistance numbers from `insuranceCompaniesList.js`

### Data Flow

1. Login → `userStore.login()` → API `/api/auth/login` → stores user + session cookie
2. Dashboard components read from Zustand store; no additional API calls from most pages
3. `insuranceCompaniesList.js` maps ~50+ Colombian insurers to their emergency contact numbers

### API Routes (`src/app/api/`)

| Route | Purpose |
|-------|---------|
| `auth/login` | Authenticate with ID number or plate |
| `auth/forgotpass` | Send password reset email |
| `auth/updatepass` | Update password with token |
| `user` | Fetch user profile data |
| `get-seguros` | Fetch user's insurance policies |
| `report` | Submit incident report |
| `report/submit-image` | Upload image to Cloudinary |
| `get-plate-restrictions` | Pico y placa (plate restriction) lookup |
| `seguros/update-extintor` | Update fire extinguisher date |
| `email2` | Send email |
| `download/[filename]` | File download |
| `cron-email-vehicles` | Scheduled email job |

### Key External Integrations

- **MongoDB/Mongoose** — Database via `src/app/utils/mongoose.js`
- **Cloudinary** — Image uploads for incident reports
- **Nodemailer + Resend** — Email notifications and password reset
- **Twilio** — SMS communications
- **XState** — State machine for the multi-step forgot-password flow

### Styling

Tailwind CSS with custom theme colors (green palette):
- `primary`: `#ECFFE2`, `secondary`: `#7FBF5F`, `tertiary`: `#306B12`
- `header`: `#154734`, `button`: `#248e46`
- Custom breakpoints: `xs: 400px`, `ns: 300px`
- Font: Josefin Sans

### Path Aliases

`@/` maps to `./src/` (configured in `jsconfig.json`).
