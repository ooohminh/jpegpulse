import React from 'react';

function StatCard({ title, value, subtitle, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
      {icon && (
        <div className="mr-4 text-blue-500 dark:text-blue-400">
          {icon}
        </div>
      )}
      <div>
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</h3>
        <p className="text-2xl font-bold text-gray-800 dark:text-white">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

function SeaportDashboard() {
  // Mock data for stats cards
  const statCards = [
    {
      title: "Total Volume",
      value: "1,500 $BERA",
      subtitle: "Last 7 days",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    },
    {
      title: "Total Trades",
      value: "42",
      subtitle: "Last 7 days",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
      </svg>
    },
    {
      title: "Unique Traders",
      value: "24",
      subtitle: "Last 7 days",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    },
    {
      title: "Average Price",
      value: "35.71 $BERA",
      subtitle: "Last 7 days",
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    }
  ];

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
        {/* Stats Cards */}
        <div className="stats-cards grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statCards.map((card, index) => (
            <StatCard 
              key={index}
              title={card.title}
              value={card.value}
              subtitle={card.subtitle}
              icon={card.icon}
            />
          ))}
        </div>
        
        <div className="remaining-content">
          {/* Other content will be added in future steps */}
          <div className="text-center text-gray-500 dark:text-gray-400 py-6">
            More Seaport dashboard content will be added in upcoming steps
          </div>
        </div>
      </div>
    </div>
  );
}

export default SeaportDashboard;