"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Theater extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Theater.hasMany(models.MovieSchedule, { foreignKey: "theaterId" });
        }
    }
    Theater.init(
        {
            name: DataTypes.STRING,
            address: DataTypes.STRING,
            logo: DataTypes.BLOB,
            city: DataTypes.STRING,
            brand: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Theater",
        }
    );
    return Theater;
};
