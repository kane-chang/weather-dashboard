// TODO add API and query fetch calls
var cityName = "London";
var lat = 44.34
var lon = 10.99
var apiKey = "d1c99b80e20e8b69e763c4e6c7f5572b";
var geocodingQuery = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
// var forecastQuery = "api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon" + lon + "&appid=" + "a95b437b4c6c849e80cc1cc3ab83452a";
var forecastQuery = "api.openweathermap.org/data/2.5/forecast?lat=44.34&lon=10.99&appid=" + apiKey;
console.log(forecastQuery);

// TODO fetch geocoding API
fetch(geocodingQuery)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data[0]);
});

// TODO fetch 5 day weather forecast API
fetch(forecastQuery)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
});

// TODO search eventlistener to pull API data

// TODO format and create city weather data HTML elements

// TODO format and create forecast data HTML elements

// TODO create a button function with every searched city

// TODO store buttons and their data to local storage