export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Usuarios', 'identificador', {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Usuarios', 'identificador');
  },
};
