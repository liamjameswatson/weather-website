// When search button is clicked, send the search input into the ajax function. Gets the data for the inputted city
$("#search-button").on("click", function (event) {
  event.preventDefault();
  var inputCity = $("#search-input").val().trim();
  // returns a capital city for each word of the city input. So if user inputs paris, and then types Paris, one button will be displayed.
  inputCity = capitaliseEachWord(inputCity);
  getTheWeatherData(inputCity);
  $("#search-input").val("");
});

//  Gets the data for the city from the API by an ajax call
function getTheWeatherData(city) {
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/forecast/?q=" +
      city +
      "&appid=584c13c93f319b8d9eeb58517c2a171a",
    method: "GET",
  }).then(function (response) {
    // the whole repsonse is stored in a variable 'data
    var data = response;
    // a timezone stores the timezone offset for the city
    var timeZone = data.city.timezone;
    // make a new blank data array for each call
    var dataArray = [];
    // for every list in api call
    for (var i = 0; i < data.list.length; i++) {
      // Get the local date
      var date = moment.unix(timeZone + data.list[i].dt).format("DD/MM/YYYY");
      // make a new object for each day, and push it to the dataArray. The array has 40 objects
      dataArray.push({
        date: date,
        weatherArray: {
          temp: data.list[i].main.temp,
          humidity: data.list[i].main.humidity,
          wind: data.list[i].wind.speed,
          icon: data.list[i].weather[0].icon,
        },
      });
      // The dataArray now contains 5 or 6 objects
    }
    // send the 40 dates from the dataArray to a function, to remove dupliates and returns an array of 5 or 6 dates
    var dates = getTheDates(dataArray);
    // sends the 40 objects into the function and the 5/6 dates,
    var dateObjects = sortDatesAndData(dataArray, dates);

    dateObjects.forEach(function (index) {
      index.temp = Math.round(dataAverage(index.temp) - 273.15); /* C*/
      index.humidity = Math.round(dataAverage(index.humidity)); /* % */
      index.wind = dataAverage(index.wind).toFixed(2); /* %km/h*/
      // Accounts for night time. Filters out night time data, displaying the average day time.
      if (index.icon.length === 8) {
        index.icon = getMode(index.icon.slice(2, 6));
      } else {
        index.icon = index.icon;
        index.icon = getMode(index.icon);
      }
    });

    displayData(dateObjects, city); /* displays the data to the html page* */
    saveToLocalStorage(city); /*saves the city to local storage */
    displayHistoryButtons(city); /*makes a button on each search*/
  });
}

// Takes the 40 dates from the api data and removes duplicates.
function getTheDates(data) {
  var dates = [];
  for (var i = 0; i < data.length; i++) {
    dates.push(data[i].date);
  }
  dates = [...new Set(dates)];
  // returns an array of 5 or 6 dates, depending on the local time.
  return dates;
}

function sortDatesAndData(data, dates) {
  // sends in 40 objects and 5/6 dates
  $(dates).each(function (index) {
    //  each of the 5/6 dates, if the data matches the date, make a blank array
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
      // loop through dates and data and push the data to the date arrays.
      if (dates[index].date === data[i].date) {
        dates[index].temp.push(data[i].weatherArray.temp);
        dates[index].humidity.push(data[i].weatherArray.humidity);
        dates[index].icon.push(data[i].weatherArray.icon);
        dates[index].wind.push(data[i].weatherArray.wind);
      }
    }
  });
  // returns a date array each with an object of arrays with 8 or less elements in.
  // The temperature, for example is in each date array. Depending on time, the array may contain less than 8 elements
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

function getMode(arr) {
  // made an object, with the eleent and frequency as key/value pairs
  var frequencyCounter = {};
  // the inital max element is the first element
  var maxElement = arr[0];
  // and inital the max count = 1
  var maxCount = 1;

  for (var i = 0; i < arr.length; i++) {
    // element = the element[i] in array
    var element = arr[i];
    // if element already in frequency counter, increase the frequency by 1
    if (frequencyCounter[element]) {
      frequencyCounter[element]++;
    }
    // if not, add it to to the object, with a frequency of 1
    else {
      frequencyCounter[element] = 1;
    }
    // if the f frequencyCounter[element] is greater than the maxElement
    if (frequencyCounter[element] > maxCount) {
      // this element becomes the maxium element
      maxElement = element;
      // and this count becomes the maxium count
      maxCount = frequencyCounter[element];
    }
  }
  return maxElement;
}

function displayData(dates, city) {
  $("#today").empty();
  $("#5-day-forecast").empty();
  $("#today").append(
    `
    <div class="card">
      <div class="card-body">
        <h2 class="card-title" id="city">${city} ${dates[0].date}<img src='https://openweathermap.org/img/wn/${dates[0].icon}@2x.png' alt="icon"/></h2>

        <ul>
          <li class='temp'>Temp: ${dates[0].temp}</li>
          <li>Wind: ${dates[0].wind}</li>
          <li>Humidity: ${dates[0].humidity}</li>
        <p class="card-text"></p>
    
  </div>
</div>
`
  );

  if (dates.length === 6) {
    for (var i = 1; i < dates.length; i++) {
      $("#5-day-forecast").append(
        `
  <div class="card col-lg-2 col-md-4 col-sm-6">
    <div class="card-body">
      <h5 class="card-title">${dates[i].date}</h5>
      <img src='https://openweathermap.org/img/wn/${dates[i].icon}@2x.png' alt="icon"/>
      <ul>
        <li>Temp: ${dates[i].temp}</li>
        <li>Wind: ${dates[i].wind}</li>
        <li>Humidity: ${dates[i].humidity}</li>
      </ul>
    </div>
  </div>
    `
      );
    }
  } else {
    for (var i = 0; i < dates.length; i++) {
      $("#5-day-forecast").append(
        `
  <div class="card col-lg-2 col-md-4 col-sm-6">
    <div class="card-body">
      <h5 class="card-title">${dates[i].date}</h5>
      <img class="card-img-top" <img src='https://openweathermap.org/img/wn/${dates[i].icon}@2x.png'>
      <ul>
        <li>Temp: ${dates[i].temp}</li>
        <li>Wind: ${dates[i].wind}</li>
        <li>Humidity: ${dates[i].humidity}</li>
      </ul>
    </div>
  </div>
    `
      );
    }
  }
}

function saveToLocalStorage(city) {
  // if local storage is empty - searchHistory array is blank
  if (localStorage.length === 0) {
    var searchHistory = [];
  } else {
    // if not search history = localStorage
    var searchHistory = JSON.parse(localStorage.getItem("cities"));
  }
  for (var i = 0; i < searchHistory.length; i++) {
    // if city is already in the search history array remove it
    if (searchHistory[i] === city) {
      searchHistory.splice(i, 1);
    }
    // add the searched city to the first item in searchHistory array
  }
  searchHistory.unshift(city);
  searchHistory;
  if (searchHistory.length > 10) {
    // if searHistory array is longer than 10, delete the last element
    searchHistory.pop();
  }
  // send the search history to local storage
  localStorage.setItem("cities", JSON.stringify(searchHistory));
}

// for every city in local storage array make a button the city on it.
function displayHistoryButtons() {
  // empty the history div, before dislaying the new ones
  $("#history").empty();
  // get the array from local storage
  var getSearchHistory = JSON.parse(localStorage.getItem("cities"));
  // got every element of the array, create a button

  // Check to see if local storage is empty. If so, getSearchHistory = []. This prevents a null value which throws an error
  if (getSearchHistory === null) {
    getSearchHistory = [];
  }
  for (var i = 0; i < getSearchHistory.length; i++) {
    $("#history").append(
      `<button type="button" class="search-history-btn btn btn-primary">${getSearchHistory[i]}</button>`
    );
  }
  $(".search-history-btn").on("click", function (event) {
    var city = event.target.textContent;
    getTheWeatherData(city);
  });
}
// displays the buttons when the page first loads, from local storage
displayHistoryButtons();

function capitaliseEachWord(element) {
  // Capitalises each first letter of a word, the rest is lowercase. good for names and places.
  var words = element.split(" ");

  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1);
  }
  words.join("");
  words = words.toString();
  /* removes the commas, that are added when split() happens */
  words = words.replaceAll(",", " ");
  return words;
}
