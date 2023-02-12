import { onLoadingInfo, onErrorDuringFetching, selectCityToFetch, setCache } from "../slices/citiesWeatherSlice";
import { getCityWeatherInfo } from "@/api/openWeatheAPI";

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
        console.log(cache_id)

        
        // const cacheItem = cache[cache_id]

        const cacheItem = cache.find(cityRegister => cityRegister.id === cache_id)

        console.log(cacheItem)

        if (!cacheItem) {
            const [latitude, longitude] = value.split(';');

            try { 
                const cityWeatherInfo = await getCityWeatherInfo(latitude, longitude, format.unit);
        
                const citylastUpdateHour = new Date(cityWeatherInfo.dt * 1000)
                const citySunriseHour = new Date(cityWeatherInfo.sys.sunrise * 1000)
                const citySunsetHour = new Date(cityWeatherInfo.sys.sunset * 1000);

                console.log(cityWeatherInfo.weather[0],'main')
        
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
                    }
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