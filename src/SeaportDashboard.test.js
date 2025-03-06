import { render, screen } from '@testing-library/react';
import SeaportDashboard from './SeaportDashboard';

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