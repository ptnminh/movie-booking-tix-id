import { userAxios } from "../../../services/userServices";
import {
    GET_LIST_FILM_SHOWING,
    GET_LIST_FILM_UPCOMING,
    HIDE_LOADING,
    SET_LOADING,
} from "../../types/type";
import { type } from "../../../utils/constant";

export const FilmUserAction = (limit, typeOfFilm) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING,
            });
            const listFilm = await userAxios.getListFilm(limit, typeOfFilm);
            dispatch({
                type: HIDE_LOADING,
            });
            if (typeOfFilm === type.UPCOMING) {
                dispatch({
                    type: GET_LIST_FILM_UPCOMING,
                    data: listFilm.data,
                });
            } else {
                dispatch({
                    type: GET_LIST_FILM_SHOWING,
                    data: listFilm.data,
                });
                // dispatch({
                //     type: HIDE_LOADING,
                // });
            }
        } catch (e) {
            console.log(e);
        }
    };
};
