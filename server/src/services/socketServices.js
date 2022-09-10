class SocketServices {
    //connection socket
    connection(socket) {
        // event on here
        let roomId = 0;
        socket.on("joinMovieSchedule", (room) => {
            try {
                console.log("[socket]", "join room :", room);
                socket.join(room);
                roomId = room;
                _io.to(room).emit("joined", room);
            } catch (e) {
                console.log("[error]", "join room :", e);
                _io.emit("error", "couldnt perform requested action");
            }
        });
        socket.on("bookingSeats", (seats) => {
            _io.to(roomId).emit("renderSeat", seats);
        });
        socket.on("leaveMovieSchedule", (room) => {
            try {
                console.log("[socket]", "leave room :", room);
                socket.leave(room);
            } catch (e) {
                console.log("[error]", "leave room :", e);
                _io.emit("error", "couldnt perform requested action");
            }
        });
        socket.on("disconnect", () => {
            console.log(`User disconnect id is ${socket.id}`);
        });
    }
}

module.exports = new SocketServices();
