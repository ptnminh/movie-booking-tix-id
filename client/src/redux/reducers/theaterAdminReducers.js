import {
    CREATE_THEATER,
    DELETE_THEATER,
    GET_THEATER,
    UPDATE_THEATER,
} from "../types/type";
const Buffer = require("buffer").Buffer;

const stateDefault = {
    Theaters: [],
    theaterEdit: {},
};

export const theaterReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_THEATER: {
            let imageBase64 = "";
            const update = action.data.map((theater) => {
                if (theater.logo) {
                    imageBase64 = Buffer.from(theater.logo, "base64").toString(
                        "binary"
                    );
                    //console.log(imageBase64);
                    theater.logo = imageBase64;
                }
                return theater;
            });
            return { ...state, Theaters: update };
        }
        case CREATE_THEATER: {
            const allTheaters = [...state.Theaters, action.data];

            return { ...state, Theaters: allTheaters };
        }
        case DELETE_THEATER: {
            const theaters = state.Theaters.filter(
                (theater) => theater.id !== action.id
            );
            return { ...state, Theaters: theaters };
        }
        case UPDATE_THEATER: {
            console.log(action);
            if (action.data) {
                const Theater = [...state.Theaters];
                const updateTheater = Theater.map((theater) => {
                    if (theater.id === action.data.id) {
                        theater = action.data;
                    }
                    return theater;
                });

                return { ...state, Theaters: updateTheater, theaterEdit: {} };
            }
            return { ...state, theaterEdit: action.theater };
        }
        default: {
            return { ...state };
        }
    }
};
