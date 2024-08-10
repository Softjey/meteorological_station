FROM node:22

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN npm run build

ENV PORT=4000
ENV DATABASE_URL=mongodb://host.docker.internal:27017/meteorological_station
ENV NODE_ENV=production

EXPOSE ${PORT}

ENTRYPOINT [ "npm", "run", "start:prod" ]