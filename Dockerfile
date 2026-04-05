FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

RUN npm install -g serve

EXPOSE 8090
CMD ["serve", "-s", "dist/quizfusion-webapp/browser", "-l", "8090"]