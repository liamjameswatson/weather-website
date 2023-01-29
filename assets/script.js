function getTheWeatherData(city) {
  var APIKey = "584c13c93f319b8d9eeb58517c2a171a";
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
    var x = m.format("DD MM YYYY");
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
    // TODO:  CONVERT THE TIME ZONE TO LOCAL TIME
    // console.log("The date is...", response.list[0].dt);
    // gets the first three hour time interval - list[0] - in unix time
    var myTime = response.list[0].dt;
    // Gets the time zone of the city (offset - in unix time)
    var timeZone = response.city.timezone;
    // Add the time to the offset - returns localtime - timezone in unix time
    var localTime = myTime + timeZone;
    // use moment.js to convert unix time to date formet
    var dateString = moment.unix(localTime).format("DD/MM/YYYY");
    console.log("local-time...", dateString);

    // GET THE DATA AND STORE IT IN THE CORRECT DAY
    // -----------------------------------------
    // iterate through the data list from the api
    for (var i = 0; i < response.list.length; i++) {
      // GET THE DATE DD MM YYYY ----------
      var dateAndTime = response.list[i].dt_txt;
      var year = dateAndTime.slice(0, 4);
      var month = dateAndTime.slice(5, 7);
      var day = dateAndTime.slice(8, 10);
      var date = day + " " + month + " " + year;
      // console.log(date)
      // -------------------------------------
      // IF THE DATE === TODAY
      if (date === daysArray[0]) {
        // push the info from the api into the TODAY array
        day0.push(response.list[i]);
      }
      // same for tomorrow...
      if (date === daysArray[1]) {
        day1.push(response.list[i]);
      }
      if (date === daysArray[2]) {
        day2.push(response.list[i]);
      }
      if (date === daysArray[3]) {
        day3.push(response.list[i]);
      }

      if (date === daysArray[4]) {
        day4.push(response.list[i]);
      }
    }
    //  NOW HAVE 5 ARRAYS EACH WITH THE DAY'S DATA STORED INSIDE
    console.log("CURRENT DATA...");
    console.log("response...", response);
    console.log("The city name is...", response.city.name);
    // TODO: display the date in the location
    console.log("The date is...", response.list[0].dt_txt);
    console.log("the weather icon is... ", response.list[0].weather[0].icon);
    console.log("The wind speed is...", response.list[0].wind.speed);
    console.log("The temperature is...", response.list[0].main.temp);
    console.log("The humidity is...", response.list[0].main.humidity);
  });
}
id = "search-button";
id = "search-input";
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var inputCity = $("#search-input").val().trim();

  getTheWeatherData(inputCity);
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

// TODO: var dateString = moment.unix(value).format("MM/DD/YYYY");
