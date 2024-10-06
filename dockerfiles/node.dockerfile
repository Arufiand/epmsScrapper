FROM node:lts-alpine3.20
WORKDIR /epmsScrapper
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
#RUN npm run dev
CMD ["npm","run", "dev"]
