import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserReservations } from "../redux/actions/users/userAction";
import { SET_AUTHENTICATED } from "../redux/types/type";
import authUtils from "../utils/authUtils";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function MyTicket() {
    const dispatch = useDispatch();
    const { userReservations, userAuth } = useSelector(
        (state) => state.UserReducers
    );
    const { isLoading } = useSelector((state) => state.LoadingReducers);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                //console.log(false);
                //setAuth(false);
                navigate("/login");
            } else {
                //console.log(user);

                dispatch({
                    type: SET_AUTHENTICATED,
                    data: user,
                });
                const userLogin = localStorage.getItem("userLogin");
                const { id } = JSON.parse(userLogin);
                //setAuth(true);
                dispatch(GetUserReservations(id));
            }
        };
        checkAuth();
    }, []);
    //console.log(userReservations);
    return (
        <section className="pt-48 h-auto">
            <main className="h-auto">
                <div className="w-full h-auto mx-32 laptop:mx-16 tablet:mx-8 mobile:mx-2">
                    {!isLoading &&
                        userReservations?.map((ticket, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex gap-8 mb-8 mobile:flex-col"
                                >
                                    <div
                                        className="bg-bottom bg-no-repeat bg-cover h-[300px] rounded-lg none w-[20%] mobile:w-full"
                                        style={{
                                            backgroundImage: `url(${ticket.poster})`,
                                            boxShadow:
                                                "0px 0px 10px -2px rgba(0,0,0,0.75)",
                                        }}
                                    >
                                        <img
                                            src={`${ticket.poster}`}
                                            className="w-full h-full object-contain rounded-lg"
                                            alt=""
                                        />
                                    </div>
                                    <div>
                                        <h1 className="text-[#414A63] text-3xl font-bold">
                                            {ticket.filmName}
                                        </h1>
                                        <h1 className="text-[#414A63] text-lg font-bold mt-4">
                                            {ticket.date},&nbsp;{ticket.time}
                                        </h1>
                                        <div className="flex mt-8 items-center gap-1">
                                            <div>
                                                <svg
                                                    width={32}
                                                    height={32}
                                                    viewBox="0 0 32 32"
                                                    fill="none"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M15.8571 16.4286C15.1507 16.4286 14.4602 16.2192 13.8729 15.8267C13.2856 15.4343 12.8278 14.8765 12.5575 14.2239C12.2872 13.5713 12.2165 12.8532 12.3543 12.1604C12.4921 11.4677 12.8322 10.8313 13.3317 10.3318C13.8312 9.83234 14.4675 9.4922 15.1603 9.35439C15.8531 9.21659 16.5712 9.28731 17.2238 9.55763C17.8764 9.82794 18.4342 10.2857 18.8266 10.873C19.219 11.4603 19.4285 12.1508 19.4285 12.8572C19.4274 13.8041 19.0507 14.7118 18.3812 15.3813C17.7117 16.0509 16.8039 16.4275 15.8571 16.4286ZM15.8571 10.7143C15.4333 10.7143 15.019 10.84 14.6666 11.0755C14.3142 11.3109 14.0395 11.6456 13.8773 12.0372C13.7151 12.4287 13.6727 12.8596 13.7554 13.2752C13.8381 13.6909 14.0422 14.0727 14.3418 14.3724C14.6415 14.6721 15.0234 14.8762 15.439 14.9589C15.8547 15.0416 16.2856 14.9991 16.6771 14.8369C17.0687 14.6748 17.4033 14.4001 17.6388 14.0477C17.8743 13.6953 17.9999 13.281 17.9999 12.8572C17.9994 12.2891 17.7734 11.7443 17.3717 11.3426C16.9699 10.9409 16.4252 10.7149 15.8571 10.7143Z"
                                                        fill="#333333"
                                                        stroke="black"
                                                        strokeWidth="0.25"
                                                    />
                                                    <path
                                                        d="M15.8572 25L9.83144 17.8936C9.74771 17.7869 9.66485 17.6795 9.58287 17.5714C8.55357 16.2156 7.99751 14.5594 8.00001 12.8571C8.00001 10.7733 8.82781 8.7748 10.3013 7.3013C11.7748 5.8278 13.7733 5 15.8572 5C17.941 5 19.9395 5.8278 21.413 7.3013C22.8865 8.7748 23.7143 10.7733 23.7143 12.8571C23.7168 14.5587 23.161 16.214 22.1322 17.5693L22.1314 17.5714C22.1314 17.5714 21.9172 17.8529 21.885 17.8907L15.8572 25ZM10.7229 16.7107C10.7229 16.7107 10.89 16.9307 10.9279 16.9779L15.8572 22.7914L20.7929 16.97C20.8243 16.9307 20.9922 16.7086 20.9922 16.7086C21.833 15.6008 22.2874 14.2479 22.2857 12.8571C22.2857 11.1522 21.6084 9.51705 20.4028 8.31146C19.1972 7.10587 17.5621 6.42857 15.8572 6.42857C14.1522 6.42857 12.5171 7.10587 11.3115 8.31146C10.1059 9.51705 9.42858 11.1522 9.42858 12.8571C9.42708 14.2487 9.88128 15.6024 10.7229 16.7107Z"
                                                        fill="#333333"
                                                        stroke="#333333"
                                                        strokeWidth="0.5"
                                                    />
                                                </svg>
                                            </div>
                                            <div className="text-[#9DA8BE] font-medium">
                                                {ticket.name}&nbsp;
                                                <span className="text-[#414A63] font-bold">
                                                    (Regular 2D)
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex mt-4 items-center">
                                            <div className="text-[#414A63] font-medium text-lg">
                                                Seats:&nbsp;
                                            </div>
                                            <div className="flex flex-wrap gap-2">
                                                {ticket.seats.map(
                                                    (seat, index) => {
                                                        return (
                                                            <div className="text-[#414A63] font-medium">
                                                                {seat}
                                                            </div>
                                                        );
                                                    }
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex mt-4 items-center">
                                            <div className="text-[#414A63] font-medium text-lg">
                                                Price:&nbsp;
                                                <span>
                                                    {ticket.price.toLocaleString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    {isLoading && (
                        <div className="">
                            {Array(2)
                                .fill(0)
                                .map((ske, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="flex mt-4 gap-4 mobile:flex-col"
                                        >
                                            <Skeleton
                                                width={400}
                                                height={300}
                                                borderRadius={20}
                                                duration={3}
                                                className="h-[1000px] mobile:!w-[100%]"
                                            />
                                            <div>
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                                <Skeleton className="!w-[400px] !h-[20px] !mt-4 rounded-lg mobile:!w-[100%]" />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </main>
        </section>
    );
}

export default MyTicket;
