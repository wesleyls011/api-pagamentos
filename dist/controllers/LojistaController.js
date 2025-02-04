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
const LojistaService_1 = __importDefault(require("../services/LojistaService"));
class lojistaController {
    createLojista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { nomeLojista, CNPJ, email, senha, saldo } = req.body;
                const lojista = yield LojistaService_1.default.createLojista(nomeLojista, CNPJ, email, senha, saldo);
                return res.status(201).json(lojista);
            }
            catch (error) {
                console.error('Error:', error);
                return res.status(500).json({ message: "erro ao criar lojista" });
            }
        });
    }
    getLojistaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const lojista = yield LojistaService_1.default.getLojistaById(Number(id));
                return res.status(200).json(lojista);
            }
            catch (error) {
                return res.status(404).json({ message: "lojista nao encontrado" });
            }
        });
    }
    updateLojista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const dadosAtualizados = req.body;
            try {
                const lojistaAtualizado = yield LojistaService_1.default.updateLojista(Number(id), dadosAtualizados);
                return res.status(200).json(lojistaAtualizado);
            }
            catch (error) {
                return res.status(404).json({ message: "lojista nao encontrado" });
            }
        });
    }
    deleteLojista(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const lojistaDeletado = yield LojistaService_1.default.deleteLojista(Number(id));
                return res.status(200).json(lojistaDeletado);
            }
            catch (error) {
                return res.status(404).json({ message: "lojista nao encontrado" });
            }
        });
    }
}
exports.default = new lojistaController();
