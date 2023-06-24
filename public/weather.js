
function getWeather() {
  var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=Tampere&appid=101bf08c85053ea9a3cf6d0d246c92f6";

  return fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error: " + response.status);
      }
    })
    .then(function(data) {
      console.log(data);
      var temperature = Math.round(data.main.temp - 273.15);
      console.log(temperature);
      var humidity = Math.round(data.main.humidity);
      var description = data.weather[0].description;
      var city = data.name;

      return "Temperature in " + city + ": " + temperature + "C<br>"+ " humidity: " +humidity+  "%" + "<br>" + description;
    })
    .catch(function(error) {
      console.log(error);
      return "Error fetching weather data";
    });
}


