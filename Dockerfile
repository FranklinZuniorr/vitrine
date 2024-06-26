# Use uma imagem base do Node.js
FROM node:20

# Crie e defina o diretório de trabalho
WORKDIR /app

# Copie o arquivo package.json e package-lock.json
COPY package*.json ./

# Instale todas as dependências, incluindo as devDependencies
RUN npm install

# Copie o restante do código do aplicativo
COPY . .

# Comando para rodar o build
RUN npm run build

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
