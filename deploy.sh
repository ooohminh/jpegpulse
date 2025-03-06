#!/bin/bash

# JPEG Pulse Deployment Script

echo "==== JPEG Pulse Deployment Script ===="
echo ""

# Check if vercel is installed
if ! command -v vercel &> /dev/null; then
    echo "Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check deployment type
echo "Select deployment type:"
echo "1. Preview deployment"
echo "2. Production deployment"
read -p "Enter your choice (1 or 2): " choice

# Login to Vercel
echo ""
echo "Logging in to Vercel..."
vercel login

# Deploy according to choice
if [ "$choice" == "1" ]; then
    echo ""
    echo "Starting preview deployment..."
    vercel
elif [ "$choice" == "2" ]; then
    echo ""
    echo "Starting production deployment..."
    vercel --prod
else
    echo "Invalid choice. Exiting."
    exit 1
fi

echo ""
echo "Done! Your application has been deployed."
echo "The subgraph is available at: https://api.studio.thegraph.com/query/88157/jpegpulse/v0.1.0"
echo ""
echo "Important: If this is your first deployment, set up the following environment variable in the Vercel dashboard:"
echo "REACT_APP_GRAPHQL_ENDPOINT=https://api.studio.thegraph.com/query/88157/jpegpulse/v0.1.0"