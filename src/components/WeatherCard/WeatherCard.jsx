import "./WeatherCard.css";
import Sunny from "../../assets/tempSunny.svg";

function WeatherCard({ weatherData }) {
  return (
    <section className="weather__card">
      <p className="weather-card__temp">{weatherData.temp.F} &deg; F</p>
      <img src={Sunny} alt="Temp Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
