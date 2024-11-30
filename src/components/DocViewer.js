import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/esm/styles/prism';

const DocViewer = ({ onClose, initialPath }) => {
  const [content, setContent] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState('');
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [docTree, setDocTree] = useState([]);
  const [error, setError] = useState(null);

  // Fetch documentation structure
  useEffect(() => {
    const fetchDocTree = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/docs/tree');
        console.log('Doc tree response:', response.data);
        setDocTree(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching doc tree:', error);
        setError('Failed to load documentation structure');
      }
    };
    fetchDocTree();
  }, []);

  // Fetch document content
  useEffect(() => {
    const fetchContent = async () => {
      if (!currentPath) return;
      
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/docs/content?path=${currentPath}`);
        console.log('Content response:', response.data);
        setContent(response.data.content);
        setEditContent(response.data.content);
        setError(null);
      } catch (error) {
        console.error('Error fetching content:', error);
        setError('Failed to load document content');
      }
    };
    if (currentPath) {
      fetchContent();
    }
  }, [currentPath]);

  const handleSave = async () => {
    try {
      await axios.post('http://127.0.0.1:8000/api/docs/save', {
        path: currentPath,
        content: editContent
      });
      setContent(editContent);
      setIsEditing(false);
      setError(null);
    } catch (error) {
      console.error('Error saving content:', error);
      setError('Failed to save document');
    }
  };

  return (
    <div className="fixed right-0 top-0 h-screen w-1/3 bg-white shadow-lg flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Documentation Viewer</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 border-b">
          {error}
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/3 p-4 border-r overflow-y-auto">
          <h3 className="font-medium mb-2">Documents</h3>
          <ul className="space-y-1">
            {docTree.map((doc) => (
              <li
                key={doc.path}
                className={`cursor-pointer p-2 rounded hover:bg-gray-100 ${
                  currentPath === doc.path ? 'bg-blue-50 text-blue-600' : ''
                }`}
                onClick={() => setCurrentPath(doc.path)}
              >
                {doc.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 overflow-y-auto">
          {isEditing ? (
            <div className="h-full flex flex-col">
              <textarea
                className="flex-1 w-full p-2 border rounded font-mono"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
              />
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  className="px-4 py-2 text-gray-600 border rounded hover:bg-gray-50"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex justify-end mb-4">
                <button
                  className="px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50"
                  onClick={() => setIsEditing(true)}
                >
                  Edit
                </button>
              </div>
              <ReactMarkdown
                children={content}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        children={String(children).replace(/\n$/, '')}
                        style={tomorrow}
                        language={match[1]}
                        PreTag="div"
                        {...props}
                      />
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DocViewer;
