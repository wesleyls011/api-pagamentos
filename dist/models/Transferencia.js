"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Transferencia = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const usuario_1 = require("./usuario");
class Transferencia extends sequelize_1.Model {
}
exports.Transferencia = Transferencia;
Transferencia.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    payer: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        references: {
            model: usuario_1.Usuario,
            key: 'identificador'
        }
    },
    payee: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    value: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        defaultValue: "pendente",
    }
}, {
    sequelize: database_1.default,
    tableName: 'Transferencias',
    timestamps: true
});
