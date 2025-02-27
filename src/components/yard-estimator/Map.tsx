
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map: React.FC = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!mapContainer.current) return;

    const isMobile = window.innerWidth <= 768;
    
    const initialCoordinates = isMobile 
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
      // For demonstration purposes, we'll determine the country based on coordinates
      // In a real application, you would use proper geocoding
      const lng = e.lngLat.lng;
      const lat = e.lngLat.lat;
      
      // Simple coordinate-based country detection (this is just for demonstration)
      if (lng > -125 && lng < -66 && lat > 25 && lat < 49) {
        navigate('/country/USA');
      } else if (lng > -10 && lng < 2 && lat > 50 && lat < 59) {
        navigate('/country/UK');
      } else if (lng > -5 && lng < 10 && lat > 42 && lat < 51) {
        navigate('/country/FRA');
      } else if (lng > 5 && lng < 15 && lat > 47 && lat < 55) {
        navigate('/country/GER');
      }
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
