function dataAverage(array) {
  var sumOfArray = 0;
  for (var i = 0; i < array.length; i++) {
    sumOfArray = sumOfArray + array[i];
  }
  averageOfArray = sumOfArray / array.length;

  return averageOfArray;
}

function getTheWeatherData(city) {
  // var APIKey = "584c13c93f319b8d9eeb58517c2a171a";
  var queryURL =
    "https://api.openweathermap.org/data/2.5/forecast/?q=" +
    city +
    "&appid=584c13c93f319b8d9eeb58517c2a171a";
  // GET NEXT 5 DAYS
  // Make an empty array
  daysArray = [];
  // iterate 5 times
  for (var i = 0; i < 5; i++) {
    // store moment + i in m... moment today, moment tomorrow... for 5 days
    var m = moment().add(i, "d");
    // format all the moments into dd/mm/yyyy
    var x = m.format("DD/MM/YYYY");
    // push each day into days array
    daysArray.push(x);
  }

  // Make an array for each day
  var day0 = []; /*TODAY*/
  var day1 = []; /*TOMORROW ....*/
  var day2 = [];
  var day3 = [];
  var day4 = [];

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var data = response;
    dates = getTheDates(data);
    eachDaysData(data, dates);
    // GET THE DATA AND STORE IT IN THE CORRECT DAY
    // -----------------------------------------
    // iterate through the data list from the api
    for (var i = 0; i < response.list.length; i++) {
      // GET THE DATE DD MM YYYY ----------
      var dateAndTime = response.list[i].dt_txt;
      var apiDate = moment(dateAndTime).format("DD/MM/YYYY");

      // console.log("dateAndTime...", apiDate);

      // IF THE DATE === TODAY
      if (apiDate === daysArray[0]) {
        // push the info from the api into the TODAY array
        day0.push(response.list[i]);
      }

      // same for tomorrow...
      if (apiDate === daysArray[1]) {
        day1.push(response.list[i]);
        // console.log(day1[0].main.temp);
      }
      if (apiDate === daysArray[2]) {
        day2.push(response.list[i]);
      }
      if (apiDate === daysArray[3]) {
        day3.push(response.list[i]);
      }
      if (apiDate === daysArray[4]) {
        day4.push(response.list[i]);
      }
    }

    var dailyWeatherData = [day0, day1, day2, day3, day4];
    //  NOW HAVE 5 ARRAYS EACH WITH THE DAY'S DATA STORED INSIDE
    console.log("CURRENT DATA...");
    console.log("response...", response);
    console.log("The city name is...", response.city.name);
    var searchedCity = $("<h1>").text(response.city.name);
    console.log("this city", $("#city").text());
    $("#city").empty();
    // console.log("The date is...", localDate);
    // var todaysDate = $("<p>").text(localDate);
    console.log("this city", $("#city").text());
    console.log("the weather icon is... ", response.list[0].weather[0].icon);

    console.log("The temperature is...", response.list[0].main.temp);
    var temperature = response.list[0].main.temp;
    var todaysTemp = $("<p>").text("Temp : " + temperature);

    console.log("The humidity is...", response.list[0].main.humidity);
    var humidity = response.list[0].main.humidity;
    var todaysHumidity = $("<p>").text("Humidity : " + humidity);

    console.log("The wind speed is...", response.list[0].wind.speed);
    var windSpeed = response.list[0].wind.speed;
    var todayswindSpeed = $("<p>").text("windspeed : " + windSpeed);
    $("#city").append(
      searchedCity,
      // todaysDate,
      todaysTemp,
      todaysHumidity,
      todayswindSpeed
    );
    // console.log(".......................");
    // console.log(dailyWeatherData);
    // console.log(".......................");
    // console.log(day1[0].main.temp);

    // TOMORORROW DATA (DAY 2) ----------------------------------------------------
    console.log(
      "DAY 2 --------------------------------------------------------------------"
    );
    // TEMPERATURE
    var temperatureArray = [];
    for (var i = 0; i < day1.length; i++) {
      temperatureArray.push(day1[i].main.temp);
    }

    console.log(temperatureArray);
    temperature = dataAverage(temperatureArray);
    console.log("Average temp...", temperature);

    // HUMIDITY
    var humidityArray = [];
    for (var i = 0; i < day1.length; i++) {
      humidityArray.push(day1[i].main.humidity);
    }

    console.log(humidityArray);
    humidity = dataAverage(humidityArray);
    console.log("Average humidity...", humidity);

    // WINDSPEED
    var windSpeedArray = [];
    for (var i = 0; i < day1.length; i++) {
      windSpeedArray.push(day1[i].wind.speed);
    }

    console.log(windSpeedArray);
    windSpeed = dataAverage(windSpeedArray);
    console.log("Average windSpeed...", windSpeed);
    // TODO: Get average icon

    // DAY 3 DATA
    console.log(
      "DAY 3 --------------------------------------------------------------------"
    );
    // TEMPERATURE
    var temperatureArray = [];
    for (var i = 0; i < day2.length; i++) {
      temperatureArray.push(day2[i].main.temp);
    }

    console.log(temperatureArray);
    temperature = dataAverage(temperatureArray);
    console.log("Average temp...", temperature);

    // HUMIDITY
    var humidityArray = [];
    for (var i = 0; i < day2.length; i++) {
      humidityArray.push(day2[i].main.humidity);
    }

    console.log(humidityArray);
    humidity = dataAverage(humidityArray);
    console.log("Average humidity...", humidity);

    // WINDSPEED
    var windSpeedArray = [];
    for (var i = 0; i < day2.length; i++) {
      windSpeedArray.push(day2[i].wind.speed);
    }

    console.log(windSpeedArray);
    windSpeed = dataAverage(windSpeedArray);
    console.log("Average windSpeed...", windSpeed);
    // TODO: Get average icon

    // DAY 4 DATA
    console.log(
      "DAY 4 --------------------------------------------------------------------"
    );
    // TEMPERATURE
    var temperatureArray = [];
    for (var i = 0; i < day3.length; i++) {
      temperatureArray.push(day3[i].main.temp);
    }

    console.log(temperatureArray);
    temperature = dataAverage(temperatureArray);
    console.log("Average temp...", temperature);

    // HUMIDITY
    var humidityArray = [];
    for (var i = 0; i < day3.length; i++) {
      humidityArray.push(day3[i].main.humidity);
    }

    console.log(humidityArray);
    humidity = dataAverage(humidityArray);
    console.log("Average humidity...", humidity);

    // WINDSPEED
    var windSpeedArray = [];
    for (var i = 0; i < day3.length; i++) {
      windSpeedArray.push(day3[i].wind.speed);
    }

    console.log(windSpeedArray);
    windSpeed = dataAverage(windSpeedArray);
    console.log("Average windSpeed...", windSpeed);
    // TODO: Get average icon

    // DAY 5 DATA
    console.log(
      "DAY 5 --------------------------------------------------------------------"
    );
    // TEMPERATURE
    var temperatureArray = [];
    for (var i = 0; i < day4.length; i++) {
      temperatureArray.push(day4[i].main.temp);
    }

    console.log(temperatureArray);
    temperature = dataAverage(temperatureArray);
    console.log("Average temp...", temperature);

    // HUMIDITY
    var humidityArray = [];
    for (var i = 0; i < day4.length; i++) {
      humidityArray.push(day4[i].main.humidity);
    }

    console.log(humidityArray);
    humidity = dataAverage(humidityArray);
    console.log("Average humidity...", humidity);

    // WINDSPEED
    var windSpeedArray = [];
    for (var i = 0; i < day4.length; i++) {
      windSpeedArray.push(day4[i].wind.speed);
    }

    console.log(windSpeedArray);
    windSpeed = dataAverage(windSpeedArray);
    console.log("Average windSpeed...", windSpeed);
    // TODO: Get average icon

    return dailyWeatherData;
  });
}

$("#search-button").on("click", function (event) {
  event.preventDefault();
  var inputCity = $("#search-input").val().trim();

  var data = getTheWeatherData(inputCity);
  // console.log(data);
});

// TODO: IF USER TYPES WRONG INFO, LIKE 'FGBFBFBFS', NO CITY WILL COME UP.
// TODO: DISPLAY A MESSAGE

//  NOW HAVE 5 ARRAYS EACH WITH THE DAY'S DATA STORED INSIDE
// console.log(day0[0]);
// console.log("tomorrow's weather data", day1.length);
// console.log("day after tomorrow's weather data", day2);
// console.log("next day", day3);
// console.log("next (last) day", day4);

// TODO: Obtain current local time
// Find local time offset
// Obtain current UTC time
// Obtain destination city's offset in hours and convert to milliseconds
// convert to readable format

// Function to get the dates for each timezone, and returns an array (set) of dates
getTheDates = (data) => {
  var myTime = moment().unix();

  var timeZone = data.city.timezone;

  var localTime = myTime + timeZone;
  // Create a an emptyy array to hold the days
  var daysArray = [];
  // for every piece of weather data
  for (var i = 0; i < data.list.length; i++) {
    // get the date from the timezone offset
    var date = moment.unix(timeZone + data.list[i].dt).format("DD/MM/YYYY");
    console.log(date);
    // move the date to the days array
    daysArray.push(date);
  }
  // remove the duplicate dates, but sending them to a set.
  var daysArray = [...new Set(daysArray)];
  return daysArray;
};

eachDaysData = (data, arr) => {
  for (var i = 0; i < data.list.length; i++) {
    console.log(data);
    console.log("...............................");
    console.log(arr);
  }
};
// create a new object for each day
// day [i] = {
//       temp: []
//       humidty: []
//       wind: []
//     }
