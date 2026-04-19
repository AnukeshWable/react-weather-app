import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import WeatherCard from './components/WeatherCard/WeatherCard';
import Forecast from './components/Forecast/Forecast';
import SatelliteMap from './components/SatelliteMap/SatelliteMap';
import { fetchWeather } from './services/api';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [locationName, setLocationName] = useState('London');
  const [coords, setCoords] = useState({ lat: 51.5085, lon: -0.1257 });
  const [loading, setLoading] = useState(true);
  // Anukezh

  // Initialize with default location (London coordinates)
  useEffect(() => {
    loadWeatherData(51.5085, -0.1257, 'London');
  }, []);

  const loadWeatherData = async (lat, lon, name) => {
    setLoading(true);
    const data = await fetchWeather(lat, lon);
    if (data) {
      setWeatherData(data);
      setLocationName(name);
      setCoords({ lat, lon });
    }
    setLoading(false);
  };

  const handleLocationSelect = (loc) => {
    loadWeatherData(loc.latitude, loc.longitude, loc.name);
  };

  return (
    <div className="app-container">
      <div className="main-content">
        <SearchBar onLocationSelect={handleLocationSelect} />
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : weatherData ? (
          <>
            <div className="panels-row">
              <WeatherCard 
                locationName={locationName} 
                current={weatherData.current} 
              />
              <SatelliteMap 
                latitude={coords.lat} 
                longitude={coords.lon} 
              />
            </div>
            <Forecast daily={weatherData.daily} />
          </>
        ) : (
          <div className="error-message">Could not load weather data. Please try again.</div>
        )}
      </div>
    </div>
  );
}

export default App;
