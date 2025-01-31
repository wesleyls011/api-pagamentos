import { Request, Response } from "express";
import { realizarTransferencia } from "../Services/transferenciaService";

export const transferir = async (req : Request, res: Response): Promise<void> => {
    const { payerId, payeeId, valor, isPayeeLojista } = req.body;

    try {
        // chama o serviço de transferencia s
        const transferencia = await realizarTransferencia(payerId, payeeId, valor, isPayeeLojista);
        
        //retorna a transferencia que acabou de ser criada
        res.status(200).json(transferencia);
        return;
    } catch (error: unknown) {
        if (error instanceof Error) {
        res.status(500).json({ error: error.message });
        return;
    } else {
        res.status(500).json({ error: 'Erro desconhecido' });
        return;
    }

}

}
