FROM node:18-alpine
# Install latest chrome dev package and fonts to support major charsets (Chinese, Japanese, Arabic, Hebrew, Thai and a few others)
# Note: this installs the necessary libs to make the bundled version of Chrome that Puppeteer
# installs, work.


WORKDIR /app

COPY package.json ./

RUN apk add --no-cache udev chromium 

RUN npm install

COPY . .

ENV NODE_OPTIONS=--max_old_space_size=2048

EXPOSE 3002

CMD ["npm","run", "dev"]
