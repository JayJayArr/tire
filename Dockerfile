FROM node:alpine
WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

RUN npm ci

COPY --chown=node:node . .

RUN npm run build

USER node

ENV NODE_ENV=production

EXPOSE 3000

CMD [ "node", "dist/main.js" ]
