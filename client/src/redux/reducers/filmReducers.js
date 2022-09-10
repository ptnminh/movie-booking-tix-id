import {
    CREATE_FILM,
    DELETE_FILM,
    GET_FILM,
    GET_FILM_DETAIL,
    UPDATE_FILM,
} from "../types/type";
const Buffer = require("buffer").Buffer;

const stateDefault = {
    Films: [],
    filmEdit: {},
    filmDetail: {},
};

export const filmReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_FILM: {
            let update;
            let imageBase64 = "";
            if (!Array.isArray(action.data)) {
                if (action.data.poster_film) {
                    imageBase64 = Buffer.from(
                        action.data.poster_film,
                        "base64"
                    ).toString("binary");

                    action.data.poster_film = imageBase64;
                }
                update = action.data;
            } else {
                update = action.data.map((film) => {
                    if (film.poster_film) {
                        imageBase64 = Buffer.from(
                            film.poster_film,
                            "base64"
                        ).toString("binary");

                        film.poster_film = imageBase64;
                    }
                    return film;
                });
            }

            return { ...state, Films: update };
        }
        case GET_FILM_DETAIL: {
            let update;
            let imageBase64 = "";

            if (action.data.poster_film) {
                imageBase64 = Buffer.from(
                    action.data.poster_film,
                    "base64"
                ).toString("binary");

                action.data.poster_film = imageBase64;
            }
            update = action.data;
            return { ...state, filmDetail: update };
        }
        case CREATE_FILM: {
            const allFilms = [...state.Films, action.data];

            return { ...state, Films: allFilms };
        }
        case DELETE_FILM: {
            const films = state.Films.filter((film) => film.id !== action.id);
            return { ...state, Films: films };
        }
        case UPDATE_FILM: {
            if (action.data) {
                const Film = [...state.Films];
                const updateFilm = Film.map((film) => {
                    if (film.id === action.data.id) {
                        film = action.data;
                    }
                    return film;
                });
                console.log(updateFilm);
                return { ...state, Films: updateFilm, userEdit: {} };
            }
            return { ...state, filmEdit: action.film };
        }
        default: {
            return { ...state };
        }
    }
};
