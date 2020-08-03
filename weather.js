const weather = document.querySelector(".js-weather");

const API_KEY = "77de4a012395e18cb9447f5b9ab20fca";
const COORDS = 'coords';

function getWeather(lat, lng){
	fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
		).then(function(response){
			return response.json()
		}).then(function(json){
			const temperature = json.main.temp;
			const place = json.name;
			weather.innerText = `TEMPERATURE : ${temperature}℃ / LOCATION : ${place}`;
		})
}

function saveCoords(coordsObj){
	localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position){
	const latitude = position.coords.latitude;
	const longitude = position.coords.longitude;
	const coordsObj = {
		latitude,
		longitude
	};
	saveCoords(coordsObj);
	getWeather(latitude,longitude);
}

function handleGeoError(){
	console.log("Can't access GEO location");
}

function askForCoords(){
	navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
	const loadedCoords = localStorage.getItem(COORDS);
	if(loadedCoords === null){
		askForCoords();
	}
	else{
		const parsedCoords = JSON.parse(loadedCoords);
		getWeather(parsedCoords.latitude, parsedCoords.longitude); 
	}
}

function init(){
	loadCoords();
}

init();