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
exports.buscarTransferenciaPorId = exports.listarTransferencias = exports.transferir = void 0;
const TransferenciaService_1 = __importDefault(require("../services/TransferenciaService"));
const AutorizacaoService_1 = require("../services/AutorizacaoService");
const transferir = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { payer, payee, value } = req.body;
    const isPayeeLojista = req.body.isPayeeLojista;
    console.log("corpo da requisiçao:", req.body);
    try {
        const isAuthorized = yield (0, AutorizacaoService_1.autorizarTransferencia)();
        if (!isAuthorized) {
            return res.status(403).json({ message: "transferencia nao autorizada" });
        }
        // chama o serviço de transferencia se for autorizado
        console.log("id do payee:", payee);
        const transferencia = yield TransferenciaService_1.default.realizarTransferencia(payer, payee, value, isPayeeLojista);
        //retorna a transferencia que acabou de ser criada
        return res.status(200).json(transferencia);
    }
    catch (error) {
        console.error("erro ao realizar transferencia", error);
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
        }
        else {
            return res.status(500).json({ error: 'Erro desconhecido' });
        }
    }
});
exports.transferir = transferir;
const listarTransferencias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const transferencias = yield TransferenciaService_1.default.listarTransferencias();
        return res.status(200).json(transferencias);
    }
    catch (error) {
        console.error("Erro ao listar transferências", error);
        return res.status(500).json({ error: "Erro ao buscar transferências" });
    }
});
exports.listarTransferencias = listarTransferencias;
const buscarTransferenciaPorId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const transferencia = yield TransferenciaService_1.default.buscarTransferenciaPorId(id);
        if (!transferencia) {
            return res.status(404).json({ message: "Transferência não encontrada" });
        }
        return res.status(200).json(transferencia);
    }
    catch (error) {
        console.error("Erro ao buscar transferencia:", error);
        return res.status(500).json({ error: "Erro ao buscar transferencia" });
    }
});
exports.buscarTransferenciaPorId = buscarTransferenciaPorId;
