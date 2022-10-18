FROM node:alpine

WORKDIR /usr/app
COPY frontend/package.json ./
RUN npm install
COPY ./ ./

EXPOSE 3000
ENTRYPOINT [ "npm", "start" ]