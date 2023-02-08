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
}

function displayForecast(){
  let forecastElement= document.querySelector("div.weather-forecast-date");
  forecastElement.innerHTML="forecast";
}

displayForecast();

if (minutes < 10) {
  minutes = `0${minutes}`;}

let now = new Date();

let h6 = document.querySelector("h6");

let date = now.getDate();
let hours = now.getHours();
let year = now.getFullYear();
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;}

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

searchCity("Oslo");