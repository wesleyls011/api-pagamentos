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
const userService_1 = __importDefault(require("../services/userService"));
class userController {
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nomeCompleto, CPF, email, senha, saldo } = req.body;
                const user = yield userService_1.default.createUsuario(nomeCompleto, CPF, email, senha, saldo);
                return res.status(201).json(user);
            }
            catch (error) {
                console.error('Error:', error);
                return res.status(500).json({ message: "erro ao criar o usuario" });
            }
        });
    }
    getUserById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield userService_1.default.getUsuarioById(Number(id));
                return res.status(200).json(user);
            }
            catch (error) {
                return res.status(404).json({ message: "usuario nao encontrado" });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dadosAtualizados = req.body;
            try {
                const userAtualizado = yield userService_1.default.updateUsuario(Number(id), dadosAtualizados);
                return res.status(200).json(userAtualizado);
            }
            catch (error) {
                return res.status(404).json({ message: "usuario nao encontrado" });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const userDeletado = yield userService_1.default.deleteUsuario(Number(id));
                return res.status(200).json(userDeletado);
            }
            catch (error) {
                return res.status(404).json({ message: "usuario nao encontrado" });
            }
        });
    }
}
exports.default = new userController();
