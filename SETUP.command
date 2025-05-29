#!/bin/bash

echo "Setting up all Hälsa Lagom launchers..."

chmod +x start.command
chmod +x start-simple.command
chmod +x start-pro.command
chmod +x install.command
chmod +x create-app.command
chmod +x make-executable.sh

echo ""
echo "✅ All launchers are now ready!"
echo ""
echo "You can now double-click any of these:"
echo "  • start.command - Normal start"
echo "  • start-pro.command - Advanced menu"
echo "  • install.command - First-time setup"
echo "  • create-app.command - Create .app bundle"
echo ""
echo "Press any key to exit..."
read -n 1
