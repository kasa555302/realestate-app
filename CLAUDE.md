# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a real estate application. Update this section as the tech stack and architecture are established.

## Git Rules

**Push to GitHub after every code change.**

```bash
git add .
git commit -m "<concise description of change>"
git push origin main
```

- Commit messages must be in English, imperative mood (e.g., "Add property search filter", "Fix map rendering bug").
- Never force-push to `main`.
- If the remote is not yet set up:
  ```bash
  git remote add origin <GitHub repo URL>
  git push -u origin main
  ```

## Development Commands

> Update this section once the project is initialized.

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run a single test file
npm test -- <path/to/test-file>

# Lint
npm run lint
```

## Architecture

> Document high-level architecture here as the project grows (data flow, key modules, external APIs used, etc.).
