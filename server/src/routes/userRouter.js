const express = require("express");
const {
    Register,
    Login,
    getAllUsers,
    auth,
    deleteUser,
    updateUser,
    getUserReservationController,
} = require("../controllers/userControllers");
const { verifyToken } = require("../middlewares/authenticate");
const { converToBase64 } = require("../middlewares/convertToBase64");
const {
    isExistEmail,
    isEmpty,
    isValidPhone,
} = require("../middlewares/userHandlers");

const userRouter = express.Router();

userRouter.post("/register", isValidPhone, isExistEmail, Register);
userRouter.get("/getAllUsers", getAllUsers);
userRouter.post("/login", isEmpty, Login);
userRouter.get("/verify-token", verifyToken, converToBase64, auth);
userRouter.delete("/deleteUser", deleteUser);
userRouter.put("/updateUser", updateUser);
userRouter.get("/getUserReservations", getUserReservationController);
module.exports = {
    userRouter,
};
