import { Request, Response } from 'express';
import lojistaService from '../Services/lojistaService';

class lojistaController {

    async createLojista(req: Request, res: Response) {
        try {

            const { nomeLojista, CNPJ, email, senha, saldo } = req.body;

            const lojista = await lojistaService.createLojista(nomeLojista, CNPJ, email, senha, saldo);

            return res.status(201).json({message: "lojista criado com sucesso", lojista});
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: "erro ao criar lojista" })
        }
    }

    async getLojistaById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const lojista = await lojistaService.getLojistaById(Number(id));
            return res.status(200).json(lojista);
        } catch (error) {
            return res.status(404).json({ message: "lojista nao encontrado" });
        }
    }

    async updateLojista(req: Request, res: Response) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            const lojistaAtualizado = await lojistaService.updateLojista(Number(id), dadosAtualizados);
            return res.status(200).json({message:"lojista atualizado com sucesso",lojistaAtualizado});
        } catch (error) {
            return res.status(404).json({ message: "lojista nao encontrado" });
        }

    }

    async deleteLojista(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const lojistaDeletado = await lojistaService.deleteLojista(Number(id));
            return res.status(200).json({message: "lojista deletado com sucesso",lojistaDeletado});
        } catch (error) {
            return res.status(404).json({ message: "lojista nao encontrado" });
        }
    }
}
export default new lojistaController();