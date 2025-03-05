FROM node:20.11.1-alpine3.19
WORKDIR /usr/src/rubypome/server
COPY package.json ./
RUN rm -rf node_modules && yarn install --frozen-lockfile && yarn cache clean
COPY . .
CMD [ "yarn","prod" ]