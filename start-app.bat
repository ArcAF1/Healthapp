@echo off
echo ================================
echo Starting Halsa Lagom Health App
echo ================================
echo.

REM Check if node_modules exists
if not exist "node_modules\" (
    echo Installing dependencies...
    call npm install
)

REM Check if .env.local exists
if not exist ".env.local" (
    echo Creating .env.local file...
    (
        echo NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
        echo NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
        echo NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key_here
    ) > .env.local
    echo.
    echo WARNING: Please edit .env.local with your actual API keys!
    pause
)

REM Start the app
echo Starting development server...
echo Open http://localhost:3000 in your browser
echo.
call npm run dev
