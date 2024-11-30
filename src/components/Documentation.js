// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

// function Documentation() {
//   const navigate = useNavigate();

//   return (
//     <div className="documentation-page p-8 max-w-4xl mx-auto">
//       <div className="mb-8">
//         <button
//           onClick={() => navigate('/')}
//           className="text-blue-500 hover:text-blue-700"
//         >
//           ← Back to Workspace
//         </button>
//       </div>

//       <div className="prose prose-lg max-w-none">
//         <h1>Workflow Canvas Documentation</h1>
        
//         <section className="mb-8">
//           <h2>Getting Started</h2>
//           <p>
//             Workflow Canvas is an intuitive project management tool that helps you transform
//             your ideas into actionable plans through a conversational interface.
//           </p>
//         </section>

//         <section className="mb-8">
//           <h2>Key Features</h2>
//           <ul>
//             <li>Conversational workflow creation</li>
//             <li>Real-time collaboration</li>
//             <li>Markdown documentation support</li>
//             <li>Interactive canvas visualization</li>
//             <li>Version control integration</li>
//           </ul>
//         </section>

//         <section className="mb-8">
//           <h2>Using the Documentation</h2>
//           <p>
//             The documentation is organized into several sections:
//           </p>
//           <ul>
//             <li>Tutorials - Step-by-step guides for common tasks</li>
//             <li>Technical Guides - In-depth technical documentation</li>
//             <li>API Reference - Detailed API documentation</li>
//             <li>Best Practices - Recommended patterns and practices</li>
//           </ul>
//         </section>

//         <section className="mb-8">
//           <h2>Quick Start Guide</h2>
//           <ol>
//             <li>Create a new workspace</li>
//             <li>Describe your project goals</li>
//             <li>Let the AI suggest a workflow structure</li>
//             <li>Refine and customize the workflow</li>
//             <li>Export or share your workflow</li>
//           </ol>
//         </section>

//         <section className="mb-8">
//           <h2>Need Help?</h2>
//           <p>
//             If you need assistance, you can:
//           </p>
//           <ul>
//             <li>Click the Help button in the top navigation</li>
//             <li>Browse the documentation using the side panel</li>
//             <li>Check out our tutorials section</li>
//             <li>Contact support for additional help</li>
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// }

// export default Documentation;

import React from 'react';
import DocumentationWorkspace from './DocumentationWorkspace';

function Documentation() {
  return <DocumentationWorkspace />;
}

export default Documentation;
