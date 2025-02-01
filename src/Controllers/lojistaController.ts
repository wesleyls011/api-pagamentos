import {Request, Response} from 'express';
import lojistaService from '../Services/lojistaService';

class lojistaController{

async createLojista(req: Request, res: Response){
    try{
        const lojista = await lojistaService.createLojista(req,res);
        return res.status(201).json(lojista);
    } catch(error){
        return res.status(500).json({message: "Erro ao criar lojista"})
    }
}

async getLojistaById(req: Request, res: Response){
    const {id} = req.params;

    try{
        const lojista = await lojistaService.getLojistaById(Number(id));
        return res.status(200).json(lojista);
    } catch(error){
        return res.status(404).json({message: "Lojista não encontrado"});
    }
}
}

export default new lojistaController();