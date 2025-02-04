"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_1 = require("./docs/swagger");
const transferenciaRoutes_1 = __importDefault(require("./routes/transferenciaRoutes"));
const usuarioRoutes_1 = __importDefault(require("./routes/usuarioRoutes"));
const lojistaRoutes_1 = __importDefault(require("./routes/lojistaRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// usar as rotas de transferencia
app.use('/transferencia', transferenciaRoutes_1.default);
// usar as rotas de usuario
app.use('/usuarios', usuarioRoutes_1.default);
// usar as rotas de lojista
app.use('/lojistas', lojistaRoutes_1.default);
// configurar o swagger
(0, swagger_1.setupSwagger)(app);
// inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
    console.log("Documentação disponivel em http://localhost:3000/api-docs");
});
