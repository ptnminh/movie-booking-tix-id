import {
    ADD_USER,
    DELETE_USER,
    GET_ALL_USERS,
    UPDATE_USER,
} from "../types/type";
const Buffer = require("buffer").Buffer;

const stateDefualt = {
    Users: [],
    userEdit: {},
};

export const adminReducers = (state = stateDefualt, action) => {
    switch (action.type) {
        case GET_ALL_USERS: {
            let imageBase64 = "";
            const update = action.data.map((user) => {
                if (user.avatar) {
                    imageBase64 = Buffer.from(user.avatar, "base64").toString(
                        "binary"
                    );

                    user.avatar = imageBase64;
                }
                return user;
            });

            return { ...state, Users: update };
        }
        case ADD_USER: {
            const allUser = [...state.Users];
            allUser.push(action.data);
            return { ...state, Users: allUser };
        }
        case DELETE_USER: {
            const users = state.Users.filter((user) => user.id !== action.data);
            return { ...state, Users: users };
        }
        case UPDATE_USER: {
            if (action.data) {
                const User = [...state.Users];
                const updateUser = User.map((user) => {
                    if (user.id === action.data.id) {
                        user = action.data;
                    }
                    return user;
                });
                console.log(updateUser);
                return { ...state, Users: updateUser, userEdit: {} };
            }
            return { ...state, userEdit: action.user };
        }

        default: {
            return { ...state };
        }
    }
};
