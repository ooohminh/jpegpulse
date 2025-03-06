# JPEG Pulse

A real-time dashboard for tracking NFT trading activity on Berachain, focusing on Seaport marketplace transactions with live updates.

## Features

- **Seaport Dashboard**: Track Seaport NFT trading activity with stats, charts, and live trade notifications
- **Dark/Light Mode**: Toggle between themes based on user preference
- **Responsive Design**: Works on both desktop and mobile devices
- **Live Updates**: Real-time trade notifications with 5-second polling interval

## Technology Stack

- **Frontend**: React, Tailwind CSS
- **Data Fetching**: Apollo Client with GraphQL
- **Charts**: Chart.js with react-chartjs-2
- **Subgraph**: The Graph for indexing blockchain data

## Getting Started

### Prerequisites

- Node.js v16+
- npm or yarn
- Git

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/jpegpulse.git
cd jpegpulse
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The app will be running at http://localhost:3000

### Building for Production

```bash
npm run build
```

## Deployment

See [guide.md](guide.md) for detailed deployment instructions.

### Quick Deployment

This project is configured for easy deployment on Vercel:

1. Push your code to a GitHub repository
2. Connect your repository to Vercel
3. Vercel will automatically detect React configuration and deploy

From the command line:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

### Subgraph

The subgraph is already deployed to The Graph Studio at:
```
https://api.studio.thegraph.com/query/88157/jpegpulse/v0.1.0
```

You can view the subgraph dashboard at:
```
https://thegraph.com/studio/subgraph/jpegpulse/
```

For updating the subgraph, follow the instructions in [guide.md](guide.md).

## License

MIT License
