import http from "./httpService";
import { apiUrl } from "../config.json";


export function register(user) {
    const apiEndPoint = `${apiUrl}/api/auth/user/register`;

    return http.post(apiEndPoint, user);
}

export function changePassword(userType, oldPassword, newPassword, confirmPassword) {
    const apiEndPoint = `${apiUrl}/api/auth/${userType}/password`;

    return http.put(apiEndPoint, {oldPassword, newPassword, confirmPassword})
}

export function changeData(userType, email="", phoneNumber="", address="") {
    const apiEndPoint = `${apiUrl}/api/auth/${userType}/info`;

    return http.put(apiEndPoint, {address, phoneNumber, email});
}

export function getAllUsers() {
    return http.get(`${apiUrl}/api/Users`);
}

export function getUserProfile(userType) {
    return http.get(`${apiUrl}/api/auth/${userType}/info`);
}

export function getSpecificUser(userId) {
    return http.get(`${apiUrl}/api/Users/${userId}`);
}
