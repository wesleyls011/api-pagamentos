import { Router } from "express";
import { transferir } from "../controllers/TransferenciaController";
import { validarTransferencia } from "../middlewares/validarTransferencia";
import { verificarSaldo} from "../middlewares/verificarSaldo";

const router = Router();

// difinir a rota de transferencia
router.post('/transferencia',
    verificarSaldo,   // usando o middleware de verificar saldo
    validarTransferencia,  // usando o middleware de validar transferencia
    async (req,res)=>{
        await transferir(req,res);
    }  // usando o controller pra fazer a transferencia
);

export default router;