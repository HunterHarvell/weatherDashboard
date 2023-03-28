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

                // Get 5 day forecast for this city
                let cityID = response.data.id;
                let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + APIKey;
                axios.get(forecastQueryURL)
                    .then(function (response) {
                        forecast.classList.remove("d-none");

                        const forecastModules = document.querySelectorAll(".forecast");
                        
                        for (i = 0; i < forecastModules.length; i++) {
                            //  parse response to display forecast for next 5 days
                            forecastModules[i].innerHTML = "";
                            const forecastIndex = i * 8 + 4;
                            const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                            const forecastDay = forecastDate.getDate();
                            const forecastMonth = forecastDate.getMonth() + 1;
                            const forecastYear = forecastDate.getFullYear();
                            const forecastDateModule = document.createElement("p");
                            forecastDateModule.setAttribute("class", "mt-3 mb-0 forecast-date");
                            forecastDateModule.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                            forecastModules[i].append(forecastDateModule);

                            // symbol for forecast weather
                            const forecastWeatherModule = document.createElement("img");
                            forecastWeatherModule.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                            forecastWeatherModule.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
                            forecastModules[i].append(forecastWeatherModule);
                            
                            // temp for forecast
                            const forecastTempModule = document.createElement("p");
                            forecastTempModule.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                            forecastModules[i].append(forecastTempModule);
                            
                            // wind for forecast
                            const forecastWindModule = document.createElement("p");
                            forecastWindModule.innerHTML = "Wind: " + response.data.wind.speed + " MPH";
                            forecastModules[i].append(forecastWindModule);
                            
                            // humidity for forecast
                            const forecastHumidityModule = document.createElement("p");
                            forecastHumidityModule.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                            forecastModules[i].append(forecastHumidityModule);
                        }
                    })
            });
    };