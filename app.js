const BASE_URL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "9cbec1e53cabcd3e180e475061401731";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const forecastContainer = document.getElementById("forecast");
const locationImg = document.getElementById("location");

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const getCurrentWeatherByName = async (city) => {
  const url = `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getForecastWeatherByName = async (city) => {
  const url = `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
  const response = await fetch(url);
  const json = await response.json();
  return json;
};

const getWeekDay = (date) => {
  return DAYS[new Date(date * 1000).getDay()];
};

const renderCurrentWeather = (data) => {
  const weatherJSX = `
    <h1>${data.name}, ${data.sys.country}</h1>
    <div id="main">
         <img src="https://openweathermap.org/img/wn/${
           data.weather[0].icon
         }.png" />
         <span>${data.weather[0].main}</span>
         <p>${Math.round(data.main.temp)} ºc</p>
    </div>
    <div id="info"> 
       <p>Humidity: <span>${data.main.humidity} m/s</span></p>
       <p>Wind Speed: <span>${data.wind.speed} m/s</span></p>
    </div>
`;

  weatherContainer.innerHTML = weatherJSX;
};

const renderForecastWeather = (data) => {
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  forecastContainer.innerHTML = "";
  data.forEach((i) => {
    const forcastJSX = `
    <div>
       <img src="https://openweathermap.org/img/wn/${i.weather[0].icon}.png" />
       <h3>${getWeekDay(i.dt)}</h3>
       <p>${Math.round(i.main.temp)}ºc</p>
       <span>${i.weather[0].main}</span>
    </div>
`;
    forecastContainer.innerHTML += forcastJSX;
  });
};

const searchHandler = async () => {
  const cityName = searchInput.value;
  if (!cityName) {
    alert("Please enter city name!");
  }

  const currentData = await getCurrentWeatherByName(cityName);
  const forecastData = await getForecastWeatherByName(cityName);
  console.log(forecastData);

  renderCurrentWeather(currentData);
  renderForecastWeather(forecastData);
};

searchButton.addEventListener("click", searchHandler);
