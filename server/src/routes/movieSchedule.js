const express = require("express");
const {
    createScheduleController,
    getFilmScheduleController,
    getDateController,
    getFilmScheduleByIdController,
} = require("../controllers/movieScheduleController");
const validDate = require("../middlewares/convertValidDate");

const movieScheduleRouter = express.Router();

movieScheduleRouter.post(
    "/createSchedule",
    validDate,
    createScheduleController
);
movieScheduleRouter.post(
    "/getMovieSchedules",
    // validDate,
    getFilmScheduleController
);
movieScheduleRouter.get("/getDates", getDateController);
movieScheduleRouter.get("/getFilmSchedulesById", getFilmScheduleByIdController);
module.exports = movieScheduleRouter;
