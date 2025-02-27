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
          center: [0, 20] as [number, number],
          zoom: 1.5,
          pitch: 0,
          bearing: 0
        }
      : { 
          center: [0, 20] as [number, number],
          zoom: 2,
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

    // Add country click handler using Mapbox's queryRenderedFeatures
    map.current.on('click', (e) => {
      if (!map.current) return;

      // Query rendered features at clicked point
      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ['admin-0-boundary', 'admin-0-boundary-disputed']
      });

      if (features.length > 0) {
        // Get the country code from the feature properties
        const countryCode = features[0].properties?.iso_3166_1;
        if (countryCode) {
          navigate(`/country/${countryCode}`);
        }
      }
    });

    // Add hover effect
    map.current.on('mousemove', (e) => {
      if (!map.current) return;

      const features = map.current.queryRenderedFeatures(e.point, {
        layers: ['admin-0-boundary', 'admin-0-boundary-disputed']
      });

      // Change cursor style
      map.current.getCanvas().style.cursor = features.length ? 'pointer' : '';
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
