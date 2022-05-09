import { NewUser } from '../Interfaces/INewUser';
import { ExistingUser } from '../Interfaces/IExistingUser';
import { API, AUTH_ROUTE } from '../Utils/Constants/constants';
import { ActiveUser } from '../Interfaces/IActiveUser';

export async function signUp(newUser: NewUser) {
    try {
        const response = await API.post(`${AUTH_ROUTE}/signup`, newUser);
        return response.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

export async function logIn(existingUser: ExistingUser) {
    try {
        const response = await API.post(`${AUTH_ROUTE}/login`, existingUser);
        const loggedInUser: ActiveUser = { ...response.data, type: 'User' };
        return loggedInUser;
    } catch (err) {
        throw err;
    }
}

export async function logOut() {
    try {
        const response = await API.post(`${AUTH_ROUTE}/logout`);
        return response.status;
    } catch (err) {
        throw err;
    }
}