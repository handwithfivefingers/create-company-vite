# Build Stage
FROM node:18 as BASE

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . ./

RUN npm run build

# Run Stage
FROM bcgovimages/alpine-node-libreoffice

COPY --from=BASE /app/ .

EXPOSE 3001

CMD ["npm", "start"]
