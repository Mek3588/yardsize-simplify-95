
import React from 'react';
import { X } from 'lucide-react';

interface InstructionsProps {
  onClose: () => void;
}

const Instructions: React.FC<InstructionsProps> = ({ onClose }) => {
  return (
    <div className="absolute bottom-[calc(2rem+44px)] md:bottom-20 left-2 right-2 md:left-4 md:max-w-md z-10">
      <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg animate-fade-in w-full mx-auto border border-gray-100">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="space-y-2">
          <h3 className="font-archivo text-brand-primary font-semibold text-sm md:text-base">How to use:</h3>
          <ol className="text-xs md:text-sm space-y-1.5 text-gray-600">
            <li className="flex items-start gap-2">
              <span className="font-archivo font-semibold text-brand-primary">1.</span>
              <span className="font-jakarta">Click on any country on the map to view its details</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-archivo font-semibold text-brand-primary">2.</span>
              <span className="font-jakarta">Explore the country's history and popular places</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-archivo font-semibold text-brand-primary">3.</span>
              <span className="font-jakarta">Check the country's global rankings in various categories</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
