import axios from 'axios';

// WORDING:
export const SUCCESSFUL_SIGN_UP_MESSAGE = "Successfully Signed Up!";
export const FIRST_NAME_WORDING = 'First Name';
export const LAST_NAME_WORDING = "Last Name";
export const EMAIL_WORDING = 'Email';
export const PASSWORD_WORDING = "Password";
export const OLD_PASSWORD_WORDING = "Old Password";
export const NEW_PASSWORD_WORDING = "New Password";
export const CONFIRM_NEW_PASSWORD_WORDING = "Confirm New Password";
export const CONFIRM_PASSWORD_WORDING = 'Confirm Password';
export const PHONE_NUMBER_WORDING = "Phone Number";
export const SIGN_UP_WORDING = "Sign up";
export const LOG_IN_WORDING = "Log in";
export const UPDATE_WORDING = 'Update';
export const ANIMAL_TYPE_WORDING = "Animal Type";
export const BREED_WORDING = "Breed";
export const ADOPTION_STATUS_WORDING = "Adoption Status";
export const HEIGHT_WORDING = "Height";
export const WEIGHT_WORDING = "Weight";
export const COLOR_WORDING = "Color";
export const PET_FORM_WORDING = 'pet form';
export const HYPOALLERGENIC_STATUS_WORDING = "Hypoallergenic Status";
export const HYPOALLERGENIC_WORDING = "Hypoallergenic";
export const NOT_HYPOALLERGENIC_WORDING = "Not Hypoallergenic";
export const DIETARY_RESTRICTIONS_WORDING = "Dietary Restrictions";
export const BIO_WORDING = "Bio";
export const RETURN_PET_WORDING = "Return Pet";
export const ADOPT_WORDING = "Adopt";
export const FOSTER_WORDING = "Foster";
export const FOSTERED_WORDING = "Fostered";
export const SAVE_FOR_LATER_WORDING = "Save For Later";
export const UNSAVE_PET_WORDING = "Unsave Pet";
export const NEEDS_A_HOME_WORDING = "Needs a Home";
export const ADOPTED_WORDING = "Adopted";
export const NOT_ADOPTED_WORDING = "Not Adopted";
export const MORE_DETAILS_BUTTON_WORDING = "More Details";
export const SEARCH_BUTTON_WORDING = "Search";
export const SEARCH_FORM_WORDING = "🐈 Find a Pet 🐕";
export const ADDITIONAL_OPTIONS_SEARCH_WORDING = "Additional Options";
export const ADD_PET_WORDING = "Add Pet";
export const UPDATE_PET_WORDING = "Update Pet";
export const PET_WORDING = "Pet";
export const PETS_WORDING = "Pets";
export const USER_WORDING = "User";
export const USERS_WORDING = "Users";
export const NAME_WORDING = "Name";
export const PERSONAL_BIO_WORDING = "Personal bio";
export const PERSONAL_BIO_PLACEHOLDER = "Once upon a time...";
export const SHOW_DETAILS_WORDING = "Show Details";
export const MIN_HEIGHT_WORDING = "Min Height in CM";
export const MAX_HEIGHT_WORDING = "Max Height in CM";
export const MIN_WEIGHT_WORDING = "Min Weight in CM";
export const MAX_WEIGHT_WORDING = "Max Weight in CM";
export const SIGNUP_AUTH_PROMPT = "Already have an account?";
export const LOGIN_AUTH_PROMPT = "Need an account? ";
export const SUBMIT_WORDING = "Submit";
export const UPDATE_PASSWORD_WORDING = "Update Password";
export const UPDATE_USER_DETAILS_WORDING = "Update User Details";
export const PERSONAL_DETAILS_WORDING = "Personal Details";
export const UPDATE_SUCCESS_MESSAGE = "Update successful!";
export const UPDATE_FAIL_MESSAGE = "Update failed..";
export const NO_OWNED_PETS_MESSAGE = "You don't own any pets yet! 🐾";
export const NO_SAVED_PETS_MESSAGE = "You haven't saved any pets yet! 🔬";
export const NO_PETS_FOUND_MESSAGE = "No pets matched your search criteria 🚫";
export const PET_BIO_DEFAULT_PLACEHOLDER = "Inquire for more details!";
export const OWNED_PETS_WORDING = "Owned Pets 🐾";
export const SAVED_PETS_WORDING = "Saved Pets 🔬";
export const SIGN_UP = SIGN_UP_WORDING.toLowerCase();
export const LOG_IN = LOG_IN_WORDING.toLowerCase();
export const ADD_PET = ADD_PET_WORDING.toLowerCase();
export const LOG_OUT = "log out";
export const BUTTON_WORDING = "button";

// STYLES:
export const ENABLED_BUTTON_STYLE = 'general-button';
export const DISABLED_BUTTON_STYLE = 'general-button-disabled';
export const PEEP_PETS_TITLE_STYLES = 'peep-pets-title';
export const NAV_BAR_WRAPPER_STYLES = 'navbar-wrapper';
export const NAV_BAR_TAB_STYLES = ['navbar-container', 'navbar-tab'];
export const USER_GREETING_STYLES = ['user-greeting'];

//Navigation Name Arrays:
export const NAV_BAR_TAB_NAMES = ['home', 'search', 'mypets'];
export const AUTH_BAR_NAMES = ['sign up', 'log in'];
export const ADMIN_BAR_NAMES = ['dashboard', 'add pet'];
export const SETTINGS_BAR_NAMES = ['profile', 'log out'];

//ERROR HANDLING:
export const UPDATE_FAILED_ERROR = "Updated failed";
export const PASSWORD_MATCH_ERROR_MESSAGE = "New and Confirm Password fields must match!";
export const FIELD_LENGTH_ERROR_MESSAGE = "Length of field is too long";
export const DATA_VALIDATION_ERROR = "One or more fields are incorrect or missing";

//TABS:
export const HOME = '/';
export const PROFILE = '/profile';
export const SEARCH = '/search';
export const DASHBOARD = '/dashboard';
export const MY_PETS = '/mypets';
export const PETS = '/pets';

//API & PRIMARY ROUTES:
export const API = axios.create({ baseURL: 'http://localhost:8080', withCredentials: true, });
export const AUTH_ROUTE = '/auth';
export const USER_ROUTE = '/user';
export const PET_ROUTE = '/pet';

//STATUS CODES:
export const STATUS_OK = 200;

//NUMBERS:
export const DEBOUNCE_TIMER = 500;

//OBJECTS:
export const ADOPTION_STATUS_DICT: { [key: number]: string; } = {
    0: "Available",
    1: "Adopted",
    2: "Fostered"
};

export const HYPOALLERGENIC_STATUS_DICT: { [key: number]: string; } = {
    0: "Hypoallergenic",
    1: "Not Hypoallergenic",
};