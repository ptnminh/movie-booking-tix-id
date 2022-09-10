const moment = require("moment");

const validDate = (req, res, next) => {
    if (req.body) {
        if (req.body.length !== 0) {
            for (let i of req.body) {
                if (i.date) {
                    i.date = moment(i.date, "DD-MM-YYYY");
                }
            }
        } else {
            let { date } = req.body;
            date = moment(date, "DD-MM-YYYY");
        }
    }
    next();
};

module.exports = validDate;
