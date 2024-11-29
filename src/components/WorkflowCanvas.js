import React, { useState, useEffect } from 'react';
import { workflowsApi } from '../services/api';

const WorkflowCanvas = () => {
  const [workflows, setWorkflows] = useState([]);
  const [currentWorkflow, setCurrentWorkflow] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch workflows on component mount
  useEffect(() => {
    fetchWorkflows();
  }, []);

  const fetchWorkflows = async () => {
    try {
      setLoading(true);
      const data = await workflowsApi.getAllWorkflows();
      setWorkflows(data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workflows');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkflow(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentWorkflow.title || !currentWorkflow.content) {
      setError('Please fill in both title and content');
      return;
    }

    try {
      setLoading(true);
      await workflowsApi.createWorkflow(currentWorkflow);
      setCurrentWorkflow({ title: '', content: '' });
      await fetchWorkflows();
      setError(null);
    } catch (err) {
      setError('Failed to create workflow');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setCurrentWorkflow({ title: '', content: '' });
    setError(null);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <h2 className="text-2xl font-bold mb-4">Workflow Canvas</h2>
        
        {/* Error display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Input form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="title"
              value={currentWorkflow.title}
              onChange={handleInputChange}
              placeholder="Workflow Title"
              className="w-full p-2 border rounded"
              disabled={loading}
            />
          </div>
          <div>
            <textarea
              name="content"
              value={currentWorkflow.content}
              onChange={handleInputChange}
              placeholder="Enter your workflow description..."
              className="w-full p-2 border rounded h-32"
              disabled={loading}
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {loading ? 'Saving...' : 'Save Workflow'}
            </button>
            <button
              type="button"
              onClick={handleClear}
              disabled={loading}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:bg-gray-300"
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      {/* Workflows list */}
      <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Saved Workflows</h3>
        {loading ? (
          <div>Loading workflows...</div>
        ) : (
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                className="border rounded p-4 hover:shadow-md transition-shadow"
              >
                <h4 className="font-bold">{workflow.title}</h4>
                <p className="mt-2 text-gray-600">{workflow.content}</p>
                <div className="mt-2 text-sm text-gray-500">
                  Created: {new Date(workflow.created_at).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkflowCanvas;
