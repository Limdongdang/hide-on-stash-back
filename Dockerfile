# Use the official Node.js image.
# https://hub.docker.com/_/node
FROM node:20

# Create and change to the app directory.
WORKDIR /app

# Copy application dependency manifests to the container image.
COPY package*.json package-lock.json ./

# Install production dependencies.
RUN npm install

# Copy local code to the container image.
COPY . .

CMD ["npm", "start"]