import { CriptografarSenha } from "../Models/CriptografarSenha";
import { Usuario } from "../Models/usuario";
import { v4 as uuidv4 } from 'uuid';

class UserService {

    // Método para criar um usuário
    async createUsuario(nomeCompleto: string, CPF: string, email: string, senha: string, saldo: number) {
        const saldoInicial = saldo || 0; // usa o saldo da requisiçao ou 0 como valor padrao
        
        try {
            // cria um identificador unico para o usuário
            const identificador = uuidv4();

            // instancia o model de criptografia de senha e criptografa a senha
            const senhaCriptografada = await CriptografarSenha.criptografarSenha(senha);

            // cria um novo usuario no banco de dados
            const user = await Usuario.create({
                nomeCompleto,
                CPF,
                email,
                senha: senhaCriptografada,
                saldo: saldoInicial,
                identificador
            });

            // retorna o usuario criado
            return user;

        } catch (error: any) {
            // lança erro em caso de erro na criaçao
            if (error.name === "SequelizeUniqueConstraintError") {
                throw new Error('email ou CPF ja cadastrado');
            } else {
                console.error(error);
                throw new Error('Erro interno ao criar o usuario');
            }
        }
    }

    // metodo que retorna um usuário pelo ID
    async getUsuarioById(id: number) {
        const user = await Usuario.findByPk(id);

        if (!user) {
            throw new Error('usuario não encontrado');
        }

        return user;
    }

    // metodo para atualizar um usuario
    async updateUsuario(id: number, dadosAtualizados: Partial<Usuario>) {
        const user = await Usuario.findByPk(id);

        if (!user) {
            throw new Error('usuario não encontrado');
        }

        await user.update(dadosAtualizados);

        return user;
    }

    // metodo para deletar um usuario
    async deleteUsuario(id: number) {
        const user = await Usuario.findByPk(id);

        if (!user) {
            throw new Error('usuario nao encontrado');
        }

        await user.destroy();

        return { message: 'usuario deletado com sucesso' };
    }
}

// exporta uma instancia da classe 
export default new UserService();
