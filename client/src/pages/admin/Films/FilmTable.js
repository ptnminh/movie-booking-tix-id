import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DeleteFilm, GetFilm } from "../../../redux/actions/admin/filmAction";
import { UPDATE_FILM, UPDATE_USER } from "../../../redux/types/type";
import FormAddFilm from "./FormAddFilm";
function FilmTable() {
    const dispatch = useDispatch();
    const { Films } = useSelector((state) => state.filmReducers);
    //console.log(Films)
    const [filmEdit, setFilmEdit] = useState({});
    const [openForm, setOpenForm] = useState(false);
    useEffect(() => {
        dispatch(GetFilm(-1));
    }, []);
    return (
        <>
            <div className="w-full sm:px-6">
                <div className="px-4 md:px-10 py-4 md:py-7 bg-gray-100 rounded-tl-lg rounded-tr-lg">
                    <div className="sm:flex items-center justify-between">
                        <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold leading-normal text-gray-800">
                            Films
                        </p>
                        <div>
                            <button
                                onClick={() => {
                                    dispatch({
                                        type: UPDATE_FILM,
                                        film: {},
                                    });
                                    setOpenForm(!openForm);
                                }}
                                className="inline-flex sm:ml-3 mt-4 sm:mt-0 items-start justify-start px-6 py-3 bg-indigo-700 hover:bg-indigo-600 focus:outline-none rounded"
                            >
                                <p className="text-sm font-medium leading-none text-white">
                                    New Films
                                </p>
                            </button>
                        </div>
                    </div>
                </div>
                <div className="bg-white shadow px-4 md:px-10 pt-4 md:pt-7 pb-5 overflow-y-auto overflow-x-auto">
                    <table className="w-full whitespace-nowrap">
                        <thead>
                            <tr className="h-16 w-full text-sm leading-none text-gray-800">
                                <th className="font-normal text-center">ID</th>
                                <th className="font-normal text-center">
                                    Name
                                </th>
                                <th className="font-normal text-center">
                                    Desc
                                </th>
                                <th className="font-normal text-center">
                                    Director
                                </th>
                                <th className="font-normal text-center">
                                    Genres
                                </th>
                                <th className="font-normal text-center">
                                    Duration
                                </th>
                                <th className="font-normal text-center">
                                    Poster_film
                                </th>
                                <th className="font-normal text-center">
                                    Type
                                </th>
                            </tr>
                        </thead>
                        <tbody className="w-full">
                            {Films?.map((film, index) => {
                                return (
                                    <tr
                                        key={index}
                                        className="text-center h-20 text-sm leading-none text-gray-800 bg-white hover:bg-gray-100 border-b border-t border-gray-100"
                                    >
                                        <td className="cursor-pointer">
                                            {film.id}
                                        </td>
                                        <td className="cursor-pointer">
                                            {film.name}
                                        </td>
                                        <td className="break-all text-ellipsis max-w-xs truncate">
                                            {film.desc}
                                        </td>
                                        <td className="">{film.director}</td>
                                        <td className="">{film.genres}</td>
                                        <td className="">{film.duration}</td>
                                        <td className="flex justify-center items-center">
                                            {film.poster_film && (
                                                <img
                                                    className="h-8 w-8 rounded-full"
                                                    src={`${film.poster_film}`}
                                                    alt=""
                                                />
                                            )}
                                        </td>

                                        <td className="">{film.type}</td>
                                        <td className="2xl:px-0 flex justify-between items-center h-20">
                                            <svg
                                                onClick={() => {
                                                    dispatch({
                                                        type: UPDATE_FILM,
                                                        film,
                                                    });
                                                    setOpenForm(true);
                                                    setFilmEdit(film);
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 cursor-pointer"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                                                />
                                            </svg>
                                            <svg
                                                onClick={() => {
                                                    dispatch(
                                                        DeleteFilm(film.id)
                                                    );
                                                }}
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6 cursor-pointer"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
            <FormAddFilm open={openForm} />
        </>
    );
}

export default FilmTable;
