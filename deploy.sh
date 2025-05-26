#!/bin/bash

# Exit on error
set -e

echo "🚀 Starting deployment process..."

# Build the project
echo "📦 Building project..."
npm run build

# Check if Netlify CLI is installed
if ! command -v netlify &> /dev/null; then
    echo "📥 Installing Netlify CLI..."
    npm install -g netlify-cli
fi

# Deploy to Netlify
echo "🚀 Deploying to Netlify..."
netlify deploy --prod --dir=build

echo "✅ Deployment completed!" 