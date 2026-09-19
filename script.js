const API_KEY = "34ec15d00be8fd0349705ed61350cd7e";

async function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        console.log("API Response:", data);

        if (!response.ok) {
            throw new Error(data.message || "Weather data could not be fetched");
        }

        document.getElementById("cityName").textContent = data.name;

        document.getElementById("temperature").textContent =
            `${Math.round(data.main.temp)} °C`;

        document.getElementById("description").textContent =
            data.weather[0].description;

        document.getElementById("humidity").textContent =
            data.main.humidity;

        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    } catch (error) {
        console.error("Weather Error:", error);
        alert("Error: " + error.message);
    }
}