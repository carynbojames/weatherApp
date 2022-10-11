// --- Create History Button --- 
// var citySearchUser = $('#search'); 
var cityHistory = $('#city-list'); // parent
// cityList.append('<li class="city-titles">Chicago</li>'); // add child to cityList parent



// create element
function cityList(event) {
    event.preventDefault();
    var city = $('input[name="city"]').val(); // get value from form
    citySearch = $('<button>'); // Previously missing the <>
    citySearch.addClass('city-titles');
    citySearch.attr('name',city)
    citySearch.text(city);
    cityHistory.append(citySearch);
    /// ACTION: Make the new value a button
    /// ACTION: Make the previously entered value disappear
    /// ACTION: Create a message if search is entered w/o a value
    // cityList.text(city); // When I add this, it replaces the previous value
    // cityList.append('<li class="city-titles>' + city + '</li>'); // add child to cityList parent
    // weather();

    // --- Get the latitude and longitude ---
    var apiKey = 'eea82704764516c62016fa4ce2668513';
    var queryLatLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(queryLatLon)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data[0].lat)
            console.log(data[0].lon)

            // --- Get the future forecast
            var lat = data[0].lat
            var lon = data[0].lon
            var weatherFuture = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=5&appid=' + apiKey;
            console.log(weatherFuture)

            // fetch(weatherFuture)
            //     .then(function (response) {
            //         return response.json();
            //     })
            //     .then(function(data){
            //         console.log(data);
            //     })
        })
    
    $('input[name="city"').val('');
}

function cityListEl(event) {
    event.preventDefault();
    var city = $(event.target).attr('name');
    // console.log('event target: ' + event.tar]get)
    // console.log('test: ' + test)
    // var city = $('.name');
    // console.log(event)
    // console.log('This: ' + this)
    console.log('City List: ' + city)
    citySearch = $('<button>'); // Previously missing the <>
    citySearch.addClass('city-titles');
    citySearch.attr('name',city)
    citySearch.text(city);
    cityHistory.append(citySearch);

    var apiKey = 'eea82704764516c62016fa4ce2668513';
    var queryLatLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

    fetch(queryLatLon)
        .then(function (response) {
            return response.json();
        })
        .then(function(data){
            console.log(data);
            console.log(data[0].lat)
            console.log(data[0].lon)
        })
    }       

var search = $('#searchBtn'); 
search.on('click', cityList);
/// QUESTION: Can you make the click execute two functions? 

var searchHistory = $('#search-history');
searchHistory.on('click', '.city-titles', cityListEl); // no response[]

// var currentTemp = $('#current-temp')
// currentTemp.text('test')
