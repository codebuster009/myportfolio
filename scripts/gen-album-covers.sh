#!/usr/bin/env bash
# Generate stylized album-art SVG covers for the playlist.
set -e
DIR="$(cd "$(dirname "$0")" && pwd)/../public/playlist-covers"
mkdir -p "$DIR"

# Args: file, line1, line2, line3 (or empty), artist, bg1, bg2, text, accentLine
make_cover() {
  local file="$1"
  local l1="$2"
  local l2="$3"
  local l3="$4"
  local artist="$5"
  local bg1="$6"
  local bg2="$7"
  local text="$8"

  # Compose title block: 1, 2, or 3 lines with tspan
  local title_svg=""
  if [ -z "$l2" ]; then
    title_svg="<text x=\"32\" y=\"210\" font-size=\"56\" font-weight=\"900\" fill=\"$text\" letter-spacing=\"-2\">$l1</text>"
  elif [ -z "$l3" ]; then
    title_svg="<text x=\"32\" y=\"180\" font-size=\"44\" font-weight=\"900\" fill=\"$text\" letter-spacing=\"-1\">$l1<tspan x=\"32\" dy=\"50\">$l2</tspan></text>"
  else
    title_svg="<text x=\"32\" y=\"150\" font-size=\"38\" font-weight=\"900\" fill=\"$text\" letter-spacing=\"-1\">$l1<tspan x=\"32\" dy=\"44\">$l2</tspan><tspan x=\"32\" dy=\"44\">$l3</tspan></text>"
  fi

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
  <text x="32" y="60" font-size="13" font-weight="bold" fill="$text" opacity="0.7" letter-spacing="3">ALBUM</text>
  $title_svg
  <text x="32" y="365" font-size="18" font-weight="500" fill="$text" opacity="0.85" letter-spacing="1">$artist</text>
  <line x1="32" y1="320" x2="120" y2="320" stroke="$text" stroke-width="3" opacity="0.5"/>
</svg>
EOF
}

# alt-J - An Awesome Wave (deep blue + teal)
make_cover "an-awesome-wave.svg" "AN" "AWESOME" "WAVE" "alt-J" "#0F3460" "#16C79A" "#FFFFFF"

# Tame Impala - Currents (orange+red psychedelic)
make_cover "currents.svg" "CURRENTS" "" "" "Tame Impala" "#F4A261" "#E63946" "#FFFFFF"

# Frank Ocean - Channel Orange
make_cover "channel-orange.svg" "CHANNEL" "ORANGE" "" "Frank Ocean" "#FF6B35" "#F77F00" "#FFFFFF"

# John Mayer - Continuum (warm teal)
make_cover "continuum.svg" "CONTINUUM" "" "" "John Mayer" "#264653" "#2A9D8F" "#FFFFFF"

# Tyler, The Creator - Igor (pink + yellow)
make_cover "igor.svg" "IGOR" "" "" "Tyler, The Creator" "#FFB6C1" "#FFC857" "#1A1A1A"

# Frank Ocean - Blonde (yellow)
make_cover "blonde.svg" "BLONDE" "" "" "Frank Ocean" "#FCD34D" "#F59E0B" "#1A1A1A"

echo "Generated covers."
