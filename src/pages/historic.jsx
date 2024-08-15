import React, { useState, useEffect } from 'react';
import { Header } from '../components/header';
import { Footer } from '../components/footer';


const determineBestPosition = (weatherData) => {
  const positionAltitudeMap = {};

  weatherData.forEach(entry => {
    const direction = entry.windDirection;
    if (!positionAltitudeMap[direction]) {
      positionAltitudeMap[direction] = { totalAltitude: 0, count: 0 };
    }
    positionAltitudeMap[direction].totalAltitude += entry.solarAltitude;
    positionAltitudeMap[direction].count += 1;
  });

  let bestPosition = '';
  let maxAverageAltitude = -Infinity;

  for (const direction in positionAltitudeMap) {
    const averageAltitude = positionAltitudeMap[direction].totalAltitude / positionAltitudeMap[direction].count;
    if (averageAltitude > maxAverageAltitude) {
      maxAverageAltitude = averageAltitude;
      bestPosition = direction;
    }
  }

  return bestPosition;
};

export const Historic = () => {
  const [weatherData, setWeatherData] = useState([
    { date: '2024-08-01', time: '08:00', solarAltitude: 25.0, temperature: 20.0, windDirection: 'Norte', windSpeed: 12.0 },
    { date: '2024-08-01', time: '12:00', solarAltitude: 45.5, temperature: 23.4, windDirection: 'Norte', windSpeed: 15.2 },
    { date: '2024-08-01', time: '16:00', solarAltitude: 35.0, temperature: 22.0, windDirection: 'Oeste', windSpeed: 14.0 },
    { date: '2024-08-01', time: '20:00', solarAltitude: 15.0, temperature: 19.0, windDirection: 'Oeste', windSpeed: 13.5 },
    { date: '2024-08-02', time: '08:00', solarAltitude: 22.0, temperature: 21.0, windDirection: 'Norte', windSpeed: 10.5 },
    { date: '2024-08-02', time: '12:00', solarAltitude: 44.0, temperature: 24.0, windDirection: 'Noroeste', windSpeed: 12.5 },
    { date: '2024-08-02', time: '16:00', solarAltitude: 36.0, temperature: 23.0, windDirection: 'Oeste', windSpeed: 13.0 },
  ]);

  const [bestTime, setBestTime] = useState('');
  const [bestPosition, setBestPosition] = useState('');
  const [isHistoryVisible, setIsHistoryVisible] = useState(false); 

  useEffect(() => {
    const calculateBestTime = () => {
      const timeAltitudeMap = {};

      weatherData.forEach(entry => {
        const key = `${entry.time}`;
        if (!timeAltitudeMap[key]) {
          timeAltitudeMap[key] = { totalAltitude: 0, count: 0 };
        }
        timeAltitudeMap[key].totalAltitude += entry.solarAltitude;
        timeAltitudeMap[key].count += 1;
      });

      let bestHour = '';
      let maxAverageAltitude = -Infinity;

      for (const time in timeAltitudeMap) {
        const averageAltitude = timeAltitudeMap[time].totalAltitude / timeAltitudeMap[time].count;
        if (averageAltitude > maxAverageAltitude) {
          maxAverageAltitude = averageAltitude;
          bestHour = time;
        }
      }

      setBestTime(bestHour);
    };

    calculateBestTime();
    setBestPosition(determineBestPosition(weatherData));
  }, [weatherData]);

  const getRowClass = (item) => {
    const highTemp = item.temperature > 26;
    const highWind = item.windSpeed > 15;
    
    if (highTemp && highWind) {
      return 'bg-purple-100';
    } else if (highTemp) {
      return 'bg-red-100';
    } else if (highWind) {
      return 'bg-blue-100';
    } else {
      return 'bg-white';
    }
  };

  return (
    <>
    <Header/>
    <div className="container mx-auto p-6">
        <div className="bg-gray-50 rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Histórico de Dados Meteorológicos</h2>
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Data</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Hora</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Altura do Sol (graus)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Temperatura (°C)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Direção do Vento (°)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">Velocidade do Vento (km/h)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {weatherData.map((item, index) => (
                <tr key={index} className={getRowClass(item)}>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.solarAltitude}°</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.temperature}°C</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.windDirection}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800">{item.windSpeed} km/h</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
  
    </div>
    <Footer/>
    </>
  );
};


