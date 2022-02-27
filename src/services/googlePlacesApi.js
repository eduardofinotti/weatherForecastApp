import axios from 'axios';
const API = require('./configApi');

export async function searchCity(city) {
    const cities = await axios.get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?types=(cities)&key=${API.apiKeyGooglePlaces()}&input=${city}&language=pt`)
        .then(function (response) {
            console.log(response.data.predictions)
            return response.data.predictions
        })
        .catch((e)=>{
            console.log(e)
        })

    return cities
}
