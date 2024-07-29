# base image
FROM node:16-alpine

# set working directory
WORKDIR /usr/src/app

# install and cache app dependencies
COPY package*.json ./
RUN npm install

# copy project files
COPY . .

# build the project
RUN npm run build

# start the application
CMD ["node", "dist/main.js"]
