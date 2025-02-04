import { Request, Response } from "express";
import transferenciaService from "../services/transferenciaService";
import { autorizarTransferencia } from "../services/AutorizacaoService";

export const transferir = async (req : Request, res: Response)=> {
    const { payer, payee, value } = req.body;
    const isPayeeLojista = req.body.isPayeeLojista;
    console.log("corpo da requisiçao:", req.body);

    try{
        const isAuthorized = await autorizarTransferencia();
        if(!isAuthorized){
            return res.status(403).json({message: "transferencia nao autorizada"});
        }
    
        // chama o serviço de transferencia se for autorizado
        console.log("id do payee:", payee);
        const transferencia = await transferenciaService.realizarTransferencia(payer, payee, value, isPayeeLojista);
        
        //retorna a transferencia que acabou de ser criada
        return res.status(200).json(transferencia);
        
    } catch (error: unknown) {
        console.error("erro ao realizar transferencia", error);
        if (error instanceof Error) {
            return res.status(500).json({ error: error.message });
            
        } else {
            return res.status(500).json({ error: 'Erro desconhecido' });
        }
        
    }
}

export const listarTransferencias = async (req: Request, res: Response) => {
    try {
        const transferencias = await transferenciaService.listarTransferencias();
        return res.status(200).json(transferencias);
    } catch (error: unknown) {
        console.error("Erro ao listar transferências", error);
        return res.status(500).json({ error: "Erro ao buscar transferências" });
    }
}

export const buscarTransferenciaPorId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const transferencia = await transferenciaService.buscarTransferenciaPorId(id);

        if (!transferencia) {
            return res.status(404).json({ message: "Transferência não encontrada" });
        }

        return res.status(200).json(transferencia);
    } catch (error: unknown) {
        console.error("Erro ao buscar transferencia:", error);
        return res.status(500).json({ error: "Erro ao buscar transferencia" });
    }
};

