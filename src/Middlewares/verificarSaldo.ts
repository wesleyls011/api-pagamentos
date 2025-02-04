import { Request, Response, NextFunction } from "express";
import { Usuario } from "../models/usuario";


export const verificarSaldo = async (req: Request, res: Response, next: NextFunction): Promise<void>=>  {
    const { payer, value } = req.body;

    console.log('payerId:', payer);

    try{
        // verificar se o usario existe
        const Userpayer = await Usuario.findOne({where: {identificador: payer}});
        if (!Userpayer) {
            res.status(400).json({error: 'usuario nao encontrado'});
            return;
        }

        // ver se o saldo e suficiente
        if (Userpayer.saldo < value) {
            res.status(400).json({error: 'saldo insuficiente'});
            return;
        }

        next();
    } catch (error) {
        res.status(500).json({error: 'erro ao verificar saldo'});
        return;
    }
}