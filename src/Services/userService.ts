import { CriptografarSenha } from "../Models/CriptografarSenha";
import { Usuario } from "../Models/usuario";
import { Response, Request } from "express";

class UserService {
    
    async createUsuario(req: Request, res: Response){
        const {nomeCompleto, CPF, email, senha} = req.body;
        
        try{
        
        // instancia o model de criptografia de senha e criptografa a senha
        const senhaCriptografada = await CriptografarSenha.criptografarSenha(senha);

        // cria um novo usuario
        const user = await Usuario.create({
            nomeCompleto,
            CPF,
            email,
            senha: senhaCriptografada
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


  // metodo para atualizar um usuario
  async updateUsuario(id: number, dadosAtualizados: Partial<Usuario>){
    const user = await Usuario.findByPk(id);

    if (!user){
        throw new Error('Usuario nao encontrado');
    }

    await user.update(dadosAtualizados);

    return user;
  }


  // metodo para deletar um usuario
  async deleteUsuario(id:number){
    const user = await Usuario.findByPk(id);

    if (!user){
        throw new Error('Usuario nao encontrado');
    }

    await user.destroy();

    return {message: 'Usuario deletado com sucesso'};
  }
}

// exporta uma instancia da classe UserService
export default new UserService();