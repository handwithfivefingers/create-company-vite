# docker pull bcgovimages/alpine-node-libreoffice
FROM bcgovimages/alpine-node-libreoffice
WORKDIR /app

COPY package.json ./

COPY .env ./

RUN npm install ci

COPY . .

RUN npm run build

# For Deployment
RUN npm run module-alias 

CMD ["npm", "start"]
