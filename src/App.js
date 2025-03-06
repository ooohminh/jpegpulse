import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import SeaportDashboard from './SeaportDashboard';
import AllNFTDashboard from './AllNFTDashboard';
import { MoonIcon, SunIcon } from './icons'; // We'll create this file next

function App() {
  // Theme state management
  const [darkMode, setDarkMode] = useState(false);
  
  // Initialize theme from localStorage or system preference
  useEffect(() => {
    // Check if user has a preference stored in localStorage
    const savedTheme = localStorage.getItem('theme');
    
    if (savedTheme === 'dark' || 
        (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-md py-4 transition-colors duration-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white transition-colors duration-200">
              Berachain NFT Dashboards
            </h1>
            <div className="flex items-center space-x-4">
              <nav className="flex space-x-4">
                <Link to="/" className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  Home
                </Link>
                <Link to="/seaport" className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  Seaport
                </Link>
                <Link to="/all-nft" className="px-3 py-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200">
                  All-NFT
                </Link>
              </nav>
              
              {/* Theme toggle button */}
              <button 
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
              >
                {darkMode ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={
            <div className="text-center py-12">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4 transition-colors duration-200">Welcome to JPEG Pulse</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8 transition-colors duration-200">
                Multi-chain NFT dashboards for Berachain
              </p>
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link to="/seaport" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  Seaport Dashboard
                </Link>
                <Link to="/all-nft" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                  All-NFT Dashboard
                </Link>
              </div>
            </div>
          } />
          <Route path="/seaport" element={<SeaportDashboard />} />
          <Route path="/all-nft" element={<AllNFTDashboard />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;