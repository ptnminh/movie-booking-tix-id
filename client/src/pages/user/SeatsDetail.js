import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { GetSeats, Reservation } from "../../redux/actions/users/seatAction";
import {
    RESERVATION_SEATS,
    SET_AUTHENTICATED,
    UPPDATE_SEAT_BOOKED,
} from "../../redux/types/type";
import { getMovieScheduleById } from "../../redux/actions/users/movieScheduleAction";
import authUtils from "../../utils/authUtils";
import io from "socket.io-client";
import { host } from "../../utils/constant";
let socket = io.connect(host);
function SeatsDetail() {
    const { scheduleId } = useParams();
    useEffect(() => {
        console.log("renderSeat");
        socket.emit("joinMovieSchedule", scheduleId);
        socket.on("joined", (data) => {
            console.log(data);
        });
    }, [socket]);
    const dispatch = useDispatch();
    let { Seats } = useSelector((state) => state.SeatReducers);
    let { detailBooking } = useSelector((state) => state.MovieScheduleReducers);
    const { userAuth } = useSelector((state) => state.UserReducers);
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuth = async () => {
            const user = await authUtils.isAuthenticated();
            if (!user) {
                navigate("/login");
            } else {
                dispatch({
                    type: SET_AUTHENTICATED,
                    data: user,
                });
            }
        };
        checkAuth();
        dispatch(GetSeats(scheduleId));
        dispatch(getMovieScheduleById(scheduleId));
    }, []);

    console.log("render");
    const [seatBooking, setSeatBooking] = useState([]);
    useEffect(() => {
        //setSeatBooking([]);
        console.log("renderSeat");
        socket.on("renderSeat", (seats) => {
            dispatch({
                type: RESERVATION_SEATS,
                data: seats,
            });
        });
    }, [socket]);
    const handleSeatSelected = (s) => {
        let seat = Seats.filter((seat) => seat === s);
        if (s.occupied) {
            return;
        }
        if (!s.isSelected) {
            setSeatBooking([
                ...seatBooking,
                {
                    id: s.id,
                    userId: userAuth.id,
                    movieScheduleId: +scheduleId,
                    seat_number: s.seat_number,
                    decode_seat: s.decode_seat,
                    price: detailBooking.price,
                },
            ]);
        } else {
            let newSeatBooking = seatBooking;
            newSeatBooking = newSeatBooking.filter((seat) => seat.id !== s.id);
            setSeatBooking(newSeatBooking);
        }

        seat[0].isSelected = !seat[0].isSelected;
        Seats.map((s) => {
            if (s === seat[0]) {
                s = seat;
            }
            return s;
        });

        dispatch({
            type: UPPDATE_SEAT_BOOKED,
            Seats,
        });
    };
    return (
        <section className="pt-48 h-auto relative">
            <main>
                <div className="mx-16 mobile:text-center">
                    <h1 className="text-[#333333] font-bold text-3xl">
                        Choose Seats
                    </h1>
                    <h1 className="text-[#5A637A] mt-4 font-medium">
                        Choose your seats and enjoy the film.
                    </h1>
                </div>
                <div className="mx-16 mt-24 flex flex-col items-center mobile:mx-0">
                    <ul className="flex w-full justify-center gap-8 uppercase tablet:justify-center">
                        <li className="flex gap-4 items-center">
                            <span className="w-[23px] h-full bg-[#1A2C50] border-2"></span>
                            <span className="font-bold text-sm">Selected</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <span className="w-[23px] h-full border-2 bg-[#ffffff]"></span>
                            <span className="font-bold text-sm">Empty</span>
                        </li>
                        <li className="flex gap-4 items-center">
                            <span className="w-[23px] h-full bg-[#118EEA] border-2"></span>
                            <span className="font-bold text-sm">Booked</span>
                        </li>
                    </ul>
                    <div className="mt-4 flex w-full font-bold py-4 justify-center items-center gap-8 uppercase tablet:justify-center">
                        <ul
                            style={{
                                boxShadow: "0px 0px 7px -5px rgba(0,0,0,0.75)",
                            }}
                            className="flex w-[30%] items-center gap-4 justify-center py-2 rounded-md border-2 text-lg"
                        >
                            <li>
                                <svg
                                    width={32}
                                    height={32}
                                    viewBox="0 0 32 32"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <g clipPath="url(#clip0_1015_2143)">
                                        <path
                                            d="M16 24.3334C20.6023 24.3334 24.3333 20.6024 24.3333 16C24.3333 11.3976 20.6023 7.66669 16 7.66669C11.3976 7.66669 7.66663 11.3976 7.66663 16C7.66663 20.6024 11.3976 24.3334 16 24.3334Z"
                                            stroke="#333333"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M18.4999 19.3334L16.4882 17.3217C16.1756 17.0092 16 16.5854 15.9999 16.1434V11.0001"
                                            stroke="#333333"
                                            strokeWidth="1.66667"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_1015_2143">
                                            <rect
                                                width={20}
                                                height={20}
                                                fill="white"
                                                transform="translate(6 6)"
                                            />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </li>
                            <li>{detailBooking.time}</li>
                        </ul>
                    </div>
                </div>
                <div className="overflow-x-auto h-auto flex tablet:gap-4 gap-[200px] justify-center text-center font-bold text-[12px] mt-16 mx-16 tablet:mx-0">
                    <div className="flex flex-wrap justify-center max-w-[1000px] gap-3 w-[100%]">
                        {Seats?.map((rowId, index) => {
                            return (
                                <div
                                    onClick={() => {
                                        handleSeatSelected(rowId);
                                    }}
                                    key={index}
                                    className={`
                                        ${
                                            rowId.isSelected
                                                ? "text-[#ffffff] bg-[#1A2C50]"
                                                : ""
                                        }
                                        ${
                                            rowId.occupied
                                                ? "text-[#ffffff] bg-[#118EEA]"
                                                : ""
                                        }
                                        cursor-pointer border-2 border-[#9DA8BE] h-[40px] w-[40px] flex items-center justify-center rounded-lg`}
                                >
                                    {rowId.decode_seat}
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className="flex justify-center items-center gap-16 mt-8 mx-16 pt-12 border-t-2 border-[#5A637A] tablet:mx-0 mobile:flex-col">
                    <div className="flex gap-8">
                        <ul className="flex flex-col">
                            <li className="font-medium text-[#5A637A] text-lg">
                                Total
                            </li>
                            <li className="text-2xl font-bold text-[#333333]">
                                Pr.&nbsp;
                                {(
                                    seatBooking.length * detailBooking.price
                                ).toLocaleString()}
                            </li>
                        </ul>
                        <ul className="flex flex-col">
                            <li className="font-medium text-[#5A637A] text-lg">
                                Seats
                            </li>
                            <li className="flex flex-wrap">
                                {seatBooking.map((seat, index) => {
                                    return (
                                        <h1
                                            className="text-2xl font-bold text-[#333333]"
                                            key={index}
                                        >
                                            {seat.decode_seat}&nbsp;
                                        </h1>
                                    );
                                })}
                            </li>
                        </ul>
                    </div>

                    <ul className="flex gap-8">
                        <li
                            onClick={() => {
                                navigate(-1);
                            }}
                            className="border-2 border-[#5A637A] px-12 py-2 font-bold text-[#5A637A] rounded-lg cursor-pointer"
                        >
                            Back
                        </li>
                        <li
                            onClick={() => {
                                if (seatBooking.length === 0) {
                                    return;
                                }
                                setSeatBooking([]);
                                dispatch(Reservation(seatBooking, socket));
                            }}
                            className="px-12 py-2 font-bold text-[#FFBE00] rounded-lg bg-[#1A2C50] cursor-pointer"
                        >
                            Confirm
                        </li>
                    </ul>
                </div>
            </main>
        </section>
    );
}

export default SeatsDetail;
