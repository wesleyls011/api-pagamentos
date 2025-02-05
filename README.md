
# PayFlex Solutions API

A API PayFlex Solutions permite gerenciar usuários, lojistas e transferências. É possível realizar o cadastro de novos usuários e lojistas, além de efetuar transferências entre eles. A API oferece funcionalidades de CRUD para usuários e lojistas, e operações de transferência entre eles.

## Tecnologias Utilizadas

- Node.js
- TypeScript
- Express
- MySQL
- Sequelize
- Middlewares de validação
- Swagger (para documentação da API)

## Endpoints

### Usuários

#### POST /usuarios/create
Cria um novo usuário com as informações fornecidas.

**Body:**
```json
{
  "nomeCompleto": "Matheus",
  "CPF": "12345678919",
  "email": "email@email.com",
  "senha": "12313131",
  "saldo": 670
}
```

**Resposta:**
- 201: Usuário criado com sucesso
- 400: Dados inválidos ou falta de campos obrigatórios

#### GET /usuarios/{id}
Retorna os dados de um usuário específico.

**Parâmetros:**
- `id`: Identificador único do usuário

**Resposta:**
- 200: Usuário encontrado
- 404: Usuário não encontrado

#### PUT /usuarios/{id}
Atualiza as informações de um usuário existente.

**Body:**
```json
{
  "nomeCompleto": "Matheus",
  "CPF": "12345678919",
  "email": "email@email.com",
  "senha": "novaSenha",
  "saldo": 750
}
```

**Resposta:**
- 200: Usuário atualizado com sucesso
- 400: Dados inválidos ou falta de campos obrigatórios
- 404: Usuário não encontrado

#### DELETE /usuarios/{id}
Deleta um usuário específico.

**Resposta:**
- 200: Usuário deletado com sucesso
- 404: Usuário não encontrado

---

### Lojistas

#### POST /lojistas/create
Cria um novo lojista com as informações fornecidas.

**Body:**
```json
{
  "nomeLojista": "Lojista Exemplo",
  "CNPJ": "12345678000195",
  "email": "lojista@exemplo.com",
  "senha": "senha123",
  "saldo": 1500
}
```

**Resposta:**
- 201: Lojista criado com sucesso
- 400: Dados inválidos ou falta de campos obrigatórios

#### GET /lojistas/{id}
Retorna os dados de um lojista específico.

**Parâmetros:**
- `id`: Identificador único do lojista

**Resposta:**
- 200: Lojista encontrado
- 404: Lojista não encontrado

#### PUT /lojistas/{id}
Atualiza as informações de um lojista existente.

**Body:**
```json
{
  "nomeLojista": "Novo Lojista Exemplo",
  "CNPJ": "12345678000195",
  "email": "lojista@novoexemplo.com",
  "senha": "novaSenha123",
  "saldo": 2000
}
```

**Resposta:**
- 200: Lojista atualizado com sucesso
- 400: Dados inválidos ou falta de campos obrigatórios
- 404: Lojista não encontrado

#### DELETE /lojistas/{id}
Deleta um lojista específico.

**Resposta:**
- 200: Lojista deletado com sucesso
- 404: Lojista não encontrado

---

### Transferências

#### POST /transferencia/create
Realiza uma transferência entre usuários.

**Body:**
```json
{
  "payer": "550e8400-e29b-41d4-a716-446655440000",
  "payee": "660f8400-e29b-41d4-a716-446655440111",
  "value": 100.50
}
```

**Resposta:**
- 200: Transferência realizada com sucesso
- 400: Dados inválidos na requisição
- 403: Transferência não autorizada pelo serviço externo
- 500: Erro interno no servidor

#### GET /transferencia/listar
Retorna a lista de transferências realizadas.

**Resposta:**
- 200: Lista de transferências obtida com sucesso
- 500: Erro interno no servidor

#### GET /transferencia/{id}
Busca uma transferência por ID.

**Parâmetros:**
- `id`: Identificador único da transferência

**Resposta:**
- 200: Transferência encontrada
- 404: Transferência não encontrada
- 500: Erro no servidor

---

## Documentação

A documentação completa da API está disponível no SwaggerUI. Para acessá-la, basta navegar até o seguinte endereço:

[SwaggerUI - PayFlex Solutions](http://localhost:3000/api-docs)

## Middlewares

A API utiliza middlewares para validação de dados, verificação de saldo e verificação de tipo de usuário (comum ou lojista) nas transferências.

---

## Como Rodar o Projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/seuusuario/payflex-solutions.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Rode o servidor:
   ```bash
   npm start
   ```

4. Acesse a API através de `localhost:3000`.

