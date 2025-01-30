import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/database';
import { CriptografarSenha } from './CriptografarSenha';

export class Lojista extends CriptografarSenha {
    public readonly id!: number;
    public nomeCompleto!: string;
    public CNPJ!: string;
    public email!: string;
    public saldo!: number;
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
        CNPJ: {
            type: DataTypes.STRING(14),
            allowNull: false,
            unique: true,
            validate: {
                len: [14, 14],
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
        saldo: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 0
        }
    },

    {sequelize,
        tableName: 'Lojistas',
        timestamps: false
    }
);