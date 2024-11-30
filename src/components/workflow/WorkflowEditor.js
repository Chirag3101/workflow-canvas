import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import WorkflowCanvas from './WorkflowCanvas';
import { PlusIcon } from '@heroicons/react/24/outline';

const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Start' },
    position: { x: 250, y: 0 },
  },
];

const WorkflowEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(false);

  const handleSave = useCallback(async (flowData) => {
    try {
      const workflowData = {
        title,
        description,
        is_public: isPublic,
        nodes: flowData.nodes,
        edges: flowData.edges,
      };

      // TODO: Implement API call to save workflow
      console.log('Saving workflow:', workflowData);
    } catch (error) {
      console.error('Error saving workflow:', error);
    }
  }, [title, description, isPublic]);

  const addNode = useCallback((type) => {
    const newNode = {
      id: `${Date.now()}`,
      type,
      position: { x: 250, y: 100 },
      data: { label: `New ${type} Node` },
    };
    // TODO: Add node to canvas
    console.log('Adding node:', newNode);
  }, []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Workflow Title"
                className="block w-full border-0 border-b border-transparent bg-white focus:border-indigo-600 focus:ring-0 sm:text-lg"
              />
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description (optional)"
                className="block w-full border-0 border-b border-transparent bg-white focus:border-indigo-600 focus:ring-0 sm:text-sm text-gray-500 mt-1"
              />
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-700">Public</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-64 bg-gray-50 border-r border-gray-200 p-4">
          <h3 className="text-lg font-medium text-gray-900">Add Node</h3>
          <div className="mt-4 space-y-2">
            <button
              onClick={() => addNode('task')}
              className="flex items-center space-x-2 w-full px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 text-gray-400" />
              <span>Task</span>
            </button>
            <button
              onClick={() => addNode('decision')}
              className="flex items-center space-x-2 w-full px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusIcon className="h-5 w-5 text-gray-400" />
              <span>Decision</span>
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 relative">
          <WorkflowCanvas
            initialNodes={initialNodes}
            initialEdges={[]}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkflowEditor;
