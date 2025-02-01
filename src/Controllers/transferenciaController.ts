import { Request, Response } from "express";
import { realizarTransferencia } from "../Services/transferenciaService";

export const transferir = async (req : Request, res: Response)=> {
    const { payerId, payeeId, valor, isPayeeLojista } = req.body;

    try {
        // chama o serviço de transferencia s
        const transferencia = await realizarTransferencia(payerId, payeeId, valor, isPayeeLojista);
        
        //retorna a transferencia que acabou de ser criada
        return res.status(200).json(transferencia);
        
    } catch (error: unknown) {
        if (error instanceof Error) {
        return res.status(500).json({ error: error.message });
        
    } else {
        return res.status(500).json({ error: 'Erro desconhecido' });
    }

}

}
