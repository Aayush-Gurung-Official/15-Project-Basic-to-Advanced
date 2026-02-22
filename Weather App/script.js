const apiKey = "YOUR_API_KEY"; // 🔑 Put your OpenWeatherMap API key here

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const weatherCard = document.querySelector(".weather-card");
const cityNameEl = document.querySelector(".city-name");
const tempEl = document.querySelector(".temperature");
const descEl = document.querySelector(".description");
const iconEl = document.querySelector(".weather-icon");
const errorMessage = document.querySelector(".error-message");

searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeather(city);
    }
});

async function getWeather(city) {
    // Build API URL
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city},NP&units=metric&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        updateUI(data); // Update HTML
    } catch (error) {
        showError(error.message);
    }
}

function updateUI(data) {
    errorMessage.style.display = "none";
    weatherCard.style.display = "block";

    cityNameEl.textContent = `${data.name}, ${data.sys.country}`;
    tempEl.textContent = `${Math.round(data.main.temp)}°C`;
    descEl.textContent = data.weather[0].description
        .split(" ")
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(" ");

    const iconCode = data.weather[0].icon;
    iconEl.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

function showError(message) {
    weatherCard.style.display = "none";
    errorMessage.style.display = "block";
    errorMessage.textContent = message;
}