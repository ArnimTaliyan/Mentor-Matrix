# Use an official Node.js image as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application source code to the working directory
COPY . .

# Expose the port your app runs on (if applicable)
EXPOSE 3000

# Run the application
CMD [ "npm", "start" ]
