import axios from "axios"

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_KEY = '';
const WEATHER_CALL_EXCLUDE = 'minutely,hourly,daily,alerts';

const weatherInstance = axios.create({
    baseURL: WEATHER_URL
})

export const getCityWeatherInfo = async (latitude, longitude, units) => 
    await weatherInstance.get(`/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_KEY}`)
            .then((response) => response.data)