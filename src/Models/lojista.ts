import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/database';
import { CriptografarSenha } from './CriptografarSenha';

export class Lojista extends CriptografarSenha {
    public readonly id!: number;
    public nomeCompleto!: string;
    public CPF!: string;
    public email!: string;
}

Lojista.init(
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
                isEmail: true
            }
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },

    {sequelize,
        tableName: 'Lojistas',
        timestamps: false
    }
);