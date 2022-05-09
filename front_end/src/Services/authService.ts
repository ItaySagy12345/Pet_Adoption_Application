import { NewUser } from '../Interfaces/INewUser';
import { ExistingUser } from '../Interfaces/IExistingUser';
import { API, AUTH_ROUTE } from '../Utils/Constants/constants';

export async function signUp(newUser: NewUser) {
    try {
        const response = await API.post(`${AUTH_ROUTE}/signup`, newUser);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function logIn(existingUser: ExistingUser) {
    try {
        const response = await API.post(`${AUTH_ROUTE}/login`, existingUser);
        return response.data;
    } catch (err: any) {
        throw err.response.data.message;
    }
}

export async function logOut() {
    try {
        const response = await API.post(`${AUTH_ROUTE}/logout`);
        return response.status;
    } catch (err: any) {
        alert(err);
    }
}