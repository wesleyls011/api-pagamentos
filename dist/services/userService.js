"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const CriptografarSenha_1 = require("../models/CriptografarSenha");
const usuario_1 = require("../models/usuario");
const uuid_1 = require("uuid");
class UserService {
    // Método para criar um usuário
    createUsuario(nomeCompleto, CPF, email, senha, saldo) {
        return __awaiter(this, void 0, void 0, function* () {
            const saldoInicial = saldo || 0; // usa o saldo da requisiçao ou 0 como valor padrao
            try {
                // cria um identificador unico para o usuário
                const identificador = (0, uuid_1.v4)();
                // instancia o model de criptografia de senha e criptografa a senha
                const senhaCriptografada = yield CriptografarSenha_1.CriptografarSenha.criptografarSenha(senha);
                // cria um novo usuario no banco de dados
                const user = yield usuario_1.Usuario.create({
                    nomeCompleto,
                    CPF,
                    email,
                    senha: senhaCriptografada,
                    saldo: saldoInicial,
                    identificador
                });
                // retorna o usuario criado
                return user;
            }
            catch (error) {
                // lança erro em caso de erro na criaçao
                if (error.name === "SequelizeUniqueConstraintError") {
                    throw new Error('email ou CPF ja cadastrado');
                }
                else {
                    console.error(error);
                    throw new Error('Erro interno ao criar o usuario');
                }
            }
        });
    }
    // metodo que retorna um usuário pelo ID
    getUsuarioById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usuario_1.Usuario.findByPk(id);
            if (!user) {
                throw new Error('usuario não encontrado');
            }
            return user;
        });
    }
    // metodo para atualizar um usuario
    updateUsuario(id, dadosAtualizados) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usuario_1.Usuario.findByPk(id);
            if (!user) {
                throw new Error('usuario não encontrado');
            }
            yield user.update(dadosAtualizados);
            return user;
        });
    }
    // metodo para deletar um usuario
    deleteUsuario(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield usuario_1.Usuario.findByPk(id);
            if (!user) {
                throw new Error('usuario nao encontrado');
            }
            yield user.destroy();
            return { message: 'usuario deletado com sucesso' };
        });
    }
}
// exporta uma instancia da classe 
exports.default = new UserService();
