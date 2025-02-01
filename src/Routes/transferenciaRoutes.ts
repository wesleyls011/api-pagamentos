import { Router } from "express";
import { transferir } from "../Controllers/transferenciaController";
import { validarTransferencia } from "../Middlewares/validarTransferencia";
import { verificarSaldo} from "../Middlewares/verificarSaldo";

const router = Router();

// difinir a rota de transferencia
router.post('/transferencia',
    //verificarSaldo,   // usando o middleware de verificar saldo
    //validarTransferencia,  // usando o middleware de validar transferencia
    async (req,res)=>{
        await transferir(req,res);
    }  // usando o controller pra fazer a transferencia
);

export default router;