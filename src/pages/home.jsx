// src/pages/Home.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar'; // Importe o componente Navbar
import Sidebar from '../components/Sidebar'; // Importe o componente Sidebar

export const Home = () => {
  const [markers, setMarkers] = useState([]);

  const MapClickHandler = () => {
    useMapEvents({
      click(e) {
        const newMarker = {
          lat: e.latlng.lat,
          lng: e.latlng.lng,
          content: prompt("Insira o nível de propensão ao vento neste ponto:")
        };
        setMarkers([...markers, newMarker]);
      }
    });
    return null;
  };

  const resetMarkers = () => {
    setMarkers([]);
  };

  const saveMarkers = () => {
    alert("Alterações salvas!");
  };

  return (
    <div className="flex h-screen flex-col">
      <Navbar /> {/* Adicione a Navbar aqui */}
      <div className="flex flex-1">
        <Sidebar /> {/* Adicione a Sidebar aqui */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Home</h1>
          <div className="max-w-full bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Mapa de Propensão ao vento e sol</h2>
            <p className="mb-4">Utilize este mapa para marcar pontos de interesse e identificar o nível de propensão ao vento.</p>
            <MapContainer className="h-96 w-full" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler />
              {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]}>
                  <Popup>{marker.content}</Popup>
                </Marker>
              ))}
            </MapContainer>
            <div className="flex justify-between mt-4">
              <button 
                onClick={saveMarkers} 
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                Salvar
              </button>
              <button 
                onClick={resetMarkers} 
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
                Resetar
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;













