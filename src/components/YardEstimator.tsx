
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import { Search, X, MapPin } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { toast } from 'sonner';

interface Suggestion {
  id: string;
  place_name: string;
  center: [number, number];
}

const YardEstimator: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<any>(null);
  const [area, setArea] = useState<number | null>(null);
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    // Prevent zoom on double tap
    document.addEventListener('touchstart', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });

    // Prevent pinch zoom
    document.addEventListener('touchmove', function(event) {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    }, { passive: false });

    if (!mapContainer.current) return;

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWF0dyIsImEiOiJjbTdjbHM1cWwwc2ttMm5vbXJqemRlc2V1In0.UlFjTgFW2a4HeEZLe8MG3w';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: [-98.5795, 39.8283],
      zoom: 3,
      attributionControl: false
    });

    map.current.addControl(new mapboxgl.AttributionControl(), 'bottom-left');

    draw.current = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        polygon: true,
        trash: true
      },
      defaultMode: 'draw_polygon',
      styles: [
        {
          'id': 'gl-draw-polygon-fill-inactive',
          'type': 'fill',
          'filter': ['all', ['==', 'active', 'false'],
            ['==', '$type', 'Polygon'],
            ['!=', 'mode', 'static']
          ],
          'paint': {
            'fill-color': '#3B82F6',
            'fill-outline-color': '#3B82F6',
            'fill-opacity': 0.3
          }
        },
        {
          'id': 'gl-draw-polygon-fill-active',
          'type': 'fill',
          'filter': ['all', ['==', 'active', 'true'],
            ['==', '$type', 'Polygon']
          ],
          'paint': {
            'fill-color': '#3B82F6',
            'fill-outline-color': '#3B82F6',
            'fill-opacity': 0.4
          }
        },
        {
          'id': 'gl-draw-polygon-stroke-inactive',
          'type': 'line',
          'filter': ['all',
            ['==', 'active', 'false'],
            ['==', '$type', 'Polygon'],
            ['!=', 'mode', 'static']
          ],
          'layout': {
            'line-cap': 'round',
            'line-join': 'round'
          },
          'paint': {
            'line-color': '#3B82F6',
            'line-width': 3
          }
        },
        {
          'id': 'gl-draw-polygon-stroke-active',
          'type': 'line',
          'filter': ['all', ['==', 'active', 'true'],
            ['==', '$type', 'Polygon']
          ],
          'layout': {
            'line-cap': 'round',
            'line-join': 'round'
          },
          'paint': {
            'line-color': '#3B82F6',
            'line-dasharray': [0.2, 2],
            'line-width': 3
          }
        },
        {
          'id': 'gl-draw-polygon-vertex-inactive',
          'type': 'circle',
          'filter': ['all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static']
          ],
          'paint': {
            'circle-radius': 5,
            'circle-color': '#fff',
            'circle-stroke-color': '#3B82F6',
            'circle-stroke-width': 2
          }
        },
        {
          'id': 'gl-draw-polygon-vertex-active',
          'type': 'circle',
          'filter': ['all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['==', 'active', 'true'],
          ],
          'paint': {
            'circle-radius': 7,
            'circle-color': '#fff',
            'circle-stroke-color': '#3B82F6',
            'circle-stroke-width': 3
          }
        }
      ]
    });

    map.current.addControl(draw.current);
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    map.current.on('draw.create', updateArea);
    map.current.on('draw.delete', updateArea);
    map.current.on('draw.update', updateArea);

    return () => {
      map.current?.remove();
      // Remove event listeners
      document.removeEventListener('touchstart', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.removeEventListener('touchmove', function(event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
    };
  }, []);

  const updateArea = () => {
    const data = draw.current.getAll();
    if (data.features.length > 0) {
      const area = turf.area(data);
      const squareFeet = area * 10.7639;
      setArea(Math.round(squareFeet));
      toast.success('Yard size calculated!');
    } else {
      setArea(null);
    }
  };

  const handleAddressInput = async (value: string) => {
    setAddress(value);
    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${mapboxgl.accessToken}&limit=5&types=address`
      );
      const data = await response.json();
      setSuggestions(data.features);
      setShowSuggestions(true);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleSuggestionClick = async (suggestion: Suggestion) => {
    setAddress(suggestion.place_name);
    setSuggestions([]);
    setShowSuggestions(false);
    setLoading(true);

    try {
      const [lng, lat] = suggestion.center;
      map.current?.flyTo({
        center: [lng, lat],
        zoom: 19,
        duration: 2000
      });
      toast.success('Location found!');
    } catch (error) {
      console.error('Error searching address:', error);
      toast.error('Error finding location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    draw.current?.deleteAll();
    setArea(null);
    toast('Drawing cleared');
  };

  return (
    <div className="relative w-full h-[100dvh] bg-background touch-manipulation overflow-hidden">
      <div ref={mapContainer} className="absolute inset-0" />
      
      {/* Search Panel */}
      <div className="absolute top-2 left-2 right-2 md:top-4 md:left-4 md:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-10">
        <div className="bg-white/95 backdrop-blur-md p-3 md:p-4 rounded-xl shadow-lg animate-fade-in max-w-md w-full mx-auto border border-gray-100">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Enter your address..."
                value={address}
                onChange={(e) => handleAddressInput(e.target.value)}
                className="pl-10 h-10 md:h-11 text-sm md:text-base border-gray-200 font-jakarta font-normal"
                style={{ fontSize: '16px' }}
              />
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-100 z-50">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion.id}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 text-sm font-jakarta"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.place_name}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <Button 
              onClick={() => handleSuggestionClick(suggestions[0])}
              disabled={loading || !suggestions.length}
              variant="default"
              size="default"
              className="bg-brand-primary hover:bg-brand-primary/90 transition-colors text-white font-jakarta"
            >
              <Search className="h-4 w-4" />
              <span className="hidden md:inline ml-2">Search</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Area Display */}
      {area && (
        <div className="absolute top-[4.5rem] md:top-20 left-2 right-2 md:left-4 md:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-10">
          <div className="bg-brand-primary/95 text-white backdrop-blur-md p-4 rounded-xl shadow-lg animate-slide-up max-w-md w-full mx-auto">
            <div className="text-center">
              <p className="text-xs md:text-sm font-medium text-white/90 font-archivo">Estimated Yard Size</p>
              <p className="text-2xl md:text-3xl font-bold font-archivo">{area.toLocaleString()} sq ft</p>
            </div>
          </div>
        </div>
      )}

      {/* Instructions Panel */}
      {showInstructions && (
        <div className="absolute bottom-20 md:bottom-6 left-2 right-2 md:left-4 md:right-4 md:left-1/2 md:right-auto md:-translate-x-1/2 z-10">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg animate-fade-in max-w-md w-full mx-auto border border-gray-100">
            <button
              onClick={() => setShowInstructions(false)}
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
              </ol>
            </div>
          </div>
        </div>
      )}

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
