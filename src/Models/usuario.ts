import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

export class Usuario extends Model {
    public id!: number;
    public nomeCompleto!: string;
    public CPF!: string;
    public email!: string;
    public senha!: string;

    public async setSenha(senha: string): Promise<void>{
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(senha, salt);
    }

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
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false
        },
    },
    {
        sequelize,
        tableName: 'Usuarios',
    }
);