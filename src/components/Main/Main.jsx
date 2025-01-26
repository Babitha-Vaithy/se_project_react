import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import { CurrentTemperatureUnitContext } from "../../Contexts/CurrentTemperatureUnitContext";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  onCardLike,
  handleDeleteItem,
}) {
  const contextData = useContext(CurrentTemperatureUnitContext);
  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={contextData.currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {contextData.currentTemperatureUnit === "F"
            ? `${weatherData.temp.F} °F`
            : `${weatherData.weather.temperature.C} °C`}
          / You may want to wear:
        </p>
        <ul className="cards__list">
          {clothingItems &&
            clothingItems
              .filter((item) => {
                return item.weather === weatherData.type;
              })
              .map((item) => {
                return (
                  <ItemCard
                    key={item._id}
                    item={item}
                    onCardClick={handleCardClick}
                    onCardLike={onCardLike}
                    handleDeleteItem={handleDeleteItem}
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
