import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

export class Usuario extends Model {
    public readonly id!: number;
    public nomeCompleto!: string;
    public CPF!: string;
    public email!: string;
    public saldo!: number;
    public senha!: string;
    public identificador!: string;
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
                len: {
                    args: [11, 11],
                    msg: "O CPF deve ter exatamente 11 dígitos.",
                },
                isNumeric: {
                    msg: "O CPF deve conter apenas números.",
                }
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "O e-mail informado é inválido.",
                },
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
        },
        identificador: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
    },
    {
        sequelize,
        tableName: 'Usuarios',
        timestamps: false,
        hooks: {
            async beforeUpdate(Usuario) {
                if (Usuario.changed('senha')) {
                    Usuario.senha = await bcrypt.hash(Usuario.senha, 10);
                }
            }
        }
    }
);