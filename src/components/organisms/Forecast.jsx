import { useSelector } from "react-redux";
import ForecastCard from "@/components/molecules/ForecastCard";
import '@styles/components/Forecast.scss';

function Forecast() {
    const { city, isLoading, error, format } = useSelector(state => state.citiesWeather)
    const { forecast: forecastElements } = city

    return(
        <div className="forecast">
            {
                !error && !isLoading &&
                forecastElements.map( forecast => (
                    <ForecastCard 
                        key={forecast.date}
                        hour={forecast.date}
                        format={format.id}
                        temperature={forecast.temp}
                        icon={forecast.icon}
                        description={forecast.desc}
                    />
                ))
            }
            {
                isLoading && 
                <ForecastCard 
                    isLoading={isLoading}
                />
            }
        </div>
    )
}

export default Forecast;