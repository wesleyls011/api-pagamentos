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
const express_1 = __importDefault(require("express"));
const LojistaController_1 = __importDefault(require("../controllers/LojistaController"));
/**
 * @swagger
 * tags:
 *   - name: "Lojistas"
 */
/**
 * @swagger
 * /lojistas/create:
 *   post:
 *     tags:
 *       - Lojistas
 *     summary: Cria um novo lojista
 *     description: Cria um lojista com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeLojista:
 *                 type: string
 *               CNPJ:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               saldo:
 *                 type: number
 *             required:
 *               - nomeLojista
 *               - CNPJ
 *               - email
 *               - senha
 *               - saldo
 *     responses:
 *       201:
 *         description: Lojista criado com sucesso
 *       400:
 *         description: Dados inválidos ou falta de campos obrigatórios
 */
const router = express_1.default.Router();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield LojistaController_1.default.createLojista(req, res);
}));
/**
 * @swagger
 * /lojistas/{id}:
 *   get:
 *     tags:
 *       - Lojistas
 *     summary: Retorna os dados de um lojista
 *     description: Retorna os dados de um lojista especificado pelo identificador.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único do lojista
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lojista encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nomeLojista:
 *                   type: string
 *                 CNPJ:
 *                   type: string
 *                 email:
 *                   type: string
 *                 saldo:
 *                   type: number
 *                 id:
 *                   type: string
 *       404:
 *         description: Lojista não encontrado
 */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield LojistaController_1.default.getLojistaById(req, res);
}));
/**
 * @swagger
 * /lojistas/{id}:
 *   put:
 *     tags:
 *       - Lojistas
 *     summary: Atualiza os dados de um lojista
 *     description: Atualiza as informações de um lojista existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único do lojista
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeLojista:
 *                 type: string
 *               CNPJ:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               saldo:
 *                 type: number
 *             required:
 *               - nomeLojista
 *               - CNPJ
 *               - email
 *               - senha
 *               - saldo
 *     responses:
 *       200:
 *         description: Lojista atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou falta de campos obrigatórios
 *       404:
 *         description: Lojista não encontrado
 */
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield LojistaController_1.default.updateLojista(req, res);
}));
/**
 * @swagger
 * /lojistas/{id}:
 *   delete:
 *     tags:
 *       - Lojistas
 *     summary: Deleta um lojista
 *     description: Deleta um lojista especificado pelo identificador.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único do lojista
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lojista deletado com sucesso
 *       404:
 *         description: Lojista não encontrado
 */
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield LojistaController_1.default.deleteLojista(req, res);
}));
exports.default = router;
