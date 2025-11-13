#!/bin/bash

# Script to generate PWA icons from a source image
# Usage: ./scripts/generate-icons.sh path/to/your-logo.png

if [ -z "$1" ]; then
    echo "Usage: ./scripts/generate-icons.sh path/to/your-logo.png"
    exit 1
fi

SOURCE_IMAGE=$1
OUTPUT_DIR="public/icons"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick is not installed. Please install it first:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

# Generate icons in various sizes
echo "Generating PWA icons..."

sizes=(72 96 128 144 152 192 384 512)

for size in "${sizes[@]}"; do
    convert "$SOURCE_IMAGE" -resize "${size}x${size}" -background none -gravity center -extent "${size}x${size}" "$OUTPUT_DIR/icon-${size}x${size}.png"
    echo "Generated icon-${size}x${size}.png"
done

echo "All icons generated successfully in $OUTPUT_DIR"

