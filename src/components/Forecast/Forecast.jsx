import './Forecast.css';
import { getWeatherCondition } from '../../services/api';

const Forecast = ({ daily }) => {
  if (!daily || !daily.time) return null;

  // Skip the first element as it's typically today
  const forecastDays = daily.time.slice(1, 6).map((time, index) => {
    const dataIndex = index + 1;
    const date = new Date(time);
    const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date);
    const maxTemp = Math.round(daily.temperature_2m_max[dataIndex]);
    const minTemp = Math.round(daily.temperature_2m_min[dataIndex]);
    const condition = getWeatherCondition(daily.weather_code[dataIndex]);

    return { dayName, maxTemp, minTemp, icon: condition.icon };
  });

  return (
    <div className="forecast-container glass-panel">
      <h3 className="forecast-title">5-Day Forecast</h3>
      <div className="forecast-grid">
        {forecastDays.map((day, idx) => (
          <div key={idx} className="forecast-item">
            <span className="forecast-day">{day.dayName}</span>
            <span className="forecast-icon">{day.icon}</span>
            <div className="forecast-temps">
              <span className="temp-max">{day.maxTemp}°</span>
              <span className="temp-min">{day.minTemp}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
