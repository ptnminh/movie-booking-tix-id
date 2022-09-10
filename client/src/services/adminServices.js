import axiosClient from "../api/apiClient";

export const adminAxios = {
    getAllUsers: () => axiosClient.get("users/getAllUsers"),
    createUser: (params) => axiosClient.post("/users/register", params),
    deleteUser: (params) => axiosClient.delete(`users/deleteUser?id=${params}`),
    updateUser: (params) => axiosClient.put("users/updateUser", params),
};

export const filmAxios = {
    getAllFilms: (params) => axiosClient.get(`films/getFilm?id=${params}`),
    createFilm: (params) => axiosClient.post("films/createFilm", params),
    deleteFilm: (params) => axiosClient.delete(`films/deleteFilm?id=${params}`),
    updateFilm: (params) => axiosClient.put(`films/updateFilm`, params),
};

export const theaterAxios = {
    getAllTheaters: (params) =>
        axiosClient.get(`theaters/getTheater?id=${params}`),
    createTheater: (params) =>
        axiosClient.post("theaters/createTheater", params),
    deleteTheater: (params) =>
        axiosClient.delete(`theaters/deleteTheater?id=${params}`),
    updateTheater: (params) =>
        axiosClient.put(`theaters/updateTheater`, params),
};
