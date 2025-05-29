#!/bin/bash

cd "$(dirname "$0")"

clear

cat <<'BANNER'
╔════════════════════════════════════════╗
║    HÄLSA LAGOM - QUICK INSTALLER     ║
╚════════════════════════════════════════╝
BANNER

echo ""
echo "Checking system requirements..."
echo ""

OS_VERSION=$(sw_vers -productVersion)
echo "✅ macOS version: $OS_VERSION"

if command -v node &> /dev/null; then
    echo "✅ Node.js version: $(node -v)"
else
    echo "❌ Node.js not found"
    echo ""
    echo "Installing Node.js via Homebrew..."
    if ! command -v brew &> /dev/null; then
        echo "Installing Homebrew first..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
    fi
    brew install node
fi

echo ""
echo "Installing app dependencies..."
npm install

echo ""
echo "Creating desktop shortcut..."
osascript <<'ENDOSA'
try
    tell application "Finder"
        make alias file to POSIX file "$(pwd)/start.command" at desktop
        set name of result to "Hälsa Lagom"
    end tell
end try
ENDOSA

echo ""
echo "✅ Installation complete!"
echo ""
echo "You can now:"
echo "1. Double-click 'Hälsa Lagom' on your desktop to start the app"
echo "2. Or double-click start.command in this folder"
echo ""
echo "Press any key to exit..."
read -n 1
