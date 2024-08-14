// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import RenewableEnergyHistory from '../components/historico';
import axios from 'axios';
import { Footer } from '../components/footer';

// Substitua pela sua chave de API do OpenWeatherMap
const WEATHER_API_KEY = '62ccc6d38b83b059f17e9ac05169f70b';


export const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');

  useEffect(() => {
    // Obtém a localização atual do usuário
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setMapCenter([latitude, longitude]); // Define o centro do mapa como a localização do usuário
            fetchWeatherData(latitude, longitude); // Obtém dados do tempo e da cidade
          },
          (error) => {
            console.error('Erro ao obter a localização:', error);
            alert('Não foi possível obter sua localização. Verifique se o acesso à localização está habilitado no seu navegador.');
          }
        );
      } else {
        console.error('Geolocalização não é suportada por este navegador.');
        alert('Seu navegador não suporta geolocalização.');
      }
    };

    getUserLocation();
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          lat,
          lon,
          appid: WEATHER_API_KEY,
          units: 'metric' // Para obter a temperatura em Celsius
        }
      });
      setWeatherData(response.data);
      setCityName(response.data.name); // Nome da cidade atual
    } catch (error) {
      console.error('Erro ao obter dados meteorológicos:', error);
      alert('Não foi possível obter os dados meteorológicos.');
    }
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
    <div className="flex flex-col h-screen">
      <Navbar />
      <RenewableEnergyHistory/>
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6 bg-gray-100">
     
          <div className="bg-white shadow-md rounded-lg p-4 lg:p-6">
       
            <MapContainer className="h-64 w-full lg:h-96" center={mapCenter} zoom={13} scrollWheelZoom={false}>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]} />
              ))}
              {userLocation && (
                <>
                  <Marker position={userLocation} />
                  <Circle center={userLocation} radius={10000} color="blue" fillColor="lightblue" />
                </>
              )}
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

        {/* Painel lateral com informações meteorológicas */}
        <div className="w-full lg:w-80 p-4 lg:p-6 bg-white shadow-md rounded-lg mt-4 lg:mt-0 lg:ml-6">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">Informações em Tempo Real</h2>
          {weatherData ? (
            <div>
              <p><strong>Cidade:</strong> {cityName}</p>
              <p><strong>Temperatura:</strong> {weatherData.main.temp} °C</p>
              <p><strong>Velocidade do Vento:</strong> {weatherData.wind.speed} m/s</p>
              <p><strong>Direção do Vento:</strong> {weatherData.wind.deg}°</p>
            </div>
          ) : (
            <p>Carregando dados meteorológicos...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
