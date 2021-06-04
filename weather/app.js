var weather = {};
var backgrounds = {'rain': "https://c2.staticflickr.com/4/3916/14821310922_e31a10a3eb_k.jpg", 
				'suns': "https://c2.staticflickr.com/4/3191/3284522561_76dcccabe5_o.jpg", 
				'clouds': "https://c2.staticflickr.com/8/7353/16596172775_eb51c68f13_h.jpg",
				'snow': "https://c1.staticflickr.com/9/8726/16677969677_4897e8bd99_h.jpg",
				'thunder': "https://c1.staticflickr.com/7/6009/5945559021_56df26e9bc_o.jpg" }

var units = 'us'
var weatherMe = "8ed4b4cd845b2cad125410a34d4988d5"

function getLocation() {
	//Dose browser support location? If so use geolocation api.
    if (navigator.geolocation) {
    	//Use ip address if error.
        navigator.geolocation.getCurrentPosition(getWeather, fallbackLocation);
    } else {
    	//No browser comp. user ip address
        fallbackLocation();
    }
}

function fallbackLocation(error) {
    //Get data from ipinfo.io
    $.getJSON("https://ipinfo.io/json", function(data){
   		//organize it simular to navigator.geolocation output
   		loc = data.loc.split(',');
   		var position = {};
   		position.coords = {};
   		position.coords.latitude = loc[0];
   		position.coords.longitude = loc[1];
   		getWeather(position);
    })
}

function getWeather(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
  
    let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weatherMe}`
    //Get weather info and proccess data.
    $.getJSON(url, function(data){
    	weather.tempF = Math.round(((data.main.temp - 273.15) * 1.8000 + 32.00) * 100) / 100 + " &degF";
    	weather.tempC = Math.round((data.main.temp - 273.15) * 100) / 100 + " &degC";
    	weather.city = data.name;
    	weather.wind = Math.round((data.wind.speed * 1.9438444924574) * 100) / 100;
    	weather.description = data.weather[0].description;
    	weather.icon = data.weather[0].icon;
    	updateWeather(weather);
    	updateBackground(weather.icon.substring(0,2));
    })
}

function updateWeather(data){
	//Change from loading to flex.
	document.getElementById("loading").style.display = 'none';
	document.getElementById("box").style.display = 'flex';
	//update numbers and images
	document.getElementById("tempreature").innerHTML = weather.tempF;
	document.getElementById("wind").innerHTML = weather.wind + ' Knots';
	document.getElementById("icon").src = "http://openweathermap.org/img/w/" + weather.icon + ".png";
	document.getElementById("description").innerHTML = weather.description;
	document.getElementById("city").innerHTML = weather.city;
	console.log(data)
}

function updateBackground(weatherCode){
	var background = ""
	switch (weatherCode){
		case '03':
		case '04':
			background = backgrounds.clouds;
			break;
		case '09':
		case '10':
		case '50':
			background = backgrounds.rain;
			break
		case '11':
			background = backgrounds.thunder;
			break
		case '13':
			background = backgrounds.snow;
			break
		case '01':
		case '02':
		default:
			background = backgrounds.suns;
		
	}
	document.body.style.background = "url(" + background + ") no-repeat center center fixed";
}

document.getElementById('toggle').addEventListener('click', function(){
	if (units === 'us'){
		document.getElementById("tempreature").innerHTML = weather.tempC;
		units = 'metric';
	} else {
		document.getElementById("tempreature").innerHTML = weather.tempF;
		units = 'us';
	}
})