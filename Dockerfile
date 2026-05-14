# FROM node:20-alpine
# WORKDIR /app

# COPY package*.json ./
# RUN npm install

# COPY . .
# RUN npm run build

# RUN npm install -g serve

# EXPOSE 4010
# CMD ["serve", "-s", "dist/quizfusion-webapp/browser", "-l", "4010"]


FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:20-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist ./dist

EXPOSE 4000

CMD ["serve", "-s", "dist/quizfusion-webapp/browser", "-l", "4000"]
