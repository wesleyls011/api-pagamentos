import { Request, Response, NextFunction } from "express";

export const validarTransferencia = async (req: Request, res: Response, next: NextFunction) => {
    const { payer, payee, value } = req.body;
    
    if (!payer || !payee || !value || value <=0){
        res.status(400).json({error: 'Dados invalidos para transferencia'});
        return;
    } 

    next();

}