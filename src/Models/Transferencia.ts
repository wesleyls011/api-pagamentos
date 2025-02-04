import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/database';
import { Usuario } from './usuario';
import { Lojista } from './lojista';

export class Transferencia extends Model {
    public readonly id!: number;
    public payer!: string;
    public payee!: string;
    public valor!: number;
    public status!: string;
    public createdAt!: Date;
    public updatedAt!: Date;
}

Transferencia.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
        },
        payer: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'identificador'
            }
        },
        payee: {
            type: DataTypes.STRING,
            allowNull:false
        },
        value: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "pendente",
        }
    },

    {
        sequelize,
        tableName: 'Transferencias',
        timestamps: true
    }

    
);
