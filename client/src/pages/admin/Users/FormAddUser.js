import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddUser, UpdateUser } from "../../../redux/actions/admin/adminAction";
import { commonUtils } from "../../../utils/commonUtil";
function FormAddUser(props) {
    const dispatch = useDispatch();
    const { userEdit } = useSelector((state) => state.adminReducers);
    const { open } = props;
    const [userRegister, setUserRegister] = useState({
        values: {
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            phone: "",
            type: "",
            avatar: "",
        },
        error: "",
        isError: false,
    });
    const handleChange = async (e) => {
        let { value, name } = e.target;
        const data = e.target.files;
        let base64 = "";
        if (data) {
            const file = data[0];

            base64 = await commonUtils.getBase64(file);
        }

        //console.log(value, name);
        let newValues = { ...userRegister.values };
        newValues[name] = value;
        if (base64.length !== 0) {
            console.log(base64);
            newValues["avatar"] = base64;
        }
        setUserRegister({
            ...userRegister,
            values: newValues,
        });
    };
    useEffect(() => {
        if (Object.keys(userEdit).length !== 0) {
            setUserRegister({
                ...userRegister,
                values: userEdit,
            });
        }
        return () => {};
    }, [userEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (
            Object.keys(userEdit).length === 0 &&
            userRegister.values.password.trim() === ""
        ) {
            setUserRegister({
                ...userRegister,
                error: "Don't let the empty field.",
                isError: true,
            });
            return;
        }
        console.log(userRegister.values);
        const reEmail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (
            userRegister.values.email.trim() === "" ||
            userRegister.values.firstName.trim() === "" ||
            userRegister.values.lastName.trim() === "" ||
            userRegister.values.phone.trim() === ""
        ) {
            setUserRegister({
                ...userRegister,
                error: "Don't let the empty field.",
                isError: true,
            });
            return;
        }
        if (!reEmail.test(userRegister.values.email)) {
            setUserRegister({
                ...userRegister,
                error: "Invalid email.",
                isError: true,
            });
            return;
        }
        let newValues = {
            email: "",
            password: "",
            firstName: "",
            lastName: "",
            phone: "",
        };

        try {
            if (Object.keys(userEdit).length !== 0) {
                dispatch(UpdateUser(userRegister.values));
            } else {
                dispatch(AddUser(userRegister.values));
            }
        } catch (e) {
            console.log(e);
            return setUserRegister({
                ...userRegister,
                error: e.data.message,
                isError: true,
            });
        }

        setUserRegister({
            ...userRegister,
            values: newValues,
            isError: false,
        });
    };
    // const handleChangeFile = async (e) => {
    //     const data = e.target.files;
    //     const file = data[0];
    //     if(file) {
    //         const base64 = await commonUtils.getBase64(file);
    //         console.log(base64)
    //         let objectURL = URL.createObjectURL(file);
    //         console.log(objectURL)
    //     }
    //     console.log(data);
    // };
    return (
        <>
            {open && (
                <div className="w-screen flex justify-center my-10">
                    <form className="w-full max-w-lg" onSubmit={handleSubmit}>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    First Name
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                                    type="text"
                                    placeholder="Jane"
                                    name="firstName"
                                    value={userRegister.values.firstName}
                                />
                            </div>
                            <div className="w-full md:w-1/2 px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Last Name
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    placeholder="Doe"
                                    name="lastName"
                                    value={userRegister.values.lastName}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-6">
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Email
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="email"
                                    name="email"
                                    value={userRegister.values.email}
                                    disabled={
                                        Object.keys(userEdit).length !== 0
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                            <div className="w-full px-3">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Password
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="password"
                                    placeholder="******************"
                                    name="password"
                                    value={userRegister.values.password}
                                    disabled={
                                        Object.keys(userEdit).length !== 0
                                            ? true
                                            : false
                                    }
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap -mx-3 mb-2">
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Phone
                                </h1>
                                <input
                                    onChange={handleChange}
                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    type="text"
                                    name="phone"
                                    value={userRegister.values.phone}
                                />
                            </div>
                            <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                <h1 className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Role
                                </h1>
                                <div className="relative">
                                    <select
                                        onChange={handleChange}
                                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        name="type"
                                    >
                                        <option>Admin</option>
                                        <option selected>Customer</option>
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
                            <div className="w-full px-3 mb-6 md:mb-0">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                                    Avatar
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
                                        name="avatar"
                                        // value={userRegister.values.avatar}
                                    />
                                    <div
                                        className="bg-contain bg-center bg-no-repeat h-full w-[50px]"
                                        style={{
                                            backgroundImage: `url('https://scontent.fsgn15-1.fna.fbcdn.net/v/t39.30808-6/298292173_1466687987163899_5708479830951392672_n.png?_nc_cat=105&ccb=1-7&_nc_sid=730e14&_nc_ohc=1xpf6C6S0AwAX9sucql&_nc_ht=scontent.fsgn15-1.fna&oh=00_AT_-K5HXqxsy_rZA2EUltHofllnN-SA5mordh8Vpe64Hvw&oe=62FEAD34')`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                            {Object.keys(userEdit).length && (
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 m-auto mt-4">
                                    <button className="px-16 py-4 bg-indigo-600 text-[#ffffff] rounded-lg">
                                        Update
                                    </button>
                                </div>
                            )}
                            {!Object.keys(userEdit).length && (
                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0 m-auto mt-4">
                                    <button className="px-16 py-4 bg-indigo-600 text-[#ffffff] rounded-lg">
                                        Add
                                    </button>
                                </div>
                            )}

                            {userRegister.isError && (
                                <div className="mt-4">
                                    <h4 className="text-[#FF6B6B] font-bold text-left italic">
                                        {userRegister.error}
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

export default FormAddUser;
