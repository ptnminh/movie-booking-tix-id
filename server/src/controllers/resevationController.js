const {
    getSeatsMovieScheduleService,
    reservationSeatsService,
} = require("../services/resevationService");

const getSeatsMovieScheduleController = async (req, res) => {
    const { id } = req.query;

    try {
        const seats = await getSeatsMovieScheduleService(id);
        res.status(200).send({
            statusCode: 200,
            data: seats,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: e,
        });
    }
};
const reservationSeatsController = async (req, res) => {
    const data = req.body;

    try {
        const reservations = await reservationSeatsService(data);

        res.status(200).send({
            statusCode: 200,
            data: reservations,
        });
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            message: e,
        });
    }
};
module.exports = {
    getSeatsMovieScheduleController,
    reservationSeatsController,
};
