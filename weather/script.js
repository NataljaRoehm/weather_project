// https://get.geojs.io/v1/ip/geo.json
const cityImgElement = document.getElementById("image-card");
const temperatureElement = document.getElementById("temperature");
const placeElement = document.getElementById("place");
const windspeedElement = document.getElementById("windspeed");
const weathercodeElement =document.getElementById("weathercode");
const txtWeathercodeElement = document.getElementById("txt-weathercode");


async function getWeather() {
    const res = await fetch("https://get.geojs.io/v1/ip/geo.json");
    const obj = await res.json();
    const { longitude, latitude, city } = obj;
    placeElement.textContent += ` ${city}`;
    getWeatherLocation(longitude,latitude);
}

async function getWeatherLocation(longitude, latitude) {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
      const weather = await res.json();
      const { temperature, windspeed, weathercode } = weather.current_weather;
      temperatureElement.textContent += ` ${temperature} ºC`;
      windspeedElement.textContent += `${windspeed} m/s`;
  
      const textDescription = getWeatherCode(weathercode); 
   
      weathercodeElement.textContent = `${weathercode}: ${textDescription}`;
      txtWeathercodeElement.innerText = textDescription;
  }

function getWeatherCode(weatherCode) {
    switch (Number(weatherCode)) {
        case 0: return "Clear sky";
        case 1: return "Mainly clear";
        case 2: return "Partly cloudy";
        case 3: return "Overcast";
        case 48: return "Fog and depositing rime fog";
        case 45: return "Fog and depositing rime fog";
        case 51: return "Drizzle light";
        case 53: return "Drizzle moderate";
        case 55: return "Drizzle dense intensity";
        case 57: return "Freezing Drizzle light";
        case 56: return "Freezing Drizzle dense intensity";
        case 61: return "Rain slight";
        case 63: return "Rain moderate";
        case 65: return "Rain heavy intensity";
        case 66: return "Freezing Rain light";
        case 67: return "Freezing Rain heavy intensity";
        case 71: return "Snow fall: slight";
        case 73: return "Snow fall: moderate";
        case 75: return "Snow fall: heavy intensity";
        default: return "Clear sky";
    }
}

getWeather();
