export const AUTH_LOGIN = 'PROFILE::AUTH_LOGIN';
export const AUTH_LOGOUT = 'PROFILE::AUTH_LOGOUT';
export const RESET_NAME = 'PROFILE::RESET_NAME';

export const onAuth = {
    type: AUTH_LOGIN
}

export const offAuth = {
    type: AUTH_LOGOUT
}

export const resetName = (name) => ({
    type: RESET_NAME,
    payload: name
})