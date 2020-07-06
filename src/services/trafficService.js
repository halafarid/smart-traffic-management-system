import http from "./httpService";
import { apiUrl } from "../config.json";


export function getTrafficData() {
    return http.get(`${apiUrl}/api/traffics`);
}

export function getSpecificTraffic(trafficId) {
    return http.get(`${apiUrl}/api/traffics/${trafficId}`)
}