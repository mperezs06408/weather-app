import { onLoadingInfo, onErrorDuringFetching, selectCityToFetch, setCache } from "../slices/citiesWeatherSlice";
import { getCityWeatherInfo, getCityWeatherForecast } from "@/api/openWeatheAPI";

const forecastObject = (obj) => {
    const date = new Date(obj.dt * 1000);

    return {
        date: `${date.getHours()<10?'0':''}${date.getHours()}:${date.getMinutes()<10?'0':''}${date.getMinutes()}`,
        temp: obj.main.temp,
        icon: obj.weather[0].icon,
        desc: obj.weather[0].main,
        humidity: obj.main.humidity
    }
}

export const getCityWeather = (cityInfo) => {
    return async(dispatch, getState) => {
        dispatch( onLoadingInfo(true))

        const {
            citiesWeather
        } = getState()
        const {
            format,
            cache
        } = citiesWeather

        const {
            value,
            label
        } = cityInfo

        const cache_id = `${label};${format.id}`;

        
        // const cacheItem = cache[cache_id]

        const cacheItem = cache.find(cityRegister => cityRegister.id === cache_id)

        if (!cacheItem) {
            const [latitude, longitude] = value.split(';');

            try { 
                const cityWeatherInfo = await getCityWeatherInfo(latitude, longitude, format.unit);
                let cityWeatherForecast = await getCityWeatherForecast(latitude, longitude, format.unit);
        
                cityWeatherForecast = cityWeatherForecast.list.map( (hourWeather) => forecastObject(hourWeather) )

                const citylastUpdateHour = new Date(cityWeatherInfo.dt * 1000)
                const citySunriseHour = new Date(cityWeatherInfo.sys.sunrise * 1000)
                const citySunsetHour = new Date(cityWeatherInfo.sys.sunset * 1000);
        
                const newCityInfo = {
                    info: {
                        label: label,
                        value: value
                    },
                    weather: {
                        lastUpdateHour:
                        `${citylastUpdateHour.getHours()<10?'0':''}${citylastUpdateHour.getHours()}:${citylastUpdateHour.getMinutes()<10?'0':''}${citylastUpdateHour.getMinutes()}`,
                        current_temp: 
                        `${cityWeatherInfo.main.temp} °${format.id}`,
                        min_temp:
                        `${cityWeatherInfo.main.temp_min} °${format.id}`,
                        max_temp:
                        `${cityWeatherInfo.main.temp_max} °${format.id}`,
                        main: cityWeatherInfo.weather[0].main,
                        icon: cityWeatherInfo.weather[0].icon,
                        sunriseHour: 
                        `${citySunriseHour.getHours()<10?'0':''}${citySunriseHour.getHours()}:${citySunriseHour.getMinutes()<10?'0':''}${citySunriseHour.getMinutes()}`,
                        sunsetHour:
                        `${citySunsetHour.getHours()<10?'0':''}${citySunsetHour.getHours()}:${citySunriseHour.getMinutes()<10?'0':''}${citySunriseHour.getMinutes()}`,
                        humidity:`${cityWeatherInfo.main.humidity} %`,
                        windSpeed: `${cityWeatherInfo.wind.speed} ${format.windMetric}`
                    },
                    forecast: cityWeatherForecast.splice(0,5),
                }

                dispatch( selectCityToFetch(newCityInfo) )
                dispatch( setCache() )

            } catch (e) {
                console.error(`Error during city fetch: ${e}`)
                dispatch( onErrorDuringFetching() )
            }
        } else {
            const {
                values: city
            } = cacheItem;

            dispatch( selectCityToFetch(city) )
        }

        
        dispatch( onLoadingInfo(false))
    }
}