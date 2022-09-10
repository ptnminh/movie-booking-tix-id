import { filmAxios } from "../../../services/adminServices";
import {
    CREATE_FILM,
    DELETE_FILM,
    GET_FILM,
    GET_FILM_DETAIL,
    HIDE_LOADING,
    SET_LOADING,
    UPDATE_FILM,
} from "../../types/type";

export const GetFilm = (id) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: SET_LOADING,
            });
            const films = await filmAxios.getAllFilms(id);
            dispatch({
                type: HIDE_LOADING,
            });
            dispatch({
                type: GET_FILM,
                data: films.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
export const GetFilmDetail = (id) => {
    return async (dispatch) => {
        try {
            const films = await filmAxios.getAllFilms(id);
            dispatch({
                type: GET_FILM_DETAIL,
                data: films.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
export const CreateFilm = (data) => {
    return async (dispatch) => {
        try {
            const films = await filmAxios.createFilm(data);
            dispatch({
                type: CREATE_FILM,
                data: films.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
export const UpdateFilm = (data) => {
    return async (dispatch) => {
        try {
            const film = await filmAxios.updateFilm(data);
            console.log(film);
            dispatch({
                type: UPDATE_FILM,
                data: film.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const DeleteFilm = (id) => {
    return async (dispatch) => {
        try {
            const films = await filmAxios.deleteFilm(id);
            console.log(films);
            dispatch({
                type: DELETE_FILM,
                id,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
