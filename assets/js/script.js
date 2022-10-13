var cityHistory = $('#city-list'); // parent
var current = $('#weather-current'); 
var future = $('#weather-future')
var forecast = $('#forecast')
var city


function weather() {
    var welcome = $('#instructions')
    welcome.hide()

    // --- Create city history new button
    console.log('City: ' + city)
    citySearch = $('<button>'); // Previously missing the <>
    citySearch.addClass('city-titles btn btn-dark my-1 w-100'); // ACTION: Deleting city-titles affected the code
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

            fetch(queryWeather)
                .then(function (response) {
                    return response.json(); 
                })
                
                .then(function(data) {
                    // -- Get the current weather
                    let today = moment().format('M/D/YY')
                    let currentCard = $('<card>')
                    currentCard.addClass('mw-100 card shadow-sm p-2')
                    current.append(currentCard);
                    currentCard.append(`<h4>${city} (${today})<img src="http://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png"</h4>`)
                    currentCard.append('<p>Description: ' + data.list[0].weather[0].description + '</p>')
                    currentCard.append('<p>Temp: ' + data.list[0].main.temp + '&#8457</p>')
                    currentCard.append('<p>Wind: '  + data.list[0].wind.speed + ' mph</p>')
                    currentCard.append('<p>Humidity: ' + data.list[0].main.humidity + '%</p>')
                    // currentCard.append('<p><img src="http://openweathermap.org/img/wn/' + data.list[0].weather[0].icon + '@2x.png"/></p>')                     

                    // --- Get the future forecast
                    future.show()
                    for (let i = 1; i < 6; i++) {   
                        let date = moment().add(i, 'days').format('M/D/YY')
                        let forecastCard = $('<card>') // Parent 2
                        forecastCard.addClass('col-12 col-md-2 card shadow-sm m-1 p-2') 
                        forecast.append(forecastCard) // Parent 1
                        forecastCard.append('<h5>' + date + '<h5>') 
                        forecastCard.append(`<p><img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png"/></p>`) 
                        forecastCard.append('<p>Description: ' + data.list[i].weather[0].description + '</p>')
                        forecastCard.append('<p>Temp: ' + data.list[i].main.temp + '&#8457</p>')
                        forecastCard.append('<p>Wind: '  + data.list[i].wind.speed + ' mph</p>')
                        forecastCard.append('<p>Humidity: ' + data.list[i].main.humidity + '%</p>')
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
    weather();
}


var search = $('#searchBtn'); 
search.on('click', cityForm);
/// QUESTION: Can you make the click execute two functions? 

var searchHistory = $('#search-history');
searchHistory.on('click', '.city-titles', cityList); 


future.hide()

