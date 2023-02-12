import '@styles/components/Resume.scss';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getCityWeather } from '@/store/thunks/citiesWeatherThunk';
import ResumeCard from './ResumeCard';

function Resume(){
    const {
        cache,
        format
    } = useSelector( state => state.citiesWeather)
    const dispatch = useDispatch();

    const [resumeList, setResumeList] = useState(cache)

    useEffect(() => {
        const resumeListWithFormat = cache.filter( cityCached => {
            const [cityName, formatId] = cityCached.id.split(';');

            return formatId === format.id
        })

        setResumeList(resumeListWithFormat);
    },[format.id, cache])

    const citySelectedFromCache = (id) => {
        const cityFromCache = cache.find( city => city.id === id)

        if(cityFromCache) {
            dispatch( getCityWeather(cityFromCache.values.info) )
        } else {
            console.log("City wasn't found")
        }
    }

    return(
        <section className="resume">
            {
                resumeList.map(city => (
                    <ResumeCard 
                        key={city.id}
                        id={city.id} 
                        cityName={city.values.info.label}
                        currentTemp={city.values.weather.current_temp}
                        icon={city.values.weather.icon}
                        lastUpdateHour={city.values.weather.lastUpdateHour}
                        handleClick={citySelectedFromCache}
                    />
                ))
            }
        </section>
    )
}

export default Resume;