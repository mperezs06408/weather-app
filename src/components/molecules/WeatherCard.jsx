import InfoLabels from "../atoms/InfoLabels"
import { useSelector } from 'react-redux';
import '@styles/components/WeatherCard.scss'

function WeatherCard() {
    const {city, isLoading, error} = useSelector(state => state.citiesWeather)

    const {
        info,
        weather
    } = city

    return(
        !error &&
        <article className="weatherCard">
            <div className="weatherCard__main">
                <span className="weatherCard__lastUpdate">last update: {weather.lastUpdateHour}</span>
                <h1 className="weatherCard__city">{info.label}</h1>
                <h2 className="weatherCard__temp">{weather.current_temp}</h2>
                <h2 className="weatherCard__state">{weather.main}</h2>
                <span className="weatherCard__tempVariables">{weather.min_temp} / {weather.max_temp}</span>
            </div>
            <div className="weatherCard__info">
                <InfoLabels label='sunrise' info={weather.sunriseHour} />
                <InfoLabels label='sunset' info={weather.sunsetHour} />
                <InfoLabels label='humidity' info={weather.humidity} />
                <InfoLabels label='speed' info={weather.windSpeed} />
            </div>
        </article>
    )
}

export default WeatherCard