import { AUTH_LOGIN, AUTH_LOGOUT, SET_NAME } from "./actions"

const initialState = {
    authed: false,
    name: ''
}

export const profileReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case AUTH_LOGIN: {
            return {
                ...state,
                authed: true
            }
        }

        case AUTH_LOGOUT: {
            return {
                ...state,
                authed: false
            }
        }

        case SET_NAME: {
            debugger
            console.log(payload);
            return {
                ...state,
                name: payload
            }
        }

        default: return state;
    }
}