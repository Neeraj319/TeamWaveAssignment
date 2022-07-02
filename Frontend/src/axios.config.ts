import axios from "axios";

const instance = axios.create({
    baseURL : "localhost:3000",
    timeout : 1000,
    headers : {
        "Content-Type" : "application/json"
    }
})

export default instance;