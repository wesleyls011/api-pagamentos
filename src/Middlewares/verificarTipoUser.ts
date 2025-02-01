import { Request, Response, NextFunction } from "express";
import { Usuario } from "../Models/usuario";
import { Lojista } from "../Models/lojista";

export const verificarTipoUser = async (req: Request, res: Response, next: NextFunction)=>{
    const {payerId, payeeId} = req.body;

    try{
        //verificar se o payer e um lojista
        const payerLojista = await Lojista.findByPk(payerId);
        if (payerLojista){ // lojista apenas recebe transferencia
            res.status(400).json({error: 'Lojistas nao podem fazer transferencias'});
            return;
        }  
   
        //verificar se o payee e um lojista
        const payeeLojista = await Lojista.findByPk(payeeId);
        if (payeeLojista){
            req.body.isPayeeLojista = !!payeeLojista;
        }

        // se for comum continua a transferencia
        next();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao verificar o tipo de usuario'});
        return;
    } 
}