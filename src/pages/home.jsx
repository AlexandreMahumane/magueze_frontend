import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';
import axios from 'axios';

// Ícone personalizado para o marcador do usuário
const userIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Ícone personalizado para os melhores locais
const bestLocationIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/888/888954.png',
  iconSize: [30, 45],
  iconAnchor: [15, 45],
  popupAnchor: [0, -40],
  shadowSize: [45, 45]
});

// Substitua 'YOUR_OPENWEATHERMAP_API_KEY' pela sua chave de API real
const API_KEY = '62ccc6d38b83b059f17e9ac05169f70b';

// Raio para busca de melhores locais (em metros)
const RADIUS = 50;

export const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [weatherData, setWeatherData] = useState({});
  const [bestLocations, setBestLocations] = useState([]); // Armazena os 3 melhores locais
  const [map, setMap] = useState(null);

  // Função para obter a localização do usuário
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        setUserLocation([userLat, userLon]);

        // Obter dados meteorológicos para a localização do usuário
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${userLat}&lon=${userLon}&appid=${API_KEY}&units=metric`
          );
          setWeatherData(weatherResponse.data);

          // Calcular e definir os 3 melhores locais
          calculateBestLocations(userLat, userLon);

        } catch (error) {
          console.error("Erro ao obter dados meteorológicos:", error);
        }
      }, (error) => {
        console.error("Erro ao obter localização:", error);
      });
    } else {
      console.error("Geolocalização não suportada.");
    }
  }, []);

  // Função para calcular os 3 melhores locais perto do usuário dentro do raio especificado
  const calculateBestLocations = async (userLat, userLon) => {
    let candidateLocations = [];

    // Gerar coordenadas próximas (latitude e longitude variam ligeiramente)
    for (let i = 0; i < 50; i++) { // Aumentar o número de pontos amostrados
      const randomLat = userLat + (Math.random() - 0.5) * 0.005; // Ajuste da variação para garantir que os pontos estejam dentro do raio
      const randomLon = userLon + (Math.random() - 0.5) * 0.005; // Ajuste da variação para garantir que os pontos estejam dentro do raio

      // Verificar se o ponto está dentro do raio especificado
      if (calculateDistance(userLat, userLon, randomLat, randomLon) <= RADIUS) {
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${randomLat}&lon=${randomLon}&appid=${API_KEY}&units=metric`
          );
          const locationWeatherData = weatherResponse.data;

          const score = calculateScore(locationWeatherData);
          candidateLocations.push({
            lat: randomLat,
            lng: randomLon,
            content: `Temperatura: ${locationWeatherData.main.temp}°C, Vento: ${locationWeatherData.wind.speed} m/s, Posição do Sol: Nascer - ${new Date(locationWeatherData.sys.sunrise * 1000).toLocaleTimeString()}, Pôr - ${new Date(locationWeatherData.sys.sunset * 1000).toLocaleTimeString()}`,
            score
          });
        } catch (error) {
          console.error("Erro ao obter dados meteorológicos para uma localização candidata:", error);
        }
      }
    }

    // Ordenar os locais candidatos por pontuação (maior para menor)
    candidateLocations.sort((a, b) => b.score - a.score);

    // Definir os 3 melhores locais
    setBestLocations(candidateLocations.slice(0, 3));
  };

  // Função para calcular a pontuação de um local com base nas condições climáticas
  const calculateScore = (weatherData) => {
    const windSpeedScore = weatherData.wind.speed;
    const sunExposureScore = new Date(weatherData.sys.sunset * 1000).getHours() - new Date(weatherData.sys.sunrise * 1000).getHours();
    return windSpeedScore + sunExposureScore;
  };

  // Função para calcular a distância entre dois pontos (em metros)
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Raio da Terra em metros
    const φ1 = lat1 * Math.PI / 180;
    const φ2 = lat2 * Math.PI / 180;
    const Δφ = (lat2 - lat1) * Math.PI / 180;
    const Δλ = (lon2 - lon1) * Math.PI / 180;

    const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
              Math.cos(φ1) * Math.cos(φ2) *
              Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c;
  };

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const lat = e.latlng.lat;
        const lng = e.latlng.lng;

        // Obter dados meteorológicos para a localização clicada
        try {
          const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
          );
          const clickedWeatherData = weatherResponse.data;

          const newMarker = {
            lat,
            lng,
            content: `Temperatura: ${clickedWeatherData.main.temp}°C, Vento: ${clickedWeatherData.wind.speed} m/s, Posição do Sol: Nascer - ${new Date(clickedWeatherData.sys.sunrise * 1000).toLocaleTimeString()}, Pôr - ${new Date(clickedWeatherData.sys.sunset * 1000).toLocaleTimeString()}`
          };

          setMarkers((prevMarkers) => [...prevMarkers, newMarker]);

          // Atualizar os melhores locais com base na nova localização clicada
          calculateBestLocations(lat, lng);
        } catch (error) {
          console.error("Erro ao obter dados meteorológicos:", error);
        }
      }
    });
    return null;
  };

  // Função para resetar os marcadores
  const resetMarkers = () => {
    setMarkers([]);
    if (userLocation) {
      calculateBestLocations(userLocation[0], userLocation[1]); // Recalcular os melhores locais com a localização do usuário
    }
  };

  // Função para salvar os marcadores (poderia ser adaptada para salvar em local storage ou back-end)
  const saveMarkers = () => {
    localStorage.setItem('savedMarkers', JSON.stringify(markers));
    alert("Marcadores salvos com sucesso!");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-6 bg-gray-100 mb-20">
          <h1 className="text-3xl font-bold mb-4">Home</h1>
          <div className="max-w-full bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4">Mapa de Propensão ao vento e sol</h2>
            <p className="mb-4">Utilize este mapa para marcar pontos de interesse e identificar o nível de propensão ao vento e sol.</p>
            <div className="map-container">
              {userLocation && (
                <MapContainer 
                  center={userLocation} 
                  zoom={13} 
                  scrollWheelZoom={false} 
                  style={{ height: "500px", width: "100%" }} 
                  whenCreated={setMap}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  <MapClickHandler />
                  <Marker position={userLocation} icon={userIcon}>
                    <Popup>
                      Você está aqui!<br />
                      {weatherData.main && `Temperatura: ${weatherData.main.temp}°C`}<br />
                      {weatherData.wind && `Vento: ${weatherData.wind.speed} m/s`}<br />
                      {weatherData.sys && `Nascer do Sol: ${new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}`}<br />
                      {weatherData.sys && `Pôr do Sol: ${new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}`}
                    </Popup>
                  </Marker>
                  {bestLocations.map((location, index) => (
                    <Marker key={index} position={[location.lat, location.lng]} icon={bestLocationIcon}>
                      <Popup>{location.content}</Popup>
                    </Marker>
                  ))}
                  <Circle
                    center={userLocation}
                    radius={RADIUS}
                    pathOptions={{ color: 'blue', fillColor: '#a0c4ff', fillOpacity: 0.5 }}
                  />
                  {markers.map((marker, index) => (
                    <Marker key={index} position={[marker.lat, marker.lng]}>
                      <Popup>{marker.content}</Popup>
                    </Marker>
                  ))}
                </MapContainer>
              )}
            </div>
            <div className="mt-4">
              <button 
                onClick={resetMarkers} 
                className="bg-red-500 text-white px-4 py-2 rounded-md mr-2"
              >
                Resetar Marcadores
              </button>
              <button 
                onClick={saveMarkers} 
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Salvar Marcadores
              </button>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Home;























