import React from 'react';

function Canvas({ content, setContent }) {
  return (
    <div className="p-6">
      <div className="min-h-[600px] w-full bg-canvas rounded-lg border-2 border-gray-200 focus-within:border-primary transition-colors duration-200">
        <textarea
          className="w-full h-full p-4 resize-none bg-transparent focus:outline-none"
          placeholder="Start typing your story... (Just like explaining on a whiteboard)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Canvas;
