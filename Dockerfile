FROM node:18.16.0 as builder

WORKDIR /app
COPY package*.json ./
RUN yarn install --production
COPY . .
RUN yarn build
EXPOSE 3000
CMD [ "yarn", "start" ]
