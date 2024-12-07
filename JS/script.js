// Calling HTML Elements

const body = document.querySelector("body");
const themeCheckbox = document.querySelector("#theme-checkbox");
const check = document.querySelector(".check");
const botn = document.querySelector(".botn");
const mainApp = document.querySelector(".main-app");
const cityInput = document.querySelector("#city-input");
const searchBtn = document.querySelector(".search-btn");
const weatherResult = document.querySelector(".weather-result");
const errorMsg = document.querySelector("#error");
const cityName = document.querySelector("#city-name");
const weatherTemp = document.querySelector("#temp");
const weatherDes = document.querySelector("#description");
const weatherHumid = document.querySelector("#humidity");
const weatherSpeed = document.querySelector("#speed");

// Default Mode

body.classList.add("light-mode");
check.classList.add("light-mode");
botn.classList.add("light-mode");
mainApp.classList.add("light-mode");
cityInput.classList.add("light-mode");
searchBtn.classList.add("light-mode");
weatherResult.classList.add("light-mode");

// Toggle Mode

function toggleMode() {
  body.classList.toggle("dark-mode");
  check.classList.toggle("dark-mode");
  botn.classList.toggle("dark-mode");
  mainApp.classList.toggle("dark-mode");
  cityInput.classList.toggle("dark-mode");
  searchBtn.classList.toggle("dark-mode");
  weatherResult.classList.toggle("dark-mode");
}

themeCheckbox.addEventListener("click", toggleMode);

// Main App

const API_KEY = `6a446360998841dca09100005240712`;

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    showError("Please Enter a city name.");
    return;
  }
  mainApp.classList.add("after-search");
  fetchWeather(city);
});

async function fetchWeather(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
    );
    if (!response.ok) {
      throw new Error("City not found");
    }
    const data = await response.json();
    console.log("API data:", data);
    displayWeather(data);
  } catch (error) {
    console.error("Error fetching weather:", error.message);
    showError(error.message);
  }
}

function displayWeather(data) {
  console.log("Displaying weather data:", data);
  const { name } = data.location;
  const { temp_c, humidity } = data.current;
  const { text: description } = data.current.condition;
  const { wind_kph } = data.current;
  cityName.textContent = `Weather in ${name}`;
  weatherTemp.textContent = `Temperature: ${temp_c}°C`;
  weatherDes.textContent = `Description: ${description}`;
  weatherHumid.textContent = `Humidity: ${humidity}%`;
  weatherSpeed.textContent = `Wind speed: ${wind_kph} m/s`;
  weatherResult.classList.remove("hidden");
  errorMsg.classList.add("hidden");
}

function showError(message) {
  errorMsg.textContent = message;
  weatherResult.classList.add("hidden");
  errorMsg.classList.remove("hidden");
}
