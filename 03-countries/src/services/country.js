import axios from "axios";


const API_URL_ALL = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const API_URL_COUNTRY = `https://studies.cs.helsinki.fi/restcountries/api/name`

const getAllCountries = () => {
    const request = axios.get(API_URL_ALL)
    return request.then(response => response.data)
}

const getOneCountry = ({ countryName }) => {
    const request = axios.get(`${API_URL_COUNTRY}/${countryName}`)
    return request.then(response => response.data)
}

export default { getAllCountries, getOneCountry }