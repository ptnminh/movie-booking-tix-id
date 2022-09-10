import axiosClient from "../api/apiClient";

export const userAxios = {
    getListFilm: (limit, type) =>
        axiosClient.get(`films/getListFilm?limit=${limit}&type=${type}`),
    getUserReservations: (userId) =>
        axiosClient.get(`users/getUserReservations?userId=${userId}`),
};

export const movieScheduleAxios = {
    getDate: () => axiosClient.get("movieSchedules/getDates"),
    getTheaterSchedule: (params, filmId, city, brand) =>
        axiosClient.post(
            `movieSchedules/getMovieSchedules?filmId=${filmId}&city=${city}&brand=${brand}`,
            params
        ),
    getMovieScheduleByid: (id) =>
        axiosClient(`movieSchedules/getFilmSchedulesById?id=${id}`),
};

export const seatAxios = {
    getSeats: (id) => axiosClient.get(`reservations/getSeats?id=${id}`),
    reservation: (params) =>
        axiosClient.put(`/reservations/updateSeats`, params),
};
