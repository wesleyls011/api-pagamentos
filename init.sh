#!/bin/bash

# Aguarda o MySQL estar pronto (com mais tempo)
./wait-for-it.sh meu-mysql:3306 --timeout=60 --strict -- echo "MySQL is up"

# Rodar as migrations
npx sequelize-cli db:migrate

# pra rodar a api
npm run dev