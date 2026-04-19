const GEOCODING_API = 'https://geocoding-api.open-meteo.com/v1/search';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';

export const searchLocations = async (query) => {
  if (!query) return [];
  try {
    const res = await fetch(`${GEOCODING_API}?name=${query}&count=5&language=en&format=json`);
    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error("Error fetching locations:", error);
    return [];
  }
};

export const fetchWeather = async (latitude, longitude) => {
  try {
    const res = await fetch(`${WEATHER_API}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

// Weather codes mapping based on WMO Weather interpretation codes
export const getWeatherCondition = (code, isDay = 1) => {
  const codes = {
    0: { label: 'Clear sky', icon: isDay ? '☀️' : '🌙' },
    1: { label: 'Mainly clear', icon: isDay ? '🌤️' : '☁️' },
    2: { label: 'Partly cloudy', icon: '⛅' },
    3: { label: 'Overcast', icon: '☁️' },
    45: { label: 'Fog', icon: '🌫️' },
    48: { label: 'Depositing rime fog', icon: '🌫️' },
    51: { label: 'Drizzle: Light', icon: '🌧️' },
    53: { label: 'Drizzle: Moderate', icon: '🌧️' },
    55: { label: 'Drizzle: Dense', icon: '🌧️' },
    56: { label: 'Freezing Drizzle: Light', icon: '🌨️' },
    57: { label: 'Freezing Drizzle: Dense', icon: '🌨️' },
    61: { label: 'Rain: Slight', icon: '🌦️' },
    63: { label: 'Rain: Moderate', icon: '🌧️' },
    65: { label: 'Rain: Heavy', icon: '🌧️' },
    66: { label: 'Freezing Rain: Light', icon: '🌨️' },
    67: { label: 'Freezing Rain: Heavy', icon: '🌨️' },
    71: { label: 'Snow fall: Slight', icon: '❄️' },
    73: { label: 'Snow fall: Moderate', icon: '❄️' },
    75: { label: 'Snow fall: Heavy', icon: '❄️' },
    77: { label: 'Snow grains', icon: '❄️' },
    80: { label: 'Rain showers: Slight', icon: '🌦️' },
    81: { label: 'Rain showers: Moderate', icon: '🌧️' },
    82: { label: 'Rain showers: Violent', icon: '⛈️' },
    85: { label: 'Snow showers slight', icon: '🌨️' },
    86: { label: 'Snow showers heavy', icon: '🌨️' },
    95: { label: 'Thunderstorm: Slight or moderate', icon: '⛈️' },
    96: { label: 'Thunderstorm with slight hail', icon: '⛈️' },
    99: { label: 'Thunderstorm with heavy hail', icon: '🌩️' },
  };
  return codes[code] || { label: 'Unknown', icon: '❓' };
};
