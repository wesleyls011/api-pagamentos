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
const express_1 = require("express");
const transferenciaController_1 = require("../controllers/transferenciaController");
const validarTransferencia_1 = require("../middlewares/validarTransferencia");
const verificarSaldo_1 = require("../middlewares/verificarSaldo");
const verificarTipoUser_1 = require("../middlewares/verificarTipoUser");
const router = (0, express_1.Router)();
/**
 * @swagger
 * /transferencia/create:
 *   post:
 *     summary: Realiza uma transferência entre usuários
 *     tags: [Transferências]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - payer
 *               - payee
 *               - value
 *             properties:
 *               payer:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               payee:
 *                 type: string
 *                 format: uuid
 *                 example: "660f8400-e29b-41d4-a716-446655440111"
 *               value:
 *                 type: number
 *                 example: 100.50
 *     responses:
 *       200:
 *         description: Transferência realizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   format: uuid
 *                   example: "a1b2c3d4-e5f6-7890-ab12-34cd56ef7890"
 *                 payer:
 *                   type: string
 *                   format: uuid
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 payee:
 *                   type: string
 *                   format: uuid
 *                   example: "660f8400-e29b-41d4-a716-446655440111"
 *                 value:
 *                   type: number
 *                   example: 100.50
 *                 status:
 *                   type: string
 *                   example: "success"
 *       400:
 *         description: Dados inválidos na requisição
 *       403:
 *         description: Transferência não autorizada pelo serviço externo
 *       500:
 *         description: Erro interno no servidor
 */
/**
 * @swagger
 * /transferencia/listar:
 *   get:
 *     summary: Retorna a lista de transferências realizadas
 *     tags: [Transferências]
 *     responses:
 *       200:
 *         description: Lista de transferências obtida com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     format: uuid
 *                     example: "a1b2c3d4-e5f6-7890-ab12-34cd56ef7890"
 *                   payer:
 *                     type: string
 *                     format: uuid
 *                     example: "550e8400-e29b-41d4-a716-446655440000"
 *                   payee:
 *                     type: string
 *                     format: uuid
 *                     example: "660f8400-e29b-41d4-a716-446655440111"
 *                   value:
 *                     type: number
 *                     example: 100.50
 *                   status:
 *                     type: string
 *                     example: "success"
 *       500:
 *         description: Erro interno no servidor
 */
router.post('/create', verificarTipoUser_1.verificarTipoUser, verificarSaldo_1.verificarSaldo, // usando o middleware de verificar saldo
validarTransferencia_1.validarTransferencia, // usando o middleware de validar transferencia
(req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, transferenciaController_1.transferir)(req, res);
}));
router.get('/listar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, transferenciaController_1.listarTransferencias)(req, res);
}));
/**
 * @swagger
 * /transferencia/{id}:
 *   get:
 *     summary: Busca uma transferência por ID
 *     description: Retorna os detalhes de uma transferência específica pelo seu ID.
 *     tags:
 *       - Transferências
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da transferência
 *     responses:
 *       200:
 *         description: Transferência encontrada
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 payer:
 *                   type: string
 *                 payee:
 *                   type: string
 *                 value:
 *                   type: number
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Transferência não encontrada
 *       500:
 *         description: Erro no servidor
 */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, transferenciaController_1.buscarTransferenciaPorId)(req, res);
}));
exports.default = router;
