import React from 'react';
import { PencilIcon, ChartBarIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

function Toolbar() {
  return (
    <div className="border-b border-gray-200">
      <div className="flex items-center space-x-4 p-4">
        <button className="toolbar-button">
          <PencilIcon className="h-5 w-5" />
          <span>Write</span>
        </button>
        <button className="toolbar-button">
          <ChartBarIcon className="h-5 w-5" />
          <span>Visualize</span>
        </button>
        <button className="toolbar-button">
          <ArrowPathIcon className="h-5 w-5" />
          <span>Clear</span>
        </button>
      </div>
    </div>
  );
}

export default Toolbar;
