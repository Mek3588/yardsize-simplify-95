
import React, { useEffect, useRef } from 'react';
import mapboxgl, { LngLatLike } from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import * as turf from '@turf/turf';
import { toast } from 'sonner';
import 'mapbox-gl/dist/mapbox-gl.css';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

interface MapProps {
  onAreaUpdate: (area: number | null) => void;
}

interface MapCoordinates {
  center: LngLatLike;
  zoom: number;
}

const Map: React.FC<MapProps> = ({ onAreaUpdate }) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const draw = useRef<any>(null);

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

    // Check if device is mobile
    const isMobile = window.innerWidth <= 768;
    
    // Set different initial coordinates and zoom level based on device type
    const initialCoordinates: MapCoordinates = isMobile 
      ? { center: [-98.5795, 45] as [number, number], zoom: 2.5 }
      : { center: [-98.5795, 39.8283] as [number, number], zoom: 3 };

    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWF0dyIsImEiOiJjbTdjbHM1cWwwc2ttMm5vbXJqemRlc2V1In0.UlFjTgFW2a4HeEZLe8MG3w';
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/satellite-streets-v12',
      center: initialCoordinates.center,
      zoom: initialCoordinates.zoom,
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

    // Create a custom container for the draw controls
    const customContainer = document.createElement('div');
    customContainer.className = 'custom-draw-controls fixed top-16 right-2 md:right-4 z-[999]';
    document.body.appendChild(customContainer);

    // Add the draw control using 'top-right' position string instead of DOM element
    if (map.current) {
      map.current.addControl(draw.current, 'top-right');
    }

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), 'bottom-right');

    // Add custom styles for the draw controls
    const style = document.createElement('style');
    style.textContent = `
      .custom-draw-controls {
        background: white;
        border-radius: 4px;
        box-shadow: 0 0 10px rgba(0,0,0,0.1);
        overflow: hidden;
      }
      .custom-draw-controls .mapbox-gl-draw_ctrl-draw-btn {
        width: 100% !important;
        height: 100% !important;
        position: relative !important;
        cursor: pointer !important;
        background-color: white !important;
        border: 1px solid #e2e8f0 !important;
        margin: 0 !important;
      }
      .custom-draw-controls .mapbox-gl-draw_ctrl-draw-btn:hover {
        background-color: #f8fafc !important;
      }
      .custom-draw-controls .mapboxgl-ctrl-group {
        margin: 0 !important;
        box-shadow: none !important;
      }
      .mapbox-gl-draw_ctrl-draw-btn::after {
        content: '';
        position: absolute;
        inset: 0;
      }
    `;
    document.head.appendChild(style);

    const updateArea = () => {
      const data = draw.current.getAll();
      if (data.features.length > 0) {
        const area = turf.area(data);
        const squareFeet = area * 10.7639;
        onAreaUpdate(Math.round(squareFeet));
        toast.success('Yard size calculated!');
      } else {
        onAreaUpdate(null);
      }
    };

    map.current.on('draw.create', updateArea);
    map.current.on('draw.delete', updateArea);
    map.current.on('draw.update', updateArea);

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

    // Add listener for clearing drawing
    const handleClearDrawing = () => {
      if (draw.current) {
        draw.current.deleteAll();
      }
    };

    window.addEventListener('updateMapCenter', handleCenterUpdate as EventListener);
    window.addEventListener('clearDrawing', handleClearDrawing as EventListener);

    return () => {
      map.current?.remove();
      window.removeEventListener('updateMapCenter', handleCenterUpdate as EventListener);
      window.removeEventListener('clearDrawing', handleClearDrawing as EventListener);
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
      if (customContainer) {
        customContainer.remove();
      }
      style.remove();
    };
  }, [onAreaUpdate]);

  return <div ref={mapContainer} className="absolute inset-0" />;
};

export default Map;
