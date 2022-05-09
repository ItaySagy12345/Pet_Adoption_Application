import { ActiveUser } from "../../Interfaces/IActiveUser";
import { Pet } from "../../Interfaces/IPet";

//Formatting:
export function getCapitalizedString(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export function getAllCapsString(string: string) {
    return string.toUpperCase();
}

//Type Checking:
export function isAUser(object: any): object is ActiveUser {
    return 'email' in object;
}

export function isAPet(object: any): object is Pet {
    return 'animalType' in object;
}

// export function isAUser(object: any): object is ActiveUser {
//     return 'type' in object && object.type === 'User';
// }

// export function isAPet(object: any): object is Pet {
//     return 'type' in object && object.type === 'Pet';
// }