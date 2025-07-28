// 1. Select HTML Elements (Your existing code)
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');

// Select the spans where weather data will be displayed
const tempDisplay = document.getElementById('temp-display');
const feelsLike = document.getElementById('feels-like');
const minTempDisplay = document.getElementById('min-temp-display');
const maxTempDisplay = document.getElementById('max-temp-display');
const conditionDisplay = document.getElementById('condition-display');
const pressureDisplay = document.getElementById('pressure-display');
const humidityDisplay = document.getElementById('humidity-display');
const cloudinessDisplay = document.getElementById('cloudiness-display');
const windSpeedDisplay = document.getElementById('wind-speed-display');

// Select the message display area
const messageDisplay = document.getElementById('message-display');

// Your API Key
const API_KEY = 'YOUR_API_KEY_HERE'; // replace this with your actual key during development

// Event Listener (Your existing code)
getWeatherBtn.addEventListener('click', () => {
    const cityName = cityInput.value.trim();

    if (cityName) {
        messageDisplay.textContent = 'Fetching weather...'; // Show a loading message
        fetchWeatherData(cityName);
    } else {
        messageDisplay.textContent = 'Please enter a city name.'; // Show an error if input is empty
        clearWeatherDisplay(); // Clear previous weather data if there was any
    }
});


// --- Add the fetchWeatherData function here ---
async function fetchWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; // Using metric for Celsius

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                messageDisplay.textContent = `City "${city}" not found. Please check the spelling.`;
            } else if (response.status === 401) {
                messageDisplay.textContent = 'Unauthorized: Invalid API key. Please check your key or plan.';
            } else {
                messageDisplay.textContent = `Error: ${response.status} - ${response.statusText}`;
            }
            clearWeatherDisplay();
            return;
        }
        const data = await response.json();
        console.log("API Response Data:", data); // Log the data to inspect its structure in console

        displayWeather(data); // Call function to display the data
        messageDisplay.textContent = ''; // Clear loading/error message on success

    } catch (error) {
        console.error('Error fetching weather data:', error);
        messageDisplay.textContent = 'Network error or unable to fetch weather data. Please try again later.';
        clearWeatherDisplay();
    }
}


// --- Add the displayWeather function here ---
function displayWeather(data) {
    // Make sure 'data' contains the expected properties
    if (!data || !data.main || !data.weather || !data.wind || !data.clouds) {
        messageDisplay.textContent = 'Error: Unexpected weather data format from API.';
        clearWeatherDisplay();
        return;
    }

    // Extract relevant information from the 'data' object
    // These paths are specific to OpenWeatherMap's current weather API response
    const temperature = data.main.temp;
    const feelsLikeTemp = data.main.feels_like;
    const minTemp = data.main.temp_min;
    const maxTemp = data.main.temp_max;
    const weatherCondition = data.weather[0].description; // weather is an array
    const pressure = data.main.pressure; // in hPa
    const humidity = data.main.humidity; // in %
    const cloudiness = data.clouds.all; // in %
    const windSpeed = data.wind.speed; // in m/s

    // Update the content of your HTML spans
    tempDisplay.textContent = temperature.toFixed(1);
    feelsLike.textContent = feelsLikeTemp.toFixed(1);
    minTempDisplay.textContent = minTemp.toFixed(1);
    maxTempDisplay.textContent = maxTemp.toFixed(1);
    
    // Capitalize the first letter of the description
    conditionDisplay.textContent = weatherCondition.charAt(0).toUpperCase() + weatherCondition.slice(1);
    
    pressureDisplay.textContent = pressure;
    humidityDisplay.textContent = humidity;
    cloudinessDisplay.textContent = cloudiness;
    windSpeedDisplay.textContent = windSpeed;
}


// --- Add the clearWeatherDisplay function here ---
function clearWeatherDisplay() {
    tempDisplay.textContent = '--';
    feelsLikeDisplay.textContent = '--';
    minTempDisplay.textContent = '--';
    maxTempDisplay.textContent = '--';
    conditionDisplay.textContent = '--';
    pressureDisplay.textContent = '--';
    humidityDisplay.textContent = '--';
    cloudinessDisplay.textContent = '--';
    windSpeedDisplay.textContent = '--';
    // If you plan to add a weather icon, clear that too:
    // const weatherIcon = document.getElementById('weather-icon');
    // if (weatherIcon) weatherIcon.src = '';
    // if (weatherIcon) weatherIcon.alt = '';
}