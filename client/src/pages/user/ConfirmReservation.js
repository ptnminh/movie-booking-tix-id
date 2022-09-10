import React from "react";

function ConfirmReservation() {
    return (
        <section className="pt-48 h-auto relative">
            <main>
                <div className="mt-16 flex mx-24 gap-4 mobile:justify-start mobile:mx-6">
                    <div>
                        <svg
                            width={32}
                            height={32}
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M25.5 16H6M6 16L13.5 8.5M6 16L13.5 23.5"
                                stroke="#5A637A"
                                strokeWidth={2}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </div>
                    <div className="font-bold text-2xl">Back</div>
                </div>
                <div className="h-auto flex justify-center mt-8">
                    <div className="w-[500px] mx-8 p-8 border-2 border-[#DADFE8] rounded-lg h-auto">
                        <h1 className="py-2 font-bold text-3xl">
                            Ticket Detail
                        </h1>
                        <ul className="pb-4 border-b-2 border-[#DADFE8] mt-4">
                            <li className="text-[#414A63] text-sm font-medium">
                                Movie
                            </li>
                            <li className="font-bold text-xl text-[#333333]">
                                Spiderman: No way home.
                            </li>
                        </ul>
                        <ul className="pb-4 border-b-2 border-[#DADFE8] mt-4">
                            <li className="text-[#414A63] text-sm font-medium">
                                Date
                            </li>
                            <li className="font-bold text-xl text-[#333333]">
                                Friday, 22 July 2022
                            </li>
                        </ul>
                        <div className="mt-4 flex justify-between pb-4 border-b-2 border-[#DADFE8]">
                            <ul className="">
                                <li className="text-[#414A63] text-sm font-medium">
                                    Type
                                </li>
                                <li className="font-bold text-xl text-[#333333]">
                                    2D
                                </li>
                            </ul>
                            <ul>
                                <li className="text-[#414A63] text-sm font-medium">
                                    Time
                                </li>
                                <li className="font-bold text-xl text-[#333333]">
                                    14:40
                                </li>
                            </ul>
                        </div>
                        <ul className="pb-4 border-b-2 border-[#DADFE8] mt-4">
                            <li className="text-[#414A63] text-sm font-medium">
                                Ticket (3)
                            </li>
                            <li className="font-bold text-xl text-[#333333]">
                                C8, C9, C10
                            </li>
                        </ul>
                        <ul className="pb-4 border-b-2 border-[#DADFE8] mt-4 flex justify-start items-center gap-8">
                            <li className="font-bold text-xl text-[#333333]">
                                Total:
                            </li>
                            <li className="font-bold text-xl text-[#333333]">
                                150000
                            </li>
                        </ul>
                        <ul className="w-full mt-4 text-center">
                            <li className="w-full py-3 font-bold text-[#FFBE00] bg-[#1A2C50] rounded-md">
                                Buy Ticket
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </section>
    );
}

export default ConfirmReservation;
