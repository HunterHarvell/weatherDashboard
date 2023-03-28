function startPage() {
    const searchInput = document.getElementById("searchInput");
    const searchBtn = document.getElementById("searchBtn");

    var currentWeather = document.getElementById("currentWeather");

    const currentCity = document.getElementById("cityName");
    const weatherSymbol = document.getElementById("weatherSymbol");
    const temp = document.getElementById("temp");
    const humidity = document.getElementById("humidity");
    const windSpeed = document.getElementById("windSpeed");
   
    const history = document.getElementById("history");
    var forecast = document.getElementById("forecast");
    
    const clearHistory = document.getElementById("clearHistory");
    
    // Assigning API to a variable
    const APIKey = "156c7b253042e9e714a6eaabb6f42083";

    let searchHistory = JSON.parse(localStorage.getItem("search")) || [];

    function getWeather(cityName) {
        // Execute a current weather request from open weather api
        let queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + APIKey;
        axios.get(queryURL)
            .then(function (response) {
                currentWeather.classList.remove("d-none");

                // Parse response to display current weather
                const currentDate = new Date(response.data.dt * 1000);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                currentCity.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                let weatherPic = response.data.weather[0].icon;
                weatherSymbol.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                weatherSymbol.setAttribute("alt", response.data.weather[0].description);
                temp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
                humidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
                windSpeed.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";

                
            });