
import React, { useEffect, useRef, useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { MapPinIcon, LocateIcon, LayersIcon } from 'lucide-react';

interface MapProps {
  coordinates?: {
    lat: number;
    lng: number;
  };
  height?: string;
  showControls?: boolean;
  zoomLevel?: number;
  showStateInfo?: boolean;
}

const Map = ({ 
  coordinates = { lat: 22.5937, lng: 78.9629 }, // Center of India
  height = "h-[400px]",
  showControls = true,
  zoomLevel = 4,
  showStateInfo = false
}: MapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
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
        zoom: zoomLevel,
        minZoom: 3, // Prevent zooming out too far
        maxBounds: [
          [65.5, 6.5], // Southwest coordinates
          [100.0, 37.0] // Northeast coordinates
        ]
      });
      
      mapRef.current = map;
      
      // Add marker at specified coordinates for specific locations
      if (coordinates.lat !== 22.5937 || coordinates.lng !== 78.9629) {
        new mapboxgl.default.Marker({
          color: "#FF5252"
        })
          .setLngLat([coordinates.lng, coordinates.lat])
          .addTo(map);
      }
      
      if (showControls) {
        map.addControl(new mapboxgl.default.NavigationControl(), 'top-right');
        map.addControl(new mapboxgl.default.FullscreenControl(), 'top-right');
        map.addControl(new mapboxgl.default.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true
        }), 'top-right');
      }
      
      // Add India state boundaries
      map.on('load', () => {
        // Add source for state boundaries
        map.addSource('india-states', {
          type: 'geojson',
          data: 'https://raw.githubusercontent.com/geohacker/india/master/state/india_state.geojson',
        });
        
        // Add fill layer
        map.addLayer({
          id: 'state-fills',
          type: 'fill',
          source: 'india-states',
          layout: {},
          paint: {
            'fill-color': [
              'interpolate',
              ['linear'],
              ['get', 'ID_1'],
              1, '#BBDEFB',  // Different colors for different states
              10, '#90CAF9',
              20, '#64B5F6',
              30, '#42A5F5'
            ],
            'fill-opacity': 0.5,
            'fill-outline-color': '#1976D2'
          }
        });
        
        // Add outline layer
        map.addLayer({
          id: 'state-borders',
          type: 'line',
          source: 'india-states',
          layout: {},
          paint: {
            'line-color': '#1976D2',
            'line-width': 1.5,
            'line-opacity': 0.8
          }
        });
        
        // India facts on hover (if showStateInfo is true)
        if (showStateInfo) {
          // State info popup
          const popup = new mapboxgl.default.Popup({
            closeButton: false,
            closeOnClick: false,
            className: 'state-popup',
            maxWidth: '300px'
          });
          
          map.on('mouseenter', 'state-fills', (e) => {
            if (e.features && e.features.length > 0) {
              const feature = e.features[0];
              map.getCanvas().style.cursor = 'pointer';
              
              const stateName = feature.properties.NAME_1;
              const stateId = feature.properties.ID_1;
              
              const popupContent = `
                <div class="p-2">
                  <h3 class="font-bold text-lg">${stateName}</h3>
                  <p class="text-sm text-gray-600">State ID: ${stateId}</p>
                </div>
              `;
              
              popup.setLngLat(e.lngLat)
                .setHTML(popupContent)
                .addTo(map);
            }
          });
          
          map.on('mouseleave', 'state-fills', () => {
            map.getCanvas().style.cursor = '';
            popup.remove();
          });
          
          // Make states clickable
          map.on('click', 'state-fills', (e) => {
            if (e.features && e.features.length > 0) {
              const feature = e.features[0];
              const stateName = feature.properties.NAME_1;
              
              toast({
                title: stateName,
                description: `You clicked on ${stateName}. View issues in this state.`,
                action: (
                  <Button variant="outline" size="sm" className="h-8">
                    <MapPinIcon className="mr-2 h-4 w-4" />
                    View Issues
                  </Button>
                ),
              });
            }
          });
        }

        // Add major cities
        const cities = [
          { name: "Delhi", coordinates: [77.209, 28.6139], size: 15 },
          { name: "Mumbai", coordinates: [72.8777, 19.0760], size: 15 },
          { name: "Kolkata", coordinates: [88.3639, 22.5726], size: 14 },
          { name: "Chennai", coordinates: [80.2707, 13.0827], size: 14 },
          { name: "Bengaluru", coordinates: [77.5946, 12.9716], size: 14 },
          { name: "Hyderabad", coordinates: [78.4867, 17.3850], size: 14 },
          { name: "Ahmedabad", coordinates: [72.5714, 23.0225], size: 13 },
          { name: "Pune", coordinates: [73.8567, 18.5204], size: 13 },
          { name: "Jaipur", coordinates: [75.7873, 26.9124], size: 13 }
        ];

        // Add city markers with popups
        cities.forEach(city => {
          const el = document.createElement('div');
          el.className = 'city-marker';
          el.style.width = `${city.size}px`;
          el.style.height = `${city.size}px`;
          el.style.borderRadius = '50%';
          el.style.backgroundColor = '#3498db';
          el.style.border = '2px solid #fff';
          el.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
          
          // Add a popup for each city
          const popup = new mapboxgl.default.Popup({ offset: 10 })
            .setHTML(`<h3>${city.name}</h3>`);
          
          // Fix: Convert array to LngLatLike object
          new mapboxgl.default.Marker(el)
            .setLngLat({ lng: city.coordinates[0], lat: city.coordinates[1] })
            .setPopup(popup)
            .addTo(map);
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
    localStorage.setItem('mapbox_token', mapboxToken);
    initializeMap(mapboxToken);
    
    toast({
      title: "Map Initialized",
      description: "The map has been loaded successfully.",
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
    <div className={`w-full ${height} relative rounded-lg overflow-hidden shadow-md border border-gray-200`}>
      {showTokenInput ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 p-6 z-10">
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
              <MapPinIcon className="mr-2 h-4 w-4" />
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
