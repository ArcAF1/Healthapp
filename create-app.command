#!/bin/bash

cd "$(dirname "$0")"

echo "Creating Hälsa Lagom.app..."

APP_NAME="Hälsa Lagom"
APP_DIR="$APP_NAME.app"
mkdir -p "$APP_DIR/Contents/MacOS"
mkdir -p "$APP_DIR/Contents/Resources"

cat > "$APP_DIR/Contents/MacOS/launcher" <<'LAUNCH'
#!/bin/bash
cd "$(dirname "$0")/../../../"
osascript -e 'tell application "Terminal" to do script "cd \"'$(pwd)'\" && ./start.command"'
LAUNCH

chmod +x "$APP_DIR/Contents/MacOS/launcher"

cat > "$APP_DIR/Contents/Info.plist" <<EOF2
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>CFBundleExecutable</key>
    <string>launcher</string>
    <key>CFBundleIdentifier</key>
    <string>com.halsalagom.app</string>
    <key>CFBundleName</key>
    <string>Hälsa Lagom</string>
    <key>CFBundleVersion</key>
    <string>1.0</string>
    <key>CFBundleIconFile</key>
    <string>icon</string>
</dict>
</plist>
EOF2

if [ -f "public/icon.png" ]; then
    cp "public/icon.png" "$APP_DIR/Contents/Resources/icon.png"
fi

echo "✅ Created $APP_NAME.app"
echo "You can now drag it to your Applications folder!"
echo ""
echo "Press any key to exit..."
read -n 1
