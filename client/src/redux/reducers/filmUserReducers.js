import { GET_LIST_FILM_SHOWING, GET_LIST_FILM_UPCOMING } from "../types/type";

const stateDefault = {
    listFilmsUpcoming: [],
    listFilmsShowing: [],
};

export const filmUserReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_LIST_FILM_UPCOMING: {
            return { ...state, listFilmsUpcoming: action.data };
        }
        case GET_LIST_FILM_SHOWING: {
            return { ...state, listFilmsShowing: action.data };
        }

        default: {
            return { ...state };
        }
    }
};
