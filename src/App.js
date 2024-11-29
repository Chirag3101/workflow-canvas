import React, { useState } from 'react';
import Canvas from './components/Canvas';
import Toolbar from './components/Toolbar';

function App() {
  const [content, setContent] = useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-semibold text-gray-900">Workflow Canvas</h1>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <Toolbar />
          <Canvas content={content} setContent={setContent} />
        </div>
      </main>
    </div>
  );
}

export default App;
