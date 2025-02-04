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
exports.verificarTipoUser = void 0;
const Lojista_1 = require("../models/Lojista");
const verificarTipoUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { payer, payee } = req.body;
    try {
        // verificar se o payer e um lojista
        const payerLojista = yield Lojista_1.Lojista.findOne({ where: { identificador: payer } });
        if (payerLojista) { // lojistas nao podem enviar transferencias
            console.log("usuario payer nao encontrado");
            res.status(400).json({ error: 'lojistas nao podem fazer transferencias' });
            return;
        }
        // verificar se o payee e um lojista
        const payeeLojista = yield Lojista_1.Lojista.findOne({ where: { identificador: payee } });
        if (payeeLojista) {
            req.body.isPayeeLojista = true; // payee e um lojista
        }
        else {
            req.body.isPayeeLojista = false; // se nao for lojista e comum
        }
        // se for valido passa para o proximo middleware
        return next();
    }
    catch (error) {
        console.error('erro ao verificar tipo de usuario:', error);
        res.status(500).json({ error: 'erro ao verificar o tipo de usuario' });
        return;
    }
});
exports.verificarTipoUser = verificarTipoUser;
