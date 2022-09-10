import { theaterAxios } from "../../../services/adminServices";
import {
    CREATE_THEATER,
    DELETE_THEATER,
    GET_THEATER,
    UPDATE_THEATER,
} from "../../types/type";

export const GetTheater = (id) => {
    return async (dispatch) => {
        try {
            const theaters = await theaterAxios.getAllTheaters(id);

            dispatch({
                type: GET_THEATER,
                data: theaters.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
export const CreateTheater = (data) => {
    return async (dispatch) => {
        try {
            const theaters = await theaterAxios.createTheater(data);
            dispatch({
                type: CREATE_THEATER,
                data: theaters.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
export const UpdateTheater = (data) => {
    return async (dispatch) => {
        try {
            const film = await theaterAxios.updateTheater(data);
            console.log(film);
            dispatch({
                type: UPDATE_THEATER,
                data: film.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const DeleteTheater = (id) => {
    return async (dispatch) => {
        try {
            const theaters = await theaterAxios.deleteTheater(id);
            console.log(theaters);
            dispatch({
                type: DELETE_THEATER,
                id,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
