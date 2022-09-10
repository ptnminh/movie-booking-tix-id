import authApi from "../../../api/authApi";
import { adminAxios } from "../../../services/adminServices";
import {
    ADD_USER,
    DELETE_USER,
    GET_ALL_USERS,
    UPDATE_USER,
} from "../../types/type";

export const GetAllUsers = () => {
    return async (dispatch) => {
        try {
            const allUsers = await adminAxios.getAllUsers();
            dispatch({
                type: GET_ALL_USERS,
                data: allUsers.message,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const AddUser = (user) => {
    return async (dispatch) => {
        try {
            const User = await authApi.register(user);
            dispatch({
                type: ADD_USER,
                data: User.user,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
export const DeleteUser = (id) => {
    return async (dispatch) => {
        try {
            const user = await adminAxios.deleteUser(id);
            dispatch({
                type: DELETE_USER,
                data: id,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const UpdateUser = (user) => {
    return async (dispatch) => {
        try {
            const req = await adminAxios.updateUser(user);
            // let imageBase64 = "";
            // if (req.user.avatar) {
            //     imageBase64 = new Buffer(
            //         user.avatar,
            //         "base64"
            //     ).toString("binary");

            //     req.user.avatar = imageBase64;
            // }
            dispatch({
                type: UPDATE_USER,
                data: req.user,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
