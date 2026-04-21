import './WeatherCard.css';
import { getWeatherCondition } from '../../services/api';

const WeatherCard = ({ locationName, current }) => {
  if (!current) return null;

  const {
    temperature_2m,
    apparent_temperature,
    relative_humidity_2m,
    wind_speed_10m,
    weather_code,
    is_day
  } = current;

  const condition = getWeatherCondition(weather_code, is_day);

  return (
    <div className="weather-card glass-panel">
      <div className="card-header">
        <h2 className="city-name">{locationName}</h2>
      </div>
      
      <div className="card-body">
        <div className="weather-main">
          <div className="weather-icon">{condition.icon}</div>
          <div className="temperature-container">
            <span className="temperature">{Math.round(temperature_2m)}°</span>
          </div>
        </div>
        <div className="weather-description">{condition.label}</div>
      </div>
      
      <div className="card-footer">
        <div className="weather-detail">
          <span className="detail-icon">🌡️</span>
          <div className="detail-info">
            <span className="detail-label">Feels like</span>
            <span className="detail-value">{Math.round(apparent_temperature)}°</span>
          </div>
        </div>
        <div className="weather-detail">
          <span className="detail-icon">💧</span>
          <div className="detail-info">
            <span className="detail-label">Humidity</span>
            <span className="detail-value">{relative_humidity_2m}%</span>
          </div>
        </div>
        <div className="weather-detail">
          <span className="detail-icon">💨</span>
          <div className="detail-info">
            <span className="detail-label">Wind</span>
            {/* <div></div> */}
            <span className="detail-value">{wind_speed_10m} km/h</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
