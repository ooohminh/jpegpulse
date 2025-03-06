import { gql } from '@apollo/client';

// Query for static trades data
export const GET_RECENT_TRADES = gql`
  query RecentTrades($collection: String, $trader: Bytes, $orderBy: String, $orderDirection: String, $skip: Int, $first: Int) {
    trades(
      where: { 
        collection_contains_nocase: $collection,
        offerer: $trader
      },
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      skip: $skip,
      first: $first
    ) {
      id
      collection
      tokenId
      price
      offerer
      recipient
      timestamp
    }
  }
`;

// Query for collection stats
export const GET_COLLECTIONS = gql`
  query GetCollections($orderBy: String, $orderDirection: String, $first: Int) {
    collections(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      first: $first
    ) {
      id
      name
      totalVolume
      totalTrades
      lastTradedAt
    }
  }
`;

// Query for traders stats
export const GET_TRADERS = gql`
  query GetTraders($orderBy: String, $orderDirection: String, $first: Int) {
    traders(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      first: $first
    ) {
      id
      totalVolume
      totalTrades
      lastTradeAt
    }
  }
`;

// Query for daily stats
export const GET_DAILY_STATS = gql`
  query GetDailyStats($orderBy: String, $orderDirection: String, $first: Int) {
    dailyStats(
      orderBy: $orderBy,
      orderDirection: $orderDirection,
      first: $first
    ) {
      id
      volume
      trades
      uniqueTraders
    }
  }
`;

// Live polling query for recent trades
export const GET_LIVE_TRADES = gql`
  query LiveTrades($lastTimestamp: BigInt!, $collection: String, $trader: Bytes) {
    trades(
      where: { 
        timestamp_gt: $lastTimestamp,
        collection_contains_nocase: $collection,
        offerer: $trader
      },
      orderBy: "timestamp",
      orderDirection: "desc",
      first: 10
    ) {
      id
      collection
      tokenId
      price
      offerer
      recipient
      timestamp
    }
  }
`;