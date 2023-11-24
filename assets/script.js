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
            var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=a95b437b4c6c849e80cc1cc3ab83452a"
            return forecastQuery
        })
    fetch(forecastQ)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            createTodaySection(data);
        })
}


// TODO search eventlistener to pull API data
var searchButton = document.querySelector('#search-button')
var searchInput = document.querySelector('#search-input')
var todaySection = document.querySelector('#today')
var forecastSection = document.querySelector('#forecast')

searchButton.addEventListener("click", fetchGeocodeForecast)

// TODO format and create today's city weather data HTML elements
function createTodaySection(data) {
    var cityHeader = document.createElement('h2')
    var tempText = document.createElement('p')
    var windText = document.createElement('p')
    var humidText = document.createElement('p')
    var weatherIcon = document.createElement('img')

    var todayDate = dayjs().format('(DD/MM/YYYY)')
    var iconCode = (data.list[0].weather[0].icon);
    var iconUrl = "http://openweathermap.org/img/w/" + iconCode + ".png"
    weatherIcon.setAttribute('src', iconUrl)

    cityHeader.textContent = data.city.name + " " + todayDate + " "
    cityHeader.append(weatherIcon)
    tempText.textContent = "Temp: " + data.list[0].main.temp + "°C"
    windText.textContent = "Wind Speed: " + data.list[0].wind.speed + " KPH"
    humidText.textContent = "Humidity: " + data.list[0].main.humidity +"%"

    todaySection.append(cityHeader, tempText, windText, humidText)
}

// TODO format and create 5-day forecast data HTML elements
function createForecastSection(data) {
    var secondsInADay = 86400
    var 

}



// TODO create a button function with every searched city

// TODO store buttons and their data to local storage