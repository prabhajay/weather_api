import { useEffect, useRef, useState } from "react";
import clearSky from "../assets/images/01d.png";
import fewClouds from "../assets/images/02d.png";
import scatteredCloud from "../assets/images/03d.png";
import brokenCloud from "../assets/images/04d.png";
import showerRain from "../assets/images/09d.png";
import rain from "../assets/images/10d.png";
import thunderstorm from "../assets/images/11d.png";
import snow from "../assets/images/13d.png";
import mist from "../assets/images/50d.png";
import { IoMdSearch } from "react-icons/io";

const Weather = () => {
  const inputRef = useRef();
  const [weatherData, setWeatherData] = useState(false);
  const allIcons = {
    "01d": clearSky,
    "02d": fewClouds,
    "03d": scatteredCloud,
    "04d": brokenCloud,
    "09d": showerRain,
    "10d": rain,
    "11d": thunderstorm,
    "13d": snow,
    "50d": mist,
  };
  const weather_API = async (city) => {
    if (city === "") {
      alert("Enter the city Name");
      return;
    }
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
        import.meta.env.VITE_APP_ID
      }`;
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allIcons[data.weather[0].icon] || clearSky;
      setWeatherData({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      setWeatherData(false);
      console.error("Error in fetching weather data");
    }
  };
  useEffect(() => {
    weather_API("waterton park");
  }, []);

  return (
    <div className="bg-primary w-screen h-screen flex items-center justify-center">
      <div className="bg-default p-10 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-center text-2xl font-bold mb-4">Weather</h1>
        <div className="flex items-center border rounded-lg mb-4">
          <input
            placeholder="Search for location"
            className="border-none p-2 flex-grow outline-none rounded-l-lg"
            type="text"
            ref={inputRef}
          />
          <IoMdSearch
            className="m-3 text-2xl cursor-pointer"
            onClick={() => weather_API(inputRef.current.value)}
          />
        </div>
        {weatherData ? (
          <div className="text-center">
            <div className="mb-4">
              <img src={weatherData.icon} alt="Weather Icon" className="mx-auto" />
            </div>
            <p className="text-3xl font-bold">{weatherData.temperature}°C</p>
            <p className="text-lg">{weatherData.location}</p>
            <div className="flex justify-around mt-4">
              <div>
                <p className="text-xl font-semibold">{weatherData.humidity}%</p>
                <span className="text-gray-500">Humidity</span>
              </div>
              <div>
                <p className="text-xl font-semibold">{weatherData.windSpeed} m/s</p>
                <span className="text-gray-500">Wind Speed</span>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-4">No data available</p>
        )}
      </div>
    </div>
  );
};

export default Weather;
