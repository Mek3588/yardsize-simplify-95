
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Search, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const YardEstimator: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<any>(null);
  const [area, setArea] = useState<number | null>(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  useEffect(() => {
    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWF0dyIsImEiOiJjbTdjbHM1cWwwc2ttMm5vbXJqemRlc2V1In0.UlFjTgFW2a4HeEZLe8MG3w';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-98.5795, 39.8283], // USA center
      zoom: 3,
      attributionControl: false // Hide attribution for more space on mobile
    });

    // Add attribution control in a better position for mobile
    map.current.addControl(new mapboxgl.AttributionControl(), 'bottom-left');

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon'
    });

    map.current.addControl(draw.current);

    // Add zoom controls in a better position for mobile
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    map.current.on('draw.create', updateArea);
    map.current.on('draw.delete', updateArea);
    map.current.on('draw.update', updateArea);

    return () => {
      map.current?.remove();
    };
  }, []);

  const updateArea = () => {
    const data = draw.current.getAll();
    if (data.features.length > 0) {
      const area = turf.area(data);
      const squareFeet = area * 10.7639; // Convert to square feet
      setArea(Math.round(squareFeet));
    } else {
      setArea(null);
    }
  };

  const handleAddressSearch = async () => {
    if (!address) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          address
        )}.json?access_token=${mapboxgl.accessToken}&limit=1`
      );
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const [lng, lat] = data.features[0].center;
        map.current?.flyTo({
          center: [lng, lat],
          zoom: 19,
          duration: 2000
        });
      }
    } catch (error) {
      console.error('Error searching address:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    draw.current?.deleteAll();
    setArea(null);
  };

  return (
    <div className="relative w-full h-screen bg-background touch-manipulation">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Search Panel - Made more compact on mobile */}
      <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-10">
        <div className="bg-white/90 backdrop-blur-md p-2 md:p-4 rounded-lg shadow-lg animate-fade-in max-w-md w-full mx-auto">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Enter your address..."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="flex-1 h-9 md:h-10 text-sm md:text-base"
              onKeyPress={(e) => e.key === 'Enter' && handleAddressSearch()}
            />
            <Button 
              onClick={handleAddressSearch}
              disabled={loading}
              variant="secondary"
              size="sm"
              className="md:size-default"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Area Display - Adjusted for better mobile visibility */}
      {area && (
        <div className="absolute top-16 md:top-20 left-2 right-2 md:left-4 md:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-10">
          <div className="bg-forest-500/90 text-white backdrop-blur-md p-3 md:p-4 rounded-lg shadow-lg animate-slide-up max-w-md w-full mx-auto">
            <div className="text-center">
              <p className="text-xs md:text-sm font-medium">Estimated Yard Size</p>
              <p className="text-xl md:text-2xl font-bold">{area.toLocaleString()} sq ft</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Panel - More compact on mobile */}
      {showInstructions && (
        <div className="absolute bottom-16 md:bottom-4 left-2 right-2 md:left-4 md:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-10">
          <div className="bg-white/90 backdrop-blur-md p-3 md:p-4 rounded-lg shadow-lg animate-fade-in max-w-md w-full mx-auto">
            <button
              onClick={() => setShowInstructions(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X className="h-3 w-3 md:h-4 md:w-4" />
            </button>
            <div className="space-y-1 md:space-y-2">
              <h3 className="font-semibold text-forest-700 text-sm md:text-base">How to use:</h3>
              <ol className="text-xs md:text-sm space-y-0.5 md:space-y-1 text-gray-600">
                <li>1. Enter your address to find your property</li>
                <li>2. Click the polygon tool to start drawing</li>
                <li>3. Click points around your yard to outline the area</li>
                <li>4. Click the first point to complete the shape</li>
              </ol>
            </div>
          </div>
        </div>
      )}

      {/* Reset Button - Adjusted position and size for mobile */}
      <Button
        onClick={handleReset}
        variant="secondary"
        size="sm"
        className="absolute bottom-16 right-2 md:bottom-4 md:right-4 z-10 bg-white/90 backdrop-blur-md shadow-lg hover:bg-white/100 text-xs md:text-sm"
      >
        Reset
      </Button>
    </div>
  );
};

export default YardEstimator;
