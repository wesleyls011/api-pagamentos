import { Sequelize, DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('Lojistas', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        nomeLojista: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        CNPJ: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
            validate: {
                len: [14, 14],
                isNumeric: true,
            },
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        saldo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0,
        },
        identificador: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.fn('NOW'),
        },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Lojistas');
}
