import HomeTemplate from "@components/templates/HomeTemplate";
import SwitchFormat from "@components/atoms/SwitchFormat";
import SearchableSelect from "@components/molecules/SearchableSelect";
import WeatherCard from '@components/molecules/WeatherCard';
import { getCityWeatherInfo } from "../api/openWeatheAPI";
import { useEffect, useState } from "react";

const CELSIUS = 'celsius';

function Home(){
    const [searchElement, setSearchElement] = useState({});
    const [format, setFormat] = useState({label: 'Celsius', units: 'metric', id: 'C', windMetric: 'm/s'})
    const [weatherInfo, setWeatherInfo] = useState({
        city: '',
        weather: {
            lastUpdateHour:'',
            temperature:{
                current:'',
                min:'',
                max:''
            },
            sunriseHour: '',
            sunsetHour: '',
            humidity:'',
            windSpeed: ''
        }
    })
    const {
        city,
        weather
    } = weatherInfo;

    useEffect(() => {
        if (searchElement?.label) {
            handleSelectChange(searchElement)
        }
    }, [format.label])

    const onChangeFormat = (value) => {
        setFormat({
            label: value,
            units: value === CELSIUS ? 'metric' : 'imperial',
            id: value === CELSIUS ? 'C' : 'F',
            windMetric: value === CELSIUS ? 'm/s' : 'm/h',
        })
    }

    const handleSelectChange = async (searchValue) => {
        console.log(searchValue)

        const [latitude, longitude] = searchValue.value.split(';');
        console.log(format.units)
        const cityWeatherInfo = await getCityWeatherInfo(latitude, longitude, format.units);

        const citylastUpdateHour = new Date(cityWeatherInfo.dt * 1000)
        const citySunriseHour = new Date(cityWeatherInfo.sys.sunrise * 1000)
        const citySunsetHour = new Date(cityWeatherInfo.sys.sunset * 1000);

        setWeatherInfo({
            city: searchValue.label,
            weather: {
                lastUpdateHour: 
                    `${citylastUpdateHour.getHours()<10?'0':''}${citylastUpdateHour.getHours()}:${citylastUpdateHour.getMinutes()<10?'0':''}${citylastUpdateHour.getMinutes()}`,
                temperature: {
                    current: `${cityWeatherInfo.main.temp} °${format.id}`,
                    min: `${cityWeatherInfo.main.temp_min} °${format.id}`,
                    max: `${cityWeatherInfo.main.temp_max} °${format.id}`
                },
                sunriseHour: 
                    `${citySunriseHour.getHours()<10?'0':''}${citySunriseHour.getHours()}:${citySunriseHour.getMinutes()<10?'0':''}${citySunriseHour.getMinutes()}`,
                sunsetHour: 
                    `${citySunsetHour.getHours()<10?'0':''}${citySunsetHour.getHours()}:${citySunriseHour.getMinutes()<10?'0':''}${citySunriseHour.getMinutes()}`,
                humidity: `${cityWeatherInfo.main.humidity} %`,
                windSpeed: `${cityWeatherInfo.wind.speed} ${format.windMetric}`
            }
        })
    }
    return (
        <HomeTemplate>
            <SwitchFormat 
                handleFormatChange={onChangeFormat}
            />
            <SearchableSelect
                value={searchElement}
                setValue={setSearchElement}
                parentAction={handleSelectChange}
            />
            <WeatherCard
                cityName={city}
                weatherData={weather}
            />
            {/* <div>
                <h1>{city}</h1>
                <p>{weather.lastUpdateHour}</p>
                <p>{weather.temperature.current}</p>
                <p>min: {weather.temperature.min} - max: {weather.temperature.max}</p>
                <h2>other weather data</h2>
                <ul>
                    <li>sunrise: {weather.sunriseHour}</li>
                    <li>sunset: {weather.sunsetHour}</li>
                    <li>humidity: {weather.humidity}</li>
                </ul>
            </div> */}
        </HomeTemplate>
    )
}

export default Home;

