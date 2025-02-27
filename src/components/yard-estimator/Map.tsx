
import React, { useEffect, useRef } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

interface MapProps {
  onAreaUpdate?: (area: number | null) => void;
}

interface MapCoordinates {
  center: LngLatLike;
  zoom: number;
  pitch?: number;
  bearing?: number;
}

const Map: React.FC<MapProps> = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainer.current) return;

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Set different initial coordinates and zoom level based on device type
    const initialCoordinates: MapCoordinates = isMobile 
      ? { 
          center: [-100, 45] as [number, number],
          zoom: 2,
          pitch: 0,
          bearing: 0
        }
      : { 
          center: [-98.5795, 39.8283] as [number, number],
          zoom: 3,
          pitch: 0,
          bearing: 0
        };

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWF0dyIsImEiOiJjbTdjbHM1cWwwc2ttMm5vbXJqemRlc2V1In0.UlFjTgFW2a4HeEZLe8MG3w';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: initialCoordinates.center,
      zoom: initialCoordinates.zoom,
      pitch: initialCoordinates.pitch,
      bearing: initialCoordinates.bearing,
      attributionControl: false
    });

    map.current.addControl(new mapboxgl.AttributionControl(), 'bottom-left');
    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    // Add country click handler
    map.current.on('click', (e) => {
      // This is a simplified example - in a real application, you would use
      // a geocoding service or feature state to determine the country
      // For now, we'll just use the USA as an example
      navigate('/country/USA');
    });

    // Add listener for center updates
    const handleCenterUpdate = (event: CustomEvent) => {
      if (map.current && event.detail.center) {
        map.current.flyTo({
          center: event.detail.center,
          zoom: 19,
          duration: 2000
        });
      }
    };

    window.addEventListener('updateMapCenter', handleCenterUpdate as EventListener);

    return () => {
      map.current?.remove();
      window.removeEventListener('updateMapCenter', handleCenterUpdate as EventListener);
    };
  }, [navigate]);

  return <div ref={mapContainer} className="absolute inset-0" />;
};

export default Map;
