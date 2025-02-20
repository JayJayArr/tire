FROM node:lts-alpine AS build
WORKDIR /usr/src/app

COPY  package*.json ./
COPY  angular.json ./

RUN npm install -g @angular/cli

RUN npm ci

COPY . .

RUN ng build

FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build /usr/src/app/dist/tire/browser /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

