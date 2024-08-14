import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from '../components/Navbar'; // Importe o componente Navbar
import Sidebar from '../components/Sidebar'; // Importe o componente Sidebar
import Footer from '../components/Footer'; // Importe o componente Footer

// Criação de um ícone personalizado para o marcador do usuário
const userIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // Inicializado como null

  // Função para obter a localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation([position.coords.latitude, position.coords.longitude]);
      }, (error) => {
        console.error("Erro ao obter localização:", error);
      });
    }
  }, []);

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
    <div className="flex flex-col h-screen">
      <Navbar /> {/* Adicione a Navbar aqui */}
      <div className="flex flex-1">
        <Sidebar /> {/* Adicione a Sidebar aqui */}
        <main className="flex-1 p-6 bg-gray-100">
          <h1 className="text-3xl font-bold mb-4">Home</h1>
          <div className="max-w-full bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Mapa de Propensão ao vento e sol</h2>
            <p className="mb-4">Utilize este mapa para marcar pontos de interesse e identificar o nível de propensão ao vento.</p>
            <MapContainer className="h-96 w-full" center={userLocation || [51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapClickHandler />
              {userLocation && (
                <Marker position={userLocation} icon={userIcon}>
                  <Popup>Você está aqui</Popup>
                </Marker>
              )}
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
      <Footer /> {/* Adicione o Footer aqui */}
    </div>
  );
};

export default Home;















