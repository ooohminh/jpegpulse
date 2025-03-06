import React from 'react';

function SeaportDashboard() {
  // Mock data for stats cards - will be replaced with real data in later steps
  const stats = {
    volume: '1,500 $BERA',
    trades: 45,
    traders: 28,
    avgPrice: '33.3 $BERA'
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
      </div>
    </div>
  );
}

export default SeaportDashboard;