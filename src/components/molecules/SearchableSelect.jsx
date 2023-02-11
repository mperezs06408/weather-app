import { citiesInstance, options, getCities } from "../../api/geoCitiesAPI";
import { AsyncPaginate } from "react-select-async-paginate";
import { useSelector, useDispatch } from 'react-redux';
import { getCityWeather } from "@/store/thunks/citiesWeatherThunk";
import '@styles/components/SearchableSelect.scss'

function SearchableSelect() {
    const {
        city
    } = useSelector(state => state.citiesWeather)
    const {
        info
    } = city
    const dispatch = useDispatch();


    const handleChange = (searchedElement) => {
        dispatch( getCityWeather(searchedElement) )
    }

    const loadOptions = async (inputValue) => {
        const request = await citiesInstance.get(`${getCities}?namePrefix=${inputValue}`, options)
        const response = request.data

        const citiesList = response.data.map((city) => 
            ({
                value: `${city.latitude};${city.longitude}`,
                label: `${city.name}, ${city.countryCode}`
            })
        )
        const selectOptions = {
            options: citiesList
        }

        return selectOptions
    }


    return(
        <section className="search">
            <p className="search__label">Search your city:</p>
            <AsyncPaginate 
                placeholder='Search a city'
                debounceTimeout={600}
                value={info}
                onChange={handleChange}
                loadOptions={loadOptions}
            />
        </section>
    )
}

export default SearchableSelect;