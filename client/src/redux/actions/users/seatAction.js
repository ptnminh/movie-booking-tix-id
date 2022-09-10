import { seatAxios } from "../../../services/userServices";
import { GET_SEATS, RESERVATION_SEATS } from "../../types/type";

export const GetSeats = (id) => {
    return async (dispatch) => {
        try {
            const seats = await seatAxios.getSeats(id);
            //console.log(seats);
            dispatch({
                type: GET_SEATS,
                data: seats.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};

export const Reservation = (data, socket) => {
    return async (dispatch, getState) => {
        //console.log(data);
        try {
            data = data.map((e) => {
                delete e.decode_seat;
                delete e.price;
                return { ...e, occupied: true };
            });
            const seatBooking = await seatAxios.reservation(data);
            socket.emit("bookingSeats", seatBooking.data);
            dispatch({
                type: RESERVATION_SEATS,
                data: seatBooking.data,
            });
        } catch (e) {
            console.log(e);
        }
    };
};
