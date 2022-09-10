import { movieScheduleAxios } from "../../../services/userServices";
import {
    GET_DATES,
    GET_DETAIL_BOOKING,
    GET_THEATER_SCHEDULE,
} from "../../types/type";
export const GetDatesAction = () => {
    return async (dispatch) => {
        try {
            const dates = await movieScheduleAxios.getDate();
            dispatch({
                type: GET_DATES,
                data: dates.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const GetTheaterSchedule = (filmId, city, date, brand) => {
    return async (dispatch) => {
        try {
            console.log(date);
            const getTheaterSchedule =
                await movieScheduleAxios.getTheaterSchedule(
                    date,
                    filmId,
                    city,
                    brand
                );
            dispatch({
                type: GET_THEATER_SCHEDULE,
                data: getTheaterSchedule.data,
            });
            //console.log(getTheaterSchedule);
        } catch (e) {
            console.log(e);
        }
    };
};
export const getMovieScheduleById = (id) => {
    return async (dispatch) => {
        try {
            const detail = await movieScheduleAxios.getMovieScheduleByid(id);
            dispatch({
                type: GET_DETAIL_BOOKING,
                data: detail.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
