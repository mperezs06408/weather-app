import { getWeatherIcon } from "@/api/openWeatheAPI";
import Loader from "@components/atoms/Loader";
import '@styles/components/ForecastCard.scss';

function ForecastCard({hour, format, temperature, icon, description, isLoading = false}){
    return(
        <>
            {
                !isLoading && 
                <div className="forecast__card">
                    <p className="forecast__temp">{temperature}{format}°</p>
                    <img src={getWeatherIcon(icon)} alt={icon} className='forecast__icon' />
                    <p className="forecast__desc">{description}</p>
                    <p className="forecast__hour">{hour}</p>
                </div>
            }
            {
                isLoading && 
                    <Loader />
            }
        </>
    )
}

export default ForecastCard;