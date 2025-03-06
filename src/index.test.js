import React from 'react';
import { render } from '@testing-library/react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import App from './App';

test('renders App wrapped in ApolloProvider without crashing', () => {
  // Create a mock client
  const mockClient = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    cache: new InMemoryCache()
  });

  // Render the app with the Apollo provider
  const { container } = render(
    <ApolloProvider client={mockClient}>
      <App />
    </ApolloProvider>
  );

  // Verify that the component rendered
  expect(container).toBeTruthy();
});