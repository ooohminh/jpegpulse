import { render, screen } from '@testing-library/react';
import SeaportDashboard from './SeaportDashboard';

// Mock the Chart.js components since they use canvas which is not available in jsdom
jest.mock('react-chartjs-2', () => ({
  Line: () => <div data-testid="mocked-line-chart" />
}));

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

test('renders all four stats cards with correct values', () => {
  render(<SeaportDashboard />);
  
  // Check for all card titles
  const volumeTitle = screen.getByText(/Total Volume/i);
  const tradesTitle = screen.getByText(/Total Trades/i);
  const tradersTitle = screen.getByText(/Unique Traders/i);
  const avgPriceTitle = screen.getByText(/Average Price/i);
  
  expect(volumeTitle).toBeInTheDocument();
  expect(tradesTitle).toBeInTheDocument();
  expect(tradersTitle).toBeInTheDocument();
  expect(avgPriceTitle).toBeInTheDocument();
  
  // Check for all card values
  const volumeValue = screen.getByText(/1,500 \$BERA/i);
  const tradesValue = screen.getByText(/42/i);
  const tradersValue = screen.getByText(/24/i);
  const avgPriceValue = screen.getByText(/35.71 \$BERA/i);
  
  expect(volumeValue).toBeInTheDocument();
  expect(tradesValue).toBeInTheDocument();
  expect(tradersValue).toBeInTheDocument();
  expect(avgPriceValue).toBeInTheDocument();
  
  // Check for subtitle "Last 7 days" that should appear on all cards
  const subtitles = screen.getAllByText(/Last 7 days/i);
  expect(subtitles).toHaveLength(4);
});

test('renders the volume and trades line chart', () => {
  render(<SeaportDashboard />);
  
  // Check for chart title
  const chartTitle = screen.getByText(/Volume and Trades \(Last 7 Days\)/i);
  expect(chartTitle).toBeInTheDocument();
  
  // With our mock, we should find the mocked chart component
  const chartComponent = screen.getByTestId('mocked-line-chart');
  expect(chartComponent).toBeInTheDocument();
});