const express = require("express");
const {
    createTheaterController,
    getTheaterController,
    deleteTheaterController,
    updateTheaterController,
} = require("../controllers/theaterController");

const theaterRoute = express.Router();

theaterRoute.post("/createTheater", createTheaterController);
theaterRoute.get("/getTheater", getTheaterController);
theaterRoute.delete("/deleteTheater", deleteTheaterController);
theaterRoute.put("/updateTheater", updateTheaterController);
module.exports = theaterRoute;
