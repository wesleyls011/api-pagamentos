import { Request, Response, NextFunction } from "express";
import { Usuario } from "../Models/Usuario";


export const verificarSaldo = async (req: Request, res: Response, next: NextFunction): Promise<void> =>  {
    const { payerId, valor } = req.body;

    try{
        // verificar se o usario existe
        const payer = await Usuario.findByPk(payerId);
        if (!payer) {
            res.status(404).json({error: 'Usuario nao encontrado'});
            return;
        }
        // ver se o saldo e suficiente
        if (payer.saldo < valor) {
            res.status(400).json({error: 'Saldo insuficiente'});
            return;
        }

        next();

    } catch (error) {
        res.status(500).json({error: 'Erro ao verificar saldo'});
        return;
    }
}