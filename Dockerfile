FROM node:18 as BASE

WORKDIR /app

COPY package.json ./

RUN npm install 

COPY . ./

RUN npm run build

FROM bcgovimages/alpine-node-libreoffice

COPY --from=BASE /app/ .
# WORKDIR /app

# COPY package.json ./

# # COPY .env ./

# RUN npm install 

# # For Deployment

# COPY . .

# RUN yarn add module-alias --ignore-engines

# RUN npm run build


CMD ["npm", "start"]
