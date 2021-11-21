FROM node:13-alpine

RUN mkdir /service
COPY front-portfolio/ /service/front-portfolio/

WORKDIR /service/front-portfolio

ENV PATH /front-portfolio/node_modules/.bin:$PATH

RUN npm install --silent
RUN npm install react-scripts@3.3.1 -g --silent

EXPOSE 3001

CMD ["npm", "start"]