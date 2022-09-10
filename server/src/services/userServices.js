const { User, sequelize, Reservation } = require("../models/index.js");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { mergeSeats } = require("../utils/constant.js");
const { convertImage } = require("../middlewares/convertToBase64.js");

const createUser = async (data) => {
    const { firstName, lastName, email, password, phone, type, avatar } = data;
    console.log(type);
    return new Promise(async (resolve, reject) => {
        try {
            const salt = bcrypt.genSaltSync(10);
            const hashPassword = bcrypt.hashSync(password, salt);
            const newUser = await User.create({
                firstName,
                lastName,
                email,
                password: hashPassword,
                phone,
                type,
                avatar,
            });

            resolve(newUser);
        } catch (e) {
            reject({});
        }
    });
};
const userLogin = async (data) => {
    const { email, password } = data;
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                where: { email },
            });
            if (user) {
                const match = await bcrypt.compare(password, user.password);
                if (match) {
                    resolve({
                        detail: user,
                        status: true,
                    });
                } else {
                    resolve({
                        status: false,
                    });
                }
            } else {
                resolve({ status: false });
            }
        } catch (e) {
            reject({
                statusCode: 500,
                message: "Something went wrong.",
            });
        }
    });
};
const getUsers = async () => {
    return new Promise(async (resolve, reject) => {
        const allUser = await User.findAll({
            attributes: { exclude: ["password"] },
        });
        if (allUser) {
            resolve(allUser);
        } else {
            reject([]);
        }
    });
};
const deleteUserService = async (id) => {
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({
            where: {
                id,
            },
        });
        if (user) {
            await user.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const updateUserService = async (user) => {
    const { firstName, lastName, phone, id, avatar, type } = user;
    return new Promise(async (resolve, reject) => {
        const user = await User.findOne({
            where: { id },
        });
        if (user) {
            await user.update({
                firstName,
                lastName,
                phone,
                avatar,
                type,
            });
            await user.save();
            resolve(user);
        } else {
            reject(false);
        }
    });
};

const getUserReservationService = async (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await Reservation.findOne({
                where: {
                    userId,
                },
            });
            if (!user) {
                reject("Not found.");
            }
            const [userReservations, metadata] = await sequelize.query(
                `SELECT sum(movieschedules.price) price,reservations.movieScheduleId,films.name filmName,films.poster_film poster,theaters.name,movieschedules.time,movieschedules.date FROM reservations JOIN movieschedules ON movieschedules.id = reservations.movieScheduleId JOIN films on films.id = movieschedules.filmId JOIN theaters on theaters.id = movieschedules.theaterId where reservations.userId = ${userId} group by reservations.movieScheduleId`
            );
            const [seatsNumber, effectedRowsSeatRows] = await sequelize.query(
                `SELECT seat_number,movieScheduleId from reservations where userId=${userId}`
            );

            const d = userReservations.map((e) => {
                const newData = {
                    ...e,
                    date: moment(e.data).format("dddd,DD MMMM YYYY"),
                    time: moment(e.time, "hh:mm:ss").format("hh:mm"),
                    poster: convertImage(e.poster),
                };

                return newData;
            });
            let result = mergeSeats(d, seatsNumber);
            resolve(result);
        } catch (e) {
            reject(e);
        }
    });
};
module.exports = {
    createUser,
    userLogin,
    getUsers,
    deleteUserService,
    updateUserService,
    getUserReservationService,
};
