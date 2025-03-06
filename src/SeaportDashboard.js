import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECENT_TRADES, GET_LIVE_TRADES } from './apollo/queries';

function SeaportDashboard() {
  // Filter state
  const [collectionFilter, setCollectionFilter] = useState('');
  const [traderFilter, setTraderFilter] = useState(null);
  
  // Stats state - will be calculated from query data in a real implementation
  const [stats, setStats] = useState({
    volume: '1,500 $BERA',
    trades: 45,
    traders: 28,
    avgPrice: '33.3 $BERA'
  });
  
  // Live updates panel state
  const [showLiveUpdates, setShowLiveUpdates] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(
    Math.floor(Date.now() / 1000).toString() // Current time in seconds
  );
  
  // Query for recent trades (static data)
  const { loading: loadingTrades, error: tradesError, data: tradesData } = useQuery(
    GET_RECENT_TRADES,
    {
      variables: {
        collection: collectionFilter,
        trader: traderFilter,
        orderBy: "timestamp",
        orderDirection: "desc",
        skip: 0,
        first: 10
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );
  
  // Query for live trades updates with polling
  const { loading: loadingLive, error: liveError, data: liveData } = useQuery(
    GET_LIVE_TRADES,
    {
      variables: {
        lastTimestamp,
        collection: collectionFilter,
        trader: traderFilter
      },
      pollInterval: 5000, // Poll every 5 seconds
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );
  
  // Update liveUpdates state when new live data comes in
  useEffect(() => {
    if (liveData && liveData.trades && liveData.trades.length > 0) {
      // Find the most recent timestamp
      const newLastTimestamp = liveData.trades.reduce(
        (maxTs, trade) => Math.max(maxTs, parseInt(trade.timestamp)),
        parseInt(lastTimestamp)
      ).toString();
      
      // Update the lastTimestamp for the next polling cycle
      if (newLastTimestamp > lastTimestamp) {
        setLastTimestamp(newLastTimestamp);
      }
      
      // Format the new trades
      const newTrades = liveData.trades.map(trade => ({
        id: trade.id,
        collection: trade.collection,
        price: `${parseFloat(trade.price).toFixed(2)} $BERA`,
        timestamp: new Date(parseInt(trade.timestamp) * 1000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit'
        }),
        tokenId: trade.tokenId,
        offerer: trade.offerer,
        recipient: trade.recipient
      }));
      
      // Add new trades to the beginning of the list
      setLiveUpdates(prev => {
        const updatedTrades = [...newTrades, ...prev];
        // Keep only the 10 most recent trades
        return updatedTrades.slice(0, 10);
      });
    }
  }, [liveData, lastTimestamp]);
  
  // Initialize liveUpdates with static data on first load
  useEffect(() => {
    if (tradesData && tradesData.trades && liveUpdates.length === 0) {
      const initialTrades = tradesData.trades.map(trade => ({
        id: trade.id,
        collection: trade.collection,
        price: `${parseFloat(trade.price).toFixed(2)} $BERA`,
        timestamp: new Date(parseInt(trade.timestamp) * 1000).toLocaleTimeString('en-US', { 
          hour: '2-digit', 
          minute: '2-digit'
        }),
        tokenId: trade.tokenId,
        offerer: trade.offerer,
        recipient: trade.recipient
      }));
      
      setLiveUpdates(initialTrades);
    }
  }, [tradesData, liveUpdates.length]);
  
  // Toggle live updates panel
  const toggleLiveUpdates = () => {
    setShowLiveUpdates(!showLiveUpdates);
  };
  
  // Show mock data when queries are loading or errored
  useEffect(() => {
    if ((loadingTrades || tradesError) && liveUpdates.length === 0) {
      setLiveUpdates([
        { id: '123', collection: 'Bera Bees', price: '50 $BERA', timestamp: '14:27', tokenId: '1234' },
        { id: '124', collection: 'HoneyCast', price: '75 $BERA', timestamp: '14:20', tokenId: '5678' },
        { id: '125', collection: 'Berachain Pandas', price: '120 $BERA', timestamp: '14:15', tokenId: '9012' },
      ]);
    }
  }, [loadingTrades, tradesError, liveUpdates.length]);

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Seaport NFT Activity
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Real-time Seaport trades with live updates
        </p>
      </header>
      
      <div className="filter-bar bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <div className="flex justify-between items-center md:hidden mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h2>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white hidden md:block">Filters</h2>
        {/* Filter inputs will be added here in a future step */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <div className="filter-placeholder w-full sm:w-40 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Collection Filter
          </div>
          <div className="filter-placeholder w-full sm:w-40 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Trader Filter
          </div>
        </div>
      </div>
      
      <div className="dashboard-content space-y-6">
        {/* Stats Cards */}
        <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Volume Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Volume</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.volume}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
          </div>
          
          {/* Trades Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Trades</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.trades}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
          </div>
          
          {/* Traders Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Traders</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.traders}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unique addresses</p>
          </div>
          
          {/* Avg Price Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Avg Price</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.avgPrice}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Per NFT</p>
          </div>
        </div>
        
        {/* Placeholder for charts and tables that will be added in upcoming steps */}
        <div className="charts-and-tables text-center text-gray-500 dark:text-gray-400 py-8 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          Charts and tables will be added in upcoming steps
        </div>
        
        {/* Live Updates Panel - Fixed position on mobile, sidebar on desktop */}
        <div className={`live-updates-container transition-all duration-300 md:w-72 md:pr-2
          ${showLiveUpdates ? 
            'fixed bottom-0 left-0 right-0 md:fixed md:top-20 md:right-auto md:bottom-0 md:left-auto md:translate-x-0 z-10' :
            'fixed bottom-0 left-0 right-0 md:fixed md:top-20 md:right-auto md:bottom-0 md:left-0 md:-translate-x-full z-10'
          }
        `}>
          <button 
            onClick={toggleLiveUpdates}
            className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-t-md font-medium text-sm md:hidden"
          >
            <span>Live Updates</span>
            <span className="ml-2">{showLiveUpdates ? '▼' : '▲'}</span>
          </button>
          
          <div className={`
            live-updates-panel bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 
            shadow-md p-4 overflow-y-auto transition-all duration-300
            ${showLiveUpdates ? 'max-h-60 md:max-h-[calc(100vh-20rem)]' : 'max-h-0 md:max-h-0 overflow-hidden p-0 md:rounded-none'}
            rounded-b-md md:rounded-r-md md:rounded-bl-none
          `}>
            <div className="hidden md:flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Live Updates</h3>
              <button 
                onClick={toggleLiveUpdates} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.707 4.293a1 1 0 010 1.414L8.414 13H10a1 1 0 110 2H6a1 1 0 01-1-1v-4a1 1 0 112 0v1.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white md:hidden">Recent Trades</h3>
            
            {/* Loading indicator */}
            {loadingLive && (
              <div className="flex justify-center items-center py-2">
                <div className="animate-spin h-5 w-5 text-blue-500 rounded-full border-2 border-t-transparent border-blue-500"></div>
                <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">Polling for new trades...</span>
              </div>
            )}
            
            {/* Error display */}
            {liveError && (
              <div className="text-center text-red-500 dark:text-red-400 py-2">
                Error loading live updates. Retrying...
              </div>
            )}
            
            {/* Trades list */}
            <div className="space-y-2">
              {liveUpdates.map(trade => (
                <div key={trade.id} className="trade-item p-2 border-b border-gray-100 dark:border-gray-700 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium truncate max-w-[150px]">#{trade.id} | {trade.collection}</span>
                    <span className="text-gray-500 dark:text-gray-400 ml-2">{trade.timestamp}</span>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400">
                    {trade.price} | TokenID: {trade.tokenId}
                  </div>
                </div>
              ))}
              {liveUpdates.length === 0 && (
                <div className="text-center text-gray-500 dark:text-gray-400 py-4">
                  No trades in last 5s
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Toggle button for desktop view - fixed to right edge */}
        <div className={`hidden md:block fixed top-32 right-0 z-20 ${showLiveUpdates ? 'md:right-72' : 'md:right-0'}`}>
          <button 
            onClick={toggleLiveUpdates}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-l-md shadow-md transition-all duration-200"
            aria-label="Toggle live updates"
          >
            {showLiveUpdates ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default SeaportDashboard;