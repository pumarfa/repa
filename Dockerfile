FROM node:22-alpine as base

ENV MONGO_DB_USERNAME=admin \
    MONGO_DB_PWD=password

WORKDIR /usr/src/app/
COPY package*.json /
EXPOSE 3000

FROM base as production
ENV NODE_ENV=production
RUN npm ci
COPY . .
CMD ["node", "app,js"]

FROM base as dev
ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . .
CMD ["nodemon", "app.js"]