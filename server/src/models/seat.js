"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Seat extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Seat.belongsTo(models.MovieSchedule, {
                foreignKey: "moviescheduleId",
            });
        }
    }
    Seat.init(
        {
            seat_number: DataTypes.INTEGER,
            occupied: DataTypes.BOOLEAN,
            moviescheduleId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "Seat",
        }
    );
    return Seat;
};
