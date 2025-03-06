import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock localStorage for theme toggle tests
const localStorageMock = (function() {
  let store = {};
  return {
    getItem: function(key) {
      return store[key] || null;
    },
    setItem: function(key, value) {
      store[key] = value.toString();
    },
    clear: function() {
      store = {};
    }
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Helper function to render App with Router
const renderWithRouter = () => {
  return render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

test('renders Berachain NFT Dashboards header', () => {
  renderWithRouter();
  const headerElement = screen.getByText(/Berachain NFT Dashboards/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders navigation links', () => {
  renderWithRouter();
  const homeLink = screen.getByText(/Home/i);
  const seaportLink = screen.getByText(/Seaport/i);
  const allNftLink = screen.getByText(/All-NFT/i);
  
  expect(homeLink).toBeInTheDocument();
  expect(seaportLink).toBeInTheDocument();
  expect(allNftLink).toBeInTheDocument();
});

test('toggles between light and dark mode', () => {
  renderWithRouter();
  
  // Find the theme toggle button
  const themeToggle = screen.getByLabelText(/Toggle theme/i);
  expect(themeToggle).toBeInTheDocument();
  
  // Check that theme starts with user preference or light mode by default
  const initialHtmlClass = document.documentElement.classList.contains('dark');
  
  // Toggle the theme
  fireEvent.click(themeToggle);
  
  // Check that theme has changed
  expect(document.documentElement.classList.contains('dark')).toBe(!initialHtmlClass);
  
  // Toggle again
  fireEvent.click(themeToggle);
  
  // Should be back to original
  expect(document.documentElement.classList.contains('dark')).toBe(initialHtmlClass);
});