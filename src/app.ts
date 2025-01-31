import express from 'express';
import transferenciaRoutes from './Routes/transferenciaRoutes';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

// usar as rotas de transferencia
app.use('/api', transferenciaRoutes);

// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});