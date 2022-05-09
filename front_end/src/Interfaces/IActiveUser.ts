import { Pet } from './IPet';

export interface ActiveUser {
    userId: string,
    isAdmin: boolean,
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string,
    personalBio?: string,
    ownedPets?: Pet[],
    savedPets?: Pet[],
}