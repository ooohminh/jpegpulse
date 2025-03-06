import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Berachain NFT Dashboards header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Berachain NFT Dashboards/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  render(<App />);
  const homeLink = screen.getByText(/Home/i);
  const seaportLink = screen.getByText(/Seaport/i);
  const allNftLink = screen.getByText(/All-NFT/i);
  
  expect(homeLink).toBeInTheDocument();
  expect(seaportLink).toBeInTheDocument();
  expect(allNftLink).toBeInTheDocument();
});