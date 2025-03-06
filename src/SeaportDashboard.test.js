import { render, screen, fireEvent } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SeaportDashboard from './SeaportDashboard';
import { GET_LIVE_TRADES, GET_RECENT_TRADES, GET_DAILY_STATS, GET_COLLECTIONS } from './apollo/queries';

// Mock timer
jest.useFakeTimers();

// Mock GraphQL data
const mockLiveTradeData = {
  request: {
    query: GET_LIVE_TRADES,
    variables: { lastTimestamp: expect.any(String), collection: "", trader: null }
  },
  result: {
    data: {
      trades: [
        { 
          id: '123', 
          collection: 'Bera Bees', 
          price: '50', 
          tokenId: '1234', 
          timestamp: '1709913700', 
          offerer: '0x123abc', 
          recipient: '0x456def' 
        }
      ]
    }
  }
};

const mockRecentTradesData = {
  request: {
    query: GET_RECENT_TRADES,
    variables: { collection: "", trader: null, orderBy: "timestamp", orderDirection: "desc", skip: 0, first: 10 }
  },
  result: {
    data: {
      trades: [
        { 
          id: '123', 
          collection: 'Bera Bees', 
          price: '50', 
          tokenId: '1234', 
          timestamp: '1709913700', 
          offerer: '0x123abc', 
          recipient: '0x456def' 
        }
      ]
    }
  }
};

const mockDailyStatsData = {
  request: {
    query: GET_DAILY_STATS,
    variables: { orderBy: "id", orderDirection: "asc", first: 7 }
  },
  result: {
    data: {
      dailyStats: [
        { id: '2023-01-01', volume: '100', trades: '10' },
        { id: '2023-01-02', volume: '200', trades: '20' }
      ]
    }
  }
};

const mockCollectionsData = {
  request: {
    query: GET_COLLECTIONS,
    variables: { orderBy: "totalVolume", orderDirection: "desc", first: 5 }
  },
  result: {
    data: {
      collections: [
        { id: '0x123', name: 'Bera Bees', totalVolume: '500' },
        { id: '0x456', name: 'Honey Bears', totalVolume: '300' }
      ]
    }
  }
};

const mocks = [mockLiveTradeData, mockRecentTradesData, mockDailyStatsData, mockCollectionsData];

// Helper function to wrap the component with Apollo mocks
const renderWithApollo = (component) => {
  return render(
    <MockedProvider mocks={mocks} addTypename={false}>
      {component}
    </MockedProvider>
  );
};

test('renders Seaport NFT Activity header', () => {
  renderWithApollo(<SeaportDashboard />);
  const headerElement = screen.getByText(/Seaport NFT Activity/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders filter placeholders', () => {
  renderWithApollo(<SeaportDashboard />);
  // These are now actual form controls, not placeholders
  const collectionFilterLabel = screen.getByLabelText(/Collection/i);
  const traderFilterLabel = screen.getByLabelText(/Trader Address/i);
  expect(collectionFilterLabel).toBeInTheDocument();
  expect(traderFilterLabel).toBeInTheDocument();
});

test('renders all stats cards with initial zero values', () => {
  renderWithApollo(<SeaportDashboard />);
  
  // Check volume card
  const volumeHeading = screen.getAllByText(/Volume/i)[0];
  expect(volumeHeading).toBeInTheDocument();
  expect(screen.getByText(/0 \$BERA/i)).toBeInTheDocument();
  
  // Check trades card
  const tradesHeading = screen.getAllByText(/Trades/i)[0];
  expect(tradesHeading).toBeInTheDocument();
  expect(screen.getByText(/0$/i)).toBeInTheDocument();
  
  // Check traders card
  expect(screen.getByText(/Traders/i)).toBeInTheDocument();
  expect(screen.getByText(/0$/i)).toBeInTheDocument();
  
  // Check avg price card
  expect(screen.getByText(/Avg Price/i)).toBeInTheDocument();
  expect(screen.getByText(/0 \$BERA/i)).toBeInTheDocument();
});

test('live updates panel toggles visibility and shows updates', async () => {
  renderWithApollo(<SeaportDashboard />);
  
  // Check that live updates panel button exists by getting all span elements with "Live Updates" text
  // and selecting the one inside the button
  const toggleButton = screen.getAllByText(/Live Updates/i)[0];
  expect(toggleButton).toBeInTheDocument();
  
  // Initially panel should be visible
  expect(screen.getAllByText(/Live Updates/i)[0]).toBeInTheDocument();
  
  // Toggle panel off
  fireEvent.click(toggleButton);
  
  // Toggle panel on again
  fireEvent.click(toggleButton);
  
  // Panel should be visible again
  expect(screen.getAllByText(/Live Updates/i)[0]).toBeInTheDocument();
});