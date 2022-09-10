const {
    createMovieScheduleService,
    getMovieScheduleService,
    getDateService,
    getFilmScheduleByIdService,
} = require("../services/movieScheduleServices");
const moment = require("moment");
const createScheduleController = async (req, res) => {
    try {
        const movieSchedule = await createMovieScheduleService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: movieSchedule,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }
};
const getFilmScheduleController = async (req, res) => {
    const { filmId, city, brand } = req.query;

    const date = req.body.date;
    try {
        const getFilmDetail = await getMovieScheduleService(
            filmId,
            city,
            brand,
            date
        );
        res.status(200).send({
            statusCode: 200,
            data: getFilmDetail,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            message: e,
        });
    }
};
const getFilmScheduleByIdController = async (req, res) => {
    const { id } = req.query;
    try {
        let detail = await getFilmScheduleByIdService(id);
        detail.time = moment(detail.time, "hh:mm:ss").format("hh:mm A");
        res.status(200).send({
            statusCode: 200,
            data: detail,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            message: e,
        });
    }
};
const getDateController = async (req, res) => {
    try {
        const getDate = await getDateService();
        res.status(200).send({
            statusCode: 200,
            data: getDate,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            message: e,
        });
    }
};
module.exports = {
    createScheduleController,
    getFilmScheduleController,
    getDateController,
    getFilmScheduleByIdController,
};
