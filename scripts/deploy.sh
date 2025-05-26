#!/bin/bash

# Exit on error
set -e

# Load environment variables
if [ -f .env.production ]; then
  source .env.production
fi

echo "Starting deployment..."

# Check if deployment package exists
if [ ! -f deploy.tar.gz ]; then
  echo "Error: deploy.tar.gz not found. Please run build-prod.sh first."
  exit 1
fi

# Extract deployment package
echo "Extracting deployment package..."
tar -xzf deploy.tar.gz

# Deploy to production server
echo "Deploying to production server..."
# Add your deployment commands here
# Example:
# scp -r dist/* user@your-server:/path/to/deployment
# ssh user@your-server "cd /path/to/deployment && npm install --production"

echo "Deployment completed successfully!" 