"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Reservation.belongsTo(models.User, { foreignKey: "userId" });
            Reservation.belongsTo(models.MovieSchedule, {
                foreignKey: "movieScheduleId",
            });
        }
    }
    Reservation.init(
        {
            movieScheduleId: DataTypes.INTEGER,
            seat_number: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Reservation",
        }
    );
    return Reservation;
};
