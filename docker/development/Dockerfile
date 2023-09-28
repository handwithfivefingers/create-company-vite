FROM docker.io/hdme1995/node-18-alpine-libreoffice-with-chrome

COPY .env ./

COPY package.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]

# CMD [./script.sh]
