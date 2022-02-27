import axios from 'axios';
const API = require('./configApi');

export async function getInfoCityByCoordsApi(coords) {
    const cityInfo = await axios.get(`${API.baseUrlWeather()}weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${API.apiKeyWeather()}`)
        .then(async function (response) {
            return response.data
        })
        .catch((e)=>{
            console.log(e)
        })

    return cityInfo
}

export async function getInfoCityByCityName(city) {
    const cityInfo = await axios.get(`${API.baseUrlWeather()}weather?q=${city}&units=metric&lang=pt&appid=${API.apiKeyWeather()}`)
        .then(function (response) {
            return response.data
        })
        .catch((e)=>{
            console.log(e)
        })

    return cityInfo
}

export async function getForecastCityByNameApi(city) {
    const cityForecast = await axios.get(`${API.baseUrlWeather()}forecast?q=${city}&units=metric&lang=pt&appid=${API.apiKeyWeather()}&cnt=35`)
        .then(function (response) {
            return response.data
        })
        .catch((e)=>{
            console.log(e)
        })

    return cityForecast
}


