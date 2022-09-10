const { Reservation, Seat, User, MovieSchedule } = require("../models/index");

const getSeatsMovieScheduleService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const seats = await Seat.findAll({
                where: {
                    moviescheduleId: id,
                },
            });
            if (seats) {
                resolve(seats);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};
const reservationSeatsService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let movieScheduleId;
            const reservationsData = data.map((d) => {
                movieScheduleId = d.movieScheduleId;
                return {
                    movieScheduleId: d.movieScheduleId,
                    userId: d.userId,
                    seat_number: d.seat_number,
                };
            });
            const seatsData = data.map((d) => {
                return {
                    id: d.id,
                    occupied: true,
                    seat_number: d.seat_number,
                };
            });
            const reservationUpdates = await Reservation.bulkCreate(
                reservationsData,
                {
                    include: [User, MovieSchedule],
                    ignoreDuplicates: true,
                    raw: true,
                    nest: true,
                }
            );

            const updateData = await Seat.bulkCreate(seatsData, {
                updateOnDuplicate: ["occupied"],
            });
            const seatUpdated = await Seat.findAll({
                where: {
                    moviescheduleId: movieScheduleId,
                },
            });
            resolve(seatUpdated);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    getSeatsMovieScheduleService,
    reservationSeatsService,
};
