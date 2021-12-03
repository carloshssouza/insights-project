FROM node:13-alpine

RUN mkdir /service
COPY front-notification/ /service/front-notification/

WORKDIR /service/front-notification

ENV PATH /front-notification/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent

EXPOSE 3002

CMD ["npm", "start"]