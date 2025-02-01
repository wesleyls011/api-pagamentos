import express from 'express';
import transferenciaRoutes from './Routes/transferenciaRoutes';
import bodyParser from 'body-parser';
import userRoutes from './Routes/usuarioRoutes';
import lojistaRoutes from './Routes/lojistaRoutes';

const app = express();

app.use(bodyParser.json());

// usar as rotas de transferencia
app.use('/api', transferenciaRoutes);

app.use('/api', userRoutes);

app.use('/api', lojistaRoutes);

// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});