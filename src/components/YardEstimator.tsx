
import React, { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';
import Map from './yard-estimator/Map';
import SearchPanel from './yard-estimator/SearchPanel';
import Instructions from './yard-estimator/Instructions';
import AreaDisplay from './yard-estimator/AreaDisplay';
import mapboxgl from 'mapbox-gl';

const YardEstimator: React.FC = () => {
  const [area, setArea] = useState<number | null>(null);
  const [showInstructions, setShowInstructions] = useState(true);
  const [map, setMap] = useState<mapboxgl.Map | null>(null);

  const handleLocationSelect = (center: [number, number]) => {
    map?.flyTo({
      center: center,
      zoom: 19,
      duration: 2000
    });
  };

  const handleReset = () => {
    setArea(null);
    toast('Drawing cleared');
  };

  return (
    <div className="relative w-full h-[100dvh] bg-background touch-manipulation overflow-hidden">
      <Map onAreaUpdate={setArea} />
      <SearchPanel onLocationSelect={handleLocationSelect} />
      {area && <AreaDisplay area={area} />}
      {showInstructions && <Instructions onClose={() => setShowInstructions(false)} />}
      
      {/* Reset Button */}
      <Button
        onClick={handleReset}
        variant="secondary"
        size="default"
        className="absolute bottom-6 right-2 md:bottom-4 md:right-4 z-10 bg-white/95 backdrop-blur-md shadow-lg hover:bg-white/100 text-sm border border-gray-200 font-archivo text-brand-primary"
      >
        Clear Drawing
      </Button>
    </div>
  );
};

export default YardEstimator;
