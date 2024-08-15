import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Circle, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Sidebar from "../components/Sidebar";

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { api } from "../api/index.";
import { SearchInput } from "../components/forms/searchInput";

export const Home = () => {
  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState([0, 0]);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude, longitude);
            setUserLocation([latitude, longitude]);
            setMapCenter([latitude, longitude]);
            fetchData(latitude, longitude);
          },
          (error) => {
            console.error("Erro ao obter a localização:", error);
            alert(
              "Não foi possível obter sua localização. Verifique se o acesso à localização está habilitado no seu navegador."
            );
          }
        );
      }
    };

    const fetchData = async (latitude, longitude) => {
      try {
        const response = await api.post("/user/api/service/information", {
          latitude,
          longitude,
        });
        console.log(response.data);
        setData(response.data);
        return setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    getUserLocation();
  }, []);

  const resetMarkers = () => {
    setMarkers([]);
    if (userLocation) {
      calculateBestLocations(userLocation[0], userLocation[1]);
    }
  };

  const saveMarkers = async (data) => {
    try {
      alert("Dado salvo");
      const token = localStorage.getItem("authToken");
      console.log(token);
      if (!token) {
        console.error("Token não encontrado!");
        return;
      }

      const response = await api.post("/user/api/service", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error) {
      console.error("Erro ao salvar dados:", error);
    }
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
            <MapContainer
              className="h-64 w-full lg:h-96"
              center={mapCenter}
              zoom={13}
              scrollWheelZoom={false}
              whenCreated={(mapInstance) => {
                mapRef.current = mapInstance;
              }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
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
                    radius={2000}
                    color="blue"
                    fillColor="lightblue"
                  />
                </>
              )}
              <MoveToLocation position={userLocation} />
            </MapContainer>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => saveMarkers(data)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Salvar
              </button>
              <button
                onClick={resetMarkers}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
              >
                Resetar
              </button>
            </div>
          </div>
        </main>

        <div className="w-full lg:w-80 p-4 lg:p-6 bg-white shadow-md rounded-lg mt-4 lg:mt-0 lg:ml-6">
          <h2 className="text-xl lg:text-2xl font-bold mb-4">
            Informações em Tempo Real
          </h2>
          {data ? (
            <div>
              <p>
                <strong>Cidade:</strong> {data.city}
              </p>
              <p>
                <strong>Temperatura:</strong> {data.temp} °C
              </p>
              <p>
                <strong>Velocidade do Vento:</strong> {data.wind_speed} km/h
              </p>
              <p>
                <strong>Direção do Vento:</strong> {data.wind_direction}°
              </p>
              <p>
                <strong>Direção do Vento:</strong> {data.wind_cdir_full}
              </p>
              <p>
                <strong>Direção do Sol:</strong> {data.solar_rad}°
              </p>
              <p>
                <strong>Nascer do Sol:</strong> {data.sunrise}
              </p>
              <p>
                <strong>Por do Sol:</strong> {data.sunset}
              </p>
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
