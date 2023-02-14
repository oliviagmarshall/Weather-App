function searchCity(city) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showWeatherInfo);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("input").value;

  searchCity(city);
}

function showWeatherInfo(response) {
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;

  let temperature = Math.round(response.data.main.temp);
  let temperatureDisplay = document.querySelector("div.col.currentTemperature");
  temperatureDisplay.innerHTML = `${temperature}°C `;

  let description = response.data.weather[0].description;
  let descriptionDisplay = document.querySelector("#description");
  descriptionDisplay.innerHTML = `${description}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityDisplay = document.querySelector("div.humidity");
  humidityDisplay.innerHTML = `Humidity:${humidity}%`;

  let windSpeed = Math.round(response.data.wind.speed);
  let windSpeedDisplay = document.querySelector("div.windSpeed");
  windSpeedDisplay.innerHTML = `Wind Speed:${windSpeed}mph`;

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

  return days[day];
}
function getForecast(coordinates) {
  let apiKey = "57b2c40fdae71a6ba41d72685e3226e2";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(displayForecast);
}
function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `<div class="col-2">
  <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
  <img src="http://openweathermap.org/img/wn/${
    forecastDay.weather[0].icon
  }@2x.png" alt="" width="42"/>
  <div class="weather-forecast-temperatures">
    <span class="weather-forecast-temperature-max"> ${Math.round(
      forecastDay.temp.max
    )}°C</span>
    <span class="weather-forecast-temperature-min"> ${Math.round(
      forecastDay.temp.min
    )}°C</span>
  </div>
</div>`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

let now = new Date();

let h6 = document.querySelector("h6");

let date = now.getDate();
let hours = now.getHours();
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
let month = months[now.getMonth()];

h6.innerHTML = `Last Updated: ${day} ${date} ${month} ${year}, ${hours}:${minutes}`;

let searchForm = document.querySelector("form");

searchForm.addEventListener("submit", handleSubmit);

searchCity("Los Angeles");
