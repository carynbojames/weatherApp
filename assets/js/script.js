var cityHistory = $('#city-list'); // parent
var current = $('#weather-current'); 
var forecast = $('#forecast')
var city


function weather() {
    // --- Create city history new button
    console.log('City: ' + city)
    citySearch = $('<button>'); // Previously missing the <>
    citySearch.addClass('city-titles');
    citySearch.attr('name',city)
    citySearch.text(city);
    cityHistory.append(citySearch);
    // cityList.text(city); // When I add this, it replaces the previous value
    // cityList.append('<li class="city-titles>' + city + '</li>'); // add child to cityList parent

    var apiKey = 'eea82704764516c62016fa4ce2668513';

    // --- Get the latitude and longitude via API
    let queryLatLon = 'http://api.openweathermap.org/geo/1.0/direct?q=' + city + '&limit=1&appid=' + apiKey;

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

            // --- Access the weather API
            // var weatherFuture = 'http://api.openweathermap.org/data/2.5/forecast/daily?lat=' + lat + '&lon=' + lon + '&cnt=5&appid=' + apiKey;
            let queryWeather = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon='+ lon + '&appid=' + apiKey + '&units=imperial';
           
            current.empty() // Removes the child elements of the selected element
            forecast.empty() 
            forecast.show()
            /// QUESTION: Why isn't it showing back up again?

            fetch(queryWeather)
                .then(function (response) {
                    return response.json(); 
                })
                
                .then(function(data) {
                    // -- Get the current weather
                    let today = moment().format('M/D/YY')
                    let currentCard = $('<card>')
                    currentCard.text(city)
                    current.append(currentCard);
                    currentCard.append('Today: ' + today)
                    currentCard.append('<p>Temp: ' + data.list[0].main.temp + ' F</p>')
                    currentCard.append('<p>Wind: '  + data.list[0].wind.speed + ' mph</p>')
                    currentCard.append('<p>Humidity: ' + data.list[0].main.humidity + ' %</p>')
                    currentCard.append('<p>Icon: ' + data.list[0].weather[0].description + '</p>')                    

                    // --- Get the future forecast
                    for (let i = 1; i < 6; i++) {   
                        let date = moment().add(i, 'days').format('M/D/YY')
                        let forecastCard = $('<card>')
                        forecastCard.addClass('col-2.4') // Added this to try to format
                        forecastCard.text(date) 
                        forecast.append(forecastCard)
                        forecastCard.append('<p>Icon: ' + data.list[i].weather[0].description + '</p>')
                        forecastCard.append('<p>Temp: ' + data.list[i].main.temp + ' F</p>')
                        forecastCard.append('<p>Wind: '  + data.list[i].wind.speed + ' mph</p>')
                        forecastCard.append('<p>Humidity: ' + data.list[i].main.humidity + ' %</p>')
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
    console.log('event target: ' + event.target)
    city = $(event.target).attr('name'); 
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

forecast.hide()

