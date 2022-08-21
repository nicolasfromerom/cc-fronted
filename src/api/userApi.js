import axios from "axios";
import environment from "@/environment/environment"

const url = environment.api

const userApi = axios.create({
    baseURL: url,
    headers: { 'x-ccloud-auth': 'prueba'}
})

export default userApi