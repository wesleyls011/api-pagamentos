module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Lojistas', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      nomeLojista: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      CNPJ: {
        type: Sequelize.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
          len: [14, 14],
          isNumeric: true,
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      saldo: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
      },
      identificador: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Lojistas');
  },
};
