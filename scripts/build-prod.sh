#!/bin/bash

# Exit on error
set -e

echo "Starting production build..."

# Clean previous build
rm -rf dist

# Install dependencies
npm ci

# Run type checking
npm run type-check

# Run tests
npm run test

# Build for production
npm run build

# Optimize assets
echo "Optimizing assets..."
find dist -type f -name "*.js" -exec gzip -k {} \;
find dist -type f -name "*.css" -exec gzip -k {} \;

# Create deployment package
echo "Creating deployment package..."
tar -czf deploy.tar.gz dist

echo "Build completed successfully!"
echo "Deployment package: deploy.tar.gz" 