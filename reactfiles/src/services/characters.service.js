import axios from "axios";
import authHeader from "./authHeader";

const API_BASE=process.env.NODE_ENV==="development"
  ? "http://localhost:9000/api/v1" : process.env.REACT_APP_BASE_URL
const API_URL="/characters";

const getAllPrivateCharacters=()=>{
    return axios.get(`${API_BASE}${API_URL}`, {headers:authHeader()})
}

const getSpecificCharacter=(id)=>{
    return axios.get(`${API_BASE}${API_URL}/${id}`, {headers:authHeader()})
}

const createCharacter=(name, race)=>{
    return axios.post(`${API_BASE}${API_URL}`, {name:name, race:race}, {headers:authHeader()})
}

const updateCharacter=(id, name, race)=>{
    return axios.patch(`${API_BASE}${API_URL}/${id}`, {name:name, race:race}, {headers:authHeader()})
}

const deleteCharacter=(id)=>{
    return axios.delete(`${API_BASE}${API_URL}/${id}`, {headers:authHeader()})
}

const charactersService={getAllPrivateCharacters, getSpecificCharacter, createCharacter, updateCharacter, deleteCharacter}

export default charactersService;