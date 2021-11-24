FROM node:13-alpine

RUN mkdir /service
COPY notification-profile/ /service/notification-profile/

WORKDIR /service/notification-profile

RUN npm install

EXPOSE 8000

CMD [ "node", "src/server.js" ]