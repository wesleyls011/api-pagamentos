import express from 'express';
import { setupSwagger } from './docs/swagger';
import transferenciaRoutes from './routes/transferenciaRoutes';
import userRoutes from './routes/usuarioRoutes';
import lojistaRoutes from './routes/lojistaRoutes';

const app = express();

app.use(express.json());

// usar as rotas de transferencia
app.use('/transferencia', transferenciaRoutes);

// usar as rotas de usuario
app.use('/usuarios', userRoutes);

// usar as rotas de lojista
app.use('/lojistas', lojistaRoutes);

// configurar o swagger
setupSwagger(app);

// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("Documentação disponivel em http://localhost:3000/api-docs");
});