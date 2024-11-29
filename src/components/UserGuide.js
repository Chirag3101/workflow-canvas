import React, { useState } from 'react';

const UserGuide = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isOpen, setIsOpen] = useState(false);

  const personas = [
    {
      title: 'The Solopreneur',
      description: 'Independent business owner looking to streamline operations and document processes.',
      useCase: 'Perfect for documenting your business processes, creating SOPs, and identifying improvement opportunities.',
      features: ['Quick workflow creation', 'Visual process mapping', 'Easy updates']
    },
    {
      title: 'The Startup Founder',
      description: 'Tech-savvy leader needing to iterate quickly on process flows.',
      useCase: 'Ideal for prototyping workflows, sharing with remote teams, and adapting as your startup evolves.',
      features: ['Rapid prototyping', 'Team sharing', 'Quick iterations']
    },
    {
      title: 'The Project Manager',
      description: 'Small team leader seeking simple visual documentation.',
      useCase: 'Great for documenting team processes, creating visual guides, and maintaining clear workflows.',
      features: ['Process documentation', 'Team collaboration', 'Visual guides']
    }
  ];

  const quickStart = [
    {
      step: 1,
      title: 'Create a Workflow',
      description: 'Click the "+ New" button and enter your workflow title and content.'
    },
    {
      step: 2,
      title: 'Describe Your Process',
      description: 'Write out your process steps in the text area. Keep it simple and clear.'
    },
    {
      step: 3,
      title: 'Visualize',
      description: 'Click "Visualize" to see your workflow as a diagram.'
    },
    {
      step: 4,
      title: 'Save and Share',
      description: 'Save your workflow to access it later and share with others.'
    }
  ];

  return (
    <div className="relative">
      {/* Help Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white rounded-full p-3 shadow-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>

      {/* Guide Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">Welcome to Workflow Canvas</h2>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-600 hover:text-gray-900"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 ${activeTab === 'overview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('overview')}
              >
                Overview
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'personas' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('personas')}
              >
                Who It's For
              </button>
              <button
                className={`px-4 py-2 ${activeTab === 'quickstart' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-600'}`}
                onClick={() => setActiveTab('quickstart')}
              >
                Quick Start
              </button>
            </div>

            {/* Content */}
            <div className="mt-4">
              {activeTab === 'overview' && (
                <div>
                  <p className="text-gray-600 mb-4">
                    Workflow Canvas is your simple, intuitive tool for creating and visualizing workflows. 
                    Think of it as your digital whiteboard for process documentation.
                  </p>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="font-bold text-blue-800 mb-2">Key Features:</h3>
                    <ul className="list-disc list-inside text-blue-700">
                      <li>Simple workflow creation</li>
                      <li>Automatic visualization</li>
                      <li>Easy sharing and collaboration</li>
                      <li>Quick updates and iterations</li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'personas' && (
                <div className="space-y-6">
                  {personas.map((persona, index) => (
                    <div key={index} className="border rounded-lg p-4">
                      <h3 className="font-bold text-lg text-gray-800 mb-2">{persona.title}</h3>
                      <p className="text-gray-600 mb-2">{persona.description}</p>
                      <p className="text-gray-700 mb-2"><strong>Perfect For:</strong> {persona.useCase}</p>
                      <div className="flex flex-wrap gap-2">
                        {persona.features.map((feature, i) => (
                          <span key={i} className="bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'quickstart' && (
                <div className="space-y-4">
                  {quickStart.map((step, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                        {step.step}
                      </div>
                      <div className="ml-4">
                        <h3 className="font-bold text-gray-800">{step.title}</h3>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="mt-6 pt-4 border-t">
              <p className="text-sm text-gray-500">
                Need more help? Check out our detailed documentation or contact support.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserGuide;
