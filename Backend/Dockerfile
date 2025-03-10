FROM node:alpine
WORKDIR /App

# copy package json and package-lock.json files
COPY package*.json ./

#install dependencies
RUN npm install

# copy all the files from backend code
COPY . .

# expose 5000
EXPOSE 5000

# run-cmd inside the container
CMD [ "node", "server.js" ]