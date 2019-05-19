# tag name: pranavj1001/smcda-client
FROM node:alpine

WORKDIR '/app'

COPY ./package.json ./
RUN npm install

COPY . .

CMD ["npm", "run", "start"]