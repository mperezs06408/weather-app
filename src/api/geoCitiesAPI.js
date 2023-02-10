import axios from 'axios';

const GEO_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';

export const options = {
    headers:{
        'X-RapidAPI-Key': '02e820b521msh99a61fda1268e60p175a5ajsn58fda741f25a',
        'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
    }
}

export const citiesInstance = axios.create({
    baseURL: GEO_URL
})

export const getCities = '/cities';