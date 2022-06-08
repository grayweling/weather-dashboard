var searchForm = document.getElementById("search-form");
var cityName = document.getElementById("city");
var currentWeather = document.getElementById("weather-list-container");

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
        "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=5a47ba130d7027bb73a40455a48ce67b";

    fetch(weatherApiUrl)
      .then(function (response) {
        if (response.ok) {
          response.json();
          console.log(response);
        } else {
          alert("Error: City Not Found");
        }
      })
      .catch(function (error) {
        alert("Unable to Connect to OpenWeather");
      });
};

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