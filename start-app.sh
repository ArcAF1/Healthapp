#!/bin/bash

echo "\xf0\x9f\x87\xb8\xf0\x9f\x87\xbe Starting H\xc3\xa4lsa Lagom Health App..."
echo "=================================="

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "\xf0\x9f\x93\xa6 Installing dependencies..."
    npm install
fi

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "\xe2\x9a\xa0\xef\xb8\x8f  Creating .env.local file..."
    cat > .env.local << EOL
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
NEXT_PUBLIC_OPENWEATHER_API_KEY=your_openweather_key_here
EOL
    echo "\xe2\x9a\xa0\xef\xb8\x8f  Please edit .env.local with your actual API keys!"
    echo "Press any key to continue..."
    read -n 1
fi

# Start the app
echo "\xf0\x9f\x9a\x80 Starting development server..."
echo "\xf0\x9f\x93\xb1 Open http://localhost:3000 in your browser"
echo ""
npm run dev
