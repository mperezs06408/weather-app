import axios from 'axios';

const GEO_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const options = {
    headers:{
        'X-RapidAPI-Key': '',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
}

export const citiesInstance = axios.create({
    baseURL: GEO_URL
})

export const getCities = '/cities';