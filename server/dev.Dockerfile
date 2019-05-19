# tag name: pranavj1001/smcda-server
FROM node:alpine

WORKDIR '/app'

COPY ./package.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "dev"]