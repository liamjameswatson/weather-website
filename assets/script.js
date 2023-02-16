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
    // returns a newArray with all the relevant information
    var dates = getTheDates(newArray);
    var dateObjects = sortDatesAndData(newArray, dates);

    dateObjects.forEach(function (index) {
      index.temp = Math.round(dataAverage(index.temp) - 273.15); /* C*/
      index.humidity = Math.round(dataAverage(index.humidity)); /* % */
      index.wind = dataAverage(index.wind).toFixed(2); /* %km/h*/
    });
    console.log(dateObjects);
  });
}

// pushes all the dates to an array, and then removes duplicates by creating a set.
function getTheDates(data) {
  var dates = [];
  for (var i = 0; i < data.length; i++) {
    dates.push(data[i].date);
  }
  dates = [...new Set(dates)];
  return dates;
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  var inputCity = $("#search-input").val().trim();
  getTheWeatherData(inputCity);
});

function sortDatesAndData(data, dates) {
  $(dates).each(function (index) {
    for (var i = 0; i < data.length; i++) {
      if (dates[index] === data[i].date) {
        dates[index] = {
          date: data[i].date,
          temp: [],
          humidity: [],
          wind: [],
          icon: [],
        };
      }
    }

    for (var i = 0; i < data.length; i++) {
      if (dates[index].date === data[i].date) {
        dates[index].temp.push(data[i].weatherArray.temp);
        dates[index].humidity.push(data[i].weatherArray.humidity);
        dates[index].icon.push(data[i].weatherArray.icon);
        dates[index].wind.push(data[i].weatherArray.wind);
      }
    }
  });
  return dates;
}

function dataAverage(array) {
  var sumOfArray = 0;
  for (var i = 0; i < array.length; i++) {
    sumOfArray = sumOfArray + array[i];
  }
  averageOfArray = sumOfArray / array.length;

  return averageOfArray;
}
