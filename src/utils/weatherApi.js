export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error.${res.status}`);
    }
  });
};

export const filterWeatherData = (data, currentTemperatureUnitContext) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp };
  const weather = {
    temperature: {
      F: Math.round(data.main.temp),
      C: Math.round(((data.main.temp - 32) * 5) / 9),
    },
  };
  result.type = getWeatherType(weather, currentTemperatureUnitContext);
  result.weather = weather;
  return result;
};

const getWeatherType = (temperature, currentTemperatureUnitContext) => {
  const temp = temperature?.temperature?.[currentTemperatureUnitContext] || 999;
  if (temperature > 86) {
    return "hot";
  } else if (temperature >= 66 && temperature < 86) {
    return "warm";
  } else {
    return "cold";
  }
};
