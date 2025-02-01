import { Request, Response } from "express";
import transferenciaService from "../services/TransferenciaService";

export const transferir = async (req : Request, res: Response)=> {
    const { payer, payee, value } = req.body;
    console.log("Corpo da requisição:", req.body);


    try {
        // chama o serviço de transferencia s
        console.log("id do payee:", payee);
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
