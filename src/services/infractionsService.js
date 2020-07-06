import http from "./httpService";
import { apiUrl } from "../config.json";

export function getALLInfractions() {
    return http.get(`${apiUrl}/api/Infractions`);
}

export function getSpecificInfraction(infractionId) {
    return http.get(`${apiUrl}/api/Infractions/${infractionId}`);
}

export function payInfraction(infractionId) {
    const apiEndPoint = `${apiUrl}/api/Infractions/${infractionId}`;
    return http.post(apiEndPoint, infractionId);
}

export function getUserInfractions(userId) {
    return http.get(`${apiUrl}/api/Infractions/user/${userId}`);
}

export function getCarInfractions(plateNumber) {
    return http.get(`${apiUrl}/api/Infractions/car/${plateNumber}`);
}

export function getInfractionsTypes() {
    return http.get(`${apiUrl}/api/InfractionTypes?pageSize=50`);
}

export function addInfractionType(type) {
    const apiEndPoint = `${apiUrl}/api/InfractionTypes`;
    return http.post(apiEndPoint, type);
}