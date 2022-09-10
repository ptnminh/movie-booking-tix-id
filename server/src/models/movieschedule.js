"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class MovieSchedule extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            MovieSchedule.hasMany(models.Seat, {
                foreignKey: "moviescheduleId",
            });
            MovieSchedule.belongsTo(models.Film, {
                foreignKey: "filmId",
                constraints: false,
            });
            MovieSchedule.belongsTo(models.Theater, {
                foreignKey: "theaterId",
                constraints: false,
            });
            MovieSchedule.hasMany(models.Reservation, {
                foreignKey: "movieScheduleId",
            });
        }
    }
    MovieSchedule.init(
        {
            filmId: DataTypes.INTEGER,
            theaterId: DataTypes.INTEGER,
            price: DataTypes.FLOAT,
            date: DataTypes.DATE,
            time: DataTypes.TIME,
        },
        {
            sequelize,
            modelName: "MovieSchedule",
        }
    );
    return MovieSchedule;
};
