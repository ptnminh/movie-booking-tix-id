const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const rootRouter = require("./routes/index");
const sequelize = require("./config/connectDatabse");
require("dotenv").config();
let cors = require("cors");
const app = express();
const { createServer } = require("http");
const server = createServer(app);
const socketIo = require("socket.io");
const socketServices = require("./services/socketServices");
const io = socketIo(server, { cors: { origin: "*" } });
app.use(cors());

global._io = io;

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

const publicPath = path.join(__dirname, "./public");
app.use("/public", express.static(publicPath));
app.use("/api/v1", rootRouter);

app.get("/", (req, res) => {
    res.send("From ptnm with love!");
});
global._io.on("connection", socketServices.connection);
const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log("Server is running in port: ", PORT);
    try {
        sequelize.authenticate();
        console.log("Connect sucessfully");
    } catch (e) {
        console.log("Connect fail.");
    }
});
