import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  currentTemperatureUnit,
}) {
  return (
    <main>
      <WeatherCard
        weatherData={weatherData}
        currentTemperatureUnit={currentTemperatureUnit}
      />
      <section className="cards">
        <p className="cards__text">
          Today is{" "}
          {currentTemperatureUnit === "F"
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
                  />
                );
              })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
