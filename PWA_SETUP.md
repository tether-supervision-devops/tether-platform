# PWA Setup Guide

This application is now configured as a Progressive Web App (PWA) that can be installed on iPads and other devices.

## Features

- ✅ Installable on iOS (iPad/iPhone) and Android devices
- ✅ Offline support via Service Worker
- ✅ App-like experience (standalone mode)
- ✅ Custom icons and splash screens
- ✅ Install prompt for users

## Setting Up Icons

You need to create icon files for the PWA. Place them in the `public/icons/` directory:

Required icon sizes:
- `icon-72x72.png` - 72x72 pixels
- `icon-96x96.png` - 96x96 pixels
- `icon-128x128.png` - 128x128 pixels
- `icon-144x144.png` - 144x144 pixels
- `icon-152x152.png` - 152x152 pixels (iOS recommended)
- `icon-192x192.png` - 192x192 pixels
- `icon-384x384.png` - 384x384 pixels
- `icon-512x512.png` - 512x512 pixels

### Option 1: Using the provided script

If you have ImageMagick installed:

```bash
./scripts/generate-icons.sh public/assets/tether-logo.png
```

### Option 2: Using online tools

1. Visit https://realfavicongenerator.net/
2. Upload your logo
3. Configure settings for PWA
4. Download and extract icons to `public/icons/`

### Option 3: Manual creation

Use any image editing software to resize your logo to the required sizes.

## Testing PWA Installation

### On iPad (Safari)

1. Open the app in Safari on your iPad
2. Tap the Share button (square with arrow)
3. Scroll down and tap "Add to Home Screen"
4. Tap "Add" in the top right
5. The app will appear on your home screen

### On Android (Chrome)

1. Open the app in Chrome
2. You'll see an install prompt (or tap the menu → "Install app")
3. Tap "Install"
4. The app will be added to your home screen

### On Desktop (Chrome/Edge)

1. Look for the install icon in the address bar
2. Click it and select "Install"
3. The app will open in a standalone window

## Service Worker

The service worker (`public/sw.js`) provides:
- Offline caching of key pages
- Faster loading on repeat visits
- Basic offline functionality

The service worker is automatically registered when the app loads.

## Configuration

### Manifest

The app manifest is defined in:
- `src/app/manifest.ts` (Next.js metadata route)
- `public/manifest.json` (fallback)

### Meta Tags

iOS-specific meta tags are added in `src/app/layout.tsx`:
- `apple-mobile-web-app-capable`
- `apple-mobile-web-app-status-bar-style`
- `apple-mobile-web-app-title`
- Apple touch icons

## Troubleshooting

### Icons not showing

- Ensure all icon files exist in `public/icons/`
- Check that file paths in `manifest.json` are correct
- Clear browser cache and try again

### Install prompt not appearing

- Make sure you're accessing the app over HTTPS (required for PWA)
- Check browser console for errors
- Verify service worker is registered (check Application tab in DevTools)

### App not working offline

- Service worker needs to cache resources on first visit
- Check Network tab in DevTools to see what's being cached
- Verify service worker is active in Application tab

## Next Steps

1. Generate and add icon files to `public/icons/`
2. Test installation on your target devices
3. Customize the manifest.json with your app details
4. Test offline functionality
5. Consider adding more sophisticated caching strategies if needed

