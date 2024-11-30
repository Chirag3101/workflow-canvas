import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Sidebar from 'react-sidebar';
import SearchInput, { createFilter } from 'react-search-input';

const KEYS_TO_FILTERS = ['title', 'content'];

function Documentation() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSearchChange = (term) => {
    setSearchTerm(term);
  };

  const sections = [
    { 
      title: 'Getting Started', 
      content: 'Workflow Canvas is an intuitive project management tool that helps you transform your ideas into actionable plans through a conversational interface.' 
    },
    { 
      title: 'Key Features', 
      content: 'Conversational workflow creation, Real-time collaboration, Markdown documentation support, Interactive canvas visualization, Version control integration' 
    },
    { 
      title: 'Using the Documentation', 
      content: 'The documentation is organized into several sections: Tutorials - Step-by-step guides for common tasks, Technical Guides - In-depth technical documentation, API Reference - Detailed API documentation, Best Practices - Recommended patterns and practices' 
    },
    { 
      title: 'Quick Start Guide', 
      content: 'Create a new workspace, Describe your project goals, Let the AI suggest a workflow structure, Refine and customize the workflow, Export or share your workflow' 
    },
    { 
      title: 'Need Help?', 
      content: 'If you need assistance, you can: Click the Help button in the top navigation, Browse the documentation using the side panel, Check out our tutorials section, Contact support for additional help' 
    }
  ];

  const filteredSections = sections.filter(createFilter(searchTerm, KEYS_TO_FILTERS));

  return (
    <Sidebar
      sidebar={<b>Sidebar content</b>}
      open={sidebarOpen}
      onSetOpen={setSidebarOpen}
      styles={{ sidebar: { background: 'white', width: '250px' } }}
    >
      <div className="documentation-page p-8 max-w-4xl mx-auto mt-8">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-500 hover:text-blue-700"
          >
            ← Back to Workspace
          </button>
        </div>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Workflow Canvas Documentation</h1>
          <SearchInput className="search-input" onChange={handleSearchChange} placeholder="Search documentation..." />
        </div>

        <div className="prose prose-lg max-w-none">
          {filteredSections.map((section, index) => (
            <section key={index} className="mb-8">
              <h2 className="text-2xl font-semibold mb-2">{section.title}</h2>
              <p className="mb-4">{section.content}</p>
              <CopyToClipboard text={section.content}>
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-700">Copy</button>
              </CopyToClipboard>
            </section>
          ))}
        </div>
      </div>
    </Sidebar>
  );
}

export default Documentation;
