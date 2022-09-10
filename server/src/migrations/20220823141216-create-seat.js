"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Seats", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            seat_number: {
                type: Sequelize.INTEGER,
            },
            occupied: {
                type: Sequelize.BOOLEAN,
            },
            moviescheduleId: {
                type: Sequelize.INTEGER,
                references: {
                    model: "movieschedules",
                    key: "id",
                },
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
        await queryInterface.dropTable("Seats");
    },
};
