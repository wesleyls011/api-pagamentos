import express from 'express';
import transferenciaRoutes from './routes/transferenciaRoutes';
import bodyParser from 'body-parser';
import userRoutes from './routes/usuarioRoutes';
import lojistaRoutes from './routes/lojistaRoutes';

const app = express();

app.use(bodyParser.json());

// usar as rotas de transferencia
app.use('/api', transferenciaRoutes);

// usar as rotas de usuario
app.use('/api', userRoutes);

// usar as rotas de lojista
app.use('/api', lojistaRoutes);

// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});