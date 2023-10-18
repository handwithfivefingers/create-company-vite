FROM docker.io/hdme1995/node-18-alpine-libreoffice-with-chrome

COPY .env ./

COPY package.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "run", "dev-s"]
