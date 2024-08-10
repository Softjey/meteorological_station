FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV SERVER_URL=http://host.docker.internal:4000
ENV TIME_INTERVAL=1000

ENTRYPOINT [ "npm", "start" ]