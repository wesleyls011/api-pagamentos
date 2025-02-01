import { CriptografarSenha } from "../Models/CriptografarSenha";
import { Usuario } from "../Models/Usuario";
import { Response, Request } from "express";

class UserService {
    
    async createUsuario(req: Request, res: Response){
        const {nomeCompleto, CPF, email, senha} = req.body;
        
        try{
        
        // instancia o model de criptografia de senha e criptografa a senha
        const criptografarSenha = new CriptografarSenha();
        await criptografarSenha.criptografarSenha(senha);

        // cria um novo usuario
        const user = await Usuario.create({
            nomeCompleto,
            CPF,
            email,
            senha: criptografarSenha.senhaCriptografada
        });
        
    // retorna o usuario criado
    return res.status(201).json(user);
    
}catch (error: any){ // trata erros de validacao que foram definidos no model
    if (error.name === "SequelizeUniqueConstraintError"){
        res.status(400).json({message: 'email ou CPF ja cadastrado'});
    } else {
        console.error(error);
        res.status(500).json({message: "Erro interno"});
    }
}
    }
    
    // metodo que retorna todos os usuarios
    async getUsuarioById(id: number){
        const user = await Usuario.findByPk(id);
    if (!user){
        throw new Error('Usuario nao encontrado');
    }

    return user;
  }
}

// exporta uma instancia da classe UserService
export default new UserService();