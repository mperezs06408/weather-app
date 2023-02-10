import InfoLabels from "../atoms/InfoLabels"

function WeatherCard({cityName, weatherData}) {
    return(
        !!cityName &&
        <article className="weatherCard">
            <div className="weatherCard__main">
                <span>last update: {weatherData?.lastUpdateHour}</span>
                <h1 className="weatherCard__city">{cityName}</h1>
                <h2 className="weatherCard__temp">{weatherData?.temperature.current}</h2>
                <span className="weatheCard__tempVariables">{weatherData?.temperature.min} / {weatherData?.temperature.max}</span>
            </div>
            <div className="weatherCard__info">
                <InfoLabels label='sunrise' info={weatherData?.sunriseHour} />
                <InfoLabels label='sunset' info={weatherData?.sunsetHour} />
                <InfoLabels label='humidity' info={weatherData?.humidity} />
                <InfoLabels label='speed' info={weatherData?.windSpeed} />
            </div>
        </article>
    )
}

export default WeatherCard