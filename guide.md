# JPEG Pulse Deployment Guide

## 1. Subgraph Deployment Status

The subgraph has been updated to index ALL NFT collections on Berachain mainnet. You can access it at:

```
https://thegraph.com/studio/subgraph/jpegpulse/
```

### Endpoint URL (configured in Apollo Client):
```
https://api.studio.thegraph.com/query/88157/jpegpulse/v0.2.0
```

### Features of the Updated Subgraph:

- Indexes ALL NFT collections traded through Seaport on Berachain
- Captures the complete trading history starting from block 100,000
- Handles both listing fulfillments and offer acceptances
- Resolves collection names via on-chain contract calls

### Updating the Subgraph

If you need to update the subgraph in the future:

1. Make your changes to the schema, mappings, or ABIs in the `subgraph` directory
2. Run the following commands:
   ```
   cd subgraph
   npm run codegen
   npm run build
   graph auth --studio <YOUR_DEPLOY_KEY>
   graph deploy --node https://api.studio.thegraph.com/deploy/ --version-label v0.2.1 jpegpulse
   ```

## 2. Implemented Features

We've successfully implemented the following features in the Seaport dashboard:

1. **Real-time Stats**: Volume, Trades, Traders, Average Price - calculated from actual subgraph data
2. **Interactive Charts**:
   - Volume and trades line chart showing data over 7 days
   - Top collections bar chart showing highest volume collections
3. **Filters**:
   - Collection filter dropdown with data from the subgraph
   - Trader address filter that affects all dashboard components
4. **Sortable, Paginated Trade Table**:
   - Sort by any column (price, timestamp, collection, etc.)
   - Page through results with pagination controls
5. **CSV Export**: Export trades to CSV for offline analysis
6. **Live Updates Panel**: Real-time trade notifications with 5-second polling
7. **Tooltips**: Hover tooltips on stats cards for better understanding
8. **Responsive Design**: Works on both desktop and mobile

All these features are connected to the subgraph and using real data.

## 3. Frontend Deployment Instructions for Vercel

### One-click Deployment

The preferred way to deploy the frontend:

1. Go to the Vercel dashboard: https://vercel.com/import
2. Import your GitHub repository (the one with our latest code)
3. Configure the project with these settings:
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Add the environment variable:
   - Name: `REACT_APP_GRAPHQL_ENDPOINT`
   - Value: `https://api.studio.thegraph.com/query/88157/jpegpulse/v0.1.0`
5. Click Deploy

### Manual Deployment with Vercel CLI

If you prefer deploying from your local machine:

1. Install Vercel CLI: `npm install -g vercel`
2. Login to Vercel: `vercel login`
3. Deploy: `vercel --prod`
4. When prompted, set the environment variable as shown above

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