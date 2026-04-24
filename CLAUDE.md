# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A real estate management web app with Supabase authentication.
- **Stack**: React 19 + Vite + React Router v7 + Supabase JS v2
- **Auth**: Supabase email/password (session managed via `AuthContext`)
- **Styling**: CSS Modules per page/component (no CSS framework)

## Git Rules

**Push to GitHub after every code change.**

```bash
git add .
git commit -m "<concise description of change>"
git push origin main
```

- Commit messages in English, imperative mood.
- Never force-push to `main`.

## Development Commands

```bash
npm install        # Install dependencies
npm run dev        # Start dev server (http://localhost:5173)
npm run build      # Production build
npm run preview    # Preview production build locally
npm run lint       # ESLint check
```

## Architecture

```
src/
  supabaseClient.js      # Supabase client singleton (reads .env)
  AuthContext.jsx        # React context — provides session to all pages
  App.jsx                # Router setup; wraps everything in AuthProvider
  components/
    PrivateRoute.jsx     # Redirects to /login when unauthenticated
  pages/
    Login.jsx            # Sign-in form
    Register.jsx         # Sign-up form
    Properties.jsx       # Protected property list (dummy data)
    Auth.module.css      # Shared styles for Login + Register
    Properties.module.css
```

### Auth flow
1. `AuthContext` calls `supabase.auth.getSession()` on mount and subscribes to `onAuthStateChange`.
2. `PrivateRoute` reads `session` from context — `undefined` = loading (renders null), `null` = redirect to `/login`.
3. After successful login/signup, navigate to `/`.

### Environment variables
Stored in `.env` (git-ignored). Both must be prefixed `VITE_` so Vite exposes them to the browser:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
