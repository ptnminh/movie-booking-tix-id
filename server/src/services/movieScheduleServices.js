const {
    MovieSchedule,
    Film,
    Theater,
    Seat,
    Sequelize,
} = require("../models/index");
const moment = require("moment");
const { movieScheduleInTheater } = require("../utils/constant");

const createMovieScheduleService = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const lastedRows = await MovieSchedule.bulkCreate(data, {
                include: [Film, Theater],
                ignoreDuplicates: true,
                raw: true,
                nest: true,
            });
            const values = lastedRows.map((e) => e.get({ plain: true })); // chuyển qua dataValues
            let seat;
            let seats = [];
            values.forEach((value) => {
                seat = Array(160)
                    .fill(0)
                    .map((seat, index) => {
                        return {
                            seat_number: index + 1,
                            occupied: 0,
                            moviescheduleId: value.id,
                        };
                    });
                seats.push(seat);
            });
            let mergedSeats = [].concat.apply([], seats);
            await Seat.bulkCreate(mergedSeats, {
                inclue: [MovieSchedule],
                ignoreDuplicates: true,
                raw: true,
                nest: true,
            });
            resolve(values);
        } catch (e) {
            reject(e);
        }
    });
};
const getMovieScheduleService = (filmId, city, brand, date) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                city === undefined ||
                brand === undefined ||
                date === undefined
            ) {
                reject("Missing required parammeters.");
            }
            let getMovieSchedules = await MovieSchedule.findAll({
                where: {
                    filmId,
                    date,
                },
                include: [
                    {
                        model: Theater,
                        where: {
                            brand,
                            city,
                        },
                    },
                ],
            });
            getMovieSchedules = movieScheduleInTheater(getMovieSchedules);
            resolve(getMovieSchedules);
        } catch (e) {
            reject(e);
        }
    });
};
const getDateService = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const getDate = await MovieSchedule.findAll({
                attributes: [
                    // specify an array where the first element is the SQL function and the second is the alias
                    [Sequelize.fn("DISTINCT", Sequelize.col("date")), "date"],

                    // specify any additional columns, e.g. country_code
                    // 'country_code'
                ],
            });
            let mergedDates = getDate.map((date, index) => {
                let dateobj = {
                    day: moment(date.date).format("ddd"),
                    date: moment(date.date).format("MMM Do YY"),
                };

                return dateobj;
            });
            resolve(mergedDates);
        } catch (e) {
            reject(e);
        }
    });
};
const getFilmScheduleByIdService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const detail = await MovieSchedule.findOne({
                where: { id },
            });
            if (detail) {
                resolve(detail);
            } else {
                resolve([]);
            }
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createMovieScheduleService,
    getMovieScheduleService,
    getDateService,
    getFilmScheduleByIdService,
};
