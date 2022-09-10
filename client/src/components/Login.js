import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import authApi from "../api/authApi";
import { USER_LOGIN } from "../redux/types/type";
function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [userLogin, setUserLogin] = useState({
        values: {
            email: "",
            password: "",
        },
        errors: {
            email: "",
            password: "",
        },
        error: "",
        isIncorrect: false,
        isError: false,
    });
    const handleChange = (e) => {
        let { value, name } = e.target;
        let newValues = { ...userLogin.values };
        newValues[name] = value;
        setUserLogin({
            ...userLogin,
            values: newValues,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const re =
            /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let newErorrs = { ...userLogin.newErorrs };
        if (userLogin.values.email.trim() === "") {
            newErorrs.email = "Email is required!";
            setUserLogin({
                ...userLogin,
                errors: newErorrs,
                isError: true,
            });
            return;
        }
        if (userLogin.values.password.trim() === "") {
            newErorrs.password = "Password is required!";
            console.log("password");
            setUserLogin({
                ...userLogin,
                errors: newErorrs,
                isError: true,
            });
            return;
        }

        if (!re.test(userLogin.values.email)) {
            newErorrs.email = "Invalid email!";
            setUserLogin({
                ...userLogin,
                errors: newErorrs,
                isError: true,
            });
            return;
        }
        let newValues = {
            email: "",
            password: "",
        };

        try {
            const auth = await authApi.login(userLogin.values);
            //console.log(auth);
            if (auth.statusCode === 200) {
                dispatch({
                    type: USER_LOGIN,
                    user: auth.user,
                    token: auth.token,
                });
                const { type } = auth.user;

                if (type.toLowerCase() === "admin") {
                    //console.log(true);
                    navigate("/system/users");
                } else {
                    navigate(-1);
                }
            }
        } catch (e) {
            console.log(e);
            return setUserLogin({
                ...userLogin,
                error: "Invalid username or password.",
                isIncorrect: true,
            });
        }

        setUserLogin({
            ...userLogin,
            values: newValues,
            isError: false,
        });
    };
    return (
        <section
            className="w-screen h-screen"
            style={{ backgroundImage: "url(/assets/images/loginBg.png)" }}
        >
            <div className="text-[#ffffff] pt-16 w-full px-16 h-auto flex tablet:flex-col tablet:px-0 mobile:pt-0">
                <div className="flex items-center self-start mb-8 mx-8 mobile:mt-8">
                    <svg
                        onClick={() => {
                            navigate("/");
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
                    onSubmit={handleSubmit}
                    className="min-w-[650px] h-[700px] bg-[#ffffff] m-auto mobile:min-w-[300px] mobile:mx-4 mobile:h-[550px] text-[#1a2c50] relative"
                >
                    <div className="mx-16 mt-16 ">
                        <h1 className="uppercase text-[#000000] font-bold text-3xl drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">
                            Login tix id
                        </h1>
                        <div className="mt-16 text-[#333333] font-medium">
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
                            {userLogin.isError && (
                                <div className="mt-4">
                                    <h4 className="text-[#FF6B6B] font-bold text-left italic">
                                        {userLogin.values.email === "" ||
                                        userLogin.values.password === ""
                                            ? "Don't let the empty field."
                                            : userLogin.errors.email}
                                    </h4>
                                </div>
                            )}
                            {userLogin.isIncorrect && (
                                <div className="mt-4">
                                    <h4 className="text-[#FF6B6B] font-bold text-left italic">
                                        {userLogin.error}
                                    </h4>
                                </div>
                            )}
                        </div>
                        <div>
                            <button className="w-full mt-12 py-2 font-bold text-[#ffffff] bg-[#1A2C50] rounded-md">
                                Login
                            </button>
                            <h6 className="text-[#5A637A] text-center text-[12px] mt-4 font-bold">
                                Dont have an account yet?
                            </h6>
                            <div
                                onClick={() => {
                                    navigate("/register");
                                }}
                                className="w-full text-center cursor-pointer mt-2 py-1 font-bold text-[#1A2C50] bg-[#ffffff] rounded-md border-2 border-[#5A637A]"
                            >
                                Sign up
                            </div>
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

export default Login;
