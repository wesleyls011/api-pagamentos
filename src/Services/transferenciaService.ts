import { Usuario } from "../Models/Usuario";
import { Lojista } from "../Models/Lojista";
import { Transferencia } from "../Models/Transferencia";
import axios from "axios";
import sequelize from '../config/database';

export const realizarTransferencia = async (payerId: number, payeeId: number, valor: number, isPayeeLojista: boolean) => {
    const t = await sequelize.transaction();


try {
    // consulta o serviço externo para autorizacao
    const response = await axios.get('https://util.devi.tools/api/v2/authorize');
    if (response.data.message !== 'Autorizado') {
        throw new Error('transferencia nao autorizada');
    }

    let payee;

    // verificar se o payee e um lojista ou usuario
    if(isPayeeLojista){
        // se for lojista
        payee = await Lojista.findByPk(payeeId);
        if (!payee) {
            throw new Error('Lojista não encontrado');
        }

        // adicionar valor no saldo do lojista
        payee.saldo += valor;
        await payee.save({ transaction: t });
    } else {
        // se for usuario
        payee = await Usuario.findByPk(payeeId);
        if (!payee) {
            throw new Error('Usuario não encontrado');
        }

        // adicionar valor no saldo do usuario
        payee.saldo += valor;
        await payee.save({ transaction: t });
    }

    // subtrair valor do saldo do payer 
    const payer = await Usuario.findByPk(payerId);
    if (!payer) { 
        throw new Error('Usuario pagador não encontrado');  // pra garantir que o payer nao e nulo
    }
    payer.saldo -= valor;
    await payer.save({ transaction: t });

    // registrar a transferencia
    const transferencia = await Transferencia.create({
        valor,
        data: new Date(),
        usuarioID: payerId,
        lojistaID: payeeId, // o id vai ser mapeado se for lojista ou usuario
        status: 'autorizado'
    }, { transaction: t });

    // commitar a transacao
    await t.commit();

    return transferencia;
} catch (error) {
    await t.rollback();
    throw error;
}

}