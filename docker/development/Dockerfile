# FROM docker.io/hdme1995/node-18-alpine-libreoffice-with-chrome

# COPY .env ./

# COPY package.json ./

# RUN npm install

# COPY . .

# EXPOSE 3001

# CMD ["npm", "run", "dev-s"]

FROM node:18-alpine

WORKDIR /app

RUN apk --no-cache add bash libreoffice util-linux   font-droid-nonlatin font-droid ttf-dejavu ttf-freefont ttf-liberation

RUN apk --no-cache add msttcorefonts-installer fontconfig &&   update-ms-fonts &&   fc-cache -f

COPY package.json .

RUN npm install --loglevel verbose

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev-s"]