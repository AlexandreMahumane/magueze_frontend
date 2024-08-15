import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Circle, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import { Footer } from '../components/footer';
import { Header } from '../components/header';


const WEATHER_API_KEY = '62ccc6d38b83b059f17e9ac05169f70b';

export const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const [weatherData, setWeatherData] = useState(null);
  const [cityName, setCityName] = useState('');
  const [searchCity, setSearchCity] = useState('');

 
  const mapRef = useRef();

  useEffect(() => {
   
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setUserLocation([latitude, longitude]);
            setMapCenter([latitude, longitude]); 
            fetchWeatherData(latitude, longitude); 
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
          units: 'metric' 
        }
      });
      setWeatherData(response.data);
      setCityName(response.data.name); 
    } catch (error) {
      console.error('Erro ao obter dados meteorológicos:', error);
      alert('Não foi possível obter os dados meteorológicos.');
    }
  };

  const fetchWeatherByCity = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
        params: {
          q: searchCity,
          appid: WEATHER_API_KEY,
          units: 'metric'
        }
      });
      const { lat, lon } = response.data.coord;
      setWeatherData(response.data);
      setCityName(response.data.name);
      setMapCenter([lat, lon]);
    } catch (error) {
      console.error('Erro ao obter dados meteorológicos por cidade:', error);
      alert('Não foi possível obter os dados meteorológicos para a cidade informada.');
    }
  };

  
  const resetMarkers = () => {
    setMarkers([]);
    if (userLocation) {
      calculateBestLocations(userLocation[0], userLocation[1]); 
    }
  };


  const saveMarkers = () => {
    localStorage.setItem('savedMarkers', JSON.stringify(markers));
    alert("Marcadores salvos com sucesso!");
  };


  const MoveToLocation = ({ position }) => {
    const map = useMap();
    useEffect(() => {
      if (position) {
        map.flyTo(position, 13); 
      }
    }, [position, map]);

    return null;
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-1 flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 p-4 lg:p-6 bg-gray-100">
          <div className="bg-white shadow-md rounded-lg p-4 lg:p-6">
            <div className="mb-4">
              <input
                type="text"
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                placeholder="Digite o nome da cidade"
                className="border border-gray-300 rounded p-2 w-full"
              />
              <button
                onClick={fetchWeatherByCity}
                className="bg-green-500 text-white py-2 px-4 rounded mt-2 hover:bg-green-600"
              >
                Pesquisar Cidade
              </button>
            </div>

            <MapContainer
              className="h-64 w-full lg:h-96"
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={false}
              whenCreated={mapInstance => { mapRef.current = mapInstance; }} 
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {markers.map((marker, idx) => (
                <Marker key={idx} position={[marker.lat, marker.lng]} />
              ))}
              {userLocation && (
                <>
                  <Marker
                    position={userLocation}
                    eventHandlers={{
                      click: () => {
                        if (mapRef.current) {
                          mapRef.current.flyTo(userLocation, 13); 
                        }
                      },
                    }}
                  />
                  <Circle
                    center={userLocation}
                    radius={3000} 
                    color="blue"
                    fillColor="lightblue"
                  />
                </>
              )}
              <MoveToLocation position={userLocation} />
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

      
        <div className="w-full lg:w-80 p-4 lg:p-6 bg-white shadow-md rounded-lg mt-4 lg:mt-0 lg:ml-6">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">Informações em Tempo Real</h2>
          {weatherData ? (
            <div>
              <p><strong>Cidade:</strong> {cityName}</p>
              <p><strong>Temperatura:</strong> {weatherData.main.temp} °C</p>
              <p><strong>Velocidade do Vento:</strong> {weatherData.wind.speed} m/s</p>
              <p><strong>Direção do Vento:</strong> {weatherData.wind.deg}°</p>
              <p><strong>Por favor agora gire o seu painel solar a 30° ao sul</strong></p>
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
