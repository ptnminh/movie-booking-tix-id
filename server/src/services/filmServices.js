const { Film,sequelize } = require("../models/index");
const { QueryTypes } = require('sequelize');
const createFilmService = async (data) => {
    const {
        director,
        duration,
        poster_film,
        type,
        avatar_director,
        name,
        desc,
        genres,
    } = data;

    return new Promise(async (resolve, reject) => {
        try {
            const newFilm = await Film.create({
                director,
                duration,
                poster_film,
                type,
                avatar_director,
                name,
                desc,
                genres
            });

            resolve(newFilm);
        } catch (e) {
            reject(false);
        }
    });
};

const deleteFilmService = async (id) => {
    return new Promise(async (resolve, reject) => {
        const film = await Film.findOne({
            where: {
                id,
            },
        });
        if (film) {
            await film.destroy({ force: true });
            resolve(true);
        } else {
            reject(false);
        }
    });
};
const getFilmsService = async (type) => {
    return new Promise(async (resolve, reject) => {
        if (type === -1) {
            const allFilms = await Film.findAll();
            resolve(allFilms);
        } else {
            const film = await Film.findOne({
                where: {
                    id: type,
                },
            });
            if (film) {
                resolve(film);
            } else {
                reject({});
            }
        }
    });
};
const updateFilmService = async (data) => {
    const {
        id,
        director,
        duration,
        poster_film,
        type,
        avatar_director,
        name,
        desc,
        genres
    } = data;
    return new Promise(async (resolve, reject) => {
        const film = await Film.findOne({
            where: { id },
        });
        if (film) {
            await film.update({
                director,
                duration,
                poster_film,
                type,
                avatar_director,
                name,
                desc,
                genres
            });
            await film.save();
            resolve(film);
        } else {
            reject({})
        }
    });
};
const getListTypefilmsService = async (limit,type) => {
    return new Promise(async (resolve,reject) => {
        try {
            const query = await sequelize.query("SELECT COUNT(*) as number FROM `films` where type = ?",{
                replacements:[`${type}`],
                type:QueryTypes.SELECT
            })
            if(limit > query[0].number) {
                reject("Out of range.")
            } else {
                const upComingFilms = await Film.findAll({
                    limit,
                    where: {
                        type
                    },
                    raw:true,
                })
                if(upComingFilms.length === 0) {
                    reject("Not found.")
                } else {
                    resolve(upComingFilms);
                }
            }
        } catch(e) {
            reject("Error from sever.")
        }
        
        

    })
}
module.exports = {
    createFilmService,
    deleteFilmService,
    getFilmsService,
    updateFilmService,
    getListTypefilmsService,
};
