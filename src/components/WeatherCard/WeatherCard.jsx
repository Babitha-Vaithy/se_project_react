import "./WeatherCard.css";
import Sunny from "../../assets/tempSunny.svg";

function WeatherCard() {
  return (
    <section className="weather__card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img src={Sunny} alt="Temp Sunny" className="weather-card__image" />
    </section>
  );
}

export default WeatherCard;
