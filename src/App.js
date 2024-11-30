import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import About from './components/About';
import Documentation from './components/Documentation';
import WorkspaceContainer from './components/WorkspaceContainer';
import HelpDialog from './components/HelpDialog';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import PrivateRoute from './components/auth/PrivateRoute';
import Navigation from './components/Navigation';
import Profile from './components/user/Profile';
import Dashboard from './components/Dashboard'; // Assuming Dashboard is defined in this file
import WorkflowEditor from './components/workflow/WorkflowEditor';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Documentation />} />
            <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
            <Route path="/workflow/new" element={<PrivateRoute><WorkflowEditor /></PrivateRoute>} />
            <Route path="/workflow/:id" element={<PrivateRoute><WorkflowEditor /></PrivateRoute>} />
          </Routes>
        </main>

        {showHelp && (
          <button
            onClick={() => setShowHelp(true)}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Help
          </button>
        )}
        {showHelp && <HelpDialog onClose={() => setShowHelp(false)} />}
      </div>
    </AuthProvider>
  );
}

export default App;
