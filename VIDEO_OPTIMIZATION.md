# Video Optimization Guide

## Problem
Your video files are very large (45-62MB), causing slow loading times on Netlify.

## Solution
Compress videos to optimized MP4 format using H.264 codec.

## Quick Start

### 1. Install FFmpeg (if not already installed)

**macOS:**
```bash
brew install ffmpeg
```

**Windows:**
Download from [ffmpeg.org](https://ffmpeg.org/download.html) or use:
```bash
choco install ffmpeg
```

**Linux:**
```bash
sudo apt-get install ffmpeg
```

### 2. Run the Compression Script

```bash
./compress-videos.sh
```

This script will:
- Find all `.mov` files in the `public` directory
- Compress them to `.mp4` format (H.264 codec)
- Reduce file size by 70-90% while maintaining good quality
- Create optimized videos ready for web

### 3. Expected Results

**Before:**
- p2u-video.mov: 45MB
- vantage-cargo.mov: 62MB
- jaafar.mov: 46MB
- mai-video.mov: 18MB

**After (estimated):**
- p2u-video.mp4: 5-10MB (80% reduction)
- vantage-cargo.mp4: 8-12MB (80% reduction)
- jaafar.mp4: 6-10MB (80% reduction)
- mai-video.mp4: 2-4MB (80% reduction)

### 4. Test the Videos

After compression:
1. Run `npm run build` to rebuild
2. Test locally with `npm run dev`
3. Verify videos load quickly
4. Check quality is acceptable

### 5. Deploy

Once satisfied:
1. Commit the new `.mp4` files
2. Optionally delete `.mov` files (they're backed up in git)
3. Deploy to Netlify

## Manual Compression (Alternative)

If you prefer to compress videos manually:

```bash
ffmpeg -i input.mov \
  -c:v libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale='min(1920,iw)':'min(1080,ih)':force_original_aspect_ratio=decrease" \
  -c:a aac \
  -b:a 128k \
  -movflags +faststart \
  -pix_fmt yuv420p \
  output.mp4
```

## Compression Settings Explained

- **`-crf 28`**: Quality setting (18-28 is good, lower = better quality but larger file)
- **`-preset slow`**: Better compression (slower encoding, smaller file)
- **`-vf scale`**: Limits max resolution to 1920x1080
- **`-movflags +faststart`**: Enables fast web playback
- **`-pix_fmt yuv420p`**: Ensures browser compatibility

## Image Optimization (Optional)

For even better performance, you can also optimize images:

```bash
# Install image optimization tools
npm install -g sharp-cli

# Optimize all PNG images
find public -name "*.png" -exec sharp -i {} -o {} \;
```

Or use online tools like:
- [TinyPNG](https://tinypng.com/) for PNG
- [Squoosh](https://squoosh.app/) for all formats

## Performance Tips

1. **Use poster images**: Videos now use poster images for instant preview
2. **Lazy loading**: Videos only load metadata initially, full video loads on demand
3. **Progressive loading**: Videos stream progressively, starting playback before fully loaded
4. **CDN**: Consider using a CDN like Cloudinary or Bunny.net for video hosting

## Fallback

The code automatically falls back to `.mov` files if `.mp4` files are missing, so your site will still work during the transition.

