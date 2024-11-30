import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

function DocumentationWorkspace() {
  const [docTree, setDocTree] = useState([]);
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [error, setError] = useState(null);

  // Categories for organizing documentation
  const categories = {
    tutorials: { icon: '📚', label: 'Tutorials' },
    documentation: { icon: '📖', label: 'Documentation' },
    tracking: { icon: '📊', label: 'Project Tracking' }
  };

  useEffect(() => {
    fetchDocTree();
  }, []);

  const fetchDocTree = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/docs/tree');
      setDocTree(response.data);
    } catch (error) {
      setError('Failed to load documentation structure');
    }
  };

  const fetchContent = async (path) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/api/docs/content?path=${path}`);
      setContent(response.data.content);
      setEditContent(response.data.content);
      setError(null);
    } catch (error) {
      setError('Failed to load document content');
    }
  };

  const handleSave = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/docs/save', {
        path: selectedDoc,
        content: editContent
      });
      setContent(editContent);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      setError('Failed to save document');
    }
  };

  const renderTree = (items, category) => {
    return items.map((item) => {
      if (item.type === 'directory') {
        return (
          <div key={item.path} className="ml-4">
            <div className="font-medium text-gray-700 mb-2">{item.name}</div>
            {renderTree(item.children, category)}
          </div>
        );
      }
      return (
        <div
          key={item.path}
          className={`ml-4 cursor-pointer p-2 rounded hover:bg-gray-100 ${
            selectedDoc === item.path ? 'bg-blue-50' : ''
          }`}
          onClick={() => {
            setSelectedDoc(item.path);
            fetchContent(item.path);
          }}
        >
          {item.name}
        </div>
      );
    });
  };

  const categorizeDocuments = () => {
    const categorized = {
      tutorials: docTree.filter(item => item.path.startsWith('tutorials/')),
      documentation: docTree.filter(item => !item.path.startsWith('tutorials/') && !item.path.startsWith('project_tracking/')),
      tracking: docTree.filter(item => item.path.startsWith('project_tracking/'))
    };
    return categorized;
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-50">
      {/* Left Sidebar - Document Tree */}
      <div className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Documentation</h2>
          {Object.entries(categories).map(([key, { icon, label }]) => (
            <div key={key} className="mb-4">
              <h3 className="flex items-center text-sm font-medium text-gray-600 mb-2">
                <span className="mr-2">{icon}</span>
                {label}
              </h3>
              {renderTree(categorizeDocuments()[key] || [], key)}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex">
        {/* Document Viewer */}
        <div className="flex-1 p-6 overflow-y-auto">
          {selectedDoc ? (
            <div className="prose max-w-none">
              <ReactMarkdown
                components={{
                  code: ({ node, inline, className, children, ...props }) => {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        language={match[1]}
                        style={tomorrow}
                        PreTag="div"
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          ) : (
            <div className="text-center text-gray-500 mt-10">
              Select a document to view its content
            </div>
          )}
        </div>

        {/* Editor Panel */}
        {selectedDoc && (
          <div className="w-1/2 border-l border-gray-200 bg-white p-4">
            <div className="mb-4 flex justify-between items-center">
              <h3 className="text-lg font-medium">Editor</h3>
              <div className="space-x-2">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => {
                        setIsEditing(false);
                        setEditContent(content);
                      }}
                      className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
            {isEditing ? (
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full h-[calc(100vh-12rem)] p-4 border rounded font-mono"
              />
            ) : (
              <div className="prose max-w-none">
                <ReactMarkdown>{content}</ReactMarkdown>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  );
}

export default DocumentationWorkspace;
