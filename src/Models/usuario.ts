import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

export class Usuario extends Model {
    public readonly id!: number;
    public nomeCompleto!: string;
    public CPF!: string;
    public email!: string;
    public saldo!: number;
    public senha!: string;
}

Usuario.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        nomeCompleto: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        CPF: {
            type: DataTypes.STRING(11),
            allowNull: false,
            unique: true,
            validate: {
                len: [11, 11],
                isNumeric: true
            }
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
            allowNull: false
        },
        saldo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }
    },
    {
        sequelize,
        tableName: 'Usuarios',
        timestamps: false
    }
);