// --- Create History Button --- 
// var citySearchUser = $('#search'); 
var cityHistory = $('#city-list'); // parent
var city
// cityList.append('<li class="city-titles">Chicago</li>'); // add child to cityList parent

function weather() {
    // --- Create city history new button
    console.log('Weather City: ' + city)
    citySearch = $('<button>'); // Previously missing the <>
    citySearch.addClass('city-titles');
    citySearch.attr('name',city)
    citySearch.text(city);
    cityHistory.append(citySearch);
    // cityList.text(city); // When I add this, it replaces the previous value
    // cityList.append('<li class="city-titles>' + city + '</li>'); // add child to cityList parent

    var apiKey = 'eea82704764516c62016fa4ce2668513';

    // --- Get the latitude and longitude
    var queryLatLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(queryLatLon)
        .then(function (response) {
            return response.json();
        })

        .then(function(data){
            console.log(data);
    
            var lat = data[0].lat
            var lon = data[0].lon       

            console.log('Lat:' + lat)
            console.log('Lon: ' + lon)

            // --- Get the future forecast
            // var weatherFuture = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=5&appid=' + apiKey;
            var queryFuture = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ lon + '&appid=' + apiKey + '&units=imperial';

            fetch(queryFuture)
                .then(function (response) {
                    return response.json(); 
                })

                .then(function(data) {

                    for (var i = 1; i < 6; i++) {
                        var forecast = $('#forecast')
                        var forecastCard = $('<card>')
                        var date = moment().add(i, 'days').format('M/D/YY');
                        forecast.addClass('col-2.4') // Added this to try to format
                        forecastCard.text('Forecast Day: ' + date) 
                        forecast.append(forecastCard)
                        forecastCard.append('<p>Temp: ' + data.list[i].main.temp + ' F</p>')
                        forecastCard.append('<p>Wind: '  + data.list[i].wind.speed + ' mph</p>')
                        forecastCard.append('<p>Humidity: ' + data.list[i].main.humidity + ' %</p>')
                        forecastCard.append('<p>Icon: ' + data.list[i].weather[0].description + '</p>')
                    }
                    console.log(data)
                })
        })   
}

// --- Assign the variable city from the form
function cityForm(event) {
    event.preventDefault();
    city = $('input[name="city"]').val(); // get value from form
    $('input[name="city"').val('');
    weather();
}

// --- Asign the variable city from a city history button
function cityList(event) {
    event.preventDefault();
    city = $(event.target).attr('name');
    // console.log('event target: ' + event.tar]get)
    // console.log('test: ' + test)
    // var city = $('.name');
    // console.log(event)
    // console.log('This: ' + this)
    weather();
}


var search = $('#searchBtn'); 
search.on('click', cityForm);
/// QUESTION: Can you make the click execute two functions? 

var searchHistory = $('#search-history');
searchHistory.on('click', '.city-titles', cityList); // no response[]

// var currentTemp = $('#current-temp')
// currentTemp.text('test')
