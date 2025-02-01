module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Transferencias', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      valor: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
      },
      payerId: {
        type: Sequelize.STRING, // Para usar UUID, altere para STRING, se for UUID use UUID
        references: {
          model: 'Usuarios',
          key: 'identificador',
        },
      },
      receiverId: {
        type: Sequelize.STRING, // Para usar UUID, altere para STRING, se for UUID use UUID
        references: {
          model: 'Lojistas',
          key: 'identificador',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Transferencias');
  },
};
