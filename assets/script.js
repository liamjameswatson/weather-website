function dataAverage(array) {
  var sumOfArray = 0;
  for (var i = 0; i < array.length; i++) {
    sumOfArray = sumOfArray + array[i];
  }
  averageOfArray = sumOfArray / array.length;

  return averageOfArray;
}

function getTheWeatherData(city) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast/?q=" +
      city +
      "&appid=584c13c93f319b8d9eeb58517c2a171a",
    method: "GET",
  }).then(function (response) {
    var data = response;
    var timeZone = data.city.timezone;
    var newArray = [];
    // for every list in api call
    for (var i = 0; i < data.list.length; i++) {
      // Get the local date
      var date = moment.unix(timeZone + data.list[i].dt).format("DD/MM/YYYY");
      // filter the data and push it to newArray
      newArray.push({
        date: date,
        weatherArray: {
          temp: data.list[i].main.temp,
          humidity: data.list[i].main.humidity,
          wind: data.list[i].wind.speed,
          icon: data.list[i].weather[0].icon,
        },
      });
    }
    console.log(newArray);
    // returns a newArray with all the relevant information
    return newArray;
  });
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  var inputCity = $("#search-input").val().trim();
  var data = getTheWeatherData(inputCity);
});
