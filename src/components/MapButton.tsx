
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { MapIcon } from 'lucide-react';

const MapButton = () => {
  return (
    <Link to="/india-map">
      <Button variant="outline" className="flex items-center gap-2 bg-white/80 hover:bg-white/90 text-fixit-primary border-fixit-primary/30 transition-all hover:shadow-md">
        <MapIcon className="h-4 w-4" />
        <span>View Map</span>
      </Button>
    </Link>
  );
};

export default MapButton;
