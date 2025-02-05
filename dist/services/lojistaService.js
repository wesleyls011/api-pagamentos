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
Object.defineProperty(exports, "__esModule", { value: true });
const lojista_1 = require("../models/lojista");
const CriptografarSenha_1 = require("../models/CriptografarSenha");
const uuid_1 = require("uuid");
class LojistaService {
    createLojista(nomeLojista, CNPJ, email, senha, saldo) {
        return __awaiter(this, void 0, void 0, function* () {
            const saldoInicial = saldo || 0;
            try {
                const identificador = (0, uuid_1.v4)();
                const senhaCriptografada = yield CriptografarSenha_1.CriptografarSenha.criptografarSenha(senha);
                const lojista = yield lojista_1.Lojista.create({
                    nomeLojista,
                    CNPJ,
                    email,
                    senha: senhaCriptografada,
                    saldo: saldoInicial,
                    identificador
                });
                return lojista;
            }
            catch (error) {
                if (error.name === "SequelizeUniqueConstraintError") {
                    throw new Error('email ou CNPJ ja cadastrado');
                }
                else {
                    console.error(error);
                    throw new Error('Erro interno ao criar o lojista');
                }
            }
        });
    }
    getLojistaById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lojista = yield lojista_1.Lojista.findByPk(id);
            if (!lojista) {
                throw new Error('Lojista nao encontrado');
            }
            return lojista;
        });
    }
    updateLojista(id, dadosAtualizados) {
        return __awaiter(this, void 0, void 0, function* () {
            const lojista = yield lojista_1.Lojista.findByPk(id);
            if (!lojista) {
                throw new Error('Lojista nao encontrado');
            }
            yield lojista.update(dadosAtualizados);
            return lojista;
        });
    }
    deleteLojista(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const lojista = yield lojista_1.Lojista.findByPk(id);
            if (!lojista) {
                throw new Error('Lojista nao encontrado');
            }
            yield lojista.destroy();
            return lojista;
        });
    }
}
exports.default = new LojistaService();
