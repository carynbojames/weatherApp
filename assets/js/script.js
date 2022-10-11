// --- Create History Button --- 
// var citySearchUser = $('#search'); 
var cityHistory = $('#city-list'); // parent
var city
// cityList.append('<li class="city-titles">Chicago</li>'); // add child to cityList parent

function weather() {
    console.log('Weather City: ' + city)
    citySearch = $('<button>'); // Previously missing the <>
    citySearch.addClass('city-titles');
    citySearch.attr('name',city)
    citySearch.text(city);
    cityHistory.append(citySearch);
    // cityList.text(city); // When I add this, it replaces the previous value
    // cityList.append('<li class="city-titles>' + city + '</li>'); // add child to cityList parent

    // --- Get the latitude and longitude ---
    var apiKey = 'eea82704764516c62016fa4ce2668513';
    var queryLatLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(queryLatLon)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
            // console.log(data[0].lat)
            // console.log(data[0].lon)

            // --- Get the future forecast
            var lat = data[0].lat
            var lon = data[0].lon
            var weatherFuture = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=5&appid=' + apiKey;
            console.log('Lat:' + lat)
            console.log('Lon: ' + lon)
            console.log(weatherFuture)

            // fetch(weatherFuture)
            //     .then(function (response) {
            //         return response.json();
            //     })
            //     .then(function(data){
            //         console.log(data);
            //     })
        })    
}

// Create city history
function cityForm(event) {
    event.preventDefault();
    city = $('input[name="city"]').val(); // get value from form
    $('input[name="city"').val('');
    weather();
}

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
