"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("MovieSchedules", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            filmId: {
                type: Sequelize.INTEGER,
                references: { model: "films", key: "id" },
            },
            theaterId: {
                type: Sequelize.INTEGER,
                references: { model: "theaters", key: "id" },
            },
            price: {
                type: Sequelize.FLOAT,
            },
            date: {
                type: Sequelize.DATE,
            },
            time: {
                type: Sequelize.TIME,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("MovieSchedules");
    },
};
