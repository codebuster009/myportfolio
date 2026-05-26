#!/bin/bash

# Video Compression Script for Portfolio
# This script compresses all .mov files to optimized .mp4 files
# Requires: ffmpeg (install with: brew install ffmpeg)

echo "🎬 Starting video compression..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Find all .mov files in public directory
find public -name "*.mov" -type f | while read -r mov_file; do
    # Get directory and filename without extension
    dir=$(dirname "$mov_file")
    filename=$(basename "$mov_file" .mov)
    mp4_file="$dir/$filename.mp4"
    
    # Skip if MP4 already exists
    if [ -f "$mp4_file" ]; then
        echo -e "${YELLOW}⏭️  Skipping $mov_file (MP4 already exists)${NC}"
        continue
    fi
    
    echo -e "${GREEN}📹 Compressing: $mov_file${NC}"
    
    # Compress video with ffmpeg
    # Settings:
    # -crf 28: Quality (lower = better quality, higher = smaller file, 28 is good balance)
    # -preset slow: Better compression (slower encoding, smaller file)
    # -vf scale: Scale down if larger than 1920x1080
    # -movflags +faststart: Enable fast start for web playback
    # -pix_fmt yuv420p: Ensure compatibility
    ffmpeg -i "$mov_file" \
        -c:v libx264 \
        -crf 28 \
        -preset slow \
        -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
        -c:a aac \
        -b:a 128k \
        -movflags +faststart \
        -pix_fmt yuv420p \
        -y \
        "$mp4_file" 2>&1 | grep -E "(Duration|Stream|Output|error)" || echo "✅ Compression complete"
    
    if [ -f "$mp4_file" ]; then
        original_size=$(du -h "$mov_file" | cut -f1)
        new_size=$(du -h "$mp4_file" | cut -f1)
        echo -e "${GREEN}✅ Compressed: $original_size → $new_size${NC}"
        echo ""
    else
        echo -e "${YELLOW}⚠️  Warning: Compression may have failed for $mov_file${NC}"
        echo ""
    fi
done

echo ""
echo "🎉 Video compression complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update ProjectGalleryModal.tsx to use .mp4 files instead of .mov"
echo "2. Test the videos to ensure quality is acceptable"
echo "3. Optionally delete .mov files after confirming MP4s work"
echo ""





