import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import authUtils from "../utils/authUtils";
import { useDispatch, useSelector } from "react-redux";
import {
    HIDE_LOADING,
    SET_AUTHENTICATED,
    SET_LOADING,
    USER_LOGOUT,
} from "../redux/types/type";

function Header() {
    const { userAuth, isAuth } = useSelector((state) => state.UserReducers);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const [isAuth, setAuth] = useState(false);
    // console.log(userAuth);
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                //console.log(false);
                //setAuth(false);
            } else {
                //console.log(user);

                dispatch({
                    type: SET_AUTHENTICATED,
                    data: user,
                });
                //setAuth(true);
            }
        };
        checkAuth();
    }, []);

    const width = window.innerHeight;
    const [display, setDisplay] = useState(
        "mobile:translate-x-[-1000px] mobile:opacity-0"
    );
    const shrink = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            if (
                document.body.scrollTop > 100 ||
                document.documentElement.scrollTop > 100
            ) {
                shrink.current?.classList.add(
                    "md:animate-shrinkAnimation",
                    "md:shadow-md"
                );
                shrink.current?.classList.remove("md:animate-fadeOut");
            } else {
                shrink.current?.classList.add("md:animate-fadeOut");
                shrink.current?.classList.remove(
                    "md:animate-shrinkAnimation",
                    "md:shadow-md"
                );
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.addEventListener("resize", handleScroll);
    }, [width]);
    return (
        <header
            ref={shrink}
            className={`w-full h-auto bg-[#ffffff] fixed top-0 left-0 right-0`}
            style={{ zIndex: 999 }}
        >
            <div
                className={`mx-28 py-2 tablet:mx-2 mobile:mx-8  transtion delay-300 linear`}
            >
                <div className="w-full flex justify-between text-[#333333] font-bold uppercase">
                    <div
                        className="cursor-pointer"
                        onClick={() => {
                            dispatch({ type: SET_LOADING });
                            navigate("/");
                            dispatch({ type: HIDE_LOADING });
                        }}
                    >
                        <svg
                            className="w-[108px] h-[108px] mobile:h-[64px] mobile:w-[64px]"
                            viewBox="0 0 64 64"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                            <rect
                                y={16}
                                width={64}
                                height={32}
                                fill="url(#pattern0)"
                            />
                            <defs>
                                <pattern
                                    id="pattern0"
                                    patternContentUnits="objectBoundingBox"
                                    width={1}
                                    height={1}
                                >
                                    <use
                                        xlinkHref="#image0_861_1728"
                                        transform="translate(0 -0.5) scale(0.00588235 0.0117647)"
                                    />
                                </pattern>
                                <image
                                    id="image0_861_1728"
                                    width={170}
                                    height={170}
                                    xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKoAAACqCAMAAAAKqCSwAAAAM1BMVEUAGjo/Umu6wsr4zHwrQVzb3+PN09n////r7e4cM1DWplLnuWdYaX6JlqWfqrZygZP137hWL6d/AAADqklEQVR42u3a7bKjIAwGYKGKQUG9/6s91aoQPtpamGl352V/1W31ESGGcJr+n2kNqKCCCiqooIIKKqigggoqqKCCCiqooIIKKqigggoqqKCCCiqooIIKKqigggoqqKCC+n9QZdu8aq3cvjrp/bN4fLbH58Z0wVmX29GW8ILn9dppP3Ke92haCzMpiqivpXfbSlHi/GzWXyrvCoYy0tstvKA7S7vfYEYgrORnbd5pQq3d4WiCAqqeAumYo5KDafU4kn+as6xDJRN+49DcxvG0LgXUFdvVoPZslM/uYS3j6KxURD3nRSG1n/2pIJn0wEaz6irVzb4iaseGALnHf2Ij6XVq01gqp/qH7mfcO3UYhtNahXqcuRFvULe4maDyIbBdmcZhHA5tLP2IuseXRhrhmt+TrhnZZ6idP7O24HrbnOu/e6fSVep2uVbr5Duo6ak7mvLmtJbn4Y76HLWfwpsf9rZaE536nKrVxlDSisRjZTmAaqNXifdGTFGj4DoOZ7v1l6nuvFJEw7WQ6v9kC6600LL3KxVQ13mgg14opbJkYx//D+vSl1G9dOgRsYqpPLg+frU9fiqlkm9tVTmVv1/tSU136hUqnwhTBWocXCk3py5S2UQwVIFKLLjusZVqUP1e0F0Faq+CsNKNY056kernxLIGlQ2BVj1dIF2j+isEW4XaZTLXcqrXCaYKNRVc61CtFwjrUCkRXKtQp/pUm8gva1ClNwnqUFmO7S1efq9X2fNP3crvjNUpzNunX40AXVQfyQfXL8fVOV4OzfSTbyupsyu3H8sBOpFdj/9YZkVzekU8F6fW/NQV8tVcfTYTXL+4CmAh1YgmW3O9Tp2CJKiUOrHKQqoy9CmVrQLb8hUrT//Y2+U+Zwuo9esAUS3w1RB4UV2htXUqrK6I8uqKjOaRfJG5vlWzSk/RIioLqXP86koE108qgXtKUURla6r9B0o8Da6fUOe+mOqHVPew/cVLK8up+rjfAiorAZl0cdCUbls0+qivl1BtJutjQ8AWUr3n8jnVzyW0zZXwwuB6jaqN6itQbVhVTr9s7edUbWR259oLPm00d737MAE1TE38jHjO77HuPaZzO4ETPdlkPzOERPR2ic5j/CiTD/Uu04iKAm7n+pgviZ3r1lgZbV1zKp17GKlUg29jePsd+a92lP+v+Ij7FRH+ygJUUEEFFVRQQQUVVFBBBRVUUEEFFVRQQQUVVFBBBRVUUEEFFVRQQQUVVFBBBRVUUEH9evsDo566kQ6eL0MAAAAASUVORK5CYII="
                                />
                            </defs>
                        </svg>
                    </div>

                    <div className="md:hidden m-auto absolute right-[5%] top-[22.5%] cursor-pointer">
                        <svg
                            onClick={() => {
                                setDisplay(
                                    "mobile:translate-x-0 mobile:opacity-100"
                                );
                            }}
                            width={32}
                            height={32}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M26 10H6"
                                stroke="#333333"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M22 16H6"
                                stroke="#333333"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M18 22H6"
                                stroke="#333333"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>

                    <div
                        className={`${display} transition duration-1000 linear mobile:opacity-0 text-xl tablet:text-lg mobile:text-md mobile:h-screen
                            flex items-center justify-center w-[50%] tablet:w-[70%] mobile:flex-col mobile:text-[2rem] mobile:absolute mobile:top-0 mobile:left-0 mobile:w-screen mobile:justify-center mobile:items-start mobile:bg-[#ffffff] `}
                    >
                        <ul className="cursor-pointer">
                            <li>
                                <svg
                                    onClick={() => {
                                        setDisplay(
                                            "mobile:translate-x-[-1000px] mobile:opacity-0"
                                        );
                                    }}
                                    className="mobile:absolute mobile:top-4 mobile:right-4 md:hidden"
                                    width={32}
                                    height={32}
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M14.586 16L10.3434 11.7574C9.95285 11.3668 9.95285 10.7337 10.3434 10.3431C10.7339 9.95262 11.3671 9.95262 11.7576 10.3431L16.0002 14.5858L20.2429 10.3431C20.6334 9.95262 21.2666 9.95262 21.6571 10.3431C22.0476 10.7337 22.0476 11.3668 21.6571 11.7574L17.4144 16L21.6571 20.2426C22.0476 20.6332 22.0476 21.2663 21.6571 21.6569C21.2666 22.0474 20.6334 22.0474 20.2429 21.6569L16.0002 17.4142L11.7576 21.6569C11.3671 22.0474 10.7339 22.0474 10.3434 21.6569C9.95285 21.2663 9.95285 20.6332 10.3434 20.2426L14.586 16Z"
                                        fill="#333333"
                                    />
                                </svg>
                            </li>
                        </ul>
                        <ul className="flex items-center w-50 grow justify-evenly mobile:gap-12 md:border-r-2 mobile:mt-24 mobile:pb-12 border-[#9DA8BE] mobile:flex-col mobile:border-b-2 mobile:w-full">
                            <NavLink
                                to="/"
                                className="text-[#383782]  cursor-pointer pb-2 "
                                style={({ isActive }) => ({
                                    color: isActive ? "#383782" : "#333333",

                                    borderBottom: isActive
                                        ? "2px solid #383782"
                                        : "",
                                })}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                className=" cursor-pointer pb-2 "
                                to="/films"
                                style={({ isActive }) => ({
                                    color: isActive ? "#383782" : "#333333",
                                    borderBottom: isActive
                                        ? "2px solid #383782"
                                        : "",
                                })}
                            >
                                Movie
                            </NavLink>
                            <NavLink
                                to={`/ticket/${userAuth.id}`}
                                className=" cursor-pointer pb-2 "
                                style={({ isActive }) => ({
                                    color: isActive ? "#383782" : "#333333",
                                    borderBottom: isActive
                                        ? "2px solid #383782"
                                        : "",
                                })}
                            >
                                My ticket
                            </NavLink>
                        </ul>
                        <ul className="flex items-center grow justify-evenly h-full mobile:flex-col mobile:justify-start mobile:mt-12 mobile:w-full mobile:gap-12 mobile:pb-4">
                            <li className=" cursor-pointer ">
                                <svg
                                    className="mobile:absolute mobile:top-[1.1rem] mobile:right-[4rem]"
                                    width={32}
                                    height={32}
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M16.7209 9.00302L15.2549 9.00002C11.9109 8.99202 9.00787 11.709 8.98487 15.0001V18.7901C8.98487 19.5801 8.88487 20.3511 8.45387 21.0081L8.16687 21.4461C7.72986 22.1101 8.19987 23.0001 8.98487 23.0001H23.015C23.8 23.0001 24.269 22.1101 23.833 21.4461L23.546 21.0081C23.116 20.3511 23.015 19.5791 23.015 18.7891V15.0011C22.975 11.709 20.065 9.01102 16.7209 9.00302V9.00302Z"
                                        stroke="#333333"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M18.9996 23C18.9996 23.7957 18.6835 24.5587 18.1209 25.1213C17.5583 25.684 16.7952 26 15.9995 26C15.2039 26 14.4408 25.684 13.8782 25.1213C13.3156 24.5587 12.9995 23.7957 12.9995 23"
                                        stroke="#333333"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <path
                                        d="M16 6C16.5305 6 17.0392 6.21072 17.4142 6.58579C17.7893 6.96087 18 7.46958 18 8.00002V9.00003H14V8.00002C14 7.46958 14.2107 6.96087 14.5858 6.58579C14.9609 6.21072 15.4696 6 16 6Z"
                                        stroke="#333333"
                                        strokeWidth="1.75"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </li>
                            {!isAuth && (
                                <>
                                    <Link
                                        to="/login"
                                        className="cursor-pointer"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="py-2 px-4 bg-[#1A2C50] text-[#F2C46F] rounded-md cursor-pointer "
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            )}
                            {isAuth && (
                                <>
                                    <li className="rounded-[50%] w-[50px] h-[50px] mobile:absolute mobile:top-[10px] mobile:left-[10px]">
                                        {userAuth?.avatar && (
                                            <img
                                                className="w-full h-full rounded-[50%]"
                                                src={userAuth.avatar}
                                                alt="avatar"
                                            />
                                        )}
                                    </li>
                                    <li className="flex items-center">
                                        <span
                                            onClick={() => {
                                                dispatch({
                                                    type: USER_LOGOUT,
                                                });
                                                navigate("/");
                                            }}
                                            className="mobile:absolute mobile:top-[15px] mobile:left-[70px] cursor-pointer"
                                        >
                                            <svg
                                                width={40}
                                                height={40}
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M9.19058 12.5003C9.65049 12.4829 10.0374 12.8417 10.0548 13.3016C10.0939 14.3384 10.1489 15.0951 10.2029 15.6377C10.2562 16.172 10.5787 16.4935 11.0284 16.5485C11.5586 16.6133 12.3065 16.6663 13.3329 16.6663C14.3593 16.6663 15.1073 16.6133 15.6375 16.5485C16.0869 16.4935 16.4096 16.1719 16.4629 15.6374C16.5632 14.6303 16.6662 12.8904 16.6662 9.99967C16.6662 7.10899 16.5632 5.36902 16.4629 4.3619C16.4096 3.82745 16.0869 3.50581 15.6375 3.45087C15.1073 3.38605 14.3593 3.33301 13.3329 3.33301C12.3065 3.33301 11.5586 3.38605 11.0284 3.45086C10.5787 3.50583 10.2562 3.82732 10.2029 4.36165C10.1489 4.90422 10.0939 5.66095 10.0548 6.69778C10.0374 7.15769 9.65049 7.51644 9.19058 7.49908C8.73067 7.48172 8.37191 7.09481 8.38928 6.6349C8.42945 5.57071 8.48641 4.7792 8.54447 4.19643C8.66651 2.9713 9.52068 1.95609 10.8261 1.79651C11.4338 1.72223 12.2503 1.66634 13.3329 1.66634C14.4156 1.66634 15.232 1.72223 15.8397 1.79652C17.1453 1.95612 17.9993 2.9718 18.1213 4.1967C18.2288 5.27524 18.3329 7.0734 18.3329 9.99967C18.3329 12.9259 18.2288 14.7241 18.1213 15.8027C17.9993 17.0275 17.1453 18.0432 15.8397 18.2028C15.232 18.2771 14.4156 18.333 13.3329 18.333C12.2503 18.333 11.4338 18.2771 10.8261 18.2028C9.52069 18.0433 8.66651 17.0281 8.54447 15.8029C8.48641 15.2201 8.42945 14.4286 8.38928 13.3644C8.37191 12.9045 8.73067 12.5176 9.19058 12.5003Z"
                                                    fill="#72767C"
                                                />
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M6.00625 12.3274C6.33169 12.6528 6.33169 13.1805 6.00625 13.5059C5.68081 13.8314 5.15317 13.8314 4.82774 13.5059L1.91107 10.5893C1.58563 10.2638 1.58563 9.73618 1.91107 9.41074L4.82774 6.49408C5.15317 6.16864 5.68081 6.16864 6.00625 6.49408C6.33169 6.81951 6.33169 7.34715 6.00625 7.67259L4.51217 9.16667H12.5003C12.9606 9.16667 13.3337 9.53976 13.3337 10C13.3337 10.4602 12.9606 10.8333 12.5003 10.8333L4.51217 10.8333L6.00625 12.3274Z"
                                                    fill="#72767C"
                                                />
                                            </svg>
                                        </span>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
