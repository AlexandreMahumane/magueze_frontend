 import React, { useState, useEffect } from 'react';

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

const RenewableEnergyHistory = () => {
  const [weatherData, setWeatherData] = useState([
    { date: '2024-08-01', time: '08:00', solarAltitude: 25.0, temperature: 20.0, windDirection: 'Norte', windSpeed: 12.0 },
    { date: '2024-08-01', time: '12:00', solarAltitude: 45.5, temperature: 23.4, windDirection: 'Norte', windSpeed: 15.2 },
    { date: '2024-08-01', time: '16:00', solarAltitude: 35.0, temperature: 22.0, windDirection: 'Oeste', windSpeed: 14.0 },
    { date: '2024-08-01', time: '20:00', solarAltitude: 15.0, temperature: 19.0, windDirection: 'Oeste', windSpeed: 13.5 },
    { date: '2024-08-02', time: '08:00', solarAltitude: 22.0, temperature: 21.0, windDirection: 'Norte', windSpeed: 10.5 },
    { date: '2024-08-02', time: '12:00', solarAltitude: 44.0, temperature: 24.0, windDirection: 'Noroeste', windSpeed: 12.5 },
    { date: '2024-08-02', time: '16:00', solarAltitude: 36.0, temperature: 23.0, windDirection: 'Oeste', windSpeed: 13.0 },
    { date: '2024-08-02', time: '20:00', solarAltitude: 18.0, temperature: 20.0, windDirection: 'Oeste', windSpeed: 11.0 },
    { date: '2024-08-03', time: '08:00', solarAltitude: 24.0, temperature: 20.5, windDirection: 'Noroeste', windSpeed: 11.0 },
    { date: '2024-08-03', time: '12:00', solarAltitude: 46.0, temperature: 25.0, windDirection: 'Noroeste', windSpeed: 14.5 },
    { date: '2024-08-03', time: '16:00', solarAltitude: 37.0, temperature: 24.0, windDirection: 'Oeste', windSpeed: 13.5 },
    { date: '2024-08-03', time: '20:00', solarAltitude: 19.0, temperature: 21.0, windDirection: 'Oeste', windSpeed: 12.0 },
    { date: '2024-08-04', time: '08:00', solarAltitude: 23.0, temperature: 21.5, windDirection: 'Norte', windSpeed: 13.0 },
    { date: '2024-08-04', time: '12:00', solarAltitude: 47.0, temperature: 26.0, windDirection: 'Noroeste', windSpeed: 14.0 },
    { date: '2024-08-04', time: '16:00', solarAltitude: 38.0, temperature: 25.0, windDirection: 'Oeste', windSpeed: 15.0 },
    { date: '2024-08-04', time: '20:00', solarAltitude: 20.0, temperature: 22.0, windDirection: 'Oeste', windSpeed: 13.0 },
    { date: '2024-08-05', time: '08:00', solarAltitude: 26.0, temperature: 22.0, windDirection: 'Norte', windSpeed: 12.5 },
    { date: '2024-08-05', time: '12:00', solarAltitude: 49.0, temperature: 27.0, windDirection: 'Noroeste', windSpeed: 16.0 },
    { date: '2024-08-05', time: '16:00', solarAltitude: 40.0, temperature: 26.0, windDirection: 'Oeste', windSpeed: 15.5 },
    { date: '2024-08-05', time: '20:00', solarAltitude: 22.0, temperature: 23.0, windDirection: 'Oeste', windSpeed: 14.0 },
    { date: '2024-08-06', time: '08:00', solarAltitude: 27.0, temperature: 22.5, windDirection: 'Norte', windSpeed: 13.5 },
    { date: '2024-08-06', time: '12:00', solarAltitude: 50.0, temperature: 28.0, windDirection: 'Noroeste', windSpeed: 16.5 },
    { date: '2024-08-06', time: '16:00', solarAltitude: 41.0, temperature: 27.0, windDirection: 'Oeste', windSpeed: 16.0 },
    { date: '2024-08-06', time: '20:00', solarAltitude: 23.0, temperature: 24.0, windDirection: 'Oeste', windSpeed: 15.0 },
    { date: '2024-08-07', time: '08:00', solarAltitude: 28.0, temperature: 23.0, windDirection: 'Norte', windSpeed: 14.0 },
    { date: '2024-08-07', time: '12:00', solarAltitude: 51.0, temperature: 29.0, windDirection: 'Noroeste', windSpeed: 17.0 },
    { date: '2024-08-07', time: '16:00', solarAltitude: 42.0, temperature: 28.0, windDirection: 'Oeste', windSpeed: 16.5 },
    { date: '2024-08-07', time: '20:00', solarAltitude: 24.0, temperature: 25.0, windDirection: 'Oeste', windSpeed: 15.5 },
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
    <div className="container mx-auto p-6">
      <div className="bg-blue-50 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-blue-800">Melhor Horário para Posicionar a Bateria Solar</h2>
        <p className="text-lg text-blue-600">{bestTime ? `O melhor horário é: ${bestTime}` : 'Calculando...'}</p>
      </div>

      <div className="bg-teal-50 rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-2xl font-bold mb-2 text-teal-800">Melhor Posição para Posicionar a Bateria Solar</h2>
        <p className="text-lg text-teal-600">{bestPosition ? `A melhor posição é: ${bestPosition}` : 'Calculando...'}</p>
      </div>

      <button
        onClick={() => setIsHistoryVisible(!isHistoryVisible)}
        className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded transition duration-300 mb-6"
      >
        {isHistoryVisible ? 'Ocultar Histórico' : 'Exibir Histórico'}
      </button>

      {isHistoryVisible && (
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
      )}
    </div>
  );
};

export default RenewableEnergyHistory;
