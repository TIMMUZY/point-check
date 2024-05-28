# Образ Node.js как этап сборки
FROM node:alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Nginx для раздачи статики
FROM nginx:alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
# Копирование кастомной конфигурации Nginx
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
