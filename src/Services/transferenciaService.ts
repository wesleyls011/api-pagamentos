import { Usuario } from "../Models/usuario";
import sequelize from "../config/database";
import Decimal from "decimal.js";

class TransferService {
    async realizarTransferencia(payer: string, payee: string, value: number) {
        if (value <= 0) {
            throw new Error("O valor nao pode ser zero.");
        }

        const transaction = await sequelize.transaction(); // inicia uma transaçao

        try {

            const payerUser = await Usuario.findOne({ where: { identificador: payer.trim() }, transaction });
            const payeeUser = await Usuario.findOne({ where: { identificador: payee.trim() }, transaction });
            
            if (!payerUser || !payeeUser) {
                throw new Error("payee nao encontrado");
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

            await transaction.commit(); // confirma a transaçao

            return { message: "Transferência realizada com sucesso!" };
        } catch (error) {
            await transaction.rollback(); // reverte se der erro
            throw error;
        }
    }
}

export default new TransferService();
