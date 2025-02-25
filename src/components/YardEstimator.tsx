
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import Map from './yard-estimator/Map';
import SearchPanel from './yard-estimator/SearchPanel';
import Instructions from './yard-estimator/Instructions';
import AreaDisplay from './yard-estimator/AreaDisplay';

const YardEstimator: React.FC = () => {
  const [area, setArea] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);

  const handleLocationSelect = (center: [number, number]) => {
    window.dispatchEvent(new CustomEvent('updateMapCenter', { detail: { center } }));
  };

  const handleReset = () => {
    setArea(null);
    window.dispatchEvent(new CustomEvent('clearDrawing'));
    toast('Drawing cleared');
  };

  return (
    <div className="relative w-full h-[100dvh] bg-background touch-manipulation flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <Map onAreaUpdate={setArea} />
        <SearchPanel onLocationSelect={handleLocationSelect} />
        {area && <AreaDisplay area={area} />}
        {showInstructions && <Instructions onClose={() => setShowInstructions(false)} />}
        
        <Button
          onClick={handleReset}
          variant="secondary"
          size="default"
          className="absolute bottom-4 left-2 md:left-4 z-10 bg-white/95 backdrop-blur-md shadow-lg hover:bg-white/100 text-sm border border-gray-200 font-archivo text-brand-primary"
        >
          Clear Drawing
        </Button>
      </div>
    </div>
  );
};

export default YardEstimator;
