import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CreateFilm,
    UpdateFilm,
} from "../../../redux/actions/admin/filmAction";
import { commonUtils } from "../../../utils/commonUtil";
function FormAddFilm(props) {
    const dispatch = useDispatch();
    const { filmEdit } = useSelector((state) => state.filmReducers);
    const { open } = props;
    const [filmValue, setFilmValue] = useState({
        values: {
            name: "",
            desc: "",
            director: "",
            duration: "",
            type: "",
            poster_film: "",
            genres: "",
        },
        error: "",
        isError: false,
    });
    //console.log(filmEdit);
    const handleChange = async (e) => {
        let { value, name } = e.target;

        const data = e.target.files;
        let base64 = "";
        if (data) {
            const file = data[0];
            base64 = await commonUtils.getBase64(file);
            // console.log(base64)
            // console.log(file)
            // let objectURL = URL.createObjectURL(file);
        }

        //console.log(value, name);
        let newValues = { ...filmValue.values };
        newValues[name] = value;
        if (base64.length !== 0) {
            newValues["poster_film"] = base64;
        }
        setFilmValue({
            ...filmValue,
            values: newValues,
        });
    };
    useEffect(() => {
        // if (Object.keys(filmEdit).length !== 0) {
        //     setFilmValue({
        //         ...filmValue,
        //         values: filmEdit,
        //     });
        // }
        setFilmValue({
            ...filmValue,
            values: filmEdit,
        });
        return () => {};
    }, [filmEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            Object.keys(filmEdit).length === 0 &&
            filmValue.values.desc.trim() === ""
        ) {
            setFilmValue({
                ...filmValue,
                error: "Don't let the empty field.",
                isError: true,
            });
            return;
        }
        //console.log(filmValue.values);
        if (
            filmValue.values.name.trim() === "" ||
            filmValue.values.duration.trim() === "" ||
            filmValue.values.director.trim() === "" ||
            filmValue.values.desc.trim() === "" ||
            filmValue.values.type.trim() === "" ||
            filmValue.values.genres.trim() === ""
        ) {
            setFilmValue({
                ...filmValue,
                error: "Don't let the empty field.",
                isError: true,
            });
            return;
        }
        const reTime = /(?:[01]\d|2[0123]):(?:[012345]\d):(?:[012345]\d)/gm;
        if (!reTime.test(filmValue.values.duration)) {
            setFilmValue({
                ...filmValue,
                error: "Wrong time type.",
                isError: true,
            });
        }
        let newValues = {
            name: "",
            desc: "",
            duration: "",
            director: "",
            genres: "",
            type: "",
        };

        try {
            if (Object.keys(filmEdit).length !== 0) {
                dispatch(UpdateFilm(filmValue.values));
            } else {
                dispatch(CreateFilm(filmValue.values));
            }
        } catch (e) {
            console.log(e);
            return setFilmValue({
                ...filmValue,
                error: e.data.message,
                isError: true,
            });
        }

        setFilmValue({
            ...filmValue,
            values: newValues,
            isError: false,
        });
    };

    return (
        <>
            {open && (
                <div className="flex justify-center my-10">
                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                        <div className="flex flex-col -mx-3 mb-6">
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Name
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    name="name"
                                    value={filmValue.values.name}
                                />
                            </div>
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Description
                                </h1>
                                <textarea
                                    onChange={handleChange}
                                    className="h-[200px] appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="desc"
                                    value={filmValue.values.desc}
                                />
                            </div>
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Genres
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="genres"
                                    value={filmValue.values.genres}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Director
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="director"
                                    value={filmValue.values.director}
                                />
                            </div>
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Duration
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="duration"
                                    value={filmValue.values.duration}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className="w-full md:w-1/3 mb-6 md:mb-0">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Type
                                </h1>
                                <div className="relative w-full">
                                    <select
                                        onChange={handleChange}
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="type"
                                    >
                                        <option>Upcoming</option>
                                        <option selected>Showing</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full mt-8 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Poster_film
                                </label>
                                <div className="border-2 border-indigo-600 h-[50px] w-full flex justify-around items-center">
                                    <label
                                        htmlFor="preview_image"
                                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                                    >
                                        <svg
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
                                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                            />
                                        </svg>
                                    </label>
                                    <input
                                        id="preview_image"
                                        onChange={handleChange}
                                        className="appearance-none hidden w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="file"
                                        name="poster_film"
                                        // value={filmValue.values.poster_film}
                                    />
                                </div>
                            </div>
                            {Object.keys(filmEdit).length && (
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 m-auto mt-4">
                                    <button className="px-16 py-4 bg-indigo-600 text-[#ffffff] rounded-lg">
                                        Update
                                    </button>
                                </div>
                            )}
                            {!Object.keys(filmEdit).length && (
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 m-auto mt-4">
                                    <button className="px-16 py-4 bg-indigo-600 text-[#ffffff] rounded-lg">
                                        Add
                                    </button>
                                </div>
                            )}

                            {filmValue.isError && (
                                <div className="mt-4">
                                    <h4 className="text-[#FF6B6B] font-bold text-left italic">
                                        {filmValue.error}
                                    </h4>
                                </div>
                            )}
                        </div>
                    </form>
                </div>
            )}
        </>
    );
}

export default FormAddFilm;
