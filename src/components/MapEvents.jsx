import React from 'react';
import { useMapEvents } from 'react-leaflet';

const MapEvents = ({ onClick }) => {
  useMapEvents({
    click(e) {
      onClick(e);
    }
  });

  return null;
};

export default MapEvents;

