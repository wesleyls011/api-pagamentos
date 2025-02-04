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
const Usuario_1 = require("../models/Usuario");
const database_1 = __importDefault(require("../config/database"));
const decimal_js_1 = __importDefault(require("decimal.js"));
const Lojista_1 = require("../models/Lojista");
const Transferencia_1 = require("../models/Transferencia");
class TransferService {
    realizarTransferencia(payer, payee, value, isPayeeLojista) {
        return __awaiter(this, void 0, void 0, function* () {
            if (value <= 0) {
                throw new Error("O valor nao pode ser zero.");
            }
            const transaction = yield database_1.default.transaction(); // inicia uma transaçao
            try {
                const payerUser = yield Usuario_1.Usuario.findOne({ where: { identificador: payer.trim() }, transaction });
                let payeeUser = yield Usuario_1.Usuario.findOne({ where: { identificador: payee.trim() }, transaction });
                if (!payeeUser) {
                    payeeUser = yield Lojista_1.Lojista.findOne({ where: { identificador: payee.trim() }, transaction });
                }
                if (!payerUser || !payeeUser) {
                    throw new Error("usuario ou lojista nao encontrado");
                }
                if (payerUser.saldo < value) {
                    throw new Error("saldo insuficiente.");
                }
                const novoSaldoPayer = new decimal_js_1.default(payerUser.saldo).minus(value);
                const novoSaldoPayee = new decimal_js_1.default(payeeUser.saldo).plus(value);
                console.log("valor da transferencia:", value);
                console.log("novo saldo do payer:", novoSaldoPayer.toString());
                console.log("novo saldo do payee:", novoSaldoPayee.toString());
                yield payerUser.update({ saldo: novoSaldoPayer.toString() }, { transaction });
                yield payeeUser.update({ saldo: novoSaldoPayee.toString() }, { transaction });
                const transferencia = yield Transferencia_1.Transferencia.create({
                    payer: payerUser.identificador,
                    payee: payeeUser.identificador,
                    value: value,
                    status: "completada", // nesse ponto ela fica como completa
                }, { transaction });
                yield transaction.commit(); // confirma a transaçao
                return { message: "Transferência realizada com sucesso!" };
            }
            catch (error) {
                yield transaction.rollback(); // reverte se der erro
                throw error;
            }
        });
    }
    listarTransferencias() {
        return __awaiter(this, void 0, void 0, function* () {
            const transferencias = yield Transferencia_1.Transferencia.findAll();
            console.log("Transferências encontradas:", transferencias);
            return transferencias;
        });
    }
    buscarTransferenciaPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const transferencia = yield Transferencia_1.Transferencia.findByPk(id);
            if (!transferencia) {
                throw new Error("Transferência não encontrada");
            }
            return transferencia;
        });
    }
}
exports.default = new TransferService();
