import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost/Peak_Seats/backend-peakseats/api",
  headers:{
    "Content-Type": "application/json",
  }
});

export default api;