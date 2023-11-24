// TODO add API and query fetch calls
// TODO fetch geocoding and forecast API
async function fetchGeocodeForecast(event) {
    event.preventDefault()
    var cityName = searchInput.value.trim()
    var apiKey = "d1c99b80e20e8b69e763c4e6c7f5572b";
    var geocodingQuery = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
    var forecastQ = await fetch(geocodingQuery)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data[0]);
            // var lat = 51.5098
            // var lon = -0.1180
            var lat = (data[0].lat);
            var lon = (data[0].lon);
            var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=a95b437b4c6c849e80cc1cc3ab83452a"
            return forecastQuery
        })
    fetch(forecastQ)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}


// TODO search eventlistener to pull API data
var searchButton = document.querySelector('#search-button')
var searchInput = document.querySelector('#search-input')
searchButton.addEventListener("click", fetchGeocodeForecast)

// TODO format and create city weather data HTML elements

// TODO format and create forecast data HTML elements

// TODO create a button function with every searched city

// TODO store buttons and their data to local storage