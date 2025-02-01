import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/database';

export class Lojista extends Model {
    public readonly id!: number;
    public nomeCompleto!: string;
    public CNPJ!: string;
    public email!: string;
    public saldo!: number;
    public senha!: string;
    public identificador!: string;
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
        },
        identificador: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
    },
    },
    {sequelize,
        tableName: 'Lojistas',
        timestamps: false
    }
);