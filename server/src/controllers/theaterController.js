const {
    createTheaterService,
    getTheatreService,
    deleteTheaterService,
    updateTheaterService,
} = require("../services/theaterServices");

const createTheaterController = async (req, res) => {
    try {
        const newTheater = await createTheaterService(req.body);

        res.status(200).send({
            statusCode: 200,
            data: newTheater,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }
};
const getTheaterController = async (req, res) => {
    const { id } = req.query;
    try {
        const theatre = await getTheatreService(+id);
        res.status(200).send({
            statusCode: 200,
            data: theatre,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not Found.",
        });
    }
};
const deleteTheaterController = async (req, res) => {
    const { id } = req.query;
    try {
        const theater = await deleteTheaterService(+id);
        res.status(200).send({
            statusCode: 200,
            message: "Successfully.",
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not Found.",
        });
    }
};
const updateTheaterController = async (req, res) => {
    try {
        const theater = await updateTheaterService(req.body);
        res.status(200).send({
            statusCode: 200,
            data: theater,
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            statusCode: 404,
            "message:": "Not found.",
        });
    }
};
module.exports = {
    createTheaterController,
    getTheaterController,
    deleteTheaterController,
    updateTheaterController,
};
