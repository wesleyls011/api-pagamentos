import express from 'express';
import transferenciaRoutes from './routes/transferenciaRoutes';
import bodyParser from 'body-parser';
import userRoutes from './routes/usuarioRoutes';
import lojistaRoutes from './routes/lojistaRoutes';
import { setupSwagger } from './docs/swagger';

const app = express();

app.use(bodyParser.json());
app.use(express.json());

// usar as rotas de transferencia
app.use('/api', transferenciaRoutes);

// usar as rotas de usuario
app.use('/api', userRoutes);

// usar as rotas de lojista
app.use('/api', lojistaRoutes);

// configurar o swagger
setupSwagger(app);

// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("Documentação disponivel em http://localhost:3000/api-docs");
});