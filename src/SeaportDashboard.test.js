import { render, screen, fireEvent, act } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import SeaportDashboard from './SeaportDashboard';
import { GET_LIVE_TRADES, GET_RECENT_TRADES } from './apollo/queries';

// Mock timer
jest.useFakeTimers();

// Mock GraphQL data
const mockLiveTradeData = {
  request: {
    query: GET_LIVE_TRADES,
    variables: { lastTimestamp: "1709913600", collection: "", trader: null }
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

const mocks = [mockLiveTradeData, mockRecentTradesData];

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
  const collectionFilter = screen.getByText(/Collection Filter/i);
  const traderFilter = screen.getByText(/Trader Filter/i);
  expect(collectionFilter).toBeInTheDocument();
  expect(traderFilter).toBeInTheDocument();
});

test('renders all stats cards with correct data', () => {
  renderWithApollo(<SeaportDashboard />);
  
  // Check volume card
  const volumeHeading = screen.getAllByText(/Volume/i)[0];
  expect(volumeHeading).toBeInTheDocument();
  expect(screen.getByText(/1,500 \$BERA/i)).toBeInTheDocument();
  
  // Check trades card
  const tradesHeading = screen.getAllByText(/Trades/i)[0];
  expect(tradesHeading).toBeInTheDocument();
  expect(screen.getByText(/45/i)).toBeInTheDocument();
  
  // Check traders card
  expect(screen.getByText(/Traders/i)).toBeInTheDocument();
  expect(screen.getByText(/28/i)).toBeInTheDocument();
  
  // Check avg price card
  expect(screen.getByText(/Avg Price/i)).toBeInTheDocument();
  expect(screen.getByText(/33.3 \$BERA/i)).toBeInTheDocument();
});

test('live updates panel toggles visibility and shows updates', async () => {
  renderWithApollo(<SeaportDashboard />);
  
  // Check that live updates panel button exists by getting all span elements with "Live Updates" text
  // and selecting the one inside the button
  const toggleButton = screen.getAllByText(/Live Updates/i).find(element => 
    element.tagName.toLowerCase() === 'span' && 
    element.parentElement.tagName.toLowerCase() === 'button'
  );
  expect(toggleButton).toBeInTheDocument();
  
  // Initially panel should be visible
  expect(screen.getByText(/Recent Trades/i)).toBeInTheDocument();
  
  // Toggle panel off
  fireEvent.click(toggleButton.parentElement);
  
  // Panel should be hidden
  expect(screen.queryByText(/Recent Trades/i)).not.toBeInTheDocument();
  
  // Toggle panel on again
  fireEvent.click(toggleButton.parentElement);
  
  // Panel should be visible again
  expect(screen.getByText(/Recent Trades/i)).toBeInTheDocument();
});