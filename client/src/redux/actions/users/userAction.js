import { userAxios } from "../../../services/userServices";
import {
    GET_USER_RESERVATIONS,
    HIDE_LOADING,
    SET_LOADING,
} from "../../types/type";

export const GetUserReservations = (userId) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING,
            });
            const res = await userAxios.getUserReservations(userId);
            //console.log(res);
            dispatch({
                type: HIDE_LOADING,
            });
            dispatch({
                type: GET_USER_RESERVATIONS,
                data: res.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
