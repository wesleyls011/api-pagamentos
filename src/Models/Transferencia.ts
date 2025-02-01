import {Model, DataTypes} from 'sequelize';
import sequelize from '../config/database';
import { Usuario } from './usuario';
import { Lojista } from './lojista';

export class Transferencia extends Model {
    public readonly id!: number;
    public valor!: number;
    public data!: Date;
    public usuarioId!: number;
    public lojistaId!: number;
    public status!: string;
}

Transferencia.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        valor: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0
            }
        },
        data: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        usuarioId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Usuario,
                key: 'id'
            }
        },
        lojistaId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            references: {
                model: Lojista,
                key: 'id'
            }
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [['concluida', 'pendente', 'cancelada']]
            }
        }
    },

    {
        sequelize,
        tableName: 'Transferencias',
        timestamps: true
    }

    
);

Transferencia.belongsTo(Usuario, {foreignKey: 'usuarioId', onDelete: 'CASCADE'});
Transferencia.belongsTo(Lojista, {foreignKey: 'lojistaId', onDelete: 'CASCADE'});

Usuario.hasMany(Transferencia, {foreignKey: 'usuarioId'});
Lojista.hasMany(Transferencia, {foreignKey: 'lojistaId'});