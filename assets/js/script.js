var searchForm = document.getElementById("search-form");
var cityName = document.getElementById("city");
var currentWeather = document.getElementById("weather-container");

var currentDate = moment().format("L");
var displayCurrentDate = document.getElementById("current-date");
displayCurrentDate.textContent = currentDate;
var displayNextDay1 = document.getElementById("day-0-card");
displayNextDay1.textContent = moment().add(1, "day").format("L");
var displayNextDay2 = document.getElementById("day-1-card");
displayNextDay2.textContent = moment().add(2, "days").format("L");
var displayNextDay3 = document.getElementById("day-2-card");
displayNextDay3.textContent = moment().add(3, "days").format("L");
var displayNextDay4 = document.getElementById("day-3-card");
displayNextDay4.textContent = moment().add(4, "days").format("L");
var displayNextDay5 = document.getElementById("day-4-card");
displayNextDay5.textContent = moment().add(5, "days").format("L");







var cityCoords = function (city) {
    var coordApiUrl =
        "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=5a47ba130d7027bb73a40455a48ce67b";

    fetch(coordApiUrl)
        .then(function (response) {
            if (response.ok) {
                response.json()
                    .then(function (data) {
                    //get city latitude and longitude
                    var lat = data.coord.lat;
                    var lon = data.coord.lon;

                    getWeather(lat, lon);
                });
                console.log(response); 
            } else {
                alert("Error: City Not Found");
            }
        })
        .catch(function (error) {
            alert("Unable to Connect to OpenWeather")
        });
};


var getWeather = function (lat, lon) {
    console.log(lat);
    console.log(lon);

    var weatherApiUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=5a47ba130d7027bb73a40455a48ce67b";

    fetch(weatherApiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json()
            .then(function (data) {
              displayWeather(data);
            })
          console.log(response);
        } else {
          alert("Error: City Not Found");
        }
      })
      .catch(function (error) {
        alert("Unable to Connect to OpenWeather");
      });
};

displayWeather = function (weather) {

  var weatherList = document.createElement("ul");
  weatherList.classList = "weather-list-container list-unstyled";
  weatherList.id = "current-weather";

  var temp = document.createElement("li");
  temp.classList = "weather-list-item";
  temp.textContent = "Temperature: " + weather.current.temp + "°F";
  temp.id = "current-temp";
  weatherList.appendChild(temp);

  var humidity = document.createElement("li");
  humidity.classList = "weather-list-item";
  humidity.textContent = "Humidity: " + weather.current.humidity + "%";
  humidity.id = "current-humidity";
  weatherList.appendChild(humidity);

  var wind = document.createElement("li");
  wind.classList = "weather-list-item";
  wind.textContent = "Wind: " + weather.current.wind_speed + " MPH";
  wind.id = "current-wind";
  weatherList.appendChild(wind);

  var uv = document.createElement("li");
  uv.classList = "weather-list-item";
  uv.textContent = "UV Index: " + weather.current.uvi;
  uv.id = "current-uv";
  weatherList.appendChild(uv);

  currentWeather.appendChild(weatherList);
}

var formSubmitHandler = function (event) {
    event.preventDefault();
    var city = cityName.value.trim();
    console.log(city);

    if (city) {
        cityCoords(city);
        cityName.value = "";
    } else {
        alert("Please enter a valid city")
    }
};





searchForm.addEventListener("submit", formSubmitHandler);