import React, { useState } from 'react';
import ChatInterface from './ChatInterface';
import WorkflowVisualization from './WorkflowVisualization';

const WorkspaceContainer = () => {
  const [activeWorkflow, setActiveWorkflow] = useState(null);

  const handleWorkflowUpdate = (workflow) => {
    setActiveWorkflow(workflow);
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] p-6 bg-gray-100">
      {/* Left side: Chat Interface */}
      <div className="w-1/2 pr-3">
        <ChatInterface onWorkflowUpdate={handleWorkflowUpdate} />
      </div>

      {/* Right side: Visualization Area */}
      <div className="w-1/2 pl-3">
        <WorkflowVisualization activeWorkflow={activeWorkflow} />
      </div>
    </div>
  );
};

export default WorkspaceContainer;
