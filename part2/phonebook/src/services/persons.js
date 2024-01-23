import axios from "axios";
const baseUrl = "/api/persons";

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
} 

const update = (id, newObject) => {
    return axios.put(`/api/persons/${id}`, newObject)
}

const deleteNumber = (id) => {
    return axios.delete(`/api/persons/${id}`)
}

export default {getAll, create, update, deleteNumber}