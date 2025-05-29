#!/bin/bash

cd "$(dirname "$0")"

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear

show_menu() {
    echo -e "${BLUE}\u2554\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2557${NC}"
    echo -e "${BLUE}\u2551${NC}     ${GREEN}H\u00c4LSA LAGOM HEALTH APP${NC}          ${BLUE}\u2551${NC}"
    echo -e "${BLUE}\u255a\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u2550\u255d${NC}"
    echo ""
    echo "Please select an option:"
    echo ""
    echo "  1) \xf0\x9f\x9a\x80 Start Development Server"
    echo "  2) \xf0\x9f\x93\xa6 Install/Update Dependencies"
    echo "  3) \xf0\x9f\x94\xa7 Configure API Keys"
    echo "  4) \xf0\x9f\x9b\x97\xef\xb8\x8f  Build for Production"
    echo "  5) \xf0\x9f\xa7\xaa Run Tests"
    echo "  6) \xf0\x9f\x93\x96 View Documentation"
    echo "  7) \xe2\x9d\x8c Exit"
    echo ""
}

handle_choice() {
    case $1 in
        1)
            echo -e "${GREEN}Starting development server...${NC}"
            npm run dev
            ;;
        2)
            echo -e "${GREEN}Installing dependencies...${NC}"
            npm install
            echo ""
            echo -e "${GREEN}\xe2\x9c\x85 Dependencies updated!${NC}"
            echo "Press any key to continue..."
            read -n 1
            ;;
        3)
            echo -e "${YELLOW}Opening configuration file...${NC}"
            if [ ! -f ".env.local" ]; then
                cp .env.local.example .env.local 2>/dev/null || touch .env.local
            fi
            open .env.local
            echo ""
            echo "Edit the file with your API keys, then save and close."
            echo "Press any key to continue..."
            read -n 1
            ;;
        4)
            echo -e "${GREEN}Building for production...${NC}"
            npm run build
            echo ""
            echo -e "${GREEN}\xe2\x9c\x85 Build complete!${NC}"
            echo "Press any key to continue..."
            read -n 1
            ;;
        5)
            echo -e "${GREEN}Running tests...${NC}"
            npm test
            echo ""
            echo "Press any key to continue..."
            read -n 1
            ;;
        6)
            echo -e "${BLUE}Opening documentation...${NC}"
            open README.md
            echo "Press any key to continue..."
            read -n 1
            ;;
        7)
            echo -e "${BLUE}Thanks for using H\u00c4lsa Lagom!${NC}"
            exit 0
            ;;
        *)
            echo -e "${RED}Invalid option. Please try again.${NC}"
            sleep 2
            ;;
    esac
}

while true; do
    clear
    show_menu
    read -p "Enter your choice (1-7): " choice
    handle_choice $choice
done
