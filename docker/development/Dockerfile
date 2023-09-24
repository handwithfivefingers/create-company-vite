#syntax=docker/dockerfile:1.4
# Build Stage
FROM node:18 as BUILD

WORKDIR /app

COPY .env ./

COPY package.json ./

RUN npm install

COPY . ./

# RUN npm run build

# Run Stage
FROM bcgovimages/alpine-node-libreoffice

COPY --from=BUILD /app/ .

COPY --from=BUILD /app/.env .

EXPOSE 3000

# MUST  Install Chromium Core
RUN apk add --no-cache \
      udev \
      ttf-freefont \
      chromium

CMD ["npm", "run", "dev"]
# CMD [./script.sh]
