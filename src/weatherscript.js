//GET DATE & TIME:
let currentDate = new Date();
console.log(currentDate);

function formatDate(date) {
  let dayEqui = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesay",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthEqui = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  let dayToday = dayEqui[date.getDay()];
  let monthToday = monthEqui[date.getMonth()];
  let dateToday = date.getDate();
  let dayDisplay = `${dayToday}, ${monthToday} ${dateToday}`;
  return dayDisplay;
}

let dateClass = document.querySelector("span#calendarDate");
dateClass.innerHTML = formatDate(currentDate);

function formatTime(date) {
  let hourToday = date.getHours();
  let minutesToday = date.getMinutes();
  let hourTime = `${hourToday}:${minutesToday}`;
  return hourTime;
}

function timeSide(date) {
  let hourAmpm = date.getHours();
  let hourToday = date.getHours();
  let hourCalculation = ((hourToday + 11) % 12) + 1;
  if (hourCalculation < 10) {
    hourCalculation = `0${hourCalculation}`;
  }
  let minuteToday = date.getMinutes();
  if (minuteToday < 10) {
    minuteToday = `0${minuteToday}`;
  }
  if (hourAmpm > 12) {
    let pmDisplay = `${hourCalculation}:${minuteToday} PM`;
    return pmDisplay;
  } else {
    let amDisplay = `${hourCalculation}:${minuteToday} AM`;
    return amDisplay;
  }
}

let ampmClass = document.querySelector("span#hourSide");
ampmClass.innerHTML = timeSide(currentDate);

//SEARCH BY CITY:
function showCity(event) {
  event.preventDefault();
  let cityName = document.querySelector("#input-city");
  let cityDisplay = `${cityName.value}`;
  let cityLocation = document.querySelector("#location");
  cityLocation.innerHTML = cityDisplay;
  let cityMetric = "imperial";
  let cityURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityDisplay}&units=${cityMetric}&appid=0ebc654fccbc00189d5408f3d6f15b08`;

  axios.get(cityURL).then(getLoc);
}

let cityLoc = document.querySelector("#city-form");
cityLoc.addEventListener("submit", showCity);

//SEARCH BY COORDINATES:
function getLoc(response) {
  //LOCATION:
  let location = response.data.name;
  let locCountry = response.data.sys.country;
  let locDisplay = `<strong>${location}, ${locCountry}</stong>`;
  let coordLocation = document.querySelector("#location");
  coordLocation.innerHTML = locDisplay;

  //DAILY TEMP:
  let dailyTemp = Math.round(response.data.main.temp);
  let tempLoc = `${dailyTemp}°`;
  let tempDisplay = document.querySelector("#today-temp");
  tempDisplay.innerHTML = tempLoc;
  tempDisplay.setAttribute("data-unit", "imperial");

  //WINDSPEED:
  let windSpeed = response.data.wind.speed;
  let windValue = `${windSpeed}`;
  let windDisplay = document.querySelector("#daywind");
  windDisplay.innerHTML = windValue;

  //HUMIDITY
  let humidityMeasure = response.data.main.humidity;
  let humidityValue = `${humidityMeasure}`;
  let humidityDisplay = document.querySelector("#humidtoday");
  humidityDisplay.innerHTML = humidityValue;

  //DESCRIPTION
  let descMeasure = response.data.weather[0].main;
  let descValue = `${descMeasure}`;
  let descDisplay = document.querySelector("#descToday");
  descDisplay.innerHTML = descValue;
}

//GET LOCATION
function getCoords(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let unit = "imperial"; //apply if statement??
  let apiKey = `0ebc654fccbc00189d5408f3d6f15b08`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=${unit}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(getLoc);
}

function getPosition() {
  navigator.geolocation.getCurrentPosition(getCoords);
}

let locButton = document.querySelector("button#locbut");
locButton.addEventListener("click", getPosition);

//GET UNIT + CONVERT TO F AND C:
let fahrenheit = document.querySelector("#farbutton");
fahrenheit.addEventListener("click", makeFar);

let celsius = document.querySelector("#celbutton");
celsius.addEventListener("click", makeCel);

function celToFar(temperature) {
  const fahr = (9 * temperature + 32 * 5) / 5;
  let convertedTemp = Math.round(fahr);
  return convertedTemp;
}

function makeFar() {
  document.getElementById("btnradio1").onclick = function () {
    let currentFar = document.querySelector(".todayTemp");
    const tempUnit = currentFar.getAttribute("data-unit");

    if (tempUnit !== "imperial") {
      currentFar.innerHTML = `${celToFar(getTempVal())}°`;
      currentFar.setAttribute("data-unit", "imperial");
    }
  };
}

function makeCel() {
  document.getElementById("btnradio2").onclick = function () {
    let currentCel = document.querySelector(".todayTemp");
    const tempUnit = currentCel.getAttribute("data-unit");

    if (tempUnit !== "metric") {
      currentCel.innerHTML = `${farToCel(getTempVal())}°`;
      currentCel.setAttribute("data-unit", "metric");
    }
  };
}

function farToCel(temperature) {
  let convertedTemp = Math.round(((temperature - 32) * 5) / 9);
  return convertedTemp;
}

function getTempVal() {
  const currVal = parseInt(document.querySelector("#today-temp").textContent);
  return currVal;
}

//AUTO LOAD TEMP:
function autoLoad(response) {
  let autoloadcity = response;
  //console.log(autoloadcity);
  let autocityLocation = document.querySelector("#location");
  autocityLocation.innerHTML = autoloadcity;
  let autoURL = `https://api.openweathermap.org/data/2.5/weather?q=${autoloadcity}&units=imperial&appid=0ebc654fccbc00189d5408f3d6f15b08`;
  console.log(autoURL);

  axios.get(autoURL).then(getLoc);
}

//autoLoad();
autoLoad("New York");
