import { render, screen, fireEvent } from '@testing-library/react';
import AllNFTDashboard from './AllNFTDashboard';

test('renders All-NFT Stats Hub header', () => {
  render(<AllNFTDashboard />);
  const headerElement = screen.getByText(/All-NFT Stats Hub/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders filter placeholders', () => {
  render(<AllNFTDashboard />);
  const collectionFilter = screen.getByText(/Collection Filter/i);
  const traderFilter = screen.getByText(/Trader Filter/i);
  expect(collectionFilter).toBeInTheDocument();
  expect(traderFilter).toBeInTheDocument();
});

test('toggles filters on mobile view', () => {
  render(<AllNFTDashboard />);
  
  // Find the filter toggle button
  const toggleButton = screen.getByText(/^Filters$/i);
  expect(toggleButton).toBeInTheDocument();
  
  // Filters should initially be collapsed on mobile
  const filterBar = document.querySelector('.filter-bar');
  expect(filterBar).toHaveClass('max-h-0');
  
  // Click to expand filters
  fireEvent.click(toggleButton);
  expect(filterBar).toHaveClass('max-h-64');
  
  // Click again to collapse
  fireEvent.click(toggleButton);
  expect(filterBar).toHaveClass('max-h-0');
});

test('renders stats cards with data', () => {
  render(<AllNFTDashboard />);
  
  // Check volume card
  expect(screen.getByText(/Volume/i)).toBeInTheDocument();
  expect(screen.getByText(/2,300 \$BERA/i)).toBeInTheDocument();
  
  // Check transfers card
  expect(screen.getByText(/Transfers/i)).toBeInTheDocument();
  expect(screen.getByText(/138/i)).toBeInTheDocument();
  
  // Check trades card
  expect(screen.getByText(/Trades/i)).toBeInTheDocument();
  expect(screen.getByText(/72/i)).toBeInTheDocument();
  
  // Check holders card
  expect(screen.getByText(/Holders/i)).toBeInTheDocument();
  expect(screen.getByText(/412/i)).toBeInTheDocument();
});