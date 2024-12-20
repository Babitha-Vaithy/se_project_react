import "./WeatherCard.css";
import Sunny from "../../assets/tempSunny.svg";

function WeatherCard({ weatherData, currentTemperatureUnit }) {
  return (
    <section className="weather__card">
      <p className="weather-card__temp">
        {currentTemperatureUnit === "F"
          ? `${weatherData.temp.F} °F`
          : `${weatherData.weather.temperature.C} °C`}
      </p>
      <img src={Sunny} alt="Temp Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
