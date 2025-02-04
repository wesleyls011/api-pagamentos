import { Lojista } from "../models/lojista";
import { Response, Request } from "express";
import { CriptografarSenha } from "../models/CriptografarSenha";
import {v4 as uuidv4} from 'uuid';

class LojistaService {

    async createLojista(nomeLojista: string, CNPJ: string, email: string, senha: string, saldo: number){
        const saldoInicial = saldo || 0;

        try{

            const identificador = uuidv4();

            const senhaCriptografada = await CriptografarSenha.criptografarSenha(senha);

            const lojista = await Lojista.create({
                nomeLojista,
                CNPJ,
                email,
                senha: senhaCriptografada,
                saldo: saldoInicial,
                identificador
            });

            return lojista;

        } catch (error: any){
            if (error.name === "SequelizeUniqueConstraintError"){
                throw new Error('email ou CNPJ ja cadastrado');
            } else {
                console.error(error);
                throw new Error('Erro interno ao criar o lojista');
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

    async updateLojista(id: number, dadosAtualizados: Partial<Lojista>){
        const lojista = await Lojista.findByPk(id);

        if(!lojista){
            throw new Error('Lojista nao encontrado');
        }

        await lojista.update(dadosAtualizados);

        return lojista;
    }

    async deleteLojista(id: number){
        const lojista = await Lojista.findByPk(id);

        if(!lojista){
            throw new Error('Lojista nao encontrado');
        }

        await lojista.destroy();

        return lojista;
    }
}

export default new LojistaService();