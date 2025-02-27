
import React, { useState } from 'react';
import { Button } from './ui/button';
import Map from './yard-estimator/Map';
import SearchPanel from './yard-estimator/SearchPanel';
import Instructions from './yard-estimator/Instructions';

const YardEstimator: React.FC = () => {
  const [showInstructions, setShowInstructions] = useState(true);

  const handleLocationSelect = (center: [number, number]) => {
    window.dispatchEvent(new CustomEvent('updateMapCenter', { detail: { center } }));
  };

  return (
    <div className="relative w-full h-[100dvh] bg-background touch-manipulation flex flex-col">
      <div className="relative flex-1 overflow-hidden">
        <Map />
        <SearchPanel onLocationSelect={handleLocationSelect} />
        {showInstructions && <Instructions onClose={() => setShowInstructions(false)} />}
      </div>
    </div>
  );
};

export default YardEstimator;
