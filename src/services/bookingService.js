import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAllBooking() {
    return http.get(`${apiUrl}/api/Booking`);
}

export function getUserBooking(userId) {
    return http.get(`${apiUrl}/api/Booking/user/${userId}`)
}