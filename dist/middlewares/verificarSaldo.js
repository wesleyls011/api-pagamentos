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
exports.verificarSaldo = void 0;
const usuario_1 = require("../models/usuario");
const verificarSaldo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { payer, value } = req.body;
    console.log('payerId:', payer);
    try {
        // verificar se o usario existe
        const Userpayer = yield usuario_1.Usuario.findOne({ where: { identificador: payer } });
        if (!Userpayer) {
            res.status(400).json({ error: 'usuario nao encontrado' });
            return;
        }
        // ver se o saldo e suficiente
        if (Userpayer.saldo < value) {
            res.status(400).json({ error: 'saldo insuficiente' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(500).json({ error: 'erro ao verificar saldo' });
        return;
    }
});
exports.verificarSaldo = verificarSaldo;
