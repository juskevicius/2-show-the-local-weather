var units = "&units=metric";
var longitude = "";
var latitude = "";
var tempSymbol = "";

$.get("http://ipinfo.io", function(response) {
  latitude = (response.loc).split(",")[0];
  longitude = (response.loc).split(",")[1];
  passTheLocationAndUnits(latitude, longitude, units);
}, "jsonp");

function changeUnits() {
  if (units == "") {
    units = "&units=metric";
    passTheLocationAndUnits(latitude, longitude, units);
  } else {
    units = "";
    passTheLocationAndUnits(latitude, longitude, units);}
  }

function passTheLocationAndUnits(latitude, longitude, units) {
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + units + "&APPID=995b8728cdf64f27cd6d4cd30a92427a";
  if (!units) {
    tempSymbol = "°F ";
  } else {
    tempSymbol = "°C ";
  }

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var weather = JSON.parse(this.responseText);
      passTheWeather(weather, tempSymbol);
    }
  }
  xmlhttp.open("GET", url, true);
  xmlhttp.send();

  function passTheWeather(weather, tempSymbol) {
    document.getElementById("city").innerHTML = weather.name + ", " + weather.sys.country;
    document.getElementById("weather").innerHTML = weather.weather[0].description + ", ";
    document.getElementById("temperature").innerHTML = weather.main.temp + tempSymbol;
    document.getElementById("picture").src = "http://openweathermap.org/img/w/" + weather.weather[0].icon + ".png";
  }
}