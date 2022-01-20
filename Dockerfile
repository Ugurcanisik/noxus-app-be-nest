FROM node:14.17.3-slim

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build


EXPOSE 8080

CMD ["node", "dist/main"]