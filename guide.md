# JPEG Pulse Deployment Guide

## 1. Subgraph Deployment

The subgraph has been deployed to The Graph Studio. You can access it at:

```
https://thegraph.com/studio/subgraph/jpegpulse/
```

### Endpoint URL for Apollo Client:
```
https://api.studio.thegraph.com/query/88157/jpegpulse/v0.1.0
```

### Updating the Subgraph

If you need to update the subgraph:

1. Make your changes to the schema, mappings, or ABIs in the `subgraph` directory
2. Run the following commands:
   ```
   cd subgraph
   npm run codegen
   npm run build
   graph deploy --node https://api.studio.thegraph.com/deploy/ --version-label v0.1.1 ooohminh/jpegpulse
   ```

## 2. Frontend Deployment to Vercel

### One-click Deployment

The easiest way to deploy the frontend is to use Vercel's one-click deployment:

1. Make sure the Apollo Client configuration in `src/apollo/client.js` points to your subgraph endpoint
2. Push your changes to GitHub
3. Import your repository in the Vercel dashboard
4. Select the appropriate settings (React, build command: `npm run build`)
5. Click Deploy

### Manual Deployment with Vercel CLI

If you prefer to deploy from the command line:

1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Deploy: `vercel`
4. Follow the prompts to complete the deployment

## 3. Configuration

### Frontend Environment Variables

Create a `.env` file with the following variables:

```
REACT_APP_GRAPHQL_ENDPOINT=https://api.studio.thegraph.com/query/ooohminh/jpegpulse/version/latest
```

## 4. Post-Deployment Checks

After deployment, verify the following:

1. The Seaport dashboard loads correctly
2. Real-time updates are working (trades appear within 5 seconds)
3. Dark/light theme toggle works and persists
4. Mobile layout renders correctly

## 5. Troubleshooting

- If no data appears in the dashboard, check the network requests to ensure the GraphQL endpoint is correct
- If the subgraph deployment fails, check that the event signatures in your subgraph.yaml match the ABIs
- For Vercel build failures, check the build logs for specific errors