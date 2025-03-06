import React, { useState, useEffect } from 'react';

function SeaportDashboard() {
  // Mock data for stats cards - will be replaced with real data in later steps
  const stats = {
    volume: '1,500 $BERA',
    trades: 45,
    traders: 28,
    avgPrice: '33.3 $BERA'
  };
  
  // Live updates panel state
  const [showLiveUpdates, setShowLiveUpdates] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState([
    { id: '123', collection: 'Bera Bees', price: '50 $BERA', timestamp: '14:27', tokenId: '1234' },
    { id: '124', collection: 'HoneyCast', price: '75 $BERA', timestamp: '14:20', tokenId: '5678' },
    { id: '125', collection: 'Berachain Pandas', price: '120 $BERA', timestamp: '14:15', tokenId: '9012' },
  ]);
  
  // Mock live updates polling
  useEffect(() => {
    // Function to simulate new trades coming in
    const updateLiveTrades = () => {
      const newTrade = {
        id: Math.floor(Math.random() * 1000).toString(),
        collection: ['Bera Bees', 'HoneyCast', 'Berachain Pandas', 'Honey Jar', 'Bera Knights'][Math.floor(Math.random() * 5)],
        price: `${Math.floor(Math.random() * 150 + 20)} $BERA`,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
        tokenId: Math.floor(Math.random() * 10000).toString()
      };
      
      setLiveUpdates(prev => {
        const updated = [newTrade, ...prev];
        // Keep only 10 most recent trades
        return updated.slice(0, 10);
      });
    };
    
    // Set up interval to poll for new trades every 5 seconds
    const interval = setInterval(updateLiveTrades, 5000);
    
    // Clean up interval on component unmount
    return () => clearInterval(interval);
  }, []);
  
  // Toggle live updates panel
  const toggleLiveUpdates = () => {
    setShowLiveUpdates(!showLiveUpdates);
  };

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
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Filters</h2>
        {/* Filter inputs will be added here in a future step */}
        <div className="flex flex-wrap gap-3">
          <div className="filter-placeholder w-40 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
            Collection Filter
          </div>
          <div className="filter-placeholder w-40 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500 dark:text-gray-400">
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
        
        {/* Live Updates Panel */}
        <div className="live-updates-container">
          <button 
            onClick={toggleLiveUpdates}
            className="flex items-center justify-between w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-t-md font-medium text-sm"
          >
            <span>Live Updates</span>
            <span className="ml-2">{showLiveUpdates ? '▼' : '▲'}</span>
          </button>
          
          {showLiveUpdates && (
            <div className="live-updates-panel bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-b-md shadow-md p-4 max-h-60 overflow-y-auto">
              <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white">Recent Trades</h3>
              <div className="space-y-2">
                {liveUpdates.map(trade => (
                  <div key={trade.id} className="trade-item p-2 border-b border-gray-100 dark:border-gray-700 text-sm">
                    <div className="flex justify-between">
                      <span className="font-medium">#{trade.id} | {trade.collection}</span>
                      <span className="text-gray-500 dark:text-gray-400">{trade.timestamp}</span>
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
          )}
        </div>
      </div>
    </div>
  );
}

export default SeaportDashboard;