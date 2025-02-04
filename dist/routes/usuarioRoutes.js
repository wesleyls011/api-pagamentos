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
const UserController_1 = __importDefault(require("../controllers/UserController"));
/**
 * @swagger
 * tags:
 *   - name: "Usuários"
 */
/**
 * @swagger
 * /usuarios/create:
 *   post:
 *     tags:
 *       - Usuários
 *     summary: Cria um novo usuário
 *     description: Cria um usuário com os dados fornecidos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nomeCompleto:
 *                 type: string
 *               CPF:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               saldo:
 *                 type: number
 *             required:
 *               - nomeCompleto
 *               - CPF
 *               - email
 *               - senha
 *               - saldo
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados inválidos ou falta de campos obrigatórios
 */
const router = express_1.default.Router();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserController_1.default.createUser(req, res);
}));
/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuários
 *     summary: Retorna os dados de um usuário
 *     description: Retorna os dados de um usuário especificado pelo identificador.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único do usuário
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 nomeCompleto:
 *                   type: string
 *                 CPF:
 *                   type: string
 *                 email:
 *                   type: string
 *                 saldo:
 *                   type: number
 *                 id:
 *                   type: string
 *       404:
 *         description: Usuário não encontrado
 */
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserController_1.default.getUserById(req, res);
}));
/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     tags:
 *       - Usuários
 *     summary: Atualiza os dados de um usuário
 *     description: Atualiza as informações de um usuário existente.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único do usuário
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
 *               nomeCompleto:
 *                 type: string
 *               CPF:
 *                 type: string
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               saldo:
 *                 type: number
 *             required:
 *               - nomeCompleto
 *               - CPF
 *               - email
 *               - senha
 *               - saldo
 *     responses:
 *       200:
 *         description: Usuário atualizado com sucesso
 *       400:
 *         description: Dados inválidos ou falta de campos obrigatórios
 *       404:
 *         description: Usuário não encontrado
 */
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserController_1.default.updateUser(req, res);
}));
/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuários
 *     summary: Deleta um usuário
 *     description: Deleta um usuário especificado pelo identificador.
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Identificador único do usuário
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuário deletado com sucesso
 *       404:
 *         description: Usuário não encontrado
 */
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield UserController_1.default.deleteUser(req, res);
}));
exports.default = router;
