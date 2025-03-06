import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECENT_TRADES, GET_LIVE_TRADES, GET_DAILY_STATS, GET_COLLECTIONS } from './apollo/queries';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';

// Register the Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

function SeaportDashboard() {
  // Filter state
  const [collectionFilter, setCollectionFilter] = useState('');
  const [traderFilter, setTraderFilter] = useState(null);
  
  // Sorting state
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  
  // Handle sort change
  const handleSort = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with default desc direction
      setSortField(field);
      setSortDirection('desc');
    }
    // Reset to first page when sort changes
    setCurrentPage(0);
  };
  
  // Function to export trade data to CSV
  const exportToCSV = (trades) => {
    if (!trades || trades.length === 0) return;
    
    // Define CSV headers
    const headers = [
      'ID',
      'Collection',
      'Token ID',
      'Price ($BERA)',
      'Seller',
      'Buyer',
      'Timestamp'
    ];
    
    // Format trade data for CSV
    const csvData = trades.map(trade => [
      trade.id,
      trade.collection,
      trade.tokenId,
      parseFloat(trade.price).toFixed(2),
      trade.offerer,
      trade.recipient,
      new Date(parseInt(trade.timestamp) * 1000).toLocaleString()
    ]);
    
    // Combine headers and data
    const allRows = [headers, ...csvData].map(row => row.join(',')).join('\n');
    
    // Create and download CSV file
    const blob = new Blob([allRows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `seaport-trades-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  // Stats state
  const [stats, setStats] = useState({
    volume: '0 $BERA',
    trades: 0,
    traders: 0,
    avgPrice: '0 $BERA'
  });
  
  // Query for recent trades (static data)
  const { loading: loadingTrades, error: tradesError, data: tradesData } = useQuery(
    GET_RECENT_TRADES,
    {
      variables: {
        collection: collectionFilter,
        trader: traderFilter,
        orderBy: sortField,
        orderDirection: sortDirection,
        skip: currentPage * pageSize,
        first: pageSize
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );
  
  // Calculate stats from query data
  useEffect(() => {
    if (tradesData && tradesData.trades) {
      // Set default values 
      let totalVolume = 0;
      let totalTrades = 0;
      let uniqueTraders = new Set();
      
      // Process trades data to calculate stats
      tradesData.trades.forEach(trade => {
        totalVolume += parseFloat(trade.price);
        totalTrades++;
        uniqueTraders.add(trade.offerer);
        uniqueTraders.add(trade.recipient);
      });
      
      // Calculate average price
      const avgPrice = totalTrades > 0 ? totalVolume / totalTrades : 0;
      
      setStats({
        volume: `${totalVolume.toFixed(2)} $BERA`,
        trades: totalTrades,
        traders: uniqueTraders.size,
        avgPrice: `${avgPrice.toFixed(2)} $BERA`
      });
    }
  }, [tradesData]);
  
  // Live updates panel state
  const [showLiveUpdates, setShowLiveUpdates] = useState(true);
  const [liveUpdates, setLiveUpdates] = useState([]);
  const [lastTimestamp, setLastTimestamp] = useState(
    Math.floor(Date.now() / 1000).toString() // Current time in seconds
  );
  
  // Query for daily stats
  const { loading: loadingDailyStats, error: dailyStatsError, data: dailyStatsData } = useQuery(
    GET_DAILY_STATS,
    {
      variables: {
        orderBy: "id",
        orderDirection: "asc",
        first: 7
      },
      fetchPolicy: 'network-only',
      nextFetchPolicy: 'cache-first',
    }
  );

  // Query for collections
  const { loading: loadingCollections, error: collectionsError, data: collectionsData } = useQuery(
    GET_COLLECTIONS,
    {
      variables: {
        orderBy: "totalVolume",
        orderDirection: "desc",
        first: 5
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
  
  // Prepare chart data for volume and trades line chart
  const volumeTradesChartData = {
    labels: dailyStatsData ? dailyStatsData.dailyStats.map(stat => stat.id) : [],
    datasets: [
      {
        label: 'Volume ($BERA)',
        data: dailyStatsData ? dailyStatsData.dailyStats.map(stat => parseFloat(stat.volume)) : [],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        yAxisID: 'y',
      },
      {
        label: 'Trades',
        data: dailyStatsData ? dailyStatsData.dailyStats.map(stat => parseInt(stat.trades)) : [],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1,
        yAxisID: 'y1',
      }
    ],
  };
  
  // Line chart options
  const lineChartOptions = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    stacked: false,
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Volume ($BERA)'
        }
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        grid: {
          drawOnChartArea: false,
        },
        title: {
          display: true,
          text: 'Trades'
        }
      },
    },
  };
  
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
  
  // Top collections bar chart data
  const topCollectionsChartData = {
    labels: collectionsData ? collectionsData.collections.map(collection => 
      collection.name || collection.id.substring(0, 6) + '...' + collection.id.substring(collection.id.length - 4)
    ) : [],
    datasets: [
      {
        label: 'Volume ($BERA)',
        data: collectionsData ? collectionsData.collections.map(collection => parseFloat(collection.totalVolume)) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  
  // Bar chart options
  const barChartOptions = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Top 5 NFT Collections by Volume',
      },
    },
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
        <div className="flex justify-between items-center md:hidden mb-2">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Filters</h2>
          <button className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm1 5a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white hidden md:block">Filters</h2>
        {/* Filter inputs */}
        <div className="flex flex-col sm:flex-row flex-wrap gap-3">
          {/* Collection filter */}
          <div className="w-full sm:w-64">
            <label htmlFor="collection-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Collection
            </label>
            <div className="relative">
              <select 
                id="collection-filter"
                value={collectionFilter}
                onChange={(e) => {
                  setCollectionFilter(e.target.value);
                  setCurrentPage(0);
                }}
                className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
              >
                <option value="">All Collections</option>
                {collectionsData && collectionsData.collections && collectionsData.collections.map((collection) => (
                  <option key={collection.id} value={collection.id}>
                    {collection.name || collection.id.substring(0, 6) + '...' + collection.id.substring(collection.id.length - 4)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Trader filter */}
          <div className="w-full sm:w-64">
            <label htmlFor="trader-filter" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Trader Address
            </label>
            <input
              type="text"
              id="trader-filter"
              value={traderFilter || ''}
              onChange={(e) => {
                setTraderFilter(e.target.value === '' ? null : e.target.value);
                setCurrentPage(0);
              }}
              placeholder="0x..."
              className="block w-full rounded-md border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2"
            />
          </div>
          
          {/* Clear filters button */}
          <div className="w-full sm:w-auto self-end">
            <button
              onClick={() => {
                setCollectionFilter('');
                setTraderFilter(null);
                setCurrentPage(0);
              }}
              className="w-full sm:w-auto px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
      
      <div className="dashboard-content space-y-6">
        {/* Stats Cards */}
        <div className="stats-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Volume Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 group relative">
            <div className="absolute invisible group-hover:visible bg-black text-white p-2 rounded text-xs -top-10 left-1/2 transform -translate-x-1/2 w-48 z-10">
              Total sum of all trade prices in $BERA
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Volume</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.volume}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
          </div>
          
          {/* Trades Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 group relative">
            <div className="absolute invisible group-hover:visible bg-black text-white p-2 rounded text-xs -top-10 left-1/2 transform -translate-x-1/2 w-48 z-10">
              Total number of NFT trades
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Trades</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.trades}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Last 7 days</p>
          </div>
          
          {/* Traders Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 group relative">
            <div className="absolute invisible group-hover:visible bg-black text-white p-2 rounded text-xs -top-10 left-1/2 transform -translate-x-1/2 w-48 z-10">
              Unique addresses that participated in trades
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Traders</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.traders}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Unique addresses</p>
          </div>
          
          {/* Avg Price Card */}
          <div className="stat-card bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 group relative">
            <div className="absolute invisible group-hover:visible bg-black text-white p-2 rounded text-xs -top-10 left-1/2 transform -translate-x-1/2 w-48 z-10">
              Average price per NFT trade (Volume ÷ Trades)
            </div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">Avg Price</h3>
            <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">{stats.avgPrice}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Per NFT</p>
          </div>
        </div>
        
        {/* Charts Section */}
        <div className="charts grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Volume & Trades Line Chart */}
          <div className="chart-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Volume & Trades (7 Days)</h2>
            {loadingDailyStats ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-8 w-8 text-blue-500 rounded-full border-2 border-t-transparent border-blue-500"></div>
              </div>
            ) : dailyStatsError ? (
              <div className="text-center text-red-500 dark:text-red-400 h-64 flex items-center justify-center">
                Error loading chart data
              </div>
            ) : (
              <Line data={volumeTradesChartData} options={lineChartOptions} />
            )}
          </div>
          
          {/* Top Collections Bar Chart */}
          <div className="chart-container bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Top Collections</h2>
            {loadingCollections ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin h-8 w-8 text-blue-500 rounded-full border-2 border-t-transparent border-blue-500"></div>
              </div>
            ) : collectionsError ? (
              <div className="text-center text-red-500 dark:text-red-400 h-64 flex items-center justify-center">
                Error loading collections data
              </div>
            ) : (
              <Bar data={topCollectionsChartData} options={barChartOptions} />
            )}
          </div>
        </div>
        
        {/* Recent Trades Table */}
        <div className="trades-table mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">
              Recent Trades
            </h2>
            <button 
              onClick={() => exportToCSV(tradesData?.trades || [])} 
              disabled={!tradesData || loadingTrades || tradesData.trades.length === 0}
              className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white text-sm rounded-md shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Export CSV
            </button>
          </div>
          
          {loadingTrades ? (
            <div className="flex justify-center items-center py-10">
              <div className="animate-spin h-8 w-8 text-blue-500 rounded-full border-2 border-t-transparent border-blue-500"></div>
            </div>
          ) : tradesError ? (
            <div className="text-center text-red-500 dark:text-red-400 py-10">
              Error loading trade data
            </div>
          ) : !tradesData || tradesData.trades.length === 0 ? (
            <div className="text-center text-gray-500 dark:text-gray-400 py-10">
              No trades found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('tokenId')}
                    >
                      <div className="flex items-center">
                        Token ID
                        {sortField === 'tokenId' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('collection')}
                    >
                      <div className="flex items-center">
                        Collection
                        {sortField === 'collection' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('price')}
                    >
                      <div className="flex items-center">
                        Price
                        {sortField === 'price' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('offerer')}
                    >
                      <div className="flex items-center">
                        Seller
                        {sortField === 'offerer' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('recipient')}
                    >
                      <div className="flex items-center">
                        Buyer
                        {sortField === 'recipient' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                    <th 
                      scope="col" 
                      className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => handleSort('timestamp')}
                    >
                      <div className="flex items-center">
                        Time
                        {sortField === 'timestamp' && (
                          <span className="ml-1">
                            {sortDirection === 'asc' ? '↑' : '↓'}
                          </span>
                        )}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {tradesData.trades.map((trade) => (
                    <tr key={trade.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {trade.tokenId}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {trade.collection}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-600 dark:text-blue-400 font-medium">
                        {parseFloat(trade.price).toFixed(2)} $BERA
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {trade.offerer.substring(0, 6)}...{trade.offerer.substring(trade.offerer.length - 4)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                        {trade.recipient.substring(0, 6)}...{trade.recipient.substring(trade.recipient.length - 4)}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {new Date(parseInt(trade.timestamp) * 1000).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              
              {/* Pagination Controls */}
              <div className="px-4 py-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                    disabled={currentPage === 0}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    disabled={!tradesData || tradesData.trades.length < pageSize}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      Showing <span className="font-medium">{tradesData && tradesData.trades.length > 0 ? currentPage * pageSize + 1 : 0}</span> to{' '}
                      <span className="font-medium">
                        {tradesData ? currentPage * pageSize + tradesData.trades.length : 0}
                      </span>{' '}
                      results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => setCurrentPage(0)}
                        disabled={currentPage === 0}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">First</span>
                        ⟪
                      </button>
                      <button
                        onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                        disabled={currentPage === 0}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        ←
                      </button>
                      <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Page {currentPage + 1}
                      </span>
                      <button
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={!tradesData || tradesData.trades.length < pageSize}
                        className="relative inline-flex items-center px-2 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        →
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
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