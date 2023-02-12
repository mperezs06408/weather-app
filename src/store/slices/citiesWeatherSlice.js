import { createSlice } from "@reduxjs/toolkit";

export const metrics = {
    celsius: {
        label: 'Celsius',
        unit: 'metric',
        id: 'C',
        windMetric: 'm/s'
    },
    fahrenheit: {
        label: 'Fahrenheit',
        unit: 'imperial',
        id: 'F',
        windMetric: 'm/h'
    }
}

const initialState = {
    city: {
        info: {
            label: '',
            value:''
        },
        weather: {
            lastUpdateHour:'',
            current_temp: '',
            min_temp:'',
            max_temp:'',
            main:'',
            icon:'',
            sunriseHour: '',
            sunsetHour: '',
            humidity:'',
            windSpeed: ''
        }
    },
    format: metrics.celsius,
    cache: [],
    isLoading:false,
    error:false
}

const reducers = {
    onLoadingInfo: (state, action) => {
        state.isLoading = action.payload
    },
    onErrorDuringFetching: (state) => {
        state.error = true
    },
    selectCityToFetch: (state, action) => {
        state.city = {
            ...state.city,
            ...action.payload
        }
    },
    changeSearchFormat: (state, action) => {
        state.format = {
            ...state.format,
            ...metrics[action.payload]}
    },
    setCache: (state) => {
        const {
            city,
            format
        } = state;

        const cache_id = `${city.info.label};${format.id}`;

        const newCityCache = {
            id: cache_id,
            values: {
                ...city
            }
        }
        state.cache.push(newCityCache);
    }
}

export const citiesWeatherSlice = createSlice({
    name: 'citiesWeather',
    initialState,
    reducers
})

export const {
    onLoadingInfo,
    onErrorDuringFetching,
    selectCityToFetch,
    changeSearchFormat,
    setCache,
} = citiesWeatherSlice.actions