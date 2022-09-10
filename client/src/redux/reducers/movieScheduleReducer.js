import { compareTimes } from "../../utils/constant";
import {
    DELETE_THEATER_SCHEDULE,
    GET_DATES,
    GET_DETAIL_BOOKING,
    GET_THEATER_SCHEDULE,
} from "../types/type";

const stateDefault = {
    dates: [],
    theaterSchedule: [],
    detailBooking: {},
};

export const MovieScheduleReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case GET_DATES: {
            const update = action.data.map((date) => {
                return { ...date, isSelected: false, isBanned: false };
            });
            //console.log(update);
            return { ...state, dates: update };
        }
        case GET_THEATER_SCHEDULE: {
            const update = action.data.map((d) => {
                let newTimes = d.times.map((e) => {
                    return {
                        ...e,
                        isAfter: false,
                        isSelected: false,
                        isBanned: false,
                    };
                });
                return { ...d, times: newTimes };
            });
            update.forEach((d) => {
                d.times.forEach((e) => {
                    if (compareTimes(e.time)) {
                        e.isAfter = true;
                    }
                });
            });

            return { ...state, theaterSchedule: update };
        }
        case DELETE_THEATER_SCHEDULE: {
            return { ...state, theaterSchedule: [] };
        }
        case GET_DETAIL_BOOKING: {
            return { ...state, detailBooking: action.data };
        }
        default: {
            return { ...state };
        }
    }
};
