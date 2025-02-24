
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
              <span className="font-jakarta">Enter your address to find your property</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-archivo font-semibold text-brand-primary">2.</span>
              <span className="font-jakarta">Click the polygon tool to start drawing</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-archivo font-semibold text-brand-primary">3.</span>
              <span className="font-jakarta">Click points around your yard to outline the area</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-archivo font-semibold text-brand-primary">4.</span>
              <span className="font-jakarta">Click the first point to complete the shape</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-archivo font-semibold text-brand-primary">5.</span>
              <span className="font-jakarta">Make sure to include all areas you want to be part of your project (front yard, backyard, side yards) for accurate square footage calculation and design package selection</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Instructions;
