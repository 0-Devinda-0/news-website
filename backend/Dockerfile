# syntax=docker/dockerfile:1

# Stage 1: Build the application
ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-alpine AS builder

WORKDIR /app

# Copy only package.json and package-lock.json (if available) to leverage caching
COPY package*.json ./

# Install dependencies (only production dependencies)
RUN npm ci

# Install TypeScript globally for the build
RUN npm install -g typescript

# Copy the rest of the application source code
COPY . .

# Build the TypeScript application
RUN npm run build

# Stage 2: Create the runtime image
FROM node:${NODE_VERSION}-alpine

WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Install only production dependencies
RUN npm ci --omit=dev --ignore-scripts

# Expose the port that the application listens on
EXPOSE 3001

# Run the application
CMD ["node", "dist/server.js"]