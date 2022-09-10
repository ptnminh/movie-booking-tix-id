import {
    GET_USER_RESERVATIONS,
    SET_AUTHENTICATED,
    SET_USER_LOGIN,
    USER_LOGIN,
    USER_LOGOUT,
    USER_SIGNUP,
} from "../types/type";
const Buffer = require("buffer").Buffer;

const stateDefault = {
    userLogin: {},
    isLogout: true,
    isAuth: false,
    userAuth: {},
    userReservations: [],
};

export const UserReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case USER_LOGIN: {
            const token = action.token;
            localStorage.setItem("access_token", token);
            localStorage.setItem("userLogin", JSON.stringify(action.user));

            return {
                ...state,
                isLogout: false,
                userLogin: action.user,
                isAuth: true,
            };
        }
        case SET_USER_LOGIN: {
            const token = action.token;
            localStorage.setItem("access_token", token);
            return { ...state, isLogout: false };
        }
        case USER_LOGOUT: {
            localStorage.removeItem("access_token");
            localStorage.removeItem("userLogin");
            return { ...state, isLogout: true, userAuth: {}, isAuth: false };
        }
        case SET_AUTHENTICATED: {
            //console.log(action.data.id);
            localStorage.setItem("userLogin", JSON.stringify(action.data));
            return { ...state, userAuth: action.data, isAuth: true };
        }
        case GET_USER_RESERVATIONS: {
            return { ...state, userReservations: action.data };
        }
        case USER_SIGNUP: {
            const token = action.token;
            localStorage.setItem("access_token", token);
            localStorage.setItem("userLogin", JSON.stringify(action.user));
            return { ...state, userLogin: action.user };
        }
        default:
            return { ...state };
    }
};
