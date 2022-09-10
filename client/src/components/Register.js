import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { USER_SIGNUP } from "../redux/types/type";
import { useDispatch } from "react-redux";
import { defaultAvatar } from "../utils/constant";
function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userRegister, setUserRegister] = useState({
        values: {
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            phone: "",
            avatar: "",
        },
        error: "",
        isError: false,
    });
    const handleChange = (e) => {
        let { value, name } = e.target;
        console.log(value, name);
        let newValues = { ...userRegister.values };
        newValues[name] = value;
        setUserRegister({
            ...userRegister,
            values: newValues,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const reEmail =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        if (
            userRegister.values.email.trim() === "" ||
            userRegister.values.password.trim() === "" ||
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
            avatar: "",
        };
        let updateValues = { ...userRegister.values };
        updateValues.avatar = defaultAvatar;
        console.log(updateValues);
        try {
            const auth = await authApi.register(updateValues);
            console.log(auth);
            if (auth.statusCode === 200) {
                dispatch({
                    type: USER_SIGNUP,
                    token: auth.token,
                    user: auth.user,
                });
                navigate("/");
            }
        } catch (e) {
            console.log(e);
            //console.log(e.response.data.message);
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
    return (
        <section
            className="w-screen h-screen "
            style={{ backgroundImage: "url(/assets/images/registerBg.png)" }}
        >
            <div className="text-[#ffffff] pt-16 w-full px-16 h-auto flex tablet:flex-col tablet:px-0 mobile:pt-0">
                <div className="flex items-center self-start mb-8 mx-8 mobile:mt-8">
                    <svg
                        onClick={() => {
                            navigate(-1);
                        }}
                        className="cursor-pointer"
                        width={32}
                        height={32}
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M25.5 16H6M6 16L13.5 8.5M6 16L13.5 23.5"
                            stroke="white"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="uppercase mx-4 font-bold">Back</div>
                </div>

                <form
                    type="submit"
                    onSubmit={handleSubmit}
                    className="min-w-[650px] h-[700px] bg-[#ffffff] m-auto mobile:min-w-[300px] mobile:mx-4 mobile:h-[667px] text-[#1a2c50] relative"
                >
                    <div className="mx-16 mt-16 ">
                        <h1 className="uppercase text-[#000000] font-bold text-3xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                            Signup tix id
                        </h1>

                        <div className="mt-8 text-[#333333] font-medium">
                            <div className="flex mb-2">
                                <div>
                                    <label className="font-bold">
                                        First name
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="firstName"
                                        className="border-b-2 border-[#9DA8BE] outline-none pb-2 mt-1 w-full"
                                    />
                                </div>
                                <div className="ml-4">
                                    <label className="font-bold">
                                        Last name
                                    </label>
                                    <input
                                        onChange={handleChange}
                                        type="text"
                                        name="lastName"
                                        className="border-b-2 border-[#9DA8BE] outline-none pb-2 mt-1 w-full"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <label className="font-bold">Email</label>
                                <input
                                    onChange={handleChange}
                                    type="email"
                                    name="email"
                                    className="border-b-2 border-[#9DA8BE] outline-none pb-2 mt-2"
                                    placeholder="user@gmail.com"
                                />
                            </div>
                            <div className="flex flex-col mt-4">
                                <label className="font-bold">Password</label>
                                <input
                                    onChange={handleChange}
                                    type="password"
                                    name="password"
                                    className="border-b-2 border-[#9DA8BE] outline-none pb-2 mt-2"
                                    placeholder="password"
                                />
                            </div>
                            <div className="flex flex-col mt-4">
                                <label className="font-bold">Phone</label>
                                <input
                                    onChange={handleChange}
                                    type="tel"
                                    name="phone"
                                    className="border-b-2 border-[#9DA8BE] outline-none pb-2 mt-2"
                                />
                            </div>
                            {userRegister.isError && (
                                <div className="mt-4">
                                    <h4 className="text-[#FF6B6B] font-bold text-left italic">
                                        {userRegister.error}
                                    </h4>
                                </div>
                            )}
                        </div>
                        <div>
                            <button className="w-full text-center cursor-pointer mt-16 py-1 font-bold bg-[#1A2C50] text-[#ffffff] rounded-md border-2 border-[#5A637A]">
                                Sign up
                            </button>
                        </div>
                        <div className="absolute bottom-[10%] mobile:bottom-1">
                            <h6 className="text-[#000000] text-[11px] font-bold">
                                2022 TIX ID
                            </h6>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
}

export default Register;
