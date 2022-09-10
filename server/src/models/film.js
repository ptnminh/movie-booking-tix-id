"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Film extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Film.hasMany(models.MovieSchedule, { foreignKey: "filmId" });
        }
    }
    Film.init(
        {
            name: DataTypes.STRING,
            desc: DataTypes.TEXT,
            genres: DataTypes.STRING,
            director: DataTypes.STRING,
            duration: DataTypes.TIME,
            poster_film: DataTypes.BLOB,
            type: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Film",
        }
    );
    return Film;
};
