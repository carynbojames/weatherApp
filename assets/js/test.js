var city = 'Chicago'
var apiKey = 'eea82704764516c62016fa4ce2668513';
var queryLatLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;
var lat = ''
var lon = ''
let lat2 = ''
let lon2 = ''

fetch(queryLatLon)
    .then(function (response) {
        return response.json();
    })
    .then(function(data){ 
        console.log(data)
        console.log(data[0].lat)
        console.log(data[0].lon)
        lat = data[0].lat
        lon = data[0].lon
        console.log("latitude: " + lat)
        console.log("longitude: " + lon)
        lat2 = data[0].lat
        lon2 = data[0].lon
    })


console.log("latitude 2: " + lat2)
console.log("longitude 2: " + lon2)


// What variables work inside and outside the code?

let lat1 = '41.8755'
let lon1 = '-87.6244'
var queryFuture = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat1 + '&lon='+ lon1 + '&appid=' + apiKey + '&units=imperial';

fetch(queryFuture)
    .then(function (response) {
        return response.json(); 
    })
    .then(function(data) {
        for (var i = 1; i < 6; i++) {
            var forecast = $('#forecast')
            var forecastCard = $('<card>')
            var date = moment().add(i, 'days').format('M/D/YY');
            forecastCard.text('Forecast Day: ' + date) 
            forecast.append(forecastCard)
            forecastCard.append('<p>Temp: ' + data.list[i].main.temp + ' F</p>')
            forecastCard.append('<p>Wind: '  + data.list[i].wind.speed + ' mph</p>')
            forecastCard.append('<p>Humidity: ' + data.list[i].main.humidity + ' %</p>')
            forecastCard.append('<p>Icon: ' + data.list[i].weather[0].description + '</p>')

            }
        console.log(data)
    })





