var api = {
    key:"c509f0ed65d776704aa843299b477e75",
    baseurl:"http://api.openweathermap.org/data/2.5/"
}

var searchbox = document.querySelector(".search-city");
searchbox.addEventListener("keypress", function setQuery(e){
    if(e.keyCode == 13){
        getResults(searchbox.value);
        searchbox.value = "";
    }
});

function getResults(query){
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`).then(weather => {
        return weather.json();
    }).then(displayResults)
}

function displayResults(weather){
    console.log(weather)

    var city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name}, ${weather.sys.country}`;

    var now = new Date();
    var date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now)

    var temp = document.querySelector('.current .temp')
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

    var weather_el = document.querySelector('.current .weather');
    weather_el.innerHTML = weather.weather[0].main;

    var highLow = document.querySelector('.highLow');
    highLow.innerHTML=`${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;

    var wind = document.querySelector('.current .wind');
    wind.innerHTML = `Wind: ${Math.round(weather.wind.speed*1.60)} km/h`

    var humidity = document.querySelector('.current .humidity');
    humidity.innerHTML = `Humidity: ${weather.main.humidity}%`;

    var pressure = document.querySelector('.current .pressure');
    pressure.innerHTML = `Pressure: ${Math.round(weather.main.pressure*0.001)} bar`
}

function dateBuilder(d){
    var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    var day = days[d.getDay()];
    var date = d.getDate();
    var month = months[d.getMonth()]
    var year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
 }

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=c509f0ed65d776704aa843299b477e75