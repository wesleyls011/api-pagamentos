import { Usuario } from "../Models/Usuario";
import { Lojista } from "../Models/Lojista";
import { Transferencia } from "../Models/Transferencia";
import axios from "axios";
import sequelize from '../config/database';

export const realizarTransferencia = async (payerId: number, payeeId: number, valor: number) => {
    const t = await sequelize.transaction();


try {
    // verificar o saldo payer
    const payer = await Usuario.findByPk(payerId);
    if (!payer || payer.saldo < valor) {
        throw new Error('Saldo insuficiente');
    } 


    // consultar serviço externo para autorizacao
    const response = await axios.get('https://util.devitools/spi/v2/authorize');
    if (response.data.status !== 'autorizado') {
        throw new Error('transferencia nao autorizada');
    }

    let payee;

    // verificar se o payee e um lojista ou usuario
    if(await Lojista.findByPk(payeeId)){
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
    payer.saldo -= valor;
    await payer.save({ transaction: t });

    // registrar a transferencia
    const transferencia = await Transferencia.create({
        valor,
        data: new Date(),
        usuarioID: payerId,
        lojistaID: payeeId, // o id vai ser mapeado se for lojista ou usuario
        status: 'concluida'
    }, { transaction: t });

    // commitar a transacao
    await t.commit();

    return transferencia;
} catch (error) {
    await t.rollback();
    throw error;
}

}