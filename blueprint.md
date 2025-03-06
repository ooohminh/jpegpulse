---

**Step 1: Detailed Blueprint**

**Project Recap**

- **Dashboards**: Seaport NFT Activity (with live updates) and All-NFT Stats.
- **Tech**: React, Apollo Client, Tailwind CSS, The Graph (subgraphs), Berachain mainnet.
- **Features**: Filtering, sorting, pagination, light/dark mode, mobile responsiveness, live trade notifications (5s polling).
- **Timeline**: 2 days (Day 1: Setup + Frontend skeleton; Day 2: Subgraph + Integration).

**Blueprint Steps**

1. **Setup Environment**:
    - Initialize React app, install dependencies (Apollo, Tailwind, Chart.js).
    - Set up Hardhat for Seaport contract deployment.
    - Configure The Graph CLI for subgraph.
2. **Frontend Skeleton**:
    - Create dashboard layouts (Seaport + All-NFT).
    - Add basic components (cards, charts, tables).
    - Implement light/dark mode toggle.
    - Ensure mobile responsiveness.
3. **Mock Data**:
    - Generate static mock data for both dashboards.
    - Add mock live updates for Seaport.
4. **Subgraph Development**:
    - Deploy Seaport test contract to Berachain testnet (bArtio).
    - Create subgraph for Seaport (OrderFulfilled) and NFT (Transfer) events.
    - Simulate trades/transfers for testing.
5. **Data Integration**:
    - Connect frontend to subgraph with Apollo Client (static queries).
    - Implement live polling for Seaport updates.
6. **Filtering, Sorting, Pagination**:
    - Add filter inputs (collection, trader).
    - Implement sorting (price, timestamp, volume).
    - Add pagination to tables.
7. **Polish & Test**:
    - Add export CSV, tooltips, spinners.
    - Test UI, subgraph, and integration.
    - Deploy to Vercel.

---

**Step 2: Break into Iterative Chunks**

**Chunk 1: Environment & Skeleton**

- Setup tools, basic React app, dashboard layouts.

**Chunk 2: Core UI Components**

- Add stats cards, charts, tables, light/dark mode, mobile responsiveness.

**Chunk 3: Mock Data Integration**

- Mock static data for dashboards, mock live updates.

**Chunk 4: Subgraph Setup**

- Deploy Seaport contract, create and deploy subgraph.

**Chunk 5: Live Data Integration**

- Connect static queries, implement live polling.

**Chunk 6: Interactive Features**

- Filters, sorting, pagination across dashboards.

**Chunk 7: Final Touches**

- Export, tooltips, spinners, testing, deployment.

---

**Step 3: Refine Chunks into Small Steps (First Pass)**

- **Chunk 1**:
    1. Initialize React app with Tailwind.
    2. Install Apollo, Chart.js, Hardhat, Graph CLI.
    3. Create Seaport dashboard layout.
    4. Create All-NFT dashboard layout.
- **Chunk 2**:
    1. Add stats cards (Seaport).
    2. Add charts (Seaport).
    3. Add table (Seaport).
    4. Add stats cards (All-NFT).
    5. Add charts (All-NFT).
    6. Add table (All-NFT).
    7. Implement light/dark toggle.
    8. Add mobile responsiveness.
- **Chunk 3**:
    1. Mock Seaport static data.
    2. Mock All-NFT static data.
    3. Mock Seaport live updates.
- **Chunk 4**:
    1. Deploy Seaport contract (testnet).
    2. Init Seaport subgraph.
    3. Init NFT subgraph.
    4. Simulate trades/transfers.
- **Chunk 5**:
    1. Connect Seaport static queries.
    2. Connect All-NFT static queries.
    3. Add live polling for Seaport.
- **Chunk 6**:
    1. Add filters (Seaport).
    2. Add filters (All-NFT).
    3. Add sorting (Seaport).
    4. Add sorting (All-NFT).
    5. Add pagination (Seaport).
    6. Add pagination (All-NFT).
- **Chunk 7**:
    1. Add export CSV.
    2. Add tooltips.
    3. Add spinners.
    4. Run tests (unit, integration).
    5. Deploy to Vercel.

---

**Step 4: Review & Refine Steps (Second Pass)**

**Feedback**: Steps are decent but still a bit chunky—e.g., “Add charts (Seaport)” covers multiple components (line chart, bar chart, gauge). Let’s break them down further for TDD safety while keeping momentum. Each step should be ~1–2 hours, testable, and build incrementally.

**Refined Steps**

1. **Setup Environment**:
    - 1.1: Init React app with Tailwind.
    - 1.2: Install Apollo Client and Chart.js.
    - 1.3: Install Hardhat and Graph CLI.
    - 1.4: Create Seaport dashboard shell (header, filter bar).
    - 1.5: Create All-NFT dashboard shell (header, filter bar).
2. **Core UI Components**:
    - 2.1: Add Seaport stats cards.
    - 2.2: Add Seaport line chart (volume + trades).
    - 2.3: Add Seaport bar chart (top collections).
    - 2.4: Add Seaport gauge (trade velocity).
    - 2.5: Add Seaport trades table.
    - 2.6: Add All-NFT stats cards.
    - 2.7: Add All-NFT area chart (volume, transfers, trades).
    - 2.8: Add All-NFT bar chart (top collections).
    - 2.9: Add All-NFT heatmap (velocity).
    - 2.10: Add All-NFT wallets table.
    - 2.11: Add light/dark mode toggle.
    - 2.12: Add mobile breakpoints (stacked layout).
3. **Mock Data**:
    - 3.1: Mock Seaport static trades (10 entries).
    - 3.2: Mock All-NFT static transfers (20 entries).
    - 3.3: Mock Seaport live updates (5 trades polling).
4. **Subgraph Setup**:
    - 4.1: Deploy Seaport contract to bArtio testnet.
    - 4.2: Create Seaport subgraph (schema + mapping).
    - 4.3: Create NFT subgraph (schema + mapping).
    - 4.4: Deploy subgraphs to The Graph Studio.
    - 4.5: Simulate 5 Seaport trades + 10 NFT transfers.
5. **Data Integration**:
    - 5.1: Connect Seaport static queries (Apollo).
    - 5.2: Connect All-NFT static queries (Apollo).
    - 5.3: Implement Seaport live polling (5s interval).
6. **Interactive Features**:
    - 6.1: Add Seaport collection filter.
    - 6.2: Add Seaport trader filter.
    - 6.3: Add All-NFT collection filter.
    - 6.4: Add All-NFT trader filter.
    - 6.5: Add Seaport table sorting (price, timestamp).
    - 6.6: Add All-NFT table sorting (volume, timestamp).
    - 6.7: Add Seaport table pagination (10/page).
    - 6.8: Add All-NFT table pagination (10/page).
7. **Final Touches**:
    - 7.1: Add export CSV (Seaport trades).
    - 7.2: Add export CSV (All-NFT wallets).
    - 7.3: Add tooltips to Seaport stats/charts.
    - 7.4: Add tooltips to All-NFT stats/charts.
    - 7.5: Add loading spinners (initial + polling).
    - 7.6: Run unit + integration tests.
    - 7.7: Deploy to Vercel.

---

**Step 5: Final Review & Validation**

- **Size Check**: Each step is ~1–2 hours—small enough for TDD (write test, implement, verify), big enough to see progress (e.g., a chart or filter added).
- **Testing**: Every step has a clear test—e.g., “Cards render 4 stats,” “Polling adds 5 trades.”
- **Incremental**: Builds linearly—no jumps (e.g., mock data before live queries).
- **No Orphans**: Each step integrates into the app—e.g., live panel uses existing subgraph.

**Verdict**: Steps are right-sized—safe, testable, and move the needle. Ready for prompts!

---

**Step 6: Prompts for Code-Generation LLM**

**Prompt Guidelines**

- **TDD**: Start with a test, then implement, verify integration.
- **Incremental**: Build on prior steps—e.g., Step 1.2 uses 1.1’s app.
- **Best Practices**: Modular components, error handling, clean code.

**Prompt 1: Initialize React App with Tailwind**

```
Build a React app with Tailwind CSS for the Berachain NFT Dashboards project. Use create-react-app, install Tailwind, and set up a basic App component with a header ("Berachain NFT Dashboards"). Write a test to ensure the header renders. Output files: src/App.js, src/App.test.js, tailwind.config.js.
```

**Prompt 2: Install Apollo Client and Chart.js**

```
Add Apollo Client and Chart.js to the React app from Step 1. Update package.json with dependencies (@apollo/client, graphql, chart.js, react-chartjs-2). Wrap App in ApolloProvider with a mock client (uri: "http://localhost"). Test that ApolloProvider renders without crashing. Update src/index.js and src/index.test.js.
```

**Prompt 3: Install Hardhat and Graph CLI**

```
Set up Hardhat and The Graph CLI for the project. Create a Hardhat project in a /hardhat folder with hardhat.config.js (network: berachain testnet, rpc: "rpc.berachain.com"). Install @graphprotocol/graph-cli globally (mock install command). Test Hardhat config by running `npx hardhat compile` (mock success). Output: hardhat.config.js.
```

**Prompt 4: Create Seaport Dashboard Shell**

```
Add a Seaport dashboard shell to the React app from Step 2. Create a SeaportDashboard component with a header ("Seaport NFT Activity") and a filter bar (empty div). Route it at "/seaport" using react-router-dom. Test that the header renders. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js, src/App.js (updated with routing).
```

**Prompt 5: Create All-NFT Dashboard Shell**

```
Add an All-NFT dashboard shell to the app from Step 4. Create an AllNFTDashboard component with a header ("All-NFT Stats Hub") and a filter bar (empty div). Route it at "/all-nft" using react-router-dom. Test that the header renders. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js, src/App.js (updated).
```

**Prompt 6: Add Seaport Stats Cards**

```
In SeaportDashboard from Step 4, add 4 stats cards (Volume, Trades, Traders, Avg Price) with Tailwind styling (bg-white, rounded, p-4). Use mock data (e.g., "1,500 $BERA"). Test that all 4 cards render with correct text. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 7: Add Seaport Line Chart**

```
Add a line chart to SeaportDashboard from Step 6 using Chart.js. Show mock Volume ($BERA) and Trades over 7 days (Feb 27–March 5). Style with Tailwind (w-full, h-64). Test that chart renders with 2 datasets. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 8: Add Seaport Bar Chart**

```
Add a bar chart to SeaportDashboard from Step 7 for top 5 collections (mock data: "Bera Bees: 700 $BERA"). Use Chart.js, Tailwind (w-full, h-64). Test that 5 bars render. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 9: Add Seaport Gauge**

```
Add a gauge to SeaportDashboard from Step 8 for trade velocity (mock: 5 trades/h vs. 3/h avg). Use Chart.js (doughnut chart), Tailwind (w-32 h-32). Test gauge renders with correct value. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 10: Add Seaport Trades Table**

```
Add a table to SeaportDashboard from Step 9 for recent trades (mock: 10 entries, tokenId, collection, price, buyer, seller, timestamp). Use Tailwind (border-collapse, odd:bg-gray-50). Test table renders 10 rows. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 11: Add All-NFT Stats Cards**

```
In AllNFTDashboard from Step 5, add 5 stats cards (Volume, Transfers, Trades, Holders, Floor Spread) with mock data (e.g., "2,300 $BERA"). Use Tailwind (bg-white, p-4). Test all 5 cards render. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 12: Add All-NFT Area Chart**

```
Add an area chart to AllNFTDashboard from Step 11 for Volume, Transfers, Trades (mock data, 7 days). Use Chart.js, Tailwind (w-full, h-64). Test chart renders 3 stacked datasets. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 13: Add All-NFT Bar Chart**

```
Add a horizontal bar chart to AllNFTDashboard from Step 12 for top 10 collections (mock: "HoneyCast: 900 $BERA"). Use Chart.js, Tailwind (w-full, h-64). Test 10 bars render. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 14: Add All-NFT Heatmap**

```
Add a heatmap to AllNFTDashboard from Step 13 for NFT velocity (mock: 7x24 grid, trades + transfers/hour). Use Chart.js (custom), Tailwind (w-full, h-64). Test heatmap renders grid. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 15: Add All-NFT Wallets Table**

```
Add a table to AllNFTDashboard from Step 14 for top 10 wallets (mock: wallet, volume, trades, transfers, net flow). Use Tailwind (border-collapse, odd:bg-gray-50). Test table renders 10 rows. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 16: Add Light/Dark Mode Toggle**

```
Add a light/dark mode toggle to the app from Step 15. Place button in App header (top-right, "Light/Dark"), use Tailwind (bg-white/dark:bg-gray-800, text-black/dark:text-white), persist in localStorage. Test toggle switches modes. Output: src/App.js, src/App.test.js (updated).
```

**Prompt 17: Add Mobile Responsiveness**

```
Make the app from Step 16 mobile-responsive. Use Tailwind breakpoints (<640px: stack sections, collapse filters into dropdown). Test layout stacks on mobile. Output: src/SeaportDashboard.js, src/AllNFTDashboard.js, src/App.js (updated with tests).
```

**Prompt 18: Mock Seaport Static Trades**

```
Add mock static trade data (10 entries) to SeaportDashboard from Step 17. Include tokenId, collection, price, offerer, recipient, timestamp. Test data renders in cards, charts, table. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 19: Mock All-NFT Static Transfers**

```
Add mock static transfer data (20 entries) to AllNFTDashboard from Step 17. Include collection, tokenId, from, to, timestamp. Test data renders in cards, charts, table. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 20: Mock Seaport Live Updates**

```
Add mock live updates to SeaportDashboard from Step 18. Simulate 5 trades polling every 5s (tokenId, collection, price, timestamp). Add toggleable panel (Tailwind: fixed bottom-0 right-0). Test panel updates and toggles. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 21: Deploy Seaport Contract**

```
In the Hardhat project from Step 3, deploy Seaport contract to Berachain bArtio testnet (rpc: "rpc.berachain.com"). Use Seaport ABI from github.com/ProjectOpenSea/seaport. Test deployment succeeds, output address (e.g., "0xbera...123"). Output: hardhat/scripts/deploy.js.
```

**Prompt 22: Create Seaport Subgraph**

```
Create a Seaport subgraph for the contract from Step 21. Define schema (Trade entity: id, collection, tokenId, price, offerer, recipient, timestamp), map `OrderFulfilled`. Test mapping with mock event. Output: subgraph/schema.graphql, subgraph/src/mapping.ts, subgraph/subgraph.yaml.
```

**Prompt 23: Create NFT Subgraph**

```
Create an NFT subgraph for Berachain NFT contracts. Define schema (Transfer entity: id, collection, tokenId, from, to, timestamp), map `Transfer`. Test mapping with mock event. Output: subgraph/schema.graphql, subgraph/src/mapping.ts, subgraph/subgraph.yaml (updated).
```

**Prompt 24: Deploy Subgraphs**

```
Deploy Seaport and NFT subgraphs from Steps 22–23 to The Graph Studio (berachain-nft). Use `graph deploy --studio`. Test deployment succeeds with mock query. Output: subgraph deployment confirmation.
```

**Prompt 25: Simulate Trades/Transfers**

```
In Hardhat from Step 21, simulate 5 Seaport trades and 10 NFT transfers on bArtio testnet. Use deployed contract (`0xbera...123`) and mock NFT contracts. Test events emit. Output: hardhat/scripts/simulate.js.
```

**Prompt 26: Connect Seaport Static Queries**

```
Connect SeaportDashboard from Step 20 to the subgraph from Step 24. Use Apollo Client to query `trades` (static, 5-min refresh). Replace mock data in cards, charts, table. Test data renders. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 27: Connect All-NFT Static Queries**

```
Connect AllNFTDashboard from Step 19 to the subgraph from Step 24. Use Apollo Client to query `transfers` (static, 5-min refresh). Replace mock data in cards, charts, table. Test data renders. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 28: Implement Seaport Live Polling**

```
Update SeaportDashboard from Step 26 with live polling (5s interval) for `trades` (timestamp_gt: lastTimestamp). Replace mock live updates in panel. Test panel updates every 5s. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 29: Add Seaport Collection Filter**

```
Add a collection filter to SeaportDashboard from Step 28. Use dropdown (mock collections: "Bera Bees", "HoneyCast"), update static + live queries. Test filter narrows data. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 30: Add Seaport Trader Filter**

```
Add a trader filter to SeaportDashboard from Step 29. Use input field (e.g., "0xabc...123"), update static + live queries. Test filter narrows data. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 31: Add All-NFT Collection Filter**

```
Add a collection filter to AllNFTDashboard from Step 27. Use dropdown, update queries. Test filter narrows data. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 32: Add All-NFT Trader Filter**

```
Add a trader filter to AllNFTDashboard from Step 31. Use input field, update queries. Test filter narrows data. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 33: Add Seaport Table Sorting**

```
Add sorting to Seaport trades table from Step 30 (price, timestamp, asc/desc). Update query with `orderBy`, `orderDirection`. Test sorting works. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 34: Add All-NFT Table Sorting**

```
Add sorting to All-NFT wallets table from Step 32 (volume, timestamp, asc/desc). Update query with `orderBy`. Test sorting works. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 35: Add Seaport Table Pagination**

```
Add pagination to Seaport trades table from Step 33 (10/page, Next/Prev buttons). Update query with `first`, `skip`. Test pagination advances. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 36: Add All-NFT Table Pagination**

```
Add pagination to All-NFT wallets table from Step 34 (10/page, Next/Prev buttons). Update query with `first`, `skip`. Test pagination advances. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 37: Add Seaport Export CSV**

```
Add "Download CSV" button to SeaportDashboard from Step 35. Export filtered trades (tokenId, collection, price, buyer, seller, timestamp). Test CSV downloads correctly. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 38: Add All-NFT Export CSV**

```
Add "Download CSV" button to AllNFTDashboard from Step 36. Export filtered wallets (wallet, volume, trades, transfers, net flow). Test CSV downloads correctly. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 39: Add Seaport Tooltips**

```
Add tooltips to SeaportDashboard from Step 37 (stats: "Sum of prices", charts: exact values). Use Tailwind (tooltip class). Test tooltips appear on hover. Output: src/SeaportDashboard.js, src/SeaportDashboard.test.js (updated).
```

**Prompt 40: Add All-NFT Tooltips**

```
Add tooltips to AllNFTDashboard from Step 38 (stats: "Count of transfers", charts: exact values). Use Tailwind. Test tooltips appear on hover. Output: src/AllNFTDashboard.js, src/AllNFTDashboard.test.js (updated).
```

**Prompt 41: Add Loading Spinners**

```
Add spinners to SeaportDashboard and AllNFTDashboard from Steps 39–40 (initial load + polling, Tailwind: animate-spin h-5 w-5). Test spinners show/hide. Output: src/SeaportDashboard.js, src/AllNFTDashboard.js, tests updated.
```

**Prompt 42: Run Tests & Deploy**

```
Run unit and integration tests for the app from Step 41 (Jest, graph test). Deploy to Vercel (`vercel --prod`). Test deployment loads both dashboards. Output: test results, Vercel URL.
```

---

**Final Notes**

- **Flow**: Each prompt builds on the last—e.g., Prompt 6 uses Prompt 4’s shell, Prompt 28 integrates Prompt 26’s queries.
- **TDD**: Tests first, then code—ensures stability.
- **No Orphans**: Every step wires into the app—no loose ends.