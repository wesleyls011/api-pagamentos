import express from 'express';
import lojistaController from '../Controllers/lojistaController';

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

const router = express.Router();

router.post("/create", async (req, res) => {
    await lojistaController.createLojista(req, res);
});

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

router.get("/:id", async (req, res) => {
    await lojistaController.getLojistaById(req, res);
});

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

router.put("/:id", async (req, res) => {
    await lojistaController.updateLojista(req, res);
});

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

router.delete("/:id", async (req, res) => {
    await lojistaController.deleteLojista(req, res);
});

export default router;