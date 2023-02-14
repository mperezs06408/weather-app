import axios from "axios"

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5';
const WEATHER_KEY = '';

const weatherInstance = axios.create({
    baseURL: WEATHER_URL
})

export const getCityWeatherInfo = async (latitude, longitude, units) => 
    await weatherInstance.get(`/weather?lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_KEY}`)
            .then((response) => response.data)

export const getCityWeatherForecast = async(latitude, longitude, units) =>
    await weatherInstance.get(`/forecast?lat=${latitude}&lon=${longitude}&units=${units}&appid=${WEATHER_KEY}`)
            .then((response) => response.data)

export const getWeatherIcon = (nameFile) => `http://openweathermap.org/img/wn/${nameFile}.png`