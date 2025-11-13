# PWA Icons

This directory should contain the following icon files for PWA support:

- `icon-72x72.png` - 72x72 pixels
- `icon-96x96.png` - 96x96 pixels
- `icon-128x128.png` - 128x128 pixels
- `icon-144x144.png` - 144x144 pixels
- `icon-152x152.png` - 152x152 pixels (iOS)
- `icon-192x192.png` - 192x192 pixels
- `icon-384x384.png` - 384x384 pixels
- `icon-512x512.png` - 512x512 pixels

## Creating Icons

You can create these icons from your logo using:
1. Online tools like https://realfavicongenerator.net/
2. Image editing software
3. Command line tools like ImageMagick

Example using ImageMagick (if installed):
```bash
convert your-logo.png -resize 512x512 icon-512x512.png
convert your-logo.png -resize 192x192 icon-192x192.png
convert your-logo.png -resize 152x152 icon-152x152.png
# ... etc
```

For now, you can use a placeholder or your existing logo. The app will work without icons, but they're recommended for the best user experience.

