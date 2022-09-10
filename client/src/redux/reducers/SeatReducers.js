import { convertSeats } from "../../utils/constant";
import {
    GET_SEATS,
    RESERVATION_SEATS,
    UPPDATE_SEAT_BOOKED,
    UPPDATE_SEAT_BOOKING,
} from "../types/type";

const stateDefault = {
    Seats: [],
    seatBooked: [],
    seatBooking: [],
};

export const SeatReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_SEATS: {
            action.data = convertSeats(action.data);
            return { ...state, Seats: action.data };
        }
        case UPPDATE_SEAT_BOOKED: {
            return { ...state, Seats: action.Seats };
        }
        case RESERVATION_SEATS: {
            action.data = convertSeats(action.data);
            return { ...state, Seats: action.data };
        }
        default: {
            return { ...state };
        }
    }
};
