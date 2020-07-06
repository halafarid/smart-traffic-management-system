import jwtDecode from 'jwt-decode';
import http from "./httpService";
import { apiUrl } from "../config.json";

export function login(userType, id, password) {
    const apiEndPoint = `${apiUrl}/api/auth/${userType}/login`;
    return http.post(apiEndPoint, {id, password});
}

export function logout() {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("carsPlates");
}

export function decodeAT() {
    try {
        const jwt = localStorage.getItem('accessToken');
        return jwtDecode(jwt);
    } catch(ex) {
        return null;
    }
}