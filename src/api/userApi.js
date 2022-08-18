import axios from "axios";

const userApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
    headers: { 'x-ccloud-auth': 'prueba'}
})

export default userApi