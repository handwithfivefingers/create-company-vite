FROM node:20-alpine

RUN apk add libreoffice
RUN apk add openjdk8-jre
RUN apk add --no-cache \
  udev \
  ttf-freefont \
  chromium
RUN apk --no-cache add msttcorefonts-installer fontconfig && \
  update-ms-fonts && \
  fc-cache -f

WORKDIR /app

COPY .env ./

COPY package.json ./

RUN npm install 

COPY . .

WORKDIR /app

RUN chmod +X shell.sh
RUN chmod 777 node_modules
RUN chmod 777 .

CMD ["npm", "start"]

# CMD ["/bin/bash", "shell.sh"]
