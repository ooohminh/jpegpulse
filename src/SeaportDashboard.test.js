import { render, screen, fireEvent, act } from '@testing-library/react';
import SeaportDashboard from './SeaportDashboard';

// Mock timer
jest.useFakeTimers();

test('renders Seaport NFT Activity header', () => {
  render(<SeaportDashboard />);
  const headerElement = screen.getByText(/Seaport NFT Activity/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders filter placeholders', () => {
  render(<SeaportDashboard />);
  const collectionFilter = screen.getByText(/Collection Filter/i);
  const traderFilter = screen.getByText(/Trader Filter/i);
  expect(collectionFilter).toBeInTheDocument();
  expect(traderFilter).toBeInTheDocument();
});

test('renders all stats cards with correct data', () => {
  render(<SeaportDashboard />);
  
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
  render(<SeaportDashboard />);
  
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
  
  // Check initial trade data is shown
  expect(screen.getByText(/#123/i)).toBeInTheDocument();
  expect(screen.getByText(/Bera Bees/i)).toBeInTheDocument();
});