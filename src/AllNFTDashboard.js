import React, { useState } from 'react';

function AllNFTDashboard() {
  // State for mobile filter drawer
  const [showFilters, setShowFilters] = useState(false);
  
  // Toggle filter drawer (mobile only)
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
          All-NFT Stats Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1 transition-colors duration-200">
          Complete Berachain NFT activity statistics
        </p>
      </header>
      
      {/* Mobile filter toggle button */}
      <div className="md:hidden mb-4">
        <button 
          onClick={toggleFilters}
          className="w-full flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 text-gray-800 dark:text-white transition-colors duration-200"
        >
          <span className="font-medium">Filters</span>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-5 w-5 transition-transform duration-200 ${showFilters ? 'transform rotate-180' : ''}`} 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      
      {/* Filters - visible on desktop, collapsible on mobile */}
      <div className={`filter-bar bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 transition-all duration-200 ${showFilters ? 'max-h-64' : 'max-h-0 md:max-h-none overflow-hidden md:overflow-visible p-0 md:p-4'}`}>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-200 hidden md:block">Filters</h2>
        {/* Filter inputs will be added here in a future step */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          <div className="filter-placeholder w-full sm:w-40 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            Collection Filter
          </div>
          <div className="filter-placeholder w-full sm:w-40 h-10 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
            Trader Filter
          </div>
        </div>
      </div>
      
      {/* Main content area - grid on larger screens */}
      <div className="dashboard-content grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left column - would contain charts */}
        <div className="lg:col-span-8 space-y-6">
          {/* Stats cards - grid layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {/* Example stat cards - will be replaced with real components */}
            <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200">Volume</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-200">2,300 $BERA</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">Last 7 days</p>
            </div>
            
            <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200">Transfers</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-200">138</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">Last 7 days</p>
            </div>
            
            <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200">Trades</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-200">72</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">Last 7 days</p>
            </div>
            
            <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
              <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 transition-colors duration-200">Holders</h3>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2 transition-colors duration-200">412</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 transition-colors duration-200">Unique addresses</p>
            </div>
          </div>
          
          {/* Charts placeholder */}
          <div className="charts bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">NFT Activity Charts</h3>
            <div className="text-center py-16 text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Charts will be added in upcoming steps
            </div>
          </div>
        </div>
        
        {/* Right column - top collections/wallets tables */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">Top Collections</h3>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Collection rankings will be added in upcoming steps
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 transition-colors duration-200">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white transition-colors duration-200">Top Traders</h3>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400 transition-colors duration-200">
              Trader rankings will be added in upcoming steps
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllNFTDashboard;