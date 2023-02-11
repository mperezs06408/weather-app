import { configureStore } from "@reduxjs/toolkit";
import { citiesWeatherSlice } from "./slices/citiesWeatherSlice";

export const store = configureStore({
    reducer: {
        citiesWeather: citiesWeatherSlice.reducer
    }
})