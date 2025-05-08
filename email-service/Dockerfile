# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Expose the port the service runs on
EXPOSE 3001

# Start the service
CMD ["node", "src/index.js"]
