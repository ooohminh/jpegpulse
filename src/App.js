import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import SeaportDashboard from './SeaportDashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
        <header className="bg-white dark:bg-gray-800 shadow-md py-4">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                Berachain NFT Dashboards
              </h1>
              <nav className="flex space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Home
                </Link>
                <Link to="/seaport" className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  Seaport
                </Link>
                <Link to="/all-nft" className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700">
                  All-NFT
                </Link>
              </nav>
            </div>
          </div>
        </header>
        <main className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={
              <div className="text-center py-12">
                <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">Welcome to JPEG Pulse</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  Multi-chain NFT dashboards for Berachain
                </p>
                <div className="flex justify-center space-x-4">
                  <Link to="/seaport" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Seaport Dashboard
                  </Link>
                  <Link to="/all-nft" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    All-NFT Dashboard
                  </Link>
                </div>
              </div>
            } />
            <Route path="/seaport" element={<SeaportDashboard />} />
            <Route path="/all-nft" element={
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold">All-NFT Dashboard</h2>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                  This dashboard will be implemented in the next step.
                </p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;