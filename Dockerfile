# Use an official Node.js runtime as the base image
FROM node:alpine

# Install a static server
RUN npm install -g serve

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app
RUN npm run build

# Serve the app using serve
CMD ["serve", "-s", "build", "-l", "3000"]
