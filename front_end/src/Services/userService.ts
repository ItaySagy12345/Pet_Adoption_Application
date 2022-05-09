import { API, USER_ROUTE } from '../Utils/Constants/constants';
import { UserUpdateDetails } from '../Interfaces/IUserUpdateDetails';
import { UserUpdatePassword } from '../Interfaces/IUserUpdatePassword';

export async function getUsers() {
    try {
        const response = await API.get(`${USER_ROUTE}`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function getFullUsers() {
    try {
        const response = await API.get(`${USER_ROUTE}/full`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function getUserById(requestedUserId: string) {
    try {
        const response = await API.get(`${USER_ROUTE}/${requestedUserId}`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function updateUserDetails(userId: string, updatedUser: UserUpdateDetails) {
    try {
        const response = await API.put(`${USER_ROUTE}/${userId}/userDetails`, updatedUser);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function updateUserPassword(userId: string, updatedUser: UserUpdatePassword) {
    try {
        const response = await API.put(`${USER_ROUTE}/${userId}/password`, updatedUser);
        return response.status;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function getFullUserById(requestedUserId: string) {
    try {
        const response = await API.get(`${USER_ROUTE}/${requestedUserId}/full`);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}