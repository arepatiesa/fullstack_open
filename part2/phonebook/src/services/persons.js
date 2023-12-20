import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    return axios.get(baseUrl)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject)
} 

const update = (id, newObject) => {
    return axios.put(`http://localhost:3001/persons/${id}`, newObject)
}

const deleteNumber = (id) => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

export default {getAll, create, update, deleteNumber}