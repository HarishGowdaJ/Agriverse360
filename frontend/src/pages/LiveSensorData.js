import React, { useState, useEffect } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const LiveSensorData = () => {
  const [sensorData, setSensorData] = useState([]);
  const [lastSync, setLastSync] = useState(new Date().toLocaleTimeString());
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Mock data for the charts
  const mockData = [
    { time: '00:00', temperature: 22, humidity: 65, soilMoisture: 45 },
    { time: '02:00', temperature: 21, humidity: 68, soilMoisture: 44 },
    { time: '04:00', temperature: 20, humidity: 70, soilMoisture: 43 },
    { time: '06:00', temperature: 23, humidity: 67, soilMoisture: 46 },
    { time: '08:00', temperature: 26, humidity: 62, soilMoisture: 42 },
    { time: '10:00', temperature: 29, humidity: 58, soilMoisture: 40 },
    { time: '12:00', temperature: 32, humidity: 55, soilMoisture: 38 },
    { time: '14:00', temperature: 34, humidity: 52, soilMoisture: 37 },
    { time: '16:00', temperature: 33, humidity: 54, soilMoisture: 39 },
    { time: '18:00', temperature: 30, humidity: 57, soilMoisture: 41 },
    { time: '20:00', temperature: 27, humidity: 60, soilMoisture: 43 },
    { time: '22:00', temperature: 24, humidity: 63, soilMoisture: 44 },
  ];

  // Status cards data
  const statusCards = [
    { title: 'Temperature', value: '28°C', change: '+2.3°C from yesterday', icon: '🌡️', color: 'bg-red-100' },
    { title: 'Humidity', value: '58%', change: '-3% from yesterday', icon: '💧', color: 'bg-blue-100' },
    { title: 'Soil Moisture', value: '42%', change: 'Optimal level', icon: '🌱', color: 'bg-green-100' },
    { title: 'Weather', value: 'Sunny', change: 'High UV index today', icon: '☀️', color: 'bg-yellow-100' },
  ];

  // Simulate data refresh
  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSync(new Date().toLocaleTimeString());
      setIsRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    setSensorData(mockData);
  }, []);

  return (
    <div className="py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-green-700">Live Sensor Data</h1>
        <div className="flex items-center">
          <span className="text-sm text-gray-500 mr-4">Last sync: {lastSync}</span>
          <button 
            onClick={refreshData}
            disabled={isRefreshing}
            className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-green-700 transition duration-300 disabled:opacity-50"
          >
            {isRefreshing ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Refreshing...
              </>
            ) : 'Refresh Data'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statusCards.map((card, index) => (
          <div key={index} className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-500 mb-1">{card.title}</h3>
                <p className="text-3xl font-bold">{card.value}</p>
                <p className="text-sm text-gray-500 mt-2">{card.change}</p>
              </div>
              <div className={`text-3xl p-3 rounded-full ${card.color}`}>
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Temperature Trend</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={sensorData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTemperature" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="temperature" stroke="#ef4444" fillOpacity={1} fill="url(#colorTemperature)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-4">Humidity & Soil Moisture</h2>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={sensorData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="humidity" stroke="#3b82f6" activeDot={{ r: 8 }} />
                <Line type="monotone" dataKey="soilMoisture" stroke="#10b981" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Sensor Readings</h2>
          <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition duration-300">
            Download CSV
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature (°C)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Soil Moisture (%)</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Light Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">pH Level</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sensorData.slice().reverse().map((data, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">{data.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.temperature}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.humidity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{data.soilMoisture}</td>
                  <td className="px-6 py-4 whitespace-nowrap">720 lux</td>
                  <td className="px-6 py-4 whitespace-nowrap">6.8</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Weather Forecast</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-500">Today</p>
            <p className="text-3xl my-2">☀️</p>
            <p className="font-bold">28°C</p>
            <p className="text-sm text-gray-500">Sunny</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Fri</p>
            <p className="text-3xl my-2">⛅</p>
            <p className="font-bold">26°C</p>
            <p className="text-sm text-gray-500">Cloudy</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Sat</p>
            <p className="text-3xl my-2">🌧️</p>
            <p className="font-bold">24°C</p>
            <p className="text-sm text-gray-500">Rainy</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Sun</p>
            <p className="text-3xl my-2">🌦️</p>
            <p className="font-bold">25°C</p>
            <p className="text-sm text-gray-500">Showers</p>
          </div>
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-500">Mon</p>
            <p className="text-3xl my-2">☀️</p>
            <p className="font-bold">27°C</p>
            <p className="text-sm text-gray-500">Sunny</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveSensorData;