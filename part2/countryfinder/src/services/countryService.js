import axios from "axios";
const getAllUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`

const getAll = () => {
    return axios.get(getAllUrl)
}

const getFiltered = (filtered) => {
    return axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${filtered[0]}`)
}

export default {getAll, getFiltered}