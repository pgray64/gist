# syntax=docker/dockerfile:1

FROM node:18.1-alpine3.14
ENV NODE_ENV=production
WORKDIR /app
COPY ["package.json", "package-lock.json*", "./"]
RUN rm -rf .tmp
RUN npm install
COPY . .
CMD ["node", "app.js"]
