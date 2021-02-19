const weather = document.querySelector(".js-weather");
const API_KEY = "ef3bc2752458bdacf223de2b7baab124";
const COORDS = "coords";

function getWeather(lat, lng){
    // API이용해서 날씨를 불러와서 창에 띄우는 메소드
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature}ºC \n ${place}`
    });
}

function saveCoords(coordsObj){
    // local storage에 저장하는 메소드
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSuccess(position){
    // 좌표 입력에 성공 시 발생 메소드
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude: latitude,
        longitude: longitude
    };
    saveCoords(coordsObj);
}

function handleGeoError(){
    // 좌표 입력 실패 시 발생 메소드
    console.log("Can't access geo location")
}

function askForCoords(){
    // 좌표 입력받는 메소드
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    // local storage에서 불러와서 없으면 입력메소드 
    // 실행시키고, 있으면 불러온 정보를 함수에 전달해주는 메소드
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    } else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude,parseCoords.longitude);
    }
}

function init(){
    // 실행 메소드
    loadCoords();
}

init();