import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

// Create an HTTP link
const httpLink = new HttpLink({
  uri: process.env.REACT_APP_GRAPHQL_ENDPOINT || 'https://api.studio.thegraph.com/query/88157/jpegpulse/v0.2.0',
});

// Middleware to handle errors and other operations
const authMiddleware = new ApolloLink((operation, forward) => {
  // Add custom request headers if needed
  operation.setContext({
    headers: {
      // Add any custom headers here if needed
    }
  });

  return forward(operation);
});

// Create and export the Apollo Client
export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Trade: {
        keyFields: ['id'],
      },
      Collection: {
        keyFields: ['id'],
      },
      Trader: {
        keyFields: ['id'],
      },
    },
  }),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});