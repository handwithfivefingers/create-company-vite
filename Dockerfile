# Build Stage
FROM node:18 as BASE

WORKDIR /app

COPY .env ./

COPY package.json ./

RUN npm install 

COPY . ./

RUN npm run build

# Run Stage
FROM bcgovimages/alpine-node-libreoffice

COPY --from=BASE /app/ .

COPY --from=BASE /app/.env .

EXPOSE 3000

CMD ["npm", "start"]
