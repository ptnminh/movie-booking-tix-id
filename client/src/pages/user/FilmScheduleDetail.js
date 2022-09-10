import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Pagination, Navigation } from "swiper";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { GetFilmDetail } from "../../redux/actions/admin/filmAction";
import {
    GetDatesAction,
    GetTheaterSchedule,
} from "../../redux/actions/users/movieScheduleAction";
import moment from "moment";
import { convertToDate, exportLogo } from "../../utils/constant";
import { options1, options2 } from "../../utils/constant";
import {
    DELETE_THEATER_SCHEDULE,
    GET_DETAIL_BOOKING,
} from "../../redux/types/type";
function FilmScheduleDetail() {
    const [bookingDetail, setBookingDetail] = useState({
        id: 0,
        theater_name: "",
        dates: "",
        time: "",
        price: 0,
    });
    const [selectedDate, setSelectedDate] = useState(false);
    const [selectedTime, setSelectedTime] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [date, setDate] = useState("");
    const { filmDetail } = useSelector((state) => state.filmReducers);
    const { dates, theaterSchedule } = useSelector(
        (state) => state.MovieScheduleReducers
    );
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const handleChangeLocation = (selectedOption) => {
        //console.log(selectedOption);
        setSelectedOption1(selectedOption);
    };
    const handleChangeBrand = (selectedOption) => {
        //console.log(selectedOption);
        setSelectedOption2(selectedOption);
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        //console.log(selectedOption1, selectedOption2, date);

        setBookingDetail({
            ...bookingDetail,
            dates: moment(date.date, "MMM Do YY").format("dddd,DD MMMM YYYY"),
        });
        let d = convertToDate(date.date);

        dispatch(
            GetTheaterSchedule(
                id,
                selectedOption1.value,
                { date: d },
                selectedOption2.value
            )
        );
    };
    //console.log(theaterSchedule);
    console.log("render");
    const { id } = useParams();
    useEffect(() => {
        dispatch(GetDatesAction());
        dispatch(GetFilmDetail(id));
    }, [theaterSchedule]);
    useEffect(() => {
        return () => {
            console.log("unmount");
            let resetBookingDetail = {
                theater_name: "",
                dates: "",
                time: "",
                price: 0,
            };
            setBookingDetail(resetBookingDetail);
            dispatch({
                type: DELETE_THEATER_SCHEDULE,
            });
        };
    }, []);
    console.log({ bookingDetail });
    return (
        <section className="pt-48 h-auto relative">
            <main className="flex gap-16 tablet:gap-0 mobile:flex-col-reverse mobile:justify-end">
                <div className="w-[60%] mx-8 h-auto mobile:w-full tablet:mx-2">
                    <form
                        onSubmit={handleSubmit}
                        className="w-full h-auto pb-8  after:content-none after:absolute relative after:left-0 after:bottom-0 after:h-[1px] border-b-2 border-[#5A637A] after:w-[50%]"
                    >
                        <Swiper
                            slidesPerView={4}
                            spaceBetween={0}
                            slidesPerGroup={1}
                            loop={true}
                            loopFillGroupWithBlank={true}
                            // navigation={true}
                            modules={[Pagination, Navigation]}
                        >
                            {dates?.map((date, index) => {
                                return (
                                    <SwiperSlide key={index}>
                                        <div
                                            onClick={() => {
                                                let tmp = date.isSelected;
                                                date.isSelected =
                                                    !date.isSelected;
                                                date.isBanned = false;
                                                dates
                                                    ?.filter((d) => d !== date)
                                                    .forEach((d) => {
                                                        d.isSelected = false;
                                                        d.isBanned = true;
                                                    });

                                                setDate(date);
                                                setSelectedDate(!tmp);
                                            }}
                                            style={{
                                                boxShadow:
                                                    "0px 0px 10px -2px rgba(0,0,0,0.75)",
                                            }}
                                            className={`${
                                                date.isSelected
                                                    ? "bg-[#1A2C50]"
                                                    : ""
                                            } 
                                            ${
                                                date.isBanned
                                                    ? "bg-[#DADFE8] text-[#9DA8BE]"
                                                    : ""
                                            }
                                            cursor-pointer flex flex-col items-center justify-center m-auto w-[70%] min-w-[82px] max-w-[82px] h-full border-2 border-[#5A637A] rounded-md`}
                                        >
                                            <span
                                                className={`${
                                                    date.isSelected
                                                        ? "text-[#ffffff]"
                                                        : "text-[#5A637A] "
                                                } 
                                                ${
                                                    date.isBanned
                                                        ? "text-[#9DA8BE]"
                                                        : ""
                                                } 
                                                text-[15px]`}
                                            >
                                                {date.date.split(" ")[0] +
                                                    " " +
                                                    date.date.split(" ")[1]}
                                            </span>
                                            <span
                                                className={`${
                                                    date.isSelected
                                                        ? "text-[#ffffff]"
                                                        : "text-[#333333]"
                                                } 
                                                ${
                                                    date.isBanned
                                                        ? "text-[#9DA8BE]"
                                                        : ""
                                                } 
                                                font-bold text-[20px]`}
                                            >
                                                {date.day}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                        <div className="text-[#1A2C50] font-bold flex gap-4 mt-8 flex-col">
                            <div className="flex justify-start items-center gap-4">
                                <div className="flex flex-col items-center gap-4">
                                    <div className="text-left w-full">
                                        Studio
                                    </div>
                                    <div className="text-left">Location</div>
                                </div>
                                <div className="flex flex-col items-center gap-4">
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
                                    <div>
                                        <svg
                                            width={24}
                                            height={24}
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M11.5754 3.68294C11.771 3.36828 12.229 3.36828 12.4246 3.68294L14.908 7.67708C14.9768 7.78779 15.0862 7.86723 15.2127 7.89849L19.7788 9.02605C20.1385 9.11488 20.28 9.55042 20.0412 9.83372L17.01 13.4298C16.9259 13.5295 16.8842 13.658 16.8936 13.788L17.2322 18.4791C17.2588 18.8486 16.8884 19.1178 16.5451 18.9782L12.1883 17.2066C12.0676 17.1575 11.9324 17.1575 11.8117 17.2066L7.45488 18.9782C7.11165 19.1178 6.74115 18.8486 6.76783 18.4791L7.10644 13.788C7.11583 13.658 7.07406 13.5295 6.99004 13.4298L3.95879 9.83372C3.71999 9.55042 3.86151 9.11488 4.22122 9.02605L8.78727 7.89849C8.91383 7.86723 9.02318 7.78779 9.09202 7.67708L11.5754 3.68294Z"
                                                fill="#333333"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center gap-4">
                                    <Select
                                        className="w-[200px]"
                                        value={selectedOption2}
                                        onChange={handleChangeBrand}
                                        options={options2}
                                    />
                                    <Select
                                        className="w-[200px]"
                                        value={selectedOption1}
                                        onChange={handleChangeLocation}
                                        options={options1}
                                    />
                                </div>
                            </div>
                        </div>
                        <button className="mt-6 py-2 rounded-lg px-4 border-2 bg-[#1A2C50] text-[#FFBE00] font-bold hover:opacity-90 cursor-pointer">
                            Search
                        </button>
                        {/* {true && (
                            <div className="font-bold mt-4 text-red-800">
                                Missing required parameters
                            </div>
                        )} */}
                    </form>
                    <div className="mt-4  mx-4">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4 text-[#1A2C50]">
                                <div>
                                    <svg
                                        width={32}
                                        height={32}
                                        viewBox="0 0 32 32"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <circle
                                            cx={16}
                                            cy={16}
                                            r={16}
                                            fill="#1A2C50"
                                        />
                                        <path
                                            d="M15.9861 6.00001L19.3559 11.8619L25.9722 13.2553L21.4385 18.2716L22.1578 24.9947L15.9861 22.233L9.81435 24.9947L10.5337 18.2716L6 13.2553L12.6163 11.8619L15.9861 6.00001Z"
                                            fill="#F2C46F"
                                        />
                                    </svg>
                                </div>
                                <h1 className="text-2xl font-bold uppercase">
                                    Grand VietNam&nbsp;
                                    {theaterSchedule &&
                                        theaterSchedule[0]?.brand}
                                </h1>
                            </div>
                            <div>
                                {theaterSchedule &&
                                    exportLogo(theaterSchedule[0]?.brand)}
                            </div>
                        </div>
                        {theaterSchedule?.map((item, index) => {
                            return (
                                <>
                                    <div key={index} className="mt-4">
                                        <h1 className="text-[#81899D] font-medium">
                                            {item.name}
                                        </h1>
                                    </div>
                                    <div className="text-[#1A2C50] mt-4">
                                        <div className="font-bold flex justify-between items-center text-[#5A637A]">
                                            <h1 className="text-2xl ">2D</h1>
                                        </div>
                                        <div className="flex flex-wrap gap-6 mt-4 text-center items-center w-[50%] mobile:w-[100%] tablet:w-[70%]">
                                            {item.times.map((time, index) => {
                                                return (
                                                    <div
                                                        onClick={() => {
                                                            if (time.isAfter) {
                                                                return;
                                                            }
                                                            time.isSelected =
                                                                !time.isSelected;

                                                            theaterSchedule.forEach(
                                                                (t) => {
                                                                    t.times
                                                                        .filter(
                                                                            (
                                                                                d
                                                                            ) =>
                                                                                d !==
                                                                                time
                                                                        )
                                                                        .forEach(
                                                                            (
                                                                                d
                                                                            ) => {
                                                                                d.isSelected = false;
                                                                            }
                                                                        );
                                                                }
                                                            );
                                                            setBookingDetail({
                                                                ...bookingDetail,
                                                                id: time.scheduleId,
                                                                theater_name:
                                                                    item.name,
                                                                time: time.time,
                                                                price: time.price,
                                                            });
                                                            setSelectedTime(
                                                                time.isSelected
                                                            );
                                                        }}
                                                        key={index}
                                                        className={`
                                                            ${
                                                                time.isSelected
                                                                    ? "!text-[#ffffff] !bg-[#1A2C50]"
                                                                    : ""
                                                            }
                                                            ${
                                                                !time.isAfter
                                                                    ? ""
                                                                    : "bg-[#DADFE8] text-[#9DA8BE] !cursor-not-allowed"
                                                            } 
                                                            
                                                            bg-[#ffffff] text-[#1A2C50] w-[85px] h-[50px] rounded-md border-2 border-[#DADFE8] font-bold flex items-center justify-center cursor-pointer`}
                                                    >
                                                        {time.time}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            );
                        })}
                    </div>
                </div>
                <div className="w-[40%] h-auto mobile:w-full">
                    <main className="w-full flex justify-center flex-col m-auto items-center">
                        <div className="w-[60%] flex flex-col h-auto justify-center tablet:w-full mobile:flex-row mobile:gap-4">
                            <div
                                className="bg-bottom bg-no-repeat bg-cover h-[400px] rounded-lg none"
                                style={{
                                    backgroundImage: filmDetail
                                        ? `url(${filmDetail.poster_film})`
                                        : "url(https://terrigen-cdn-dev.marvel.com/content/prod/1x/snh_online_6072x9000_posed_01.jpg)",
                                    boxShadow:
                                        "0px 0px 10px -2px rgba(0,0,0,0.75)",
                                }}
                            >
                                <img
                                    src={`${
                                        filmDetail
                                            ? `${filmDetail.poster_film}`
                                            : "https://terrigen-cdn-dev.marvel.com/content/prod/1x/snh_online_6072x9000_posed_01.jpg"
                                    }`}
                                    className="w-full h-full object-contain"
                                    alt=""
                                />
                            </div>
                            <div className="text-[#333333] mt-4 mobile:m-0">
                                <h1 className="font-bold text-2xl mt-2 uppercase">
                                    {filmDetail ? filmDetail.name : "No name."}
                                </h1>
                                <div
                                    className="flex gap-16 text-[16px] mt-2 font-bold"
                                    style={{ color: "rgba(0,0,0,0.7)" }}
                                >
                                    <div className="flex flex-col gap-2">
                                        <h4>Genre:</h4>
                                        <h4>Duration:</h4>
                                        <h4>Director:</h4>
                                    </div>
                                    <div className="flex flex-col gap-2">
                                        <h4 className="">
                                            {filmDetail.genres}
                                        </h4>
                                        <h4 className="">
                                            {moment(
                                                filmDetail.duration,
                                                "hh:mm:ss"
                                            ).format("h:mm")}
                                        </h4>
                                        <h4 className="">
                                            {filmDetail.director}
                                        </h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                boxShadow: "0px 0px 10px -2px rgba(0,0,0,0.75)",
                            }}
                            className="mt-4 border-2 border-[#5A637A] w-[60%] rounded-lg tablet:w-full"
                        >
                            {bookingDetail.theater_name !== "" ? (
                                <div className="m-4 flex flex-col justify-center">
                                    <h1 className="font-bold text-2xl text-[#1A2C50] pt-2">
                                        {bookingDetail.theater_name}
                                    </h1>
                                    <h3 className="text-[#5A637A] text-sm pt-2 tracking-wide font-bold">
                                        {bookingDetail.dates}
                                    </h3>
                                    <div className="flex gap-4 items-center">
                                        <h2 className="font-bold text-xl text-[#1A2C50] pt-2">
                                            Regular 2D
                                        </h2>
                                        <h2 className="font-bold text-xl text-[#1A2C50] pt-2">
                                            {bookingDetail.time}
                                        </h2>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <h2 className="font-bold text-xl text-[#1A2C50] pt-2">
                                            Price
                                        </h2>
                                        <h2 className="font-bold text-xl text-[#1A2C50] pt-2">
                                            {bookingDetail.price}
                                        </h2>
                                    </div>

                                    <button
                                        onClick={() => {
                                            dispatch({
                                                type: GET_DETAIL_BOOKING,
                                                data: bookingDetail,
                                            });
                                            navigate(
                                                `/films/${id}/seats/${bookingDetail.id}`
                                            );
                                        }}
                                        className="uppercase w-[100%] mt-8 bg-[#1A2C50] text-[#FFBE00] m-auto text-xl py-4 rounded-lg font-bold"
                                    >
                                        Book now
                                    </button>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                    </main>
                </div>
            </main>
        </section>
    );
}

export default FilmScheduleDetail;
// ${
//     time.isBanned
//         ? "bg-[#ffffff] text-[#1A2C50]"
//         : "bg-[#DADFE8] text-[#9DA8BE]"
// }
