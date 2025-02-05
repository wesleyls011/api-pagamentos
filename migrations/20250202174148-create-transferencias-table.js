import { Sequelize, DataTypes } from 'sequelize';

export async function up(queryInterface, Sequelize) {
    await queryInterface.createTable('transferencias', {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        payer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payee: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pendente',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
    });
}

export async function down(queryInterface, Sequelize) {
    await queryInterface.dropTable('transferencias');
}
