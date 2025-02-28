# Use Node.js 20.11.1 as the base image
FROM node:20.11.1-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Vite app
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

# Command to run the app
CMD ["npm", "run", "serve"]
