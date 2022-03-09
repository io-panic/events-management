FROM node:16.14.0-alpine3.15
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

ADD config ./config
ADD public ./public
ADD src ./src

EXPOSE 3030

CMD [ "npm", "start" ]
