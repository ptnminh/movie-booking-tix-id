const moment = require("moment");

const movieScheduleInTheater = (data) => {
    let obj = [];

    data.forEach((element, index) => {
        let time;
        time = [
            {
                price: element.price,
                time: element.time,
                scheduleId: element.id,
            },
        ];

        let tmp = {
            filmId: element.filmId,
            theaterId: element.theaterId,
            name: element.Theater.name,
            brand: element.Theater.brand,
            times: time,
        };
        if (index === 0) {
            obj.push(tmp);
        }
        let f;

        f = obj.every((d) => d.theaterId !== element.theaterId);

        if (f) {
            obj.push(tmp);
        }
        obj.forEach((d) => {
            if (
                element.filmId === d.filmId &&
                element.theaterId === d.theaterId
            ) {
                let flag = d.times.every((time) => time.time !== element.time);
                if (flag) {
                    time = {
                        price: element.price,
                        time: element.time,
                        scheduleId: element.id,
                    };

                    d.times.push(time);
                }
            }
        });
    });
    obj.forEach((e) => {
        e.times.sort((a, b) =>
            a.time > b.time ? 1 : a.time < b.time ? -1 : 0
        );
        e.times.forEach((time) => {
            //console.log(time.time);
            time.time = moment(time.time, "hh:mm:ss").format("hh:mm A");
        });
    });
    return obj;
};
const letter = ["A", "B", "C", "D", "E", "F", "G", "H"];

const decodeSeat = (seats) => {
    let count = 0;
    let idx = 0;
    let newSeats = [];
    seats.forEach((seat) => {
        count = 0;
        idx = 0;
        Array(160)
            .fill(0)
            .forEach((s, index) => {
                count += 1;
                if (count === 21) {
                    count = 0;
                    idx += 1;
                }
                if (index === seat - 1) {
                    newSeats.push(`${letter[idx]}${count}`);
                }
            });
    });

    return newSeats;
};
const mergeSeats = (data, seats) => {
    const newData = data.map((d) => {
        let newSeats = [];
        seats.forEach((seat) => {
            if (seat.movieScheduleId === d.movieScheduleId) {
                newSeats.push(seat.seat_number);
            }
        });
        newSeats = decodeSeat(newSeats);
        return { ...d, seats: newSeats };
    });
    return newData;
};

module.exports = {
    movieScheduleInTheater,
    mergeSeats,
    decodeSeat,
};
