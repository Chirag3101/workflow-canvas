import React from 'react';

function HelpDialog({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <h2 className="text-2xl font-bold mb-6">Welcome to Workflow Canvas!</h2>

        <div className="space-y-6">
          <section>
            <h3 className="text-xl font-semibold mb-3">What is Workflow Canvas?</h3>
            <p className="text-gray-600">
              Workflow Canvas is an innovative project management tool that transforms your ideas into actionable plans
              through a conversational interface. It's designed to make project planning intuitive, collaborative, and
              efficient.
            </p>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Who is it for?</h3>
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800">🎯 Project Managers</h4>
                <p className="text-blue-600">
                  Create and manage project workflows, track progress, and collaborate with team members effectively.
                </p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-medium text-green-800">💡 Entrepreneurs</h4>
                <p className="text-green-600">
                  Transform business ideas into structured plans and track multiple projects simultaneously.
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <h4 className="font-medium text-purple-800">👥 Team Leaders</h4>
                <p className="text-purple-600">
                  Coordinate team efforts, assign tasks, and maintain clear communication channels.
                </p>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-medium text-yellow-800">🎨 Creative Professionals</h4>
                <p className="text-yellow-600">
                  Organize creative projects, manage deadlines, and collaborate with clients seamlessly.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Key Features</h3>
            <ul className="grid grid-cols-2 gap-4">
              <li className="bg-gray-50 p-3 rounded">
                <span className="font-medium">🗣️ Conversational Interface</span>
                <p className="text-sm text-gray-600">Describe your project naturally, and we'll help structure it</p>
              </li>
              <li className="bg-gray-50 p-3 rounded">
                <span className="font-medium">🔄 Real-time Collaboration</span>
                <p className="text-sm text-gray-600">Work together with your team in real-time</p>
              </li>
              <li className="bg-gray-50 p-3 rounded">
                <span className="font-medium">📊 Visual Workflows</span>
                <p className="text-sm text-gray-600">See your project from different perspectives</p>
              </li>
              <li className="bg-gray-50 p-3 rounded">
                <span className="font-medium">📱 Cross-platform</span>
                <p className="text-sm text-gray-600">Access your workflows from any device</p>
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600">
              <li>Click "New Project" to start a new workflow</li>
              <li>Describe your project goals and objectives</li>
              <li>Let our AI suggest a workflow structure</li>
              <li>Customize and refine the workflow</li>
              <li>Invite team members and start collaborating</li>
            </ol>
          </section>

          <section>
            <h3 className="text-xl font-semibold mb-3">Need More Help?</h3>
            <p className="text-gray-600">
              Check out our comprehensive documentation in the Documentation section. You'll find:
            </p>
            <ul className="list-disc list-inside text-gray-600 mt-2">
              <li>Detailed tutorials and guides</li>
              <li>Best practices and tips</li>
              <li>API documentation</li>
              <li>Common workflows and templates</li>
            </ul>
          </section>

          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
            <button
              onClick={onClose}
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Got it, thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpDialog;
