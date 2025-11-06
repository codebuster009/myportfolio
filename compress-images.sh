#!/bin/bash

# Image Compression Script for Portfolio
# This script compresses all PNG and JPG images to reduce file sizes
# Requires: ImageMagick (install with: brew install imagemagick)

echo "🖼️  Starting image compression..."
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

total_original=0
total_compressed=0

# Function to compress PNG
compress_png() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    # Get original size
    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    
    # Compress PNG with ImageMagick
    # -strip: remove metadata
    # -quality 85-95: good balance for PNG
    # -define png:compression-level=9: maximum compression
    # -define png:compression-strategy=1: filter strategy
    magick "$file" -strip -quality 90 -define png:compression-level=9 -define png:compression-strategy=1 "$temp_file" 2>/dev/null
    
    if [ -f "$temp_file" ]; then
        local new_size=$(stat -f%z "$temp_file" 2>/dev/null || stat -c%s "$temp_file" 2>/dev/null)
        
        # Only replace if smaller
        if [ "$new_size" -lt "$original_size" ]; then
            mv "$temp_file" "$file"
            orig_h=$(du -h "$file" 2>/dev/null | cut -f1 || echo "${original_size}B")
            new_h=$(du -h "$file" 2>/dev/null | cut -f1 || echo "${new_size}B")
            echo -e "${GREEN}✅ PNG: $(basename $file) - $(du -h "$file" 2>/dev/null | cut -f1) (reduced)${NC}"
            total_original=$((total_original + original_size))
            total_compressed=$((total_compressed + new_size))
        else
            rm "$temp_file"
            echo -e "${YELLOW}⏭️  PNG: $(basename $file) - Already optimized${NC}"
        fi
    fi
}

# Function to compress JPG
compress_jpg() {
    local file="$1"
    local temp_file="${file}.tmp"
    
    # Get original size
    local original_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
    
    # Compress JPG with ImageMagick
    # -strip: remove metadata
    # -quality 85: good balance for web (80-90 is typical)
    # -interlace Plane: progressive JPEG
    # -sampling-factor 4:2:0: chroma subsampling
    magick "$file" -strip -quality 85 -interlace Plane -sampling-factor 4:2:0 "$temp_file" 2>/dev/null
    
    if [ -f "$temp_file" ]; then
        local new_size=$(stat -f%z "$temp_file" 2>/dev/null || stat -c%s "$temp_file" 2>/dev/null)
        
        # Only replace if smaller
        if [ "$new_size" -lt "$original_size" ]; then
            mv "$temp_file" "$file"
            echo -e "${GREEN}✅ JPG: $(basename $file) - $(du -h "$file" 2>/dev/null | cut -f1) (reduced)${NC}"
            total_original=$((total_original + original_size))
            total_compressed=$((total_compressed + new_size))
        else
            rm "$temp_file"
            echo -e "${YELLOW}⏭️  JPG: $(basename $file) - Already optimized${NC}"
        fi
    fi
}

# Find and compress all PNG files
echo -e "${BLUE}📦 Compressing PNG files...${NC}"
find public -type f -name "*.png" | while read -r png_file; do
    compress_png "$png_file"
done

echo ""

# Find and compress all JPG/JPEG files
echo -e "${BLUE}📦 Compressing JPG files...${NC}"
find public -type f \( -name "*.jpg" -o -name "*.jpeg" \) | while read -r jpg_file; do
    compress_jpg "$jpg_file"
done

echo ""
echo "🎉 Image compression complete!"
echo ""

# Calculate and display summary
if [ $total_original -gt 0 ]; then
    reduction=$((100 - (total_compressed * 100 / total_original)))
    orig_mb=$((total_original / 1024 / 1024))
    comp_mb=$((total_compressed / 1024 / 1024))
    echo -e "${GREEN}📊 Summary:${NC}"
    echo -e "   Original: ~${orig_mb}MB"
    echo -e "   Compressed: ~${comp_mb}MB"
    echo -e "   Reduction: ${reduction}%"
    echo ""
fi

echo "✅ All images optimized for web!"

