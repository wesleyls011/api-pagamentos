import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcrypt';

export class Lojista extends Model{
    public readonly id!: string;
    public nomeCompleto!: string;
    public CPF!: string;
    public email!: string;
    private senha!: string;

    public async setSenha(senha: string): Promise<void>{
        const salt = await bcrypt.genSalt(10);
        this.senha = await bcrypt.hash(senha, salt);
    }

    public async compararSenha(senha: string): Promise<boolean>{
        return bcrypt.compare(senha, this.senha);
    }

}

Lojista.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nomeCompleto: {
            type: DataTypes.STRING,
            allowNull: false
        },
        CPF: {
            type: DataTypes.STRING,
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
)