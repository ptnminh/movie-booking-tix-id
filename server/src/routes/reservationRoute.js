const express = require("express");
const {
    getSeatsMovieScheduleController,
    reservationSeatsController,
} = require("../controllers/resevationController");

const reservationRouter = express.Router();

reservationRouter.get("/getSeats", getSeatsMovieScheduleController);
reservationRouter.put("/updateSeats", reservationSeatsController);
module.exports = reservationRouter;
