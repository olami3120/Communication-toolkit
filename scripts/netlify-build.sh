#!/bin/bash

# Exit on error
set -e

echo "Starting Netlify build..."

# Install dependencies
npm ci

# Run type checking
npm run type-check

# Run tests
npm run test

# Build for production
npm run build

echo "Netlify build completed successfully!" 