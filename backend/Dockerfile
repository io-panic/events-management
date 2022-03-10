# build stage
FROM node:12.17.0-alpine
WORKDIR /usr/src/backend

COPY package*.json ./

ADD src ./src

RUN npm install
RUN npm run build

ADD config ./dist/config
ADD public ./dist/public

## production stage
FROM node:12.17.0-alpine
WORKDIR /usr/app/backend

COPY package*.json ./

RUN npm install --only=production
COPY --from=0 /usr/src/backend/dist .

RUN npm install pm2 -g

ENV NODE_ENV=production
ENV NODE_APP_INSTANCE=0

EXPOSE 1080
CMD ["pm2-runtime", "start", "index.js"]
