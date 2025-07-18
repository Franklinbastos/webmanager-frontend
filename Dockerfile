# Use a imagem base do Node para construir a aplicação Angular
FROM node:20 AS build
WORKDIR /app

# Copia os arquivos de configuração do projeto e instala as dependências
COPY frontend/package*.json ./frontend/
WORKDIR /app/frontend
RUN npm install

# Copia o restante dos arquivos da aplicação
COPY frontend/ ./

# Constrói a aplicação Angular
RUN npm run build -- --configuration production

# Use uma imagem Nginx leve para servir os arquivos estáticos
FROM nginx:alpine AS final
COPY --from=build /app/frontend/dist/frontend /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Inicia o Nginx
CMD ["nginx", "-g", "daemon off;"]
