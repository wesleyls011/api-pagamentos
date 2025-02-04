"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Lojista = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class Lojista extends sequelize_1.Model {
}
exports.Lojista = Lojista;
Lojista.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    nomeLojista: {
        type: sequelize_1.DataTypes.STRING(100),
        allowNull: false
    },
    CNPJ: {
        type: sequelize_1.DataTypes.STRING(14),
        allowNull: false,
        unique: true,
        validate: {
            len: [14, 14],
            isNumeric: true
        }
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    senha: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    saldo: {
        type: sequelize_1.DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0
    },
    identificador: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true
    },
}, { sequelize: database_1.default,
    tableName: 'Lojistas',
    timestamps: false,
    hooks: {
        beforeUpdate(lojista) {
            return __awaiter(this, void 0, void 0, function* () {
                lojista.senha = yield bcrypt_1.default.hash(lojista.senha, 10);
            });
        }
    }
});
