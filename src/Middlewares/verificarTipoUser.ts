import { Request, Response, NextFunction } from "express";
import { Usuario } from "../Models/Usuario";
import { Lojista } from "../Models/Lojista";
import { error } from "console";

export const verificarTipoUser = async (req: Request, res: Response, next: NextFunction)=>{
    const {payerId, payeeId} = req.body;

    try{
        //verificar se o payer e um lojista
        const payerLojista = await Lojista.findByPk(payerId);
        if (payerLojista){ // lojista apenas recebe transferencia
            return res.status(400).json({error: 'Lojistas nao podem fazer transferencias'});
        }  
   
        //verificar se o payee e um lojista
        const payeeLojista = await Lojista.findByPk(payeeId);
        if (payeeLojista){
            req.body.isPayeeLojista = true;
        } else {
            req.body.isPayeeLojista = false;
        }

        // se for comum continua a transferencia
        next();
    } catch (error) {
        return res.status(500).json({ error: 'Erro ao verificar o tipo de usuario'});
    } 
}