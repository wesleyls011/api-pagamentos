import { Request, Response } from "express";
import realizarTransferencia from "../Services/transferenciaService";
import transferenciaService from "../Services/transferenciaService";

export const transferir = async (req : Request, res: Response)=> {
    const { payer, payee, value, isPayeeLojista } = req.body;
    console.log("Corpo da requisição:", req.body);


    try {
        // chama o serviço de transferencia s
        const transferencia = await transferenciaService.realizarTransferencia(payer, payee, value);
        
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
