# #syntax=docker/dockerfile:1.4
# # Build Stage
# FROM node:18 as BUILD

# WORKDIR /app

# COPY .env ./

# COPY package.json ./

# RUN npm install

# COPY . ./

# RUN npm run build

# Run Stage
FROM docker.io/hdme1995/node-18-alpine-libreoffice-with-chrome

COPY .env ./

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# CMD [./script.sh]
