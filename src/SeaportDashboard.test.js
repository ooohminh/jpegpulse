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