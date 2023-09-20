# docker pull bcgovimages/alpine-node-libreoffice
FROM bcgovimages/alpine-node-libreoffice
WORKDIR /app

COPY package.json ./

COPY .env ./

RUN npm install ci

# For Deployment
RUN npm install module-alias 

COPY . .

RUN npm run build


CMD ["npm", "start"]
