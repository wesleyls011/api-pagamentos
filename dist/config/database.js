"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging: false,
    timezone: '-03:00',
    dialectOptions: {
        timezone: 'local',
    }
});
sequelize.authenticate()
    .then(() => {
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
})
    .catch((error) => {
    console.error('Não foi possível conectar ao banco de dados:', error);
});
exports.default = sequelize;
