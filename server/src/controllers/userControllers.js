const {
    createUser,
    userLogin,
    getUsers,
    deleteUserService,
    updateUserService,
    getUserReservationService,
} = require("../services/userServices");
const jwt = require("jsonwebtoken");
const Register = async (req, res) => {
    try {
        const newUser = await createUser(req.body);
        const token = jwt.sign(
            {
                id: newUser.id,
                email: newUser.email,
                type: newUser.type,
                // avatar: newUser.avatar,
            },
            process.env.TOKEN_SECRET_KEY,
            {
                expiresIn: "24h",
            }
        );

        res.status(200).send({
            statusCode: 200,
            token,
            user: newUser,
        });
    } catch (e) {
        console.log(e);
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong.",
        });
    }
};

const Login = async (req, res) => {
    try {
        const user = await userLogin(req.body);
        if (user.status) {
            const token = jwt.sign(
                {
                    id: user.detail.id,
                    email: user.detail.email,
                    type: user.detail.type,
                },
                process.env.TOKEN_SECRET_KEY,
                {
                    expiresIn: "24h",
                }
            );

            return res.status(200).send({
                statusCode: 200,
                user: user.detail,
                message: "Login successfully",
                token,
            });
        } else {
            return res.status(401).send({
                statusCode: 401,
                message: "email or password is incorrect",
            });
        }
    } catch (e) {
        res.status(500).send({
            statusCode: 500,
            "message:": "Something went wrong1.",
        });
    }
};
const getAllUsers = async (req, res) => {
    try {
        const allUser = await getUsers();
        res.status(200).send({
            statusCode: 200,
            message: allUser,
        });
    } catch (e) {
        res.status(404).send({
            statusCode: 404,
            message: "Not found",
        });
    }
};
const deleteUser = async (req, res) => {
    const { id } = req.query;
    console.log(id);
    try {
        const user = await deleteUserService(id);
        res.status(200).send({
            statusCode: 200,
            message: "Successfully.",
        });
    } catch (e) {
        res.status(404).send({
            statusCode: 404,
            message: "Not found",
        });
    }
};
const auth = (req, res) => {
    res.status(200).json({
        statusCode: 200,
        user: req.user,
    });
};
const updateUser = async (req, res) => {
    try {
        const user = await updateUserService(req.body);
        res.status(200).send({
            statusCode: 200,
            message: "Successfully.",
            user,
        });
    } catch (e) {
        res.status(404).send({
            statusCode: 404,
            message: "Not found",
        });
    }
};
const getUserReservationController = async (req, res) => {
    const { userId } = req.query;
    try {
        const userReservations = await getUserReservationService(userId);
        res.status(200).json({
            statusCode: 200,
            data: userReservations,
        });
    } catch (e) {
        res.status(400).send({
            statusCode: 400,
            message: e,
        });
    }
};
module.exports = {
    Register,
    Login,
    getAllUsers,
    auth,
    deleteUser,
    updateUser,
    getUserReservationController,
};
