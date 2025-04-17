
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface MapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
  height?: string;
  showControls?: boolean;
}

const Map = ({ 
  coordinates = { lat: 20.5937, lng: 78.9629 }, // Center of India
  height = "h-[400px]",
  showControls = true
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [showTokenInput, setShowTokenInput] = useState<boolean>(true);
  const { toast } = useToast();
  
  const initializeMap = (token: string) => {
    if (!mapContainer.current) return;
    
    // Dynamically import mapboxgl to prevent SSR issues
    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = token;
      
      const map = new mapboxgl.default.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [coordinates.lng, coordinates.lat],
        zoom: 4,
      });
      
      // Add marker at specified coordinates
      new mapboxgl.default.Marker()
        .setLngLat([coordinates.lng, coordinates.lat])
        .addTo(map);
      
      if (showControls) {
        map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
      }
      
      // Add India state boundaries
      map.on('load', () => {
        map.addSource('india-states', {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson',
        });
        
        map.addLayer({
          id: 'state-fills',
          type: 'fill',
          source: 'india-states',
          layout: {},
          paint: {
            'fill-color': '#627BC1',
            'fill-opacity': 0.3,
          },
        });
        
        map.addLayer({
          id: 'state-borders',
          type: 'line',
          source: 'india-states',
          layout: {},
          paint: {
            'line-color': '#627BC1',
            'line-width': 2,
          },
        });
        
        // India facts on hover
        const popup = new mapboxgl.default.Popup({
          closeButton: false,
          closeOnClick: false
        });
        
        map.on('mouseenter', 'state-fills', (e) => {
          if (e.features && e.features.length > 0) {
            const feature = e.features[0];
            const stateName = feature.properties.NAME_1;
            
            popup.setLngLat(e.lngLat)
              .setHTML(`<h3>${stateName}</h3>`)
              .addTo(map);
          }
        });
        
        map.on('mouseleave', 'state-fills', () => {
          popup.remove();
        });
      });
      
      return () => map.remove();
    });
  };
  
  const handleTokenSubmit = () => {
    if (mapboxToken.trim() === '') {
      toast({
        title: "Token Required",
        description: "Please enter a valid Mapbox token to display the map.",
        variant: "destructive"
      });
      return;
    }
    
    setShowTokenInput(false);
    initializeMap(mapboxToken);
    
    // Store token in localStorage for future use
    localStorage.setItem('mapbox_token', mapboxToken);
    
    toast({
      title: "Map Initialized",
      description: "The map has been loaded successfully."
    });
  };
  
  useEffect(() => {
    // Check if token exists in localStorage
    const savedToken = localStorage.getItem('mapbox_token');
    if (savedToken) {
      setMapboxToken(savedToken);
      setShowTokenInput(false);
      initializeMap(savedToken);
    }
  }, []);
  
  return (
    <div className={`w-full ${height} rounded-lg overflow-hidden relative`}>
      {showTokenInput ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-6">
          <h3 className="text-lg font-medium mb-4">Mapbox API Token Required</h3>
          <p className="text-sm text-gray-600 mb-4 text-center">
            To display the map, please enter your Mapbox public token. 
            You can get one by signing up at <a href="https://mapbox.com/" target="_blank" rel="noopener noreferrer" className="text-fixit-primary">mapbox.com</a>
          </p>
          <div className="w-full max-w-md">
            <input
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              placeholder="Enter your Mapbox public token"
              className="w-full px-4 py-2 border border-gray-300 rounded-md mb-4"
            />
            <Button
              onClick={handleTokenSubmit}
              className="w-full bg-fixit-primary hover:bg-fixit-secondary"
            >
              Load Map
            </Button>
          </div>
        </div>
      ) : null}
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default Map;
