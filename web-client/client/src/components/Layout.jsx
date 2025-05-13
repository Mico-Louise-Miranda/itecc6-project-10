import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation();
  
  // Function to determine if a nav link is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-[#f8f8f2]">
      {/* Header/Navigation */}
      <header className="pt-6 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center bg-[#D9E7CB] rounded-lg p-4">
            <Link to="/" className="text-2xl font-bold text-[#2E2E2E]">
              Botaniq
            </Link>
            <nav className="flex space-x-12">
              <Link 
                to="/" 
                className={`${isActive('/') ? 'font-medium' : 'font-normal'} text-[#2E2E2E]`}
              >
                Home
              </Link>
              <Link 
                to="/garden" 
                className={`${isActive('/garden') ? 'font-medium' : 'font-normal'} text-[#2E2E2E]`}
              >
                Garden
              </Link>
              <Link 
                to="/routine" 
                className={`${isActive('/routine') ? 'font-medium' : 'font-normal'} text-[#2E2E2E]`}
              >
                Routine
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6 px-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout; 