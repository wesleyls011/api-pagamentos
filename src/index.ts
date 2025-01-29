import sequelize from '../src/config/database';

const connectionTest = async () => {
    try {
        await sequelize.authenticate();
        console.log('conexao funcionando');
    } catch (error) {
        console.log('conexao falhou', error);
    }
};

connectionTest();