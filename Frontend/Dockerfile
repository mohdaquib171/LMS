FROM node:alpine AS development
WORKDIR /App

# copy package json and package-lock.json file
COPY package*.json ./

#install dependencies
RUN npm install

# copy the all file from frontend folder
COPY . ./

#expose port 5173(vite-react)
EXPOSE 5173

#run-cmd inside the container
CMD ["npm", "run", "dev", "--", "--host"]