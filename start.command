#!/bin/bash

cd "$(dirname "$0")"

clear

echo "\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557"
echo "\u2551       H\xc3\x84LSA LAGOM HEALTH APP         \u2551"
echo "\u2551    Swedish Science-Based Wellness     \u2551"
echo "\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d"
echo ""
echo "\xf0\x9f\x87\xb8\xf0\x9f\x87\xbe Starting your personalized health journey..."
echo ""

if ! command -v node &> /dev/null; then
    echo "\xe2\x9d\x8c Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org"
    echo "Then try running this script again."
    echo ""
    echo "Press any key to exit..."
    read -n 1
    exit 1
fi

echo "\xe2\x9c\x85 Node.js version: $(node -v)"
echo ""

if ! command -v npm &> /dev/null; then
    echo "\xe2\x9d\x8c npm is not installed!"
    echo "Please install Node.js which includes npm."
    echo ""
    echo "Press any key to exit..."
    read -n 1
    exit 1
fi

if [ ! -d "node_modules" ]; then
    echo "\xf0\x9f\x93\xa6 First time setup - Installing dependencies..."
    echo "This may take a few minutes..."
    echo ""
    npm install
    if [ $? -ne 0 ]; then
        echo ""
        echo "\xe2\x9d\x8c Failed to install dependencies!"
        echo "Please check your internet connection and try again."
        echo ""
        echo "Press any key to exit..."
        read -n 1
        exit 1
    fi
    echo ""
    echo "\xe2\x9c\x85 Dependencies installed successfully!"
    echo ""
fi

if [ ! -f ".env.local" ]; then
    echo "\xe2\x9a\xa0\xef\xb8\x8f  Creating configuration file (.env.local)..."
    cat > .env.local << EOL
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# OpenWeather API
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key_here

# Get your free API keys from:
# Supabase: https://supabase.com (free tier available)
# OpenWeather: https://openweathermap.org/api (free tier available)
EOL
    echo ""
    echo "\xe2\x9a\xa0\xef\xb8\x8f  IMPORTANT: API keys needed!"
    echo ""
    echo "To use the app, you need to:"
    echo "1. Open .env.local in a text editor"
    echo "2. Add your API keys (get them free from the URLs in the file)"
    echo "3. Save the file and run this launcher again"
    echo ""
    echo "Opening .env.local now..."
    open .env.local
    echo ""
    echo "Press any key to continue anyway (app will run with limited features)..."
    read -n 1
fi

if grep -q "your_supabase_url_here" .env.local; then
    echo ""
    echo "\xe2\x9a\xa0\xef\xb8\x8f  Warning: API keys not configured!"
    echo "The app will run but some features won't work."
    echo "Edit .env.local to add your API keys."
    echo ""
fi

echo "\xf0\x9f\x9a\x80 Starting H\xc3\xa4lsa Lagom..."
echo "\xf0\x9f\x93\xb1 The app will open in your browser at: http://localhost:3000"
echo ""
echo "\xe2\x9c\xa8 Tips:"
echo "   \xe2\x80\xa2 The app will auto-refresh when you make changes"
echo "   \xe2\x80\xa2 Press Ctrl+C in this window to stop the server"
echo "   \xe2\x80\xa2 Check the terminal for any error messages"
echo ""
echo "\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd\xe2\x9d\xbd"
echo ""

(sleep 5 && open http://localhost:3000) &

npm run dev

echo ""
echo "\xf0\x9f\x91\x8b Server stopped. Thanks for using H\xc3\xa4lsa Lagom!"
echo ""
echo "Press any key to close this window..."
read -n 1
