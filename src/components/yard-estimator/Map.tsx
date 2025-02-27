
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

    // Add country click handler with expanded country detection
    map.current.on('click', (e) => {
      const lng = e.lngLat.lng;
      const lat = e.lngLat.lat;
      
      // Extended coordinate-based country detection
      if (lng > -125 && lng < -66 && lat > 25 && lat < 49) {
        navigate('/country/USA');
      } else if (lng > -10 && lng < 2 && lat > 50 && lat < 59) {
        navigate('/country/UK');
      } else if (lng > -5 && lng < 10 && lat > 42 && lat < 51) {
        navigate('/country/FRA');
      } else if (lng > 5 && lng < 15 && lat > 47 && lat < 55) {
        navigate('/country/GER');
      } else if (lng > -10 && lng < 3 && lat > 36 && lat < 44) {
        navigate('/country/ESP');
      } else if (lng > 7 && lng < 18 && lat > 37 && lat < 47) {
        navigate('/country/ITA');
      } else if (lng > 20 && lng < 180 && lat > 41 && lat < 77) {
        navigate('/country/RUS');
      } else if (lng > 73 && lng < 135 && lat > 18 && lat < 54) {
        navigate('/country/CHN');
      } else if (lng > 129 && lng < 146 && lat > 31 && lat < 46) {
        navigate('/country/JPN');
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
