FROM node:16-alpine

WORKDIR /app

COPY package*.json .

RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

ENV NODE_ENV=development

CMD ["npx", "ts-node", "src/server.ts"]
