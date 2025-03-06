import { render, screen } from '@testing-library/react';
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