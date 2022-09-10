const express = require("express");
const filmRouter = require("./filmRoute");
const movieScheduleRouter = require("./movieSchedule");
const reservationRouter = require("./reservationRoute");
const theaterRoute = require("./theaterRoute");
const { userRouter } = require("./userRouter");

const rootRouter = express.Router();
rootRouter.use("/users", userRouter);
rootRouter.use("/films", filmRouter);
rootRouter.use("/theaters", theaterRoute);
rootRouter.use("/movieSchedules", movieScheduleRouter);
rootRouter.use("/reservations", reservationRouter);
module.exports = rootRouter;
