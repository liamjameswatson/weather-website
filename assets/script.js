var APIKey = "584c13c93f319b8d9eeb58517c2a171a";
var cityName = "London";
var numberofDays = 40;
var queryURL =
  "https://api.openweathermap.org/data/2.5/forecast/?q=" +
  cityName +
  "&appid=" +
  APIKey +
  "&cnt=" +
  numberofDays;

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

function getWeather() {
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
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
  });
}
//  NOW HAVE 5 ARRAYS EACH WITH THE DAY'S DATA STORED INSIDE
console.log("today weather data", day0);
console.log("tomorrow's weather data", day1);
console.log("day after tomorrow's weather data", day1);
console.log("next day", day1);
console.log("next (last) day", day1);
getWeather();


// ---------------------------------------------------------