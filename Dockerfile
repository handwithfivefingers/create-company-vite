# Build Stage
FROM node:18 as BASE

WORKDIR /app

COPY package.json ./

COPY .env ./

RUN npm install 

COPY . ./

RUN npm run build

# Run Stage
FROM bcgovimages/alpine-node-libreoffice

COPY --from=BASE /app/ .

COPY .env ./

EXPOSE 3000

CMD ["npm", "start"]
