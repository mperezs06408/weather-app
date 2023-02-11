import InfoLabels from "../atoms/InfoLabels"
import { useSelector } from 'react-redux';
import Loader from "@components/atoms/Loader";
import '@styles/components/WeatherCard.scss'

function WeatherCard() {
    const {city, isLoading, error} = useSelector(state => state.citiesWeather)

    const {
        info,
        weather
    } = city

    return(
        <>
            {
                (!error && info.label !== '' && !isLoading) && 
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
            }
            {
                (!error && info.label == '') &&
                <article className="weatherCard">
                    <div className="weatherCard__main">
                        <h1 className="weatherCard__city"></h1>
                        <h2 className="weatherCard__temp">Welcome!</h2>
                    </div>
                    <div className="weatherCard__info">
                    </div>
                </article>
            }
            {
                (!error && isLoading) &&
                <article className="weatherCard">
                    <Loader />
                </article>
            }
            {
                error &&
                <article className="weatherCard">
                    <div className="weatherCard__main">
                        <h1 className="weatherCard__city">reload and try again</h1>
                        <h2 className="weatherCard__temp">404 error :(</h2>
                    </div>
                    <div className="weatherCard__info">
                    </div>
                </article>
            }
        </>
    )
}

export default WeatherCard