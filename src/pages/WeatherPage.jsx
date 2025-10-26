import React, { useState } from 'react';
import Navbar from '../components/layout/Navbar';

const WeatherPage = ({ onNavigate }) => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const API_KEY = '16e028695d6227e9d64d304c6dc5bff0';

  const fetchWeather = (query) => {
    setLoading(true);
    setError(null);
    fetch(query)
      .then((res) => {
        if (!res.ok) throw new Error('City not found');
        return res.json();
      })
      .then((data) => {
        setWeather(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const searchCity = () => {
    if (city.trim()) {
      fetchWeather(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`);
        },
        () => setError('Unable to retrieve location')
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onBack={() => onNavigate('dashboard')} backText="← Back to Dashboard" />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Weather Widget</h1>
        
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex gap-4 mb-4">
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city name..."
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && searchCity()}
            />
            <button
              onClick={searchCity}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Search
            </button>
            <button
              onClick={getCurrentLocation}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Current Location
            </button>
          </div>

          {loading && <p className="text-center text-gray-600 py-8">Fetching weather...</p>}
          {error && <p className="text-center text-red-600 py-8">{error}. Note: Weather requires a valid API key.</p>}
          
          {weather && !loading && (
            <div className="text-center py-8">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{weather.name}</h2>
              <img
                src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="weather icon"
                className="mx-auto w-32 h-32"
              />
              <p className="text-6xl font-bold text-blue-600 mb-2">{Math.round(weather.main.temp)}°C</p>
              <p className="text-xl text-gray-600 capitalize mb-4">{weather.weather[0].description}</p>
              <div className="flex justify-center gap-8 text-gray-600">
                <div>
                  <p className="text-sm">Humidity</p>
                  <p className="text-2xl font-bold">{weather.main.humidity}%</p>
                </div>
                <div>
                  <p className="text-sm">Feels Like</p>
                  <p className="text-2xl font-bold">{Math.round(weather.main.feels_like)}°C</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherPage;