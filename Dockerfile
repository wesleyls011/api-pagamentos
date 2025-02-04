# Usa a imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package.json package-lock.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Expõe a porta (substitua pela porta usada na API)
EXPOSE 3000

# Usa ts-node para rodar a aplicação diretamente
CMD ["npx", "ts-node", "src/app.ts"]
