import http from "./httpService";
import { apiUrl } from "../config.json";

export function getAllCars() {
    return http.get(`${apiUrl}/api/cars?pageSize=50`);
}

export function getUserCars(userId) {
    return http.get(`${apiUrl}/api/cars/user/${userId}`);
}

export function getSpecificCar(id) {
    return http.get(`${apiUrl}/api/cars/id/${id}`);
}

export function getCarPlate(plateNumber) {
    return http.get(`${apiUrl}/api/cars/${plateNumber}`);
}

export function addCar(car) {
    const apiEndPoint = `${apiUrl}/api/cars`;
    return http.post(apiEndPoint, car);
}


export function getStolenCars() {
    return http.get(`${apiUrl}/api/StolenCars?pageSize=50`);
}

export function addStolenCar(car) {
    const apiEndPoint = `${apiUrl}/api/StolenCars`;
    return http.post(apiEndPoint, car);
}

export function getSpecificStolenCar(carId) {
    return http.get(`${apiUrl}/api/StolenCars/${carId}`)
}

export function returnCarToTraffic(plateNumber) {
    const apiEndPoint = `${apiUrl}/api/StolenCars/traffic/return/${plateNumber}`;
    return http.post(apiEndPoint, plateNumber);
}

export function returnCarToUser(plateNumber) {
    const apiEndPoint = `${apiUrl}/api/StolenCars/user/return/${plateNumber}`;
    return http.post(apiEndPoint, plateNumber);
}