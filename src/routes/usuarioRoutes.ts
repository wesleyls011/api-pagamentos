import express from 'express';
import userController from '../controllers/UserController';

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

const router = express.Router();

router.post("/create", async (req, res) => {
    await userController.createUser(req, res);
});

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

router.get("/:id", async (req, res) => {
    await userController.getUserById(req, res);
});

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

router.put("/:id", async (req, res) => {
    await userController.updateUser(req, res);
});

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

router.delete("/:id", async (req, res) => {
    await userController.deleteUser(req, res);
});

export default router;
