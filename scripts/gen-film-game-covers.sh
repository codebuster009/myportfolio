#!/usr/bin/env bash
# Generate stylized film + game cover SVGs for the playlist page.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)/../public/playlist-covers"
mkdir -p "$DIR"

make_film() {
  local file="$1" title="$2" director="$3" year="$4" bg1="$5" bg2="$6" text="$7"
  cat > "$DIR/$file" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" font-family="Helvetica, Arial, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="$bg1"/>
      <stop offset="100%" stop-color="$bg2"/>
    </linearGradient>
  </defs>
  <rect width="400" height="600" fill="url(#bg)"/>
  <text x="32" y="60" font-size="13" font-weight="bold" fill="$text" opacity="0.7" letter-spacing="3">FILM · $year</text>
  <text x="32" y="320" font-size="48" font-weight="900" fill="$text" letter-spacing="-1">$title</text>
  <line x1="32" y1="350" x2="120" y2="350" stroke="$text" stroke-width="3" opacity="0.6"/>
  <text x="32" y="560" font-size="16" font-weight="500" fill="$text" opacity="0.85" letter-spacing="1">$director</text>
</svg>
EOF
}

make_game() {
  local file="$1" title="$2" studio="$3" bg1="$4" bg2="$5" text="$6"
  cat > "$DIR/$file" <<EOF
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" font-family="Helvetica, Arial, sans-serif">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="$bg1"/>
      <stop offset="100%" stop-color="$bg2"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" fill="url(#bg)"/>
  <text x="32" y="60" font-size="13" font-weight="bold" fill="$text" opacity="0.7" letter-spacing="3">GAME</text>
  <text x="32" y="220" font-size="42" font-weight="900" fill="$text" letter-spacing="-1">$title</text>
  <line x1="32" y1="240" x2="120" y2="240" stroke="$text" stroke-width="3" opacity="0.6"/>
  <text x="32" y="365" font-size="16" font-weight="500" fill="$text" opacity="0.85" letter-spacing="1">$studio</text>
</svg>
EOF
}

# Films
make_film "whiplash.svg"       "WHIPLASH"        "Damien Chazelle"  "2014" "#0F0E0E" "#7C0000" "#FFFFFF"
make_film "spirited-away.svg"  "SPIRITED AWAY"   "Hayao Miyazaki"   "2001" "#1B3A57" "#48A9A6" "#FFFFFF"
make_film "andhadhun.svg"      "ANDHADHUN"       "Sriram Raghavan"  "2018" "#2A1A2E" "#7B2D26" "#FFFFFF"
make_film "past-lives.svg"     "PAST LIVES"      "Celine Song"      "2023" "#3A0CA3" "#F4A261" "#FFFFFF"
make_film "social-network.svg" "THE SOCIAL NETWORK" "David Fincher" "2010" "#0A1128" "#1E5F74" "#FFFFFF"

# Games
make_game "hades.svg"          "HADES"           "Supergiant Games" "#0D0221" "#E63946" "#FCD34D"
make_game "stardew-valley.svg" "STARDEW VALLEY"  "ConcernedApe"     "#2D6A4F" "#95D5B2" "#FFFFFF"
make_game "disco-elysium.svg"  "DISCO ELYSIUM"   "ZA/UM"            "#264653" "#E9C46A" "#FFFFFF"

echo "Generated."
