# Image Replacer Chrome Extension

A Chrome extension that allows users to replace images on web pages with predefined dummy images. This extension provides functionality to either replace a single image or all images on a webpage with selected dummy images.

## Features

- Replace individual images by clicking on them
- Replace all images on a webpage at once
- Choose from three different dummy images
- User-friendly popup interface
- Maintains original image dimensions when replacing

## How to Use

1. Click on the extension icon to open the popup interface
2. Select a dummy image from the three available options
3. Choose your replacement method:
    - Click "Replace Single Image" to replace an individual image (then click on any image on the page)
    - Click "Replace All Images" to replace every image on the page at once

## Technical Details

The extension is built using:
- Manifest V3
- Chrome Extension APIs (activeTab, scripting)
- Content Scripts for DOM manipulation
- Background Service Worker
- Web Accessible Resources for image assets

## Components

- `manifest.json`: Extension configuration and permissions
- `popup.html/js`: User interface and control logic
- `content.js`: Handles image replacement logic
- `background.js`: Service worker for extension events
- `images/`: Contains dummy images and extension icons

## Installation

1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

