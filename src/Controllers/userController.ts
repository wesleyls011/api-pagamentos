import { Request, Response } from 'express';
import userService from "../services/UserService";

class userController {

    async createUser(req: Request, res: Response) {
        try {
            
            const { nomeCompleto, CPF, email, senha, saldo } = req.body;

            const user = await userService.createUsuario(nomeCompleto, CPF, email, senha, saldo);

            return res.status(201).json(user);
        } catch (error) {
            console.error('Error:', error);
            return res.status(500).json({ message: "erro ao criar o usuario" });
        }
    }

    async getUserById(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const user = await userService.getUsuarioById(Number(id));
            return res.status(200).json(user);
        } catch (error) {
            return res.status(404).json({ message: "usuario nao encontrado" });
        }
    }

    async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const dadosAtualizados = req.body;

        try {
            const userAtualizado = await userService.updateUsuario(Number(id), dadosAtualizados);
            return res.status(200).json(userAtualizado);
        } catch (error) {
            return res.status(404).json({ message: "usuario nao encontrado" });
        }
    }

    async deleteUser(req: Request, res: Response) {
        const { id } = req.params;

        try {
            const userDeletado = await userService.deleteUsuario(Number(id));
            return res.status(200).json(userDeletado);
        } catch (error) {
            return res.status(404).json({ message: "usuario nao encontrado" });
        }
    }
}

export default new userController();
