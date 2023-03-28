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