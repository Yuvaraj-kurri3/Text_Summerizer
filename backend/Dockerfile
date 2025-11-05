# Use Node.js base image
FROM node:22-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

RUN npm install

# Copy all files including .env
COPY . .

# Expose the port
EXPOSE 3000

# Start the backend
CMD ["npm", "start"]
