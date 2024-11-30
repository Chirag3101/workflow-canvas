import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

const ChatInterface = ({ onWorkflowUpdate }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'system',
      content: "Hi! I'm here to help you create structured workflows. What would you like to work on today?",
      suggestions: [
        'Create a tutorial',
        'Plan a project',
        'Design a process',
        'Start from scratch'
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentWorkflow, setCurrentWorkflow] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (type, content, suggestions = []) => {
    setMessages(prev => [...prev, { id: prev.length + 1, type, content, suggestions }]);
  };

  const updateWorkflow = async (id, content) => {
    try {
      console.log('Updating workflow:', { id, content });
      // Get the current steps and add the new one with correct numbering
      const currentSteps = currentWorkflow.content.split('\n').filter(step => step.trim());
      const newStepNumber = currentSteps.length + 1;
      const newContent = [...currentSteps, `${newStepNumber}. ${content}`].join('\n');
      
      const response = await axios.put(`${API_BASE_URL}/workflows/${id}`, {
        title: currentWorkflow.title,
        content: newContent
      });
      console.log('Workflow updated:', response.data);
      setCurrentWorkflow(response.data);
      onWorkflowUpdate(response.data);
      return response.data;
    } catch (err) {
      console.error('Error updating workflow:', err.response || err);
      addMessage('system', `Error updating workflow: ${err.message}`);
      return null;
    }
  };

  const createWorkflow = async (title, initialStep) => {
    try {
      console.log('Creating workflow:', { title, initialStep });
      const response = await axios.post(`${API_BASE_URL}/workflows/`, {
        title,
        content: initialStep
      });
      console.log('Workflow created:', response.data);
      setCurrentWorkflow(response.data);
      onWorkflowUpdate(response.data);
      return response.data;
    } catch (err) {
      console.error('Error creating workflow:', err.response || err);
      addMessage('system', `Error creating workflow: ${err.message}`);
      return null;
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    addMessage('user', suggestion);
    
    if (!currentWorkflow) {
      // Start a new workflow based on the suggestion
      setTimeout(async () => {
        if (suggestion === 'Create a tutorial') {
          addMessage('system',
            "What topic would you like to create a tutorial for?",
            ['Writing', 'Programming', 'Design', 'Other']
          );
        } else if (suggestion === 'Plan a project') {
          const workflow = await createWorkflow(
            'Project Planning Workflow',
            '1. Define project goal'
          );
          if (workflow) {
            addMessage('system',
              "Exciting! Let's break down your project idea. What's the main goal of your project?",
              ['Personal', 'Professional', 'Side Business', 'Other']
            );
          }
        } else if (suggestion === 'Design a process') {
          const workflow = await createWorkflow(
            'Process Design Workflow',
            '1. Define process objective'
          );
          if (workflow) {
            addMessage('system',
              "Great start! What's the primary objective of your process?",
              ['Improve efficiency', 'Enhance quality', 'Reduce costs', 'Increase productivity']
            );
          }
        } else if (suggestion === 'Start from scratch') {
          const workflow = await createWorkflow(
            'Custom Workflow',
            '1. Define your goal'
          );
          if (workflow) {
            addMessage('system',
              "I've started a new workflow. What's your goal?",
              ['Create something', 'Solve a problem', 'Improve a process', 'Other']
            );
          }
        } else if (['Writing', 'Programming', 'Design', 'Other'].includes(suggestion)) {
          // Handle tutorial topic selection
          const workflow = await createWorkflow(
            `${suggestion} Tutorial Workflow`,
            `1. Define tutorial topic: ${suggestion}`
          );
          if (workflow) {
            addMessage('system',
              `Great! Let's plan your ${suggestion.toLowerCase()} tutorial. What's the first thing your students need to learn?`,
              ['Basic concepts', 'Core principles', 'Practical exercises', 'Custom step...']
            );
          }
        }
      }, 500);
    } else {
      // Update existing workflow with correct step number
      setTimeout(async () => {
        const updated = await updateWorkflow(currentWorkflow.id, suggestion);
        
        if (updated) {
          const nextStepPrompts = {
            'Basic concepts': "Good foundation! What specific concept should they learn first?",
            'Core principles': "Important! What principle should they understand first?",
            'Practical exercises': "Hands-on learning is great! What type of exercise would be most helpful?",
            'Custom step...': "What would you like to add to the workflow?"
          };

          const message = nextStepPrompts[suggestion] || "What's the next step in your tutorial? Remember to break it down into clear, actionable items.";
          
          addMessage('system', message, [
            'Add practice exercise',
            'Include examples',
            'Add assessment',
            'Custom step...'
          ]);
        }
      }, 500);
    }
  };

  const handleSubmit = async (userInput) => {
    if (!userInput.trim()) return;
    
    addMessage('user', userInput);
    
    if (!currentWorkflow) {
      // If no workflow exists, create one with the user's input as topic
      const workflow = await createWorkflow(
        'Custom Workflow',
        `1. ${userInput}`
      );
      if (workflow) {
        addMessage('system',
          "I've started a new workflow with your input. What would you like to add next?",
          ['Break it down', 'Add details', 'Add examples']
        );
      }
    } else {
      const updated = await updateWorkflow(currentWorkflow.id, userInput);
      
      if (updated) {
        // Analyze the input to provide contextual next steps
        const containsActionWords = /plan|create|write|design|develop|implement/i.test(userInput);
        const containsLearningWords = /learn|study|practice|understand/i.test(userInput);
        
        if (containsActionWords) {
          addMessage('system',
            "Good action step! Would you like to:",
            ['Break this down further', 'Add specific details', 'Add timeline/duration', 'Something else...']
          );
        } else if (containsLearningWords) {
          addMessage('system',
            "Great learning step! Consider adding:",
            ['Practice exercises', 'Example scenarios', 'Assessment criteria', 'Something else...']
          );
        } else {
          addMessage('system',
            "I've added your step. Would you like to:",
            ['Add more details', 'Add examples', 'Add next step', 'Review the workflow']
          );
        }
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(inputValue);
      setInputValue('');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 rounded-lg shadow-lg">
      {/* Chat Header */}
      <div className="bg-white px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">Let's Create Together</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map(message => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-3/4 rounded-lg p-4 ${
              message.type === 'user'
                ? 'bg-blue-500 text-white'
                : 'bg-white text-gray-800'
            }`}>
              <p>{message.content}</p>
              {message.suggestions && message.suggestions.length > 0 && (
                <div className="mt-3 space-y-2">
                  {message.suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="block w-full text-left px-4 py-2 text-sm rounded-md hover:bg-opacity-90 transition-colors duration-200
                        bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex space-x-4">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => handleSubmit(inputValue)}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
