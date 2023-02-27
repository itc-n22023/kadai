import { useState } from 'react';

const WEATHER_API_KEY = '94fa59730bac37995d3566709a054e9c';

export default function WeatherApp() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      setWeatherData(null);
    }
  }

  function handleInputChange(e) {
    setCity(e.target.value);
  }

  return (
    <div>
      <h1>Weather App</h1>

      <form onSubmit={handleFormSubmit}>
        <label htmlFor="city-input">Enter City Name:</label>
        <input
          type="text"
          id="city-input"
          value={city}
          onChange={handleInputChange}
        />
        <button type="submit">Get Weather</button>
      </form>

      {weatherData && (
        <div>
          <h2>
            {weatherData.name}, {weatherData.sys.country}
          </h2>

          <p>Temperature: {weatherData.main.temp} °C</p>
          <p>Humidity: {weatherData.main.humidity} %</p>
          <p>Description: {weatherData.weather[0].description}</p>
          <p>Wind Speed: {weatherData.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

