import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Berachain NFT Dashboards header', () => {
  render(<App />);
  const headerElement = screen.getByText(/Berachain NFT Dashboards/i);
  expect(headerElement).toBeInTheDocument();
});