import React from 'react';

function AllNFTDashboard() {
  return (
    <div className="p-4">
      <header className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          All-NFT Stats Hub
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-1">
          Complete Berachain NFT activity statistics
        </p>
      </header>
      
      <div className="filter-bar bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
        <h2 className="text-lg font-semibold mb-2">Filters</h2>
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
      
      <div className="dashboard-content">
        {/* Dashboard content will be added here in future steps */}
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          All-NFT dashboard content will be added in upcoming steps
        </div>
      </div>
    </div>
  );
}

export default AllNFTDashboard;