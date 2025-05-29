# Hälsa Lagom Mock MVP

This repository contains a minimal Next.js application showcasing the core algorithms for the Hälsa Lagom health tracker. It runs entirely with mock data so you can try the interface without any API keys.

## Quick Start

```bash
# macOS/Linux
chmod +x start.command
./start.command

# Windows
start-app.bat
```

The app starts at <http://localhost:3000>.

## Features Available Without APIs

- Swedish minimalist UI with Tailwind CSS
- Circadian schedule demo and metrics dashboard
- Mock lagom score and stress indicators
- Local storage persistence so data survives refresh

## Adding Real APIs Later

To enable Supabase and OpenWeather integration create `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key
```

Then update the data fetching hooks to use these keys.

## Development Scripts

```bash
npm run dev      # start dev server
npm run build    # build for production
npm test         # run algorithm tests
```

Running tests may fail in this environment if dependencies aren't installed.
