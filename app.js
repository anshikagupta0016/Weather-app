

 //SELECT ELEMENTS
 const iconElement=document.querySelector(".weather-icon");
 const tempElement=document.querySelector(".temperature-value p");
 const descElement=document.querySelector(".temperature-description p");
 const locationElement=document.querySelector(".location p");
 const notificationElement=document.querySelector(".notification");


//APP DATA
const weather={};

weather.temperature={
    unit:"celsius"
}

//APP CONSTS AND VARS
const KELVIN=273;
//API KEY
const key="39ec1cd2b4ca4fed5f607166800daf29";

//CHECK IF BROWSER SUPPORTS GEOLOCATION
if('geolocation' in navigator){
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}else{
    notificationElement.style.display="block";
    notificationElement.innerHTML="<p>Browser doesn't support this location</p>";
}

//SET USER'S POSITION
function setPosition(position){
    let latitude=position.coords.latitude;
    let longitude=position.coords.longitude;

    getWeather(latitude,longitude);
}

//SHOW ERRORS
function showError(error){
    notificationElement.style.display="block";
    notificationElement.innerHTML=`<p>${error.message}</p>`
}

//GET WEATHER FROM API
function getWeather(latitude,longitude){
    let api=`http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key}`;
    
    fetch(api)
        .then(function(response){
            let data=response.json();
            return data;
        })
        .then(function(data){
            weather.temperature.value= Math.floor(data.main.temp - KELVIN);
            weather.description=data.weather[0].description;
            weather.iconId=data.weather[0].icon;
            weather.city=data.name;
            weather.country=data.sys.country; 
        })
        .then(function(){
            displayWeather();
        })
}

//DISPLAY WEATHER
function displayWeather(){
    iconElement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
    tempElement.innerHTML=`${weather.temperature.value} °<span>C</span>`;
    descElement.innerHTML=weather.description;
    locationElement.innerHTML=`${weather.city}, ${weather.country}`;
}

//C TO F
function celsiusToFarenheit(temperature){
    return (temperature * 9/5)+32;
}

//ON CLICK TEMPERATURE CONVERSION
tempElement.addEventListener("click",function(){
    if(weather.temperature.value ===undefined) return;
    if(weather.temperature.unit ==="celsius"){
        let fahrenheit=celsiusToFarenheit(weather.temperature.value);
        fahrenheit=Math.floor(fahrenheit);

        tempElement.innerHTML=`${fahrenheit} °<span>F</span>`;
        weather.temperature.unit="fahrenheit";
    }else{
        tempElement.innerHTML=`${weather.temperature.value} °<span>C</span>`;
        weather.temperature.unit="celsius";
    }
})