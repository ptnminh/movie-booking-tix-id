import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    CreateTheater,
    UpdateTheater,
} from "../../../redux/actions/admin/theaterAction";
import { commonUtils } from "../../../utils/commonUtil";
function FormAddTheater(props) {
    const dispatch = useDispatch();
    const { theaterEdit } = useSelector((state) => state.theaterReducers);
    const { open } = props;
    const [theaterValue, setTheaterValue] = useState({
        values: {
            name: "",
            brand: "",
            address: "",
            city: "",
            logo: "",
        },
        error: "",
        isError: false,
    });
    //console.log(theaterEdit);
    const handleChange = async (e) => {
        let { value, name } = e.target;

        const data = e.target.files;
        let base64 = "";
        if (data) {
            const file = data[0];
            base64 = await commonUtils.getBase64(file);
            // littlebox
            // console.log(base64)
            // console.log(file)
            // let objectURL = URL.createObjectURL(file);
        }

        console.log(value, name);
        let newValues = { ...theaterValue.values };
        newValues[name] = value;
        if (base64.length !== 0) {
            newValues["logo"] = base64;
        }
        setTheaterValue({
            ...theaterValue,
            values: newValues,
        });
    };
    useEffect(() => {
        // if (Object.keys(theaterEdit).length !== 0) {
        //     setTheaterValue({
        //         ...theaterValue,
        //         values: theaterEdit,
        //     });
        // }
        setTheaterValue({
            ...theaterValue,
            values: theaterEdit,
        });
        return () => {};
    }, [theaterEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            Object.keys(theaterEdit).length === 0 &&
            theaterValue.values.brand.trim() === ""
        ) {
            setTheaterValue({
                ...theaterValue,
                error: "Don't let the empty field.",
                isError: true,
            });
            return;
        }
        //console.log(theaterValue.values);
        if (
            theaterValue.values.name.trim() === "" ||
            theaterValue.values.city.trim() === "" ||
            theaterValue.values.address.trim() === "" ||
            theaterValue.values.brand.trim() === ""
        ) {
            setTheaterValue({
                ...theaterValue,
                error: "Don't let the empty field.",
                isError: true,
            });
            return;
        }

        let newValues = {
            name: "",
            brand: "",
            city: "",
            address: "",
        };

        try {
            if (Object.keys(theaterEdit).length !== 0) {
                dispatch(UpdateTheater(theaterValue.values));
            } else {
                dispatch(CreateTheater(theaterValue.values));
            }
        } catch (e) {
            console.log(e);
            return setTheaterValue({
                ...theaterValue,
                error: e.data.message,
                isError: true,
            });
        }

        setTheaterValue({
            ...theaterValue,
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
                                    value={theaterValue.values.name}
                                />
                            </div>
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Brand
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="brand"
                                    value={theaterValue.values.brand}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Address
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="address"
                                    value={theaterValue.values.address}
                                />
                            </div>
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    City
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="city"
                                    value={theaterValue.values.city}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col mb-2">
                            <div className="w-full mt-8 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Logo
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
                                        name="logo"
                                        // value={theaterValue.values.logo}
                                    />
                                </div>
                            </div>
                            {Object.keys(theaterEdit).length && (
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 m-auto mt-4">
                                    <button className="px-16 py-4 bg-indigo-600 text-[#ffffff] rounded-lg">
                                        Update
                                    </button>
                                </div>
                            )}
                            {!Object.keys(theaterEdit).length && (
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 m-auto mt-4">
                                    <button className="px-16 py-4 bg-indigo-600 text-[#ffffff] rounded-lg">
                                        Add
                                    </button>
                                </div>
                            )}

                            {theaterValue.isError && (
                                <div className="mt-4">
                                    <h4 className="text-[#FF6B6B] font-bold text-left italic">
                                        {theaterValue.error}
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

export default FormAddTheater;
