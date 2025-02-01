import {Request, Response} from 'express';
import userService from "../Services/userService";

class userController{

    async createUser(req: Request, res: Response){
        try{
            const user = await userService.createUsuario(req,res);
            return res.status(201).json(user);
        } catch(error){
            return res.status(500).json({message: "Erro ao criara usuario"});
        }
    }

    async getUserById(req: Request, res: Response){
        const {id} = req.params;

        try{
            const user = await userService.getUsuarioById(Number(id));
            return res.status(200).json(user);
        } catch(error){
            return res.status(404).json({message: "Usuario nao encontrado"});
        }
}
}

export default new userController();