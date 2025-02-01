import { Lojista } from "../Models/lojista";
import { Response, Request } from "express";
import { CriptografarSenha } from "../Models/CriptografarSenha";

class LojistaService {

    async createLojista(req: Request, res: Response){
        const {nomeCompleto, CNPJ, email, senha} = req.body;

        try{

            const senhaCriptografada = await CriptografarSenha.criptografarSenha(senha);

            const lojista = await Lojista.create({
                nomeCompleto,
                CNPJ,
                email,
                senha: senhaCriptografada
            });

            return res.status(201).json(lojista);

        } catch (error: any){
            if (error.name === "SequelizeUniqueConstraintError"){
                res.status(400).json({message: 'email ou CNPJ ja cadastrado'});
            } else {
                console.error(error);
                res.status(500).json({message: "Erro interno"});
            }
        }
    }

    async getLojistaById(id: number){
        const lojista = await Lojista.findByPk(id);
        if(!lojista){
            throw new Error('Lojista nao encontrado');
        }

        return lojista;
    }
}

export default new LojistaService();