import { Request, Response, NextFunction } from "express";
import { Lojista } from "../models/lojista";

export const verificarTipoUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { payer, payee } = req.body;

    try {
        // verificar se o payer e um lojista
        const payerLojista = await Lojista.findOne({where: {identificador: payer}});
        if (payerLojista) { // lojistas nao podem enviar transferencias
            console.log("usuario payer nao encontrado");
            res.status(400).json({ error: 'lojistas nao podem fazer transferencias' });
            return;
        }

        // verificar se o payee e um lojista
        const payeeLojista = await Lojista.findOne({where: {identificador: payee}});
        if (payeeLojista) {
            req.body.isPayeeLojista = true;  // payee e um lojista
        } else {
            req.body.isPayeeLojista = false;  // se nao for lojista e comum
        }

        // se for valido passa para o proximo middleware
        return next();

    } catch (error) {
        console.error('erro ao verificar tipo de usuario:', error);
        res.status(500).json({ error: 'erro ao verificar o tipo de usuario' });
        return;
    }
};
