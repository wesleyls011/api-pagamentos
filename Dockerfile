
FROM node:16

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copie o package.json e o package-lock.json
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos da aplicação
COPY . .

# Compile o código TypeScript
RUN npm run build

# Expõe a porta 3000
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "dist/app.js"]
