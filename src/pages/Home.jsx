import HomeTemplate from "@components/templates/HomeTemplate";
import SwitchFormat from "@components/atoms/SwitchFormat";
import SearchableSelect from "@components/molecules/SearchableSelect";
import WeatherCard from '@components/molecules/WeatherCard';
import { getCityWeather } from "../store/thunks/citiesWeatherThunk";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import '@styles/pages/Home.scss'


function Home(){
    const {
        city,
        format
    } = useSelector(state => state.citiesWeather)
    const dispatch = useDispatch();

    useEffect(()=> {
        if (city.info.label !== '') {
            dispatch( getCityWeather(city.info) )
        }
    }, [format.id])
    
    return (
        <HomeTemplate>
            <SwitchFormat />
            <SearchableSelect />
            <WeatherCard />
        </HomeTemplate>
    )
}

export default Home;

