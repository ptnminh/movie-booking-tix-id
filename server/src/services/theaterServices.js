const { Theater } = require("../models/index");

const createTheaterService = (data) => {
    const { name, address, logo, city, brand } = data;
    console.log(brand);
    return new Promise(async (resolve, reject) => {
        try {
            const newTheater = await Theater.create({
                name,
                brand,
                address,
                logo,
                city,
            });
            console.log(newTheater);
            resolve(newTheater);
        } catch (e) {
            reject(false);
        }
    });
};
const getTheatreService = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (id === -1) {
                const allTheaters = await Theater.findAll();
                resolve(allTheaters);
            } else {
                const theatre = await Theater.findOne({
                    where: { id },
                });
                if (!theatre) {
                    reject(false);
                } else {
                    resolve(theatre);
                }
            }
        } catch (e) {
            reject(false);
        }
    });
};
const deleteTheaterService = (id) => {
    return new Promise(async (resolve, reject) => {
        const theater = await Theater.findOne({
            where: {
                id,
            },
        });
        if (theater) {
            await theater.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const updateTheaterService = (data) => {
    const { id, name, city, address, logo, brand } = data;
    return new Promise(async (resolve, reject) => {
        const theater = await Theater.findOne({
            where: { id },
        });
        if (theater) {
            await theater.update({
                name,
                city,
                address,
                logo,
                brand,
            });
            await theater.save();
            resolve(theater);
        } else {
            reject({});
        }
    });
};
module.exports = {
    createTheaterService,
    getTheatreService,
    deleteTheaterService,
    updateTheaterService,
};
