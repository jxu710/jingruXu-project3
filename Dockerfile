# Use the official Node.js image as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Build the React app
RUN npm run build

# Install a simple http server to serve the built application
RUN npm install -g serve

# Expose the port that the application will run on 
EXPOSE 3000

# Start the http server to serve the built application
CMD ["serve", "-s", "build"]
