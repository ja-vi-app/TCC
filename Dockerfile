FROM node:alpine

WORKDIR /usr/app
COPY ./package.json ./
RUN npm install
RUN npm install -g nodemon
COPY ./ ./

EXPOSE 8080
ENTRYPOINT [ "nodemon", "--inspect=0.0.0.0:9229", "index.js" ]