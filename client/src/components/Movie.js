import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetFilm } from "../redux/actions/admin/filmAction";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
function Movie() {
    const { Films } = useSelector((state) => state.filmReducers);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading } = useSelector((state) => state.LoadingReducers);
    useEffect(() => {
        dispatch(GetFilm(-1));
        return () => {
            console.log("unmount");
        };
    }, []);
    return (
        <div className="pt-48 h-auto">
            <main className="h-auto">
                <div className="font-bold text-3xl mx-16 text-[#1A2C50] mobile:mx-0 mobile:text-center">
                    NOW SHOWING
                </div>

                <div className="flex flex-wrap gap-1 justify-center tablet:justify-center laptop:justify-center mobile:justify-center mb-16">
                    {!isLoading &&
                        Films?.map((film, index) => {
                            return (
                                <>
                                    {true && (
                                        <div
                                            onClick={() => {
                                                navigate(`/films/${film.id}`);
                                            }}
                                            className="w-[250px] max-w-[230px] min-h-[350px] mr-4 my-8 mobile:mr-0 cursor-pointer"
                                            key={index}
                                        >
                                            <div
                                                className="transition-all hover:scale-105 h-[100%] w-full bg-cover bg-center rounded-[20px] bg-no-repeat min-h-[200px]"
                                                style={{
                                                    backgroundImage: ` url(${film.poster_film})`,
                                                }}
                                            ></div>
                                            <div className="mobile:text-center font-bold text-[16px] text-left mt-6 truncate break-all">
                                                {film.name}
                                            </div>
                                        </div>
                                    )}
                                </>
                            );
                        })}
                    {isLoading && (
                        <div className="flex flex-wrap mx-16 justify-center gap-4 rounded-lg mobile:mx-2 tablet:mx-8">
                            {Array(12)
                                .fill(0)
                                .map((ske, index) => {
                                    return (
                                        <div key={index}>
                                            <Skeleton
                                                className="!w-[250px] !max-w-[230px] !min-h-[350px] !mr-4 !my-8 mobile:!mr-0 cursor-pointer rounded-lg"
                                                duration={3}
                                                borderRadius={10}
                                            />
                                            <Skeleton
                                                borderRadius={30}
                                                className="!mt-4 !w-[80%] rounded-md"
                                            />
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}

export default Movie;
