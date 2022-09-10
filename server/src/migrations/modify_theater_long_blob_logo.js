'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
     return Promise.all([
      
      queryInterface.changeColumn(
        'Theaters',
        'logo',
        {
          type: Sequelize.BLOB('long'),
          
        },
      ),
      
    ]);
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     return Promise.all([
      queryInterface.changeColumn('Theaters', 'logo',{
        type: Sequelize.BLOB,
      }),
     
    ]);
  }
};
