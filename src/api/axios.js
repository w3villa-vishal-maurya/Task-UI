import axios from "axios";

export default axios.create({
    baseURL: "https://task-management-api-t9qy.onrender.com"
    // baseURL: "http://localhost:10000"
});