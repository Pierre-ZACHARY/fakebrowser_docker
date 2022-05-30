FROM node:18.2

RUN apt-get update

# Create app directory
WORKDIR /usr/src/app

RUN apt-get install -y wget

RUN wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb

RUN apt-get install ./google-chrome-stable_current_amd64.deb -y

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

RUN npm i fakebrowser

RUN yarn add puppeteer axios fakebrowser

# Bundle app source
COPY . .

EXPOSE 3000
CMD [ "node", "scrapper_endpoint.js" ]