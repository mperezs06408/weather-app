import { citiesInstance, options, getCities } from "../../api/geoCitiesAPI";
import { AsyncPaginate } from "react-select-async-paginate";

function SearchableSelect({value, setValue, parentAction}) {
    const handleChange = (searchedElement) => {
        setValue(searchedElement);
        parentAction(searchedElement);
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
        <AsyncPaginate 
            placeholder='Search a city'
            debounceTimeout={600}
            value={value}
            onChange={handleChange}
            loadOptions={loadOptions}
        />
    )
}

export default SearchableSelect;