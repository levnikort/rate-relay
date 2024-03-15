FROM node:20.10.0

WORKDIR /app

COPY . .

RUN npm ci

EXPOSE 3000

CMD npm run start