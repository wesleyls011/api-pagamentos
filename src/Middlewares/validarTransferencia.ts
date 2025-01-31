import { Request, Response, NextFunction } from "express";

export const validarTransferencia = async (req: Request, res: Response, next: NextFunction) => {
    const { payerId, payeeId, valor } = req.body;
    
    if (!payerId || !payeeId || !valor || valor <=0){
        res.status(400).json({error: 'Dados invalidos para transferencia'});
        return;
    } 

    next();

}