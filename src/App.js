import React, { useState } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import About from './components/About';
import Documentation from './components/Documentation';
import WorkspaceContainer from './components/WorkspaceContainer';
import HelpDialog from './components/HelpDialog';

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <Link to="/" className="text-xl font-bold text-gray-800">
                  Workflow Canvas
                </Link>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link
                  to="/"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Home
                </Link>
                <Link
                  to="/docs"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  Documentation
                </Link>
                <Link
                  to="/about"
                  className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                >
                  About
                </Link>
              </div>
            </div>
            <div className="flex items-center">
              <button
                onClick={() => setShowHelp(true)}
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Help
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<WorkspaceContainer />} />
          <Route path="/docs" element={<Documentation />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>

      {/* Help Dialog */}
      <HelpDialog 
        isOpen={showHelp} 
        onClose={() => setShowHelp(false)} 
      />
    </div>
  );
}

export default App;
