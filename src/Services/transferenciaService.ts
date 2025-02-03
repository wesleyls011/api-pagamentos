import { Usuario } from "../models/Usuario";
import sequelize from "../config/database";
import Decimal from "decimal.js";
import { Lojista } from "../models/Lojista";
import { Transferencia } from "../models/Transferencia";

class TransferService {
    async realizarTransferencia(payer: string, payee: string, value: number, isPayeeLojista: boolean) {
        if (value <= 0) {
            throw new Error("O valor nao pode ser zero.");
        }

        const transaction = await sequelize.transaction(); // inicia uma transaçao

        try {

            const payerUser = await Usuario.findOne({ where: { identificador: payer.trim() }, transaction });
            let payeeUser: Usuario | Lojista | null = await Usuario.findOne({where: {identificador: payee.trim() }, transaction});
            
            if (!payeeUser) {
                payeeUser = await Lojista.findOne({ where: { identificador: payee.trim() }, transaction });
            }

            if (!payerUser || !payeeUser) {
                throw new Error("usuario ou lojista nao encontrado");
            }

            if (payerUser.saldo < value) {
                throw new Error("saldo insuficiente.");
            }

            const novoSaldoPayer = new Decimal(payerUser.saldo).minus(value);
            const novoSaldoPayee = new Decimal(payeeUser.saldo).plus(value);

            console.log("valor da transferencia:", value);
            console.log("novo saldo do payer:", novoSaldoPayer.toString());
            console.log("novo saldo do payee:", novoSaldoPayee.toString());


            await payerUser.update({ saldo: novoSaldoPayer.toString() }, { transaction });
            await payeeUser.update({ saldo: novoSaldoPayee.toString() }, { transaction });

            const transferencia = await Transferencia.create({
                payer: payerUser.identificador,
                payee: payeeUser.identificador,
                value: value,
                status: "completada", // nesse ponto ela fica como completa
            }, { transaction });

            await transaction.commit(); // confirma a transaçao
            
            return { message: "Transferência realizada com sucesso!" };
        } catch (error) {
            await transaction.rollback(); // reverte se der erro
            throw error;
        }
    }

    async listarTransferencias() {
        return await Transferencia.findAll();
    }

    async buscarTransferenciaPorId(id: string) {
        const transferencia = await Transferencia.findByPk(id);
        if (!transferencia) {
            throw new Error("Transferência não encontrada");
        }
        return transferencia;
    }
}

export default new TransferService();
