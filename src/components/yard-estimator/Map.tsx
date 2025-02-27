
import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import { useNavigate } from 'react-router-dom';
import 'mapbox-gl/dist/mapbox-gl.css';
import { toast } from 'sonner';

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

    // Wait for the map style to load before adding layers
    map.current.on('style.load', () => {
      // Add source for country boundaries
      map.current?.addSource('country-boundaries', {
        type: 'vector',
        url: 'mapbox://mapbox.country-boundaries-v1'
      });

      // Add a layer showing country boundaries
      map.current?.addLayer({
        'id': 'country-fills',
        'type': 'fill',
        'source': 'country-boundaries',
        'source-layer': 'country_boundaries',
        'paint': {
          'fill-color': 'transparent',
          'fill-opacity': 0.5
        }
      });
    });

    // Add country click handler
    map.current.on('click', 'country-fills', (e) => {
      if (!e.features || e.features.length === 0) return;

      const feature = e.features[0];
      const countryCode = feature.properties?.iso_3166_1_alpha_3;

      if (countryCode) {
        console.log('Clicked country code:', countryCode);
        navigate(`/country/${countryCode}`);
      } else {
        toast.error('Country data not available');
      }
    });

    // Add hover effect
    map.current.on('mousemove', 'country-fills', () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = 'pointer';
      }
    });

    map.current.on('mouseleave', 'country-fills', () => {
      if (map.current) {
        map.current.getCanvas().style.cursor = '';
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
