// TODO add API and query fetch calls
// TODO fetch geocoding and forecast API
async function searchWeather(event) {
    event.preventDefault()
    var cityName = searchInput.value.trim()  //remove any unnecessary spaces at the start or end of the user's search input
    var successfulFetch = await fetchGeocodeForecast(cityName)
    if (successfulFetch) {
        createCityButton(cityName);
    }
    if (historySection.children.length == 1) {
        createClearHistoryButton()
    }
    searchInput.value = ""
}

async function fetchGeocodeForecast(cityName) {
    var apiKey = "d1c99b80e20e8b69e763c4e6c7f5572b";
    var geocodingQuery = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&appid=" + apiKey;
    var forecastQ = await fetch(geocodingQuery)  //stores the geocode api returned data
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (data[0] == undefined) {
                console.log('oops');
                errorMessage();
            } else {
                console.log(data[0]);
                var lat = (data[0].lat);
                var lon = (data[0].lon);
                var forecastQuery = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&units=metric&appid=a95b437b4c6c849e80cc1cc3ab83452a";
                return forecastQuery;
            };
        });
    if (forecastQ != undefined) {
        fetch(forecastQ) //fetches 5-day forecast data
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                console.log(data);
                createTodaySection(data);
                createForecastSection(data);

            });
        return true
    }
};

// TODO error message function if search fails
function errorMessage() {
    var errorMessage = document.createElement('p')
    errorMessage.textContent = "City not found. Try again with a different search?"
    searchDiv.append(errorMessage)
    var feedbackTime = 3;  // Length of time error message displays
    var feedbackTimeInterval = setInterval(function () {  // removes error message after 2 seconds
        feedbackTime--;
        if (feedbackTime < 1) {
            searchDiv.removeChild(errorMessage)
            clearInterval(feedbackTimeInterval);
        };
    }, 1000);
};

// TODO format and create today's city weather data HTML elements
function createTodaySection(data) {
    if (todaySection.children.length > 0) {
        while (todaySection.firstChild) {
            todaySection.removeChild(todaySection.lastChild);
        }
    }

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
    humidText.textContent = "Humidity: " + data.list[0].main.humidity + "%"

    todaySection.append(cityHeader, tempText, windText, humidText)
};

// TODO format and create 5-day forecast data HTML elements
function createForecastSection(data) {
    if (forecastSection.children.length > 0) {
        while (forecastSection.firstChild) {
            forecastSection.removeChild(forecastSection.lastChild);
        };
    };
    var secondsInADay = 86400;
    var fiveDayArray = [data.list[0].dt + secondsInADay, data.list[0].dt + secondsInADay * 2, data.list[0].dt + secondsInADay * 3, data.list[0].dt + secondsInADay * 4, data.list[0].dt + secondsInADay * 5 - 10800];
    var forecastHeader = document.createElement('h3');
    var rowDiv = document.createElement('div');
    forecastHeader.textContent = "5-Day Forecast:";
    console.log(fiveDayArray);

    forecastSection.append(forecastHeader, rowDiv);

    for (let j = 0; j < fiveDayArray.length; j++) {
        for (let i = 0; i < data.list.length; i++) {
            if (data.list[i].dt == fiveDayArray[j]) {
                // Card HTML elements
                var weatherCard = document.createElement('div');
                var cardBodyDiv = document.createElement('div');
                var cardTitle = document.createElement('h5');
                var cardIcon = document.createElement('img');
                var cardTemp = document.createElement('p');
                var cardWind = document.createElement('p');
                var cardHumid = document.createElement('p');

                rowDiv.setAttribute('class', 'row');
                weatherCard.setAttribute('class', 'card text-white bg-dark col-sm mx-3');
                cardBodyDiv.setAttribute('class', 'card-body');
                cardTitle.setAttribute('class', 'card-title');
                console.log(fiveDayArray[j]);
                console.log(data.list[i].dt_txt);
                cardDate = dayjs().add(j + 1, 'day').format('DD/MM/YYYY');
                console.log(cardDate);
                cardTitle.textContent = cardDate;

                var cardIconCode = (data.list[i].weather[0].icon);
                var cardIconUrl = "http://openweathermap.org/img/w/" + cardIconCode + ".png";
                cardIcon.setAttribute('src', cardIconUrl);

                cardTemp.textContent = "Temp: " + data.list[i].main.temp + "°C";
                cardWind.textContent = "Wind: " + data.list[i].wind.speed + " KPH";
                cardHumid.textContent = "Humidity: " + data.list[i].main.humidity + "%";

                cardBodyDiv.append(cardTitle, cardIcon, cardTemp, cardWind, cardHumid);
                weatherCard.appendChild(cardBodyDiv);
                rowDiv.appendChild(weatherCard);
            };
        };
    };
};

// TODO create a button function with every searched city
function createCityButton(cityName) {
    var cityButton = document.createElement('button');
    cityButton.textContent = cityName;
    cityButton.setAttribute("class", "city-buttons");
    cityButton.setAttribute("data-city", cityName);
    historySection.prepend(cityButton);
    cityList.push(cityName)
    localStorage.setItem("cityButtons", JSON.stringify(cityList))
};

// TODO click city button to display city information again
function displayCity(event) {
    if (event.target.matches('.city-buttons')) {
        console.log("matched");
        console.log(event.target);
        var selectedCity = event.target.getAttribute('data-city')
        fetchGeocodeForecast(selectedCity)
    };
};

// TODO store buttons and their data to local storage
// TODO retrieve local storage button on opening webpage
function retrieveLocalStorage() {
    cityStorage = localStorage.getItem("cityButtons");
    localStorage.clear();
    storedCityList = JSON.parse(cityStorage);
    for (let i = 0; i < storedCityList.length; i++) {
        createCityButton(storedCityList[i]);
    };
    createClearHistoryButton()
};

function createClearHistoryButton() {
    var clearButton = document.createElement('button');
    clearButton.textContent = "Clear Search History"
    clearButton.setAttribute("id", "clear-history");
    clearButton.setAttribute("class", "btn-primary mt-3");
    historySection.append(clearButton);
    clearButton.addEventListener('click', clearHistory)
}

function clearHistory() {
    localStorage.clear()
    if (historySection.children.length > 0) {
        while (historySection.firstChild) {
            historySection.removeChild(historySection.lastChild);
        }
    }
}

// TODO document selectors and event listeners 
var searchButton = document.querySelector('#search-button');
var searchInput = document.querySelector('#search-input');
var searchDiv = document.querySelector('#input-div');
var todaySection = document.querySelector('#today');
var forecastSection = document.querySelector('#forecast');
var historySection = document.querySelector('#history');
var cityList = []

searchButton.addEventListener("click", searchWeather);
historySection.addEventListener('click', displayCity);
if (localStorage.getItem("cityButtons") != null) {
    retrieveLocalStorage()
}

