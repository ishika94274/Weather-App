const inputBox = document.querySelector(".input-box");
const searchBtn = document.getElementById("searchBtn");
const weather_img = document.querySelector(".weather-img");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");
const humidity = document.getElementById("humidity");
const wind_speed = document.getElementById("wind-speed");
const location_not_found = document.querySelector(".location-not-found");
const weather_body = document.querySelector(".weather-body");

async function checkWeather(city) {
  const api_key = "103e635edaaf9cb115842b37f63daf06";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;
  // const weather_data = await fetch(url).then((response) => response.json());
  const weather_data = await fetch(`${url}`).then((response) =>
    response.json()
  );

  // console.log(weather_data);

  if (weather_data.cod === "404") {
    location_not_found.style.display = "flex";
    weather_body.style.display = "none"; // ✅ Already correct
    return;
  }

  location_not_found.style.display = "none";
  weather_body.style.display = "flex"; // ✅ Correct

  // temperature.innerHTML = `${Math.round(weather_data.main.temp - 273.15)}°C`;
  temperature.innerHTML = `${Math.round(weather_data.main.temp)}°C`;

  description.innerHTML = `${weather_data.weather[0].description}`;
  console.log(weather_data);

  humidity.innerHTML = `${weather_data.main.humidity}%`;
  wind_speed.innerHTML = `${weather_data.wind.speed}Km/H`;

  // const weatherDetails = weather_data.weather[0];
  // const mainDetails = weather_data.main;
  // const windDetails = weather_data.wind;

  // Update UI elements
  // temperature.innerHTML = `${mainDetails.temp} <sup>°C</sup>`;
  // description.innerHTML = weatherDetails.description;
  // humidity.innerHTML = `${mainDetails.humidity}%`;
  // wind_speed.innerHTML = `${windDetails.speed} km/h`;

  switch (weather_data.weather[0].main.toLowerCase()) {
    case "clouds":
      weather_img.src = "/assets/cloud.png";
      break;
    case "clear":
      weather_img.src = "/assets/clear.png";
      break;
    case "mist":
      weather_img.src = "/assets/mist.png";
      break;
    case "rain":
      weather_img.src = "/assets/rain.png";
      break;
    case "snow":
      weather_img.src = "/assets/snow.png";
      break;
    default:
      weather_img.src = "/assets/cloud.png";
      break;
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(inputBox.value);
});
