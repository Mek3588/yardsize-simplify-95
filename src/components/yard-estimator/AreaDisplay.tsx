
import React from 'react';

interface AreaDisplayProps {
  area: number;
}

const AreaDisplay: React.FC<AreaDisplayProps> = ({ area }) => {
  return (
    <div className="absolute top-[4.5rem] md:top-20 left-2 right-2 md:left-4 md:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-10">
      <div className="bg-brand-primary/95 text-white backdrop-blur-md p-4 rounded-xl shadow-lg animate-slide-up max-w-md w-full mx-auto">
        <div className="text-center">
          <p className="text-xs md:text-sm font-medium text-white/90 font-archivo">Estimated Yard Size</p>
          <p className="text-2xl md:text-3xl font-bold font-archivo">{area.toLocaleString()} sq ft</p>
        </div>
      </div>
    </div>
  );
};

export default AreaDisplay;
