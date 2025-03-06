**Overview**

Two dashboards for Berachain’s mainnet:

1. **Seaport NFT Activity**: Seaport trades with live updates.
2. **All-NFT Stats**: All Berachain NFT activity stats.

**Objectives**

- Deliver clean, actionable NFT analytics with real-time Seaport trade notifications.
- Build in 2 days (March 5–6, 2025).

**Scope**

- On-chain only, 7-day default timeframe, live updates poll every 5s.

---

**Requirements**

**Functional Requirements**

**General**

- **F1**: Dashboards load in <5s; live updates in <7s; UI is clean/basic—minimalist with clear typography/spacing.
- **F2**: Filters (collection, trader), sorting, pagination apply dynamically, with consistent component styling.
- **F3**: Static data updates every 5 mins; live updates poll every 5s.
- **F4**: Fully responsive UI (desktop + mobile), mobile-first design.
- **F19**: Organized components/styles:
    - Buttons: px-4 py-2 rounded-md hover:bg-gray-200.
    - Tables: Fixed headers, odd:bg-gray-50.
    - Charts: Unified colors (e.g., blue/orange/green).
- **F20**: Light/dark mode toggle:
    - Top-right button/icon, persists in localStorage, defaults to system preference.
    - Light: bg-white text-black; Dark: bg-gray-800 text-white.
- **F21**: Mobile responsiveness:
    - <640px: Stacked layout, text-sm, filters in dropdown.
    - *1024px: Sidebar layout, grid stats.*
- **F22**: Export Data Button:
    - “Download CSV” per dashboard, exports filtered stats.
- **F23**: Tooltips:
    - Hover stats/charts for details (e.g., “Volume: Sum of prices”).
- **F24**: Loading Spinners:
    - animate-spin h-5 w-5 text-blue-500 during load/polling.

**Dashboard 1: Seaport NFT Activity**

- **F5**: Stats: Volume, Trades, Traders, Avg Price.
- **F6**: Line chart: Volume + Trades.
- **F7**: Bar chart: Top 5 collections.
- **F8**: Table: Recent 10 trades.
- **F9**: Gauge: Trade velocity.
- **F10**: Live Updates:
    - New trades every 5s—e.g., “#123 | Bera Bees | 50 $BERA | 14:27.”
    - Below sidebar, max 10, toggleable, filterable.

**Dashboard 2: All-NFT Stats**

- **F11**: Stats: Volume, Transfers, Trades, Holders, Floor Spread.
- **F12**: Area chart: Volume, Transfers, Trades.
- **F13**: Bar chart: Top 10 collections.
- **F14**: Table: Top 10 wallets.
- **F15**: Pie chart: Trade vs. Transfer ratio.
- **F16**: Heatmap: NFT velocity.

**Filtering, Sorting, Pagination**

- **F17**: Filter by collection/trader across all stats + live updates.
- **F18**: Sort by price, timestamp, volume.
- **F19**: Paginate tables (10 items/page).

**Non-Functional Requirements**

- **N1**: Subgraphs on The Graph Hosted Service.
- **N2**: Handle 1,000 trades/transfers + 10 live events/min.
- **N3**: Open-source (React, Apollo, Chart.js, Tailwind).
- **N4**: 99% uptime for queries.
- **N5**: Live updates <10KB/update.

---

**Architecture**

```
[Frontend: React + Apollo Client] <--> [Subgraph: The Graph Hosted Service] <--> [Berachain Mainnet RPC]
   |--> [Live Updates: Polling Query every 5s]
```

- **Frontend**: React + Apollo (static + polling), Tailwind for UI.
- **Subgraph**: The Graph CLI, GraphQL, AssemblyScript.
- **Deployment**: Vercel (frontend), The Graph Studio (subgraph).

**Data Flow**

1. Subgraph syncs events (~2s/block).
2. Static queries every 5 mins (cached).
3. Live updates poll every 5s (uncached).

---

**Data Handling**

**Data Sources**

- **Seaport**: 0xbera...123 (test deploy).
    - OrderFulfilled(bytes32, address, address, address, SpentItem[], ReceivedItem[]).
- **All-NFT**: NFT contracts (e.g., 0xbee...789)—Transfer(address, address, uint256).

**Subgraph Schema**

graphql

```graphql
type Trade @entity {
  id: ID!
  collection: String!
  tokenId: BigInt!
  price: BigDecimal!
  offerer: Bytes!
  recipient: Bytes!
  timestamp: BigInt!
}

type Transfer @entity {
  id: ID!
  collection: String!
  tokenId: BigInt!
  from: Bytes!
  to: Bytes!
  timestamp: BigInt!
}
```

**Subgraph Mapping**

- **Seaport**: Maps OrderFulfilled to Trade.
- **All-NFT**: Maps Transfer to TransferEntity.

**Subgraph Config (subgraph.yaml)**

yaml

```yaml
specVersion: 0.0.5
schema:
  file: ./schema.graphql
dataSources:
  - kind: ethereum
    name: Seaport
    network: berachain
    source:
      address: "0xbera...123"
      abi: Seaport
      startBlock: 1000000
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Trade
      abis:
        - name: Seaport
          file: ./abis/Seaport.json
      eventHandlers:
        - event: OrderFulfilled(bytes32,address,address,address,(uint8,address,uint256,uint256)[],(uint8,address,uint256,uint256)[])
          handler: handleOrderFulfilled
      file: ./src/mapping.ts
  - kind: ethereum
    name: NFT
    network: berachain
    source:
      abi: NFT
      startBlock: 1000000
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Transfer
      abis:
        - name: NFT
          file: ./abis/ERC721.json
      eventHandlers:
        - event: Transfer(address,address,uint256)
          handler: handleTransfer
      file: ./src/mapping.ts
templates:
  - name: NFT
    kind: ethereum/contract
    network: berachain
    source:
      abi: NFT
    mapping:
      kind: ethereum/events
      apiVersion: 0.0.7
      language: wasm/assemblyscript
      entities:
        - Transfer
      abis:
        - name: NFT
          file: ./abis/ERC721.json
      eventHandlers:
        - event: Transfer(address,address,uint256)
          handler: handleTransfer
      file: ./src/mapping.ts
```

**Frontend Queries**

- **Live Updates**:

graphql

```graphql
query LiveSeaportTrades($lastTimestamp: BigInt!, $collection: String, $trader: Bytes) {
  trades(
    where: { timestamp_gt: $lastTimestamp, collection: $collection, offerer: $trader },
    orderBy: timestamp,
    orderDirection: desc,
    first: 10
  ) {
    tokenId
    collection
    price
    offerer
    recipient
    timestamp
  }
}
```

- Poll: 5s (pollInterval: 5000).
- **Static (Recent Trades)**:

graphql

```graphql
query SeaportTrades($collection: String, $trader: Bytes, $orderBy: String, $direction: String, $page: Int) {
  trades(
    where: { collection: $collection, offerer: $trader },
    orderBy: $orderBy,
    orderDirection: $direction,
    first: 10,
    skip: $page
  ) {
    tokenId
    collection
    price
    offerer
    recipient
    timestamp
  }
}
```

**Data Processing**

- **Live Updates**: Poll, append trades (max 10), apply filters, toggle off clears.
- **Static**: Aggregates in frontend, cached by Apollo.

---

**Error Handling**

- **Subgraph**:
    - No events: “No trades yet” (static), “No recent trades” (live).
    - Sync lag: “Last updated X mins ago” (static), “Live delayed” (live).
- **Frontend**:
    - Query fail: “Retry in 10s” (static), “Live paused” (live).
    - Empty live: “No trades in 5s.”
- **Fallback**: Mock 10 trades + 5 live updates if subgraph fails.

---

**Testing Plan**

- **Unit**:
    - Subgraph: Test mappings with mock events.
    - Frontend: Test filters, sort, live toggle (Jest).
- **Integration**:
    - Subgraph: Simulate 10 trades, query static + live.
    - Frontend: Poll mock subgraph, verify updates.
- **Manual**:
    - Filters: “Bera Bees” syncs across stats + live.
    - UI: Toggle light/dark, check mobile stacking.
    - Export: CSV matches filtered trades.
- **Performance**: 1,000 trades + 10 live/min—<5s load, <1s live.

---

**Implementation Steps**

1. **Day 1 (March 5)**:
    - Deploy Seaport (0xbera...123)—npx hardhat deploy --network berachain.
    - Subgraph: graph init, deploy (graph deploy --studio berachain-nft).
    - React: Scaffold with Tailwind, mock data, add filters/sort/pagination, live panel, light/dark toggle.
2. **Day 2 (March 6)**:
    - Simulate trades/transfers (Hardhat).
    - Hook Apollo: Static (5 mins), live (5s polling).
    - Polish: Mobile layout, tooltips, export, demo “March 5: 75 $BERA live!”

---

**Deliverables**

- **Subgraph**: berachain-nft on The Graph Studio.
- **Frontend**: Vercel (berachain-nft-dash.vercel.app).
- **Docs**: README with setup, queries, demo video.

---

**Developer Notes**

- **Tailwind**: bg-gray-800 dark:bg-white text-white dark:text-black for modes.
- **Mobile**: @media (max-width: 640px) { .filters { flex-direction: column; } }.
- **Claude**: “Build this React app with Tailwind, Apollo, and live polling—here’s the spec.”