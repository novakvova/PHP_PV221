import {APP_ENV} from "../env";
const imageFolder = 'upload/';
const serverUrl = APP_ENV.BASE_URL;
export const apiUrl = serverUrl + 'api/'
export const imageUrl = serverUrl + imageFolder;