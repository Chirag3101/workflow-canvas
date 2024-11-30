import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const WorkflowVisualization = ({ activeWorkflow }) => {
  const [workflow, setWorkflow] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedStep, setSelectedStep] = useState(null);

  useEffect(() => {
    if (activeWorkflow?.id) {
      fetchWorkflow(activeWorkflow.id);
    }
  }, [activeWorkflow]);

  const fetchWorkflow = async (id) => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_BASE_URL}/workflows/${id}`);
      setWorkflow(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load workflow');
      console.error('Error fetching workflow:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleStepClick = (step) => {
    setSelectedStep(step);
  };

  if (loading) return <div className="p-4">Loading workflow...</div>;
  if (error) return <div className="p-4 text-red-500">{error}</div>;
  if (!workflow) return <div className="p-4">No workflow selected</div>;

  const steps = workflow.content.split('\n').filter(step => step.trim());

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
      <div className="bg-gray-50 px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">{workflow.title}</h2>
        <p className="text-sm text-gray-600 mt-1">
          {steps.length} steps in your workflow
        </p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg ${
                selectedStep === step
                  ? 'bg-blue-50 border-2 border-blue-200'
                  : 'bg-gray-50 hover:bg-gray-100 cursor-pointer'
              }`}
              onClick={() => handleStepClick(step)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-gray-800">{step.replace(/^\d+\.\s*/, '')}</p>
                  {selectedStep === step && (
                    <div className="mt-2 text-sm text-gray-600">
                      <p>Click to edit or add details to this step.</p>
                      <div className="mt-2 space-x-2">
                        <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200">
                          Add details
                        </button>
                        <button className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200">
                          Add example
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 border-t bg-gray-50">
        <p className="text-sm text-gray-600">
          Click any step to add details or examples. Use the chat to add new steps.
        </p>
      </div>
    </div>
  );
};

export default WorkflowVisualization;
