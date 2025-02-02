import { Router } from "express";
import { transferir } from "../controllers/TransferenciaController";
import { validarTransferencia } from "../middlewares/validarTransferencia";
import { verificarSaldo} from "../middlewares/verificarSaldo";
import { verificarTipoUser } from "../middlewares/verificarTipoUser";

/**
 * @swagger
 * /api/transferencia:
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

const router = Router();

// difinir a rota de transferencia
router.post('/transferencia',
    verificarTipoUser,
    verificarSaldo,   // usando o middleware de verificar saldo
    validarTransferencia,  // usando o middleware de validar transferencia
    async (req,res)=>{
        await transferir(req,res);
    }  // usando o controller pra fazer a transferencia
);

export default router;