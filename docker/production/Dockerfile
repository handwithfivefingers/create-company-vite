FROM docker.io/hdme1995/node-18-alpine-libreoffice-with-chrome

COPY .env ./

COPY package.json ./

RUN npm install

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=2048

RUN npm run build

CMD ["npm", "start"]
