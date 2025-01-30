import { Request, Response, NextFunction } from "express";
import { Usuario } from "../Models/Usuario";


export const verificarSaldo = async (req: Request, res: Response, next: NextFunction) => {
    const { payerId, valor } = req.body;

    try{
        // verificar se o usario existe
        const payer = await Usuario.findByPk(payerId);
        if (!payer) {
            return res.status(404).json({error: 'Usuario nao encontrado'});
        }
        // ver se o saldo e suficiente
        if (payer.saldo < valor) {
            return res.status(400).json({error: 'Saldo insuficiente'});
        }

        next();
    } catch (error) {
        return res.status(500).json({error: 'Erro ao verificar saldo'});
    }
}