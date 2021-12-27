export const AUTH_LOGIN = 'PROFILE::AUTH_LOGIN';
export const AUTH_LOGOUT = 'PROFILE::AUTH_LOGOUT';
export const SET_NAME = 'PROFILE::SET_NAME';

export const onAuth = {
    type: AUTH_LOGIN
}

export const offAuth = {
    type: AUTH_LOGOUT
}

export const setName = (name) => ({
    type: SET_NAME,
    payload: name
})