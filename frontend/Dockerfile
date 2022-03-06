# build stage
FROM node:16.14.0-alpine3.15 as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# production stage
FROM nginx:1.20.2-alpine as production-stage
RUN apk add --no-cache git curl nano

COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
