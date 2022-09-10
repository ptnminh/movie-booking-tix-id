import { HIDE_LOADING, SET_LOADING } from "../types/type";

const stateDefault = {
    isLoading: false,
};

export const LoadingReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_LOADING: {
            return { ...state, isLoading: true };
        }
        case HIDE_LOADING: {
            return { ...state, isLoading: false };
        }
        default: {
            return { ...state };
        }
    }
};
