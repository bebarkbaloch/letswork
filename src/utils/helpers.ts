import { constants } from './constants';

const storageKey: string = constants?.LOCAL_STORAGE_TOKEN || '';
const storageUser: string = constants?.LOCAL_STORAGE_USER || '';

export const SetToken = (token: string): void => {
    if (token) {
        localStorage.setItem(storageKey, token);
    } else {
        localStorage.removeItem(storageKey);
    }
}

export const GetToken = (): string | null => {
    return localStorage.getItem(storageKey);
}

export const SetAuthUser = (user_data: string): void => {
    if (user_data) {
        localStorage.setItem(storageUser, user_data);
    } else {
        localStorage.removeItem(storageUser);
    }
}

export const GetAuthUser = (): any => {
    const user = localStorage.getItem(storageUser);
    return user ? JSON.parse(user) : null;
}

export const GetAccessToken = (): string | null => {
    const user = GetAuthUser();
    return user ? user.access_token : null;
}

export {};
