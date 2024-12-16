import React, { useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiYWxpa2hhbGVkIiwiYSI6ImNtMHZqejQyNjFpdmgycm9pZjhpdjZ3M2EifQ.TCysrVw9EIWL71W1_1m1dg'; 

function App() {
  const [viewState, setViewState] = useState({
    longitude: -117.8854, // Longitude for CSUF
    latitude: 33.8828, // Latitude for CSUF
    zoom: 14,
  });

  return (
    <div style={{ height: '100vh' }}>
      <Map
        {...viewState}
        style={{ width: '100%', height: '100%' }}
        mapStyle="mapbox://styles/mapbox/streets-v11" 
        mapboxAccessToken={MAPBOX_TOKEN}
        onMove={(evt) => setViewState(evt.viewState)}
      >
        <Marker longitude={-117.8854} latitude={33.8828} color="red" />
      </Map>
    </div>
  );
}

export default App;

